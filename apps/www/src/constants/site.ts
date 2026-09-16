/** Canonical public origin. Do not add a trailing slash. */
export const SITE_URL = 'https://getpdfx.dev';

export const SITE_HOST = 'getpdfx.dev';

export const REGISTRY_ORIGIN = `${SITE_URL}/r`;

export const SCHEMA_REGISTRY_URL = `${SITE_URL}/schema/registry.json`;

export const SCHEMA_REGISTRY_ITEM_URL = `${SITE_URL}/schema/registry-item.json`;

/** shadcn CLI namespace. Always install as `@pdfx/<name>`, never a bare name. */
export const SHADCN_REGISTRY_NAMESPACE = '@pdfx';

/** Item URL template for `components.json` → `registries["@pdfx"]`. */
export const SHADCN_REGISTRY_URL = `${SITE_URL}/r/shadcn/{name}.json`;

/** Catalog URL for `npx shadcn@latest list` / `search`. */
export const SHADCN_REGISTRY_CATALOG_URL = `${SITE_URL}/r/shadcn/registry.json`;

export const SHADCN_REGISTRY_ADD_COMMAND = `npx shadcn@latest registry add ${SHADCN_REGISTRY_NAMESPACE}=${SHADCN_REGISTRY_URL}`;

export function shadcnAddCommand(name: string): string {
  return `npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/${name}`;
}
