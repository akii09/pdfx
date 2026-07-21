import { registrySchema } from '@pdfx/shared';
import { FETCH_TIMEOUT_MS } from '../constants.js';

/** Registry names split by kind. Components are published as `registry:ui`. */
export interface RegistryNames {
  components: string[];
  blocks: string[];
}

function noNames(): RegistryNames {
  return { components: [], blocks: [] };
}

/**
 * Fetches every component and block name from the registry index.
 *
 * Both kinds come from one request so a failed lookup can suggest across them — the
 * common miss is `pdfx add invoice`, where the matches are blocks rather than
 * components.
 *
 * This only feeds suggestions after a lookup has already failed, so it never throws: an
 * unreachable or malformed index simply means no suggestions to offer, and the caller
 * falls back to the plain not-found message. Surfacing a second error here would
 * replace a useful message with a confusing one.
 */
export async function fetchRegistryNames(registryUrl: string): Promise<RegistryNames> {
  try {
    const response = await fetch(`${registryUrl}/index.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!response.ok) return noNames();

    const result = registrySchema.safeParse(await response.json());
    if (!result.success) return noNames();

    const namesOfType = (type: string) =>
      result.data.items.filter((item) => item.type === type).map((item) => item.name);

    return { components: namesOfType('registry:ui'), blocks: namesOfType('registry:block') };
  } catch {
    // Best-effort lookup on an error path — the original not-found error still stands.
    return noNames();
  }
}
