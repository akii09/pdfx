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

function docsUrlFor(item: PdfxRegistryItem, kind: 'component' | 'block' | 'lib'): string {
  if (kind === 'lib') return `${SITE_URL}/installation#theming`;
  if (kind === 'block') {
    return item.name.startsWith('report-')
      ? `${SITE_URL}/blocks/reports`
      : `${SITE_URL}/blocks/invoices`;
  }
  return `${SITE_URL}/components/${item.name}`;
}

function categoriesFor(kind: 'component' | 'block' | 'lib', name: string): string[] {
  if (kind === 'lib') return ['theme'];
  if (kind === 'block') {
    return name.startsWith('report-') ? ['pdf', 'report'] : ['pdf', 'invoice'];
  }
  return ['pdf'];
}

export function toShadcnComponentItem(item: PdfxRegistryItem): ShadcnRegistryItem {
  const registryDependencies = unique(
    (item.registryDependencies ?? []).map(toShadcnRegistryDependency)
  );

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
    ...(item.devDependencies && item.devDependencies.length > 0
      ? { devDependencies: item.devDependencies }
      : {}),
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
  return /from\s+['"]\.\.\/\.\.\/components\/pdfx\/([a-z0-9-]+)\//g;
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
    ...(item.devDependencies && item.devDependencies.length > 0
      ? { devDependencies: item.devDependencies }
      : {}),
    ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
    files: item.files.map((file) => {
      const fileName = file.path.split('/').pop() ?? file.path;
      const target = `src/blocks/pdfx/${item.name}/${fileName}`;
      return {
        path: file.path,
        type: file.type,
        target,
        content: file.content,
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
      if (file.type === 'registry:file' && !file.target) {
        throw new Error(`shadcn item "${item.name}" registry:file is missing target`);
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

  const catalog = buildShadcnCatalog(items);
  for (const catalogItem of catalog.items) {
    for (const file of catalogItem.files) {
      if ('content' in file && file.content !== undefined) {
        throw new Error(`shadcn catalog item "${catalogItem.name}" must not include file content`);
      }
    }
  }
}
