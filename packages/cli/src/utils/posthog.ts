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
 * A failed flush is swallowed deliberately. Telemetry is best-effort: the user cannot
 * act on it, and letting the rejection escape means exception autocapture reports our
 * own analytics timeout as if it were a CLI failure.
 */
export async function shutdownPosthog(): Promise<void> {
  try {
    await posthog.shutdown(3000);
  } catch {
    // Best-effort flush — a dropped analytics batch is never worth surfacing.
  }
}
