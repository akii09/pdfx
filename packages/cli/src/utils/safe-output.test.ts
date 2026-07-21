import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleStreamError, installEpipeGuards } from './safe-output.js';

/**
 * Unit tests for the EPIPE guards.
 *
 * EPIPE was the CLI's most frequent reported error: writing to a pipe whose reader has
 * already closed (`pdfx list | head`, an MCP client disconnecting mid-response) raised
 * an uncaught exception because nothing listened for stream errors.
 */

function epipe(): NodeJS.ErrnoException {
  const err: NodeJS.ErrnoException = new Error('write EPIPE');
  err.code = 'EPIPE';
  return err;
}

describe('handleStreamError', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('exits successfully on EPIPE', () => {
    const exit = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit called');
    }) as never);

    expect(() => handleStreamError(epipe())).toThrow('exit called');
    expect(exit).toHaveBeenCalledWith(0);
  });

  it('rethrows non-EPIPE stream errors so real failures stay visible', () => {
    const exit = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    const err: NodeJS.ErrnoException = new Error('disk full');
    err.code = 'ENOSPC';

    expect(() => handleStreamError(err)).toThrow('disk full');
    expect(exit).not.toHaveBeenCalled();
  });
});

describe('installEpipeGuards', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('attaches a listener to every stream it is given', () => {
    const a = new EventEmitter();
    const b = new EventEmitter();

    installEpipeGuards([a, b]);

    expect(a.listenerCount('error')).toBe(1);
    expect(b.listenerCount('error')).toBe(1);
  });

  it('routes an EPIPE emitted on a guarded stream to a clean exit', () => {
    // process.exit never returns, so the mock throws a sentinel to model that; without
    // it the handler would fall through to the rethrow below.
    const exit = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit called');
    }) as never);
    const stream = new EventEmitter();

    installEpipeGuards([stream]);
    // Without a listener this would be an uncaught 'error' event and crash the process.
    expect(() => stream.emit('error', epipe())).toThrow('exit called');
    expect(exit).toHaveBeenCalledWith(0);
  });
});
