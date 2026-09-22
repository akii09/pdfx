import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
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

/*
 * Load the actual entrypoint, skills command, and guards into isolated Node processes.
 * In-memory modules replace filesystem writes, preflight checks, and unrelated commands
 * so these regressions need neither a build nor a real skills installation or telemetry.
 */

/** Wraps JavaScript source in a `data:` URL so it can be imported as an ES module. */
function moduleUrl(source: string): string {
  return `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
}

/**
 * Compiles a real source file to an importable module, rewriting the imports named in
 * `imports` to the given replacements. Rewriting at the AST level keeps the module under
 * test untouched — no production seam exists purely for these tests.
 */
function sourceModuleUrl(file: string, imports: Record<string, string> = {}): string {
  const source = readFileSync(new URL(file, import.meta.url), 'utf-8');
  const compiled = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    transformers: {
      before: [
        () => (sourceFile) =>
          ts.factory.updateSourceFile(
            sourceFile,
            sourceFile.statements.map((statement) => {
              if (
                !ts.isImportDeclaration(statement) ||
                !ts.isStringLiteral(statement.moduleSpecifier)
              ) {
                return statement;
              }
              const replacement = imports[statement.moduleSpecifier.text];
              return replacement
                ? ts.factory.updateImportDeclaration(
                    statement,
                    statement.modifiers,
                    statement.importClause,
                    ts.factory.createStringLiteral(replacement),
                    statement.attributes
                  )
                : statement;
            })
          ),
      ],
    },
  });
  return moduleUrl(`${compiled.outputText}\n//# sourceURL=pdfx-test/${file}`);
}

/**
 * Builds the CLI entrypoint used by the subprocess: the real `index.ts` and `skills.ts`,
 * with every unrelated command stubbed out. `guarded: false` swaps `installEpipeGuards`
 * for a no-op, which is the negative control proving the guards are what prevent EPIPE.
 */
function skillsEntrypoint(guarded: boolean): string {
  const require = createRequire(import.meta.url);
  const dependencies = {
    chalk: pathToFileURL(require.resolve('chalk')).href,
    commander: pathToFileURL(require.resolve('commander')).href,
  };
  const unusedCommands = moduleUrl(`
    const unused = () => { throw new Error('Unexpected command'); };
    export { unused as add, unused as blockAdd, unused as blockList, unused as diff,
      unused as init, unused as list, unused as themeInit, unused as themeSwitch,
      unused as themeValidate };
  `);
  const skills = sourceModuleUrl('../commands/skills.ts', {
    ...dependencies,
    'node:fs': moduleUrl(`
      export const existsSync = () => false;
      export const readFileSync = () => { throw new Error('Unexpected filesystem read'); };
    `),
    'node:fs/promises': moduleUrl(`
      export const mkdir = async () => {};
      export const writeFile = async (filePath, content) => {
        if (globalThis.__pdfxFailWrite) throw new Error('simulated write failure');
        await new Promise((resolve, reject) => process.send(
          { type: 'write', filePath, content },
          (error) => error ? reject(error) : resolve()
        ));
      };
    `),
    prompts: moduleUrl("export default () => { throw new Error('Unexpected prompt'); };"),
    '../skills-content.js': moduleUrl("export const PDFX_SKILLS_CONTENT = 'test skills content';"),
    '../utils/pre-flight.js': moduleUrl(`
      export const runPreFlightChecks = () => ({ canProceed: true });
      export const displayPreFlightResults = () => {};
    `),
  });
  return sourceModuleUrl('../index.ts', {
    ...dependencies,
    './commands/add.js': unusedCommands,
    './commands/block.js': unusedCommands,
    './commands/diff.js': unusedCommands,
    './commands/init.js': unusedCommands,
    './commands/list.js': unusedCommands,
    './commands/theme.js': unusedCommands,
    './commands/mcp.js': moduleUrl(`
      import { Command } from ${JSON.stringify(dependencies.commander)};
      export const mcpCommand = new Command('mcp');
    `),
    './commands/skills.js': skills,
    './utils/safe-output.js': guarded
      ? sourceModuleUrl('./safe-output.ts')
      : moduleUrl('export const installEpipeGuards = () => {};'),
  });
}

