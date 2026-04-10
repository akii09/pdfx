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
