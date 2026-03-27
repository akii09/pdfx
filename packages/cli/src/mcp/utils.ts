import {
  NetworkError,
  RegistryError,
  type RegistryIndexItem,
  type RegistryItem,
  registryItemSchema,
  registrySchema,
} from '@pdfx/shared';
import { DEFAULTS, FETCH_TIMEOUT_MS, REGISTRY_SUBPATHS } from '../constants.js';

export const REGISTRY_BASE = DEFAULTS.REGISTRY_URL;
export const BLOCKS_BASE = `${DEFAULTS.REGISTRY_URL}/${REGISTRY_SUBPATHS.BLOCKS}`;

/** Fetch and validate the full registry index. */
export async function fetchRegistryIndex(): Promise<RegistryIndexItem[]> {
  let response: Response;
  try {
    response = await fetch(`${REGISTRY_BASE}/index.json`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout
        ? 'Registry request timed out. Check your internet connection.'
        : 'Could not reach the PDFx registry. Check your internet connection.'
    );
  }

  if (!response.ok) {
    throw new RegistryError(`Registry returned HTTP ${response.status}`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new RegistryError('Registry returned invalid JSON');
  }

  const result = registrySchema.safeParse(data);
  if (!result.success) {
    throw new RegistryError('Registry index has an unexpected format');
  }

  return result.data.items;
}

/** Fetch and validate a single component or block item from the registry. */
export async function fetchRegistryItem(
  name: string,
  base: string = REGISTRY_BASE
): Promise<RegistryItem> {
  const url = `${base}/${name}.json`;

  let response: Response;
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout
        ? `Registry request timed out for "${name}".`
        : 'Could not reach the PDFx registry. Check your internet connection.'
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new RegistryError(
        `"${name}" not found in the registry. Use list_components or list_blocks to see available items.`
      );
    }
    throw new RegistryError(`Registry returned HTTP ${response.status} for "${name}"`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new RegistryError(`Registry returned invalid JSON for "${name}"`);
  }

  const result = registryItemSchema.safeParse(data);
  if (!result.success) {
    throw new RegistryError(`Unexpected registry format for "${name}"`);
  }

  return result.data;
}

/** Wrap a string in a standard MCP text content response. */
export function textResponse(text: string): {
  content: Array<{ type: 'text'; text: string }>;
} {
  return { content: [{ type: 'text', text }] };
}

/** Wrap an error in a standard MCP error response. */
export function errorResponse(error: unknown): {
  content: Array<{ type: 'text'; text: string }>;
  isError: true;
} {
  const message = error instanceof Error ? error.message : String(error);
  return {
    content: [{ type: 'text', text: `Error: ${message}` }],
    isError: true,
  };
}