interface SkillsProcessResult {
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
  writes: unknown[];
}

/**
 * Runs `skills init` in a child process over real OS pipes and reports its exit status,
 * output, and the writes it attempted.
 *
 * The child waits on an IPC message before importing the entrypoint, so `closedStream`
 * destroys the reader before any command output is produced. Sequencing it this way
 * avoids the timing-dependent reproduction a plain `| head` would give.
 */
function runSkillsProcess(
  entrypoint: string,
  options: { closedStream?: 'stdout' | 'stderr'; failWrite?: boolean } = {}
): Promise<SkillsProcessResult> {
  const script = `
    import { once } from 'node:events';
    // Commander skips only the executable argument when running through node -e.
    process.argv = ['node', 'skills', 'init', '--platform', 'claude', '--yes'];
    globalThis.__pdfxFailWrite = ${Boolean(options.failWrite)};
    process.send('ready');
    await once(process, 'message');
    await import(${JSON.stringify(entrypoint)});
    await new Promise((resolve) => setImmediate(resolve));
    process.disconnect();
  `;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', script], {
      stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      timeout: 5000,
    });
    const output = child.stdout;
    const errors = child.stderr;
    child.on('error', reject);
    if (!output || !errors) {
      child.kill();
      reject(new Error('Subprocess output pipes were not created'));
      return;
    }
    let stdout = '';
    let stderr = '';
    const writes: unknown[] = [];
    output.on('data', (chunk) => {
      stdout += chunk;
    });
    errors.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('message', (message) => {
      if (message === 'ready') {
        const resume = () =>
          child.send('run', (error) => {
            if (error) reject(error);
          });
        if (options.closedStream) {
          const reader = options.closedStream === 'stdout' ? output : errors;
          reader.once('close', resume);
          reader.destroy();
        } else {
          resume();
        }
      } else {
        writes.push(message);
      }
    });
    child.on('close', (code, signal) => resolve({ code, signal, stdout, stderr, writes }));
  });
}

describe('skills init: real output pipes', () => {
  let guarded: string;
  let unguarded: string;

  beforeAll(() => {
    guarded = skillsEntrypoint(true);
    unguarded = skillsEntrypoint(false);
  });

  it('still reports successful initialization when the output reader stays open', async () => {
    const result = await runSkillsProcess(guarded);

    expect(result.signal).toBeNull();
    expect(result.code, result.stderr).toBe(0);
    expect(result.stderr).toBe('');
    expect(result.stdout).toContain('Wrote');
    expect(result.stdout).toContain('CLAUDE.md');
    expect(result.writes).toEqual([
      {
        type: 'write',
        filePath: expect.stringContaining('CLAUDE.md'),
        content: 'test skills content\n',
      },
    ]);
  }, 10000);

  it('exits silently with status 0 when stdout closes before skills output', async () => {
    const result = await runSkillsProcess(guarded, { closedStream: 'stdout' });

    expect(result.signal).toBeNull();
    expect(result.code, result.stderr).toBe(0);
    expect(result.stderr).toBe('');
    expect(result.writes).toHaveLength(1);
  }, 10000);

  it('reproduces EPIPE with a nonzero exit when entrypoint guards are disabled', async () => {
    const result = await runSkillsProcess(unguarded, { closedStream: 'stdout' });

    expect(result.signal).toBeNull();
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('EPIPE');
    expect(result.writes).toHaveLength(1);
  }, 10000);

  it('also exits cleanly when stderr closes before a command error is printed', async () => {
    const result = await runSkillsProcess(guarded, { closedStream: 'stderr', failWrite: true });

    expect(result.signal).toBeNull();
    expect(result.code, result.stderr).toBe(0);
    expect(result.stdout).toBe('');
    expect(result.writes).toHaveLength(0);
  }, 10000);

  it('preserves real command failures when stderr is readable', async () => {
    const result = await runSkillsProcess(guarded, { failWrite: true });

    expect(result.signal).toBeNull();
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('simulated write failure');
    expect(result.writes).toHaveLength(0);
  }, 10000);
});
