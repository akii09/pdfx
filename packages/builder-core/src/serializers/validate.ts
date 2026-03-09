import type { BuilderState } from './types';

/**
 * Validate builder state structure
 * Uses Zod for validation (Phase 2)
 */
export function validateState(state: unknown): state is BuilderState {
  // Basic validation - will be replaced with Zod schema
  return (
    typeof state === 'object' &&
    state !== null &&
    'version' in state &&
    'config' in state &&
    'pages' in state &&
    'theme' in state
  );
}
