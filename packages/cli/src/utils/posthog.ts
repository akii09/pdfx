import os from 'node:os';
import { PostHog } from 'posthog-node';

export function getDistinctId(): string {
  return os.hostname();
}

export const posthog = new PostHog('phc_zMnenjjttpwQD7tKQKzgpiSvwpv3KcLG96kR2tYvG6JZ', {
  host: 'https://us.i.posthog.com',
  flushAt: 1,
  flushInterval: 0,
  enableExceptionAutocapture: true,
});

export const distinctId = getDistinctId();

/**
 * Flushes pending events with a 3-second cap so the CLI never hangs on network issues.
 *
 * Returns whether the flush completed, turning a failure into a value the caller can
 * inspect rather than an exception that escapes. The rejection must not propagate:
 * telemetry is best-effort, the user cannot act on it, and an escaping rejection is
 * picked up by exception autocapture — which reported our own analytics timeout as if
 * it were a CLI failure.
 *
 * Commands intentionally ignore the result today; it exists so a dropped batch is an
 * explicit outcome rather than a discarded error.
 */
export async function shutdownPosthog(): Promise<boolean> {
  try {
    await posthog.shutdown(3000);
    return true;
  } catch {
    return false;
  }
}
