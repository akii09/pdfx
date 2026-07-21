import { afterEach, describe, expect, it, vi } from 'vitest';
import { posthog, shutdownPosthog } from './posthog.js';

/**
 * Unit tests for the telemetry flush.
 *
 * "Timeout while shutting down PostHog" was a recurring reported error: the rejection
 * escaped `shutdownPosthog`, and because exception autocapture is enabled, our own
 * analytics timeout was reported as though the CLI itself had failed.
 */

describe('shutdownPosthog', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports success when the flush completes', async () => {
    vi.spyOn(posthog, 'shutdown').mockResolvedValue(undefined);
    await expect(shutdownPosthog()).resolves.toBe(true);
  });

  it('caps the flush at 3 seconds so the CLI never hangs', async () => {
    const shutdown = vi.spyOn(posthog, 'shutdown').mockResolvedValue(undefined);
    await shutdownPosthog();
    expect(shutdown).toHaveBeenCalledWith(3000);
  });

  it('resolves false instead of rejecting when the flush times out', async () => {
    vi.spyOn(posthog, 'shutdown').mockRejectedValue(
      new Error('Timeout while shutting down PostHog. Some events may not have been sent.')
    );
    // Must not reject: an escaping rejection is what autocapture reported as a CLI error.
    await expect(shutdownPosthog()).resolves.toBe(false);
  });

  it('resolves false when the flush fails for any other reason', async () => {
    vi.spyOn(posthog, 'shutdown').mockRejectedValue(new Error('network unreachable'));
    await expect(shutdownPosthog()).resolves.toBe(false);
  });
});
