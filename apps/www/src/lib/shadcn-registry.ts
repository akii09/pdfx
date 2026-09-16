import { SHADCN_REGISTRY_NAMESPACE, SITE_URL } from '../constants/site.js';

const SHADCN_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';
const SHADCN_REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry.json';
const SHADCN_AUTHOR = 'akii09 <https://github.com/akii09>';

export interface PdfxRegistryFile {
  path: string;
  content: string;
  type: string;
}

export interface PdfxRegistryItem {
  $schema?: string;
  name: string;
  type?: string;
  title?: string;
  description?: string;
  files: PdfxRegistryFile[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  peerComponents?: string[];
}

export interface ShadcnRegistryFile {
  path: string;
  type: string;
  target: string;
  content?: string;
}

export interface ShadcnRegistryItem {
  $schema: string;
  name: string;
  type: string;
  title: string;
  description: string;
  author: string;
  docs: string;
  categories: string[];
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: ShadcnRegistryFile[];
}

export interface ShadcnCatalog {
  $schema: string;
  name: string;
  homepage: string;
  items: Array<
    Omit<ShadcnRegistryItem, '$schema' | 'files'> & { files: Omit<ShadcnRegistryFile, 'content'>[] }
  >;
}

/**
 * pdfx-cli item JSON uses `../lib/pdfx-theme` as a placeholder; the CLI rewrites
 * it at install time. shadcn has no rewrite step, so emit the real path from
 * `src/components/pdfx/<name>/` → `src/lib/`.
 */
export function rewriteThemeImportsForShadcn(content: string): string {
  return content.replace(
    /from\s+(['"])\.\.\/lib\/(pdfx-theme(?:-context)?)\1/g,
    "from '../../../lib/$2'"
  );
}

/** Map a pdfx-cli registryDependency / peerComponent onto an `@pdfx/…` address. */
export function toShadcnRegistryDependency(dep: string): string {
  if (dep.startsWith('http://') || dep.startsWith('https://') || dep.startsWith('@')) {
    return dep;
  }
  return `${SHADCN_REGISTRY_NAMESPACE}/${dep}`;
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

interface BlockFamily {
  /** Docs route on the site, e.g. `/blocks/invoices`. */
  docsPath: string;
  /** shadcn `categories`, after the shared `pdf` entry. */
  category: string;
}

const BLOCK_FAMILIES: Record<string, BlockFamily> = {
  invoice: { docsPath: '/blocks/invoices', category: 'invoice' },
  report: { docsPath: '/blocks/reports', category: 'report' },
};

/**
 * Block name → family. Explicit rather than a prefix test so a block that is
 * neither an invoice nor a report fails the build instead of silently
 * inheriting the invoice docs link and category.
 */
const BLOCK_FAMILY_BY_NAME: Record<string, keyof typeof BLOCK_FAMILIES> = {
  'invoice-classic': 'invoice',
  'invoice-consultant': 'invoice',
  'invoice-corporate': 'invoice',
  'invoice-creative': 'invoice',
  'invoice-minimal': 'invoice',
  'invoice-modern': 'invoice',
  'report-financial': 'report',
  'report-marketing': 'report',
  'report-operations': 'report',
  'report-security': 'report',
};

function blockFamily(name: string): BlockFamily {
  const key = BLOCK_FAMILY_BY_NAME[name];
  const family = key ? BLOCK_FAMILIES[key] : undefined;
  if (!family) {
    throw new Error(
      `shadcn registry: block "${name}" has no family. Add it to BLOCK_FAMILY_BY_NAME in apps/www/src/lib/shadcn-registry.ts so it gets the right docs link and categories.`
    );
  }
  return family;
}

function docsUrlFor(item: PdfxRegistryItem, kind: 'component' | 'block' | 'lib'): string {
  if (kind === 'lib') return `${SITE_URL}/installation#theming`;
  if (kind === 'block') return `${SITE_URL}${blockFamily(item.name).docsPath}`;
  return `${SITE_URL}/components/${item.name}`;
}

function categoriesFor(kind: 'component' | 'block' | 'lib', name: string): string[] {
  if (kind === 'lib') return ['theme'];
  if (kind === 'block') return ['pdf', blockFamily(name).category];
  return ['pdf'];
}

function shadcnDevDependencies(item: PdfxRegistryItem): string[] | undefined {
  const extras = item.files.some((file) => /from\s+['"]@react-pdf\/types['"]/.test(file.content))
    ? ['@react-pdf/types']
    : [];
  const deps = unique([...(item.devDependencies ?? []), ...extras]);
  return deps.length > 0 ? deps : undefined;
}

/** pdfx-cli rewrites these at install time; shadcn does not. */
export function rewriteBlockImportsForShadcn(content: string): string {
  return content.replace(/from\s+(['"])\.\.\/\.\.\/(lib|components)\//g, 'from $1../../../$2/');
}

export function toShadcnComponentItem(item: PdfxRegistryItem): ShadcnRegistryItem {
  const registryDependencies = unique(
    (item.registryDependencies ?? []).map(toShadcnRegistryDependency)
  );
  const devDependencies = shadcnDevDependencies(item);

  return {
    $schema: SHADCN_ITEM_SCHEMA,
    name: item.name,
    type: item.type ?? 'registry:ui',
    title: item.title ?? item.name,
    description: item.description ?? '',
    author: SHADCN_AUTHOR,
    docs: docsUrlFor(item, 'component'),
    categories: categoriesFor('component', item.name),
    dependencies: item.dependencies ?? [],
    ...(devDependencies ? { devDependencies } : {}),
    ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
    files: item.files.map((file) => ({
      path: file.path,
      type: file.type,
      target: `src/${file.path}`,
      content: rewriteThemeImportsForShadcn(file.content),
    })),
  };
}

/** Fresh regex each call — `/g` patterns are stateful via `lastIndex`. */
function blockComponentImportPattern(): RegExp {
  return /from\s+['"](?:\.\.\/)+components\/pdfx\/([a-z0-9-]+)\//g;
}

function blockComponentImports(item: PdfxRegistryItem): string[] {
  const names = new Set<string>();
  for (const file of item.files) {
    for (const match of file.content.matchAll(blockComponentImportPattern())) {
      const name = match[1];
      if (name) names.add(name);
    }
  }
  return [...names];
}

export function toShadcnBlockItem(item: PdfxRegistryItem): ShadcnRegistryItem {
  const fromPeers = (item.peerComponents ?? []).map(toShadcnRegistryDependency);
  const fromDeclared = (item.registryDependencies ?? []).map(toShadcnRegistryDependency);
  const fromImports = blockComponentImports(item).map(toShadcnRegistryDependency);
  const usesTheme = item.files.some((file) => file.content.includes('pdfx-theme'));
  const registryDependencies = unique([
    ...fromDeclared,
    ...fromPeers,
    ...fromImports,
    ...(usesTheme ? [`${SHADCN_REGISTRY_NAMESPACE}/theme`] : []),
  ]);
  const devDependencies = shadcnDevDependencies(item);

  return {
    $schema: SHADCN_ITEM_SCHEMA,
    name: item.name,
    type: 'registry:block',
    title: item.title ?? item.name,
    description: item.description ?? '',
    author: SHADCN_AUTHOR,
    docs: docsUrlFor(item, 'block'),
    categories: categoriesFor('block', item.name),
    dependencies: item.dependencies ?? [],
    ...(devDependencies ? { devDependencies } : {}),
    ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
    files: item.files.map((file) => {
      const fileName = file.path.split('/').pop() ?? file.path;
      const target = `src/blocks/pdfx/${item.name}/${fileName}`;
      return {
        path: file.path,
        type: file.type,
        target,
        content: rewriteBlockImportsForShadcn(file.content),
      };
    }),
  };
}

export function createShadcnThemeItem(
  themeFile: string,
  themeContextFile: string
): ShadcnRegistryItem {
  return {
    $schema: SHADCN_ITEM_SCHEMA,
    name: 'theme',
    type: 'registry:lib',
    title: 'PDFx Theme',
    description: 'Theme tokens and React context used by every PDFx component.',
    author: SHADCN_AUTHOR,
    docs: docsUrlFor({ name: 'theme', files: [] }, 'lib'),
    categories: categoriesFor('lib', 'theme'),
    dependencies: [],
    files: [
      {
        path: 'lib/pdfx-theme.ts',
        type: 'registry:lib',
        target: 'src/lib/pdfx-theme.ts',
        content: themeFile,
      },
      {
        path: 'lib/pdfx-theme-context.tsx',
        type: 'registry:lib',
        target: 'src/lib/pdfx-theme-context.tsx',
        content: themeContextFile,
      },
    ],
  };
}

export function toShadcnCatalogItem(item: ShadcnRegistryItem): ShadcnCatalog['items'][number] {
  const { $schema: _schema, files, ...rest } = item;
  return {
    ...rest,
    files: files.map(({ content: _content, ...file }) => file),
  };
}

export function buildShadcnCatalog(items: ShadcnRegistryItem[]): ShadcnCatalog {
  return {
    $schema: SHADCN_REGISTRY_SCHEMA,
    name: 'pdfx',
    homepage: SITE_URL,
    items: items.map(toShadcnCatalogItem),
  };
}

export function buildShadcnRegistry(options: {
  components: PdfxRegistryItem[];
  blocks: PdfxRegistryItem[];
  themeFile: string;
  themeContextFile: string;
}): { catalog: ShadcnCatalog; items: ShadcnRegistryItem[] } {
  const items = [
    createShadcnThemeItem(options.themeFile, options.themeContextFile),
    ...options.components.map(toShadcnComponentItem),
    ...options.blocks.map(toShadcnBlockItem),
  ];

  assertShadcnRegistry(items);

  return {
    catalog: buildShadcnCatalog(items),
    items,
  };
}

/** Every relative `from '…'` specifier in an emitted file. */
function relativeImportPattern(): RegExp {
  return /from\s+['"](\.[^'"]*)['"]/g;
}

/**
 * Resolve `specifier` against `fromTarget`'s directory. Hand-rolled rather than
 * `node:path` so this module stays environment-agnostic — it is imported by the
 * build script and by Vitest, and targets are always POSIX-style.
 */
function resolveTarget(fromTarget: string, specifier: string): string {
  const segments = fromTarget.split('/').slice(0, -1);
  for (const segment of specifier.split('/')) {
    if (segment === '.' || segment === '') continue;
    if (segment === '..') segments.pop();
    else segments.push(segment);
  }
  return segments.join('/');
}

const SOURCE_EXTENSIONS = ['.tsx', '.ts'];

function stripExtension(target: string): string {
  const ext = SOURCE_EXTENSIONS.find((candidate) => target.endsWith(candidate));
  return ext ? target.slice(0, -ext.length) : target;
}

/**
 * The import rewrites are per-filename allow-lists, so a component that picks up
 * a new `../lib/*` import would otherwise ship a path one level short and only
 * fail after install. Resolve every relative import against the targets the
 * registry actually emits and fail the build instead.
 */
function assertImportsResolve(items: ShadcnRegistryItem[]): void {
  const emitted = new Set(
    items.flatMap((item) => item.files.map((file) => stripExtension(file.target)))
  );

  for (const item of items) {
    for (const file of item.files) {
      for (const match of (file.content ?? '').matchAll(relativeImportPattern())) {
        const specifier = match[1];
        if (!specifier) continue;
        const resolved = resolveTarget(file.target, specifier);
        if (!emitted.has(stripExtension(resolved))) {
          throw new Error(
            `shadcn item "${item.name}" file "${file.target}" imports "${specifier}" (resolves to "${resolved}"), which no registry item emits`
          );
        }
      }
    }
  }
}

/** Fail the registry build if the shadcn tree would be uninstallable. */
export function assertShadcnRegistry(items: ShadcnRegistryItem[]): void {
  const names = items.map((item) => item.name);
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicates.length > 0) {
    throw new Error(
      `shadcn registry has duplicate item names: ${[...new Set(duplicates)].join(', ')}`
    );
  }

  const nameSet = new Set(names);
  const prefix = `${SHADCN_REGISTRY_NAMESPACE}/`;

  for (const item of items) {
    if (item.files.length === 0) {
      throw new Error(`shadcn item "${item.name}" has no files`);
    }

    for (const file of item.files) {
      if (!file.target) {
        throw new Error(`shadcn item "${item.name}" file "${file.path}" is missing target`);
      }
      if (!file.content || file.content.length === 0) {
        throw new Error(`shadcn item "${item.name}" file "${file.path}" is missing content`);
      }
    }

    for (const dep of item.registryDependencies ?? []) {
      if (!dep.startsWith(prefix)) continue;
      const depName = dep.slice(prefix.length);
      if (!nameSet.has(depName)) {
        throw new Error(
          `shadcn item "${item.name}" depends on "${dep}" but that item is not in the registry`
        );
      }
    }

    if (item.type === 'registry:block') {
      const deps = new Set(item.registryDependencies ?? []);
      const content = item.files.map((file) => file.content ?? '').join('\n');
      for (const match of content.matchAll(blockComponentImportPattern())) {
        const imported = match[1];
        if (!imported) continue;
        const dep = `${prefix}${imported}`;
        if (!deps.has(dep)) {
          throw new Error(
            `shadcn block "${item.name}" imports "${dep}" but that item is not in registryDependencies`
          );
        }
      }
    }
  }

  assertImportsResolve(items);

  const catalog = buildShadcnCatalog(items);
  for (const catalogItem of catalog.items) {
    for (const file of catalogItem.files) {
      if ('content' in file && file.content !== undefined) {
        throw new Error(`shadcn catalog item "${catalogItem.name}" must not include file content`);
      }
    }
  }
}
