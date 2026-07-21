import { registrySchema } from '@pdfx/shared';
import { FETCH_TIMEOUT_MS } from '../constants.js';

/** Item types as they appear in the registry index. Components are published as `registry:ui`. */
export type RegistryItemType = 'registry:ui' | 'registry:block';

/**
 * Fetches the names of every registry item of the given type.
 *
 * This only feeds "did you mean" suggestions after a lookup has already failed, so it
 * never throws: an unreachable or malformed index simply means no suggestions to offer,
 * and the caller falls back to the plain not-found message. Surfacing a second error
 * here would replace a useful message with a confusing one.
 */
export async function fetchRegistryNames(
  registryUrl: string,
  type: RegistryItemType
): Promise<string[]> {
  try {
    const response = await fetch(`${registryUrl}/index.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) return [];

    const result = registrySchema.safeParse(await response.json());
    if (!result.success) return [];

    return result.data.items.filter((item) => item.type === type).map((item) => item.name);
  } catch {
    // Best-effort lookup on an error path — the original not-found error still stands.
    return [];
  }
}
