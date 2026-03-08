import type { BuilderState } from './types';

/**
 * Serialize builder state to JSON string
 */
export function serializeState(state: BuilderState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Deserialize JSON string to builder state
 */
export function deserializeState(json: string): BuilderState {
  return JSON.parse(json) as BuilderState;
}