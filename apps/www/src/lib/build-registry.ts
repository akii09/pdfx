import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Registry, registryItemSchema, registrySchema } from '@pdfx/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SourceRegistryFile {
  path: string;
  type: string;
}

interface SourceRegistryItem {
  name: string;
  type: string;
  devDependencies?: string[];
  title: string;
  description: string;
  files: SourceRegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
  peerComponents?: string[];
}

async function fileExistsAsync(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Transforms component source code for registry distribution.
 *
 * Handles three file types emitted by the segregated component structure:
 *   - `.tsx`        component file
 *   - `.styles.ts`  StyleSheet factory (imports PdfxTheme from @pdfx/shared)
 *   - `.types.ts`   type/interface definitions (imports PDFComponentProps from @pdfx/shared)
 *
 * Transforms applied:
 * - Removes @pdfx/shared type imports (workspace-only package)
 * - Inlines PDFComponentProps as { style?, children } for .types.ts files
 * - For .tsx files: injects `type PdfxTheme = ReturnType<typeof usePdfxTheme>` after the
 *   pdfx-theme-context import line (the import is already present)
 * - For .styles.ts files: replaces the @pdfx/shared PdfxTheme import with a self-contained
 *   usePdfxTheme import + ReturnType alias so the file is independent
 * - Normalizes theme & context import paths to '../lib/pdfx-theme[-context]'
 * - Rewrites intra-component imports: `./X.styles` → `./pdfx-X.styles`, `./X.types` → `./pdfx-X.types`
 * - Rewrites cross-component type imports: `../foo/foo.types` → `../foo/pdfx-foo.types`
 * - Rewrites cross-component component imports: `../table` → `../table/pdfx-table`
 * - Inlines resolveColor helper and removes its import (avoids separate lib file)
 */
export function transformForRegistry(content: string): { content: string; usesTheme: boolean } {
  let result = content;
  const usesTheme = result.includes('pdfx-theme');

  // 1. Remove @pdfx/shared type-only imports
  result = result.replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"]@pdfx\/shared['"];?\n?/g, '');

  // 2. Inline PDFComponentProps for .types.ts files
  if (result.includes('PDFComponentProps')) {
    // `(?:<[^{]*>)?` captures optional generic params (e.g. `<T = Record<string,unknown>>`),
    // stopping at `{` so we never accidentally consume the interface body.

    // Handle `extends Omit<PDFComponentProps, 'children'> {}` (empty body)
    // `extends { style?: Style }` is not valid TS — inline the property instead.
    result = result.replace(
      /export\s+interface\s+(\w+(?:<[^{]*>)?)\s+extends\s+Omit<PDFComponentProps,\s*['"]children['"]\>\s*\{\s*\}/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n}'
    );
    // Handle `extends Omit<PDFComponentProps, 'children'> {` (non-empty body)
    result = result.replace(
      /export\s+interface\s+(\w+(?:<[^{]*>)?)\s+extends\s+Omit<PDFComponentProps,\s*['"]children['"]\>\s*\{/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;'
    );

    // Replace `extends PDFComponentProps {}` (empty body)
    result = result.replace(
      /export\s+interface\s+(\w+(?:<[^{]*>)?)\s+extends\s+PDFComponentProps\s*\{\s*\}/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Content to render */\n  children: React.ReactNode;\n}'
    );

    // Replace `extends PDFComponentProps {` (non-empty body)
    result = result.replace(
      /export\s+interface\s+(\w+(?:<[^{]*>)?)\s+extends\s+PDFComponentProps\s*\{/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Content to render */\n  children: React.ReactNode;'
    );

    // Inject Style import AFTER all replacements — only when Style is actually
    // used in the file body (avoids orphan imports when the interface name has
    // generics that previously defeated the regex).
    const bodyForStyleCheck = result.replace(/^import[^\n]*\n/gm, '');
    if (/\bStyle\b/.test(bodyForStyleCheck) && !result.includes("from '@react-pdf/types'")) {
      result = result.replace(
        /(import\s+.*from\s+['"][^'"]+['"];?\n)(?!import)/,
        "$1import type { Style } from '@react-pdf/types';\n"
      );
    }
  }

  // 3. PdfxTheme alias
  // Use a whole-word check so that 'usePdfxTheme' (which contains 'PdfxTheme'
  // as a substring) does NOT trigger injection in .tsx files.
  if (/(?<![a-zA-Z_$])PdfxTheme(?![a-zA-Z_$\d])/.test(result)) {
    if (result.includes('usePdfxTheme')) {
      // .tsx files: usePdfxTheme is already imported — inject ReturnType alias after that import
      result = result.replace(
        /(import\s+\{[^}]*usePdfxTheme[^}]*\}\s+from\s+['"][^'"]*pdfx-theme-context['"];?\n)/,
        '$1type PdfxTheme = ReturnType<typeof usePdfxTheme>;\n'
      );
    } else {
      // .styles.ts files: PdfxTheme came from @pdfx/shared (now removed) and there is no
      // usePdfxTheme import yet.  Add a minimal import + alias after the StyleSheet import.
      result = result.replace(
        /(import\s+\{[^}]*StyleSheet[^}]*\}\s+from\s+['"]@react-pdf\/renderer['"];?\n)/,
        "$1import { usePdfxTheme } from '../lib/pdfx-theme-context';\ntype PdfxTheme = ReturnType<typeof usePdfxTheme>;\n"
      );
    }
  }

  // 4. Normalize theme / context import paths
  // ../../lib/pdfx-theme  or  ./lib/pdfx-theme  →  ../lib/pdfx-theme
  result = result.replace(
    /from\s+['"](?:\.\.\/\.\.\/|\.\/?)lib\/pdfx-theme['"]/g,
    "from '../lib/pdfx-theme'"
  );
  // ../../lib/pdfx-theme-context  →  ../lib/pdfx-theme-context
  result = result.replace(
    /from\s+['"](?:\.\.\/\.\.\/|\.\/?)lib\/pdfx-theme-context['"]/g,
    "from '../lib/pdfx-theme-context'"
  );

  // 5. Rewrite intra-component companion file imports
  // ./X.styles  →  ./pdfx-X.styles   (component imports its styles file)
  result = result.replace(/from\s+['"]\.\/([^'"]+)\.styles['"]/g, "from './pdfx-$1.styles'");
  // ./X.types  →  ./pdfx-X.types   (component imports its types file)
  result = result.replace(/from\s+['"]\.\/([^'"]+)\.types['"]/g, "from './pdfx-$1.types'");

  // 6. Rewrite cross-component type imports
  // ../foo/foo.types  →  ../foo/pdfx-foo.types  (e.g. data-table.types imports TableVariant)
  result = result.replace(
    /from\s+['"]\.\.\/([^/'"]+)\/\1\.types['"]/g,
    "from '../$1/pdfx-$1.types'"
  );

  // 7. data-table: rewrite table component import
  // ../table  or  ./table  →  ../table/pdfx-table
  result = result.replace(/from\s+['"](?:\.\.\/|\.\/)table['"]/g, "from '../table/pdfx-table'");

  // 8. Inline resolveColor
  const resolveColorInline = `const THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;
function resolveColor(value: string, colors: Record<string, string>): string {
  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;
}
`;
  if (result.includes('resolve-color')) {
    // Remove the import
    result = result.replace(
      /import\s+\{[^}]*resolveColor[^}]*\}\s+from\s+['"](?:\.\.\/\.\.\/|\.\/?)lib\/resolve-color(?:\.js)?['"];?\n?/g,
      ''
    );
    // Inject before the first exported component function.
    // In the segregated structure createXStyles is in .styles.ts, so the .tsx file's first
    // statement after imports is `export function ComponentName`.
    // Fall back to the old anchor (function createXStyles) for any legacy single-file components.
    if (result.includes('\nfunction create') && result.match(/\nfunction create\w+Styles/)) {
      result = result.replace(/(\n)(function create\w+Styles)/, `$1${resolveColorInline}$2`);
    } else {
      result = result.replace(
        /\nexport function (?=\w)/,
        `\n${resolveColorInline}\nexport function `
      );
    }
  }

  return { content: result, usesTheme };
}

async function processItem(
  item: SourceRegistryItem,
  registryBaseDir: string,
  outputDir: string
): Promise<void> {
  console.log(`Processing ${item.name}...`);

  let itemUsesTheme = false;

  const fileResults = await Promise.all(
    item.files.map(async (file) => {
      // Source files are in src/registry/components/<component>/ and referenced by relative path.
      // We resolve from the registry base dir. The ensureWithinDir check is used for output paths only.
      const filePath = path.resolve(registryBaseDir, file.path);

      if (!(await fileExistsAsync(filePath))) {
        throw new Error(`Missing source file: ${file.path}`);
      }

      const rawContent = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(filePath);

      const { content, usesTheme } = transformForRegistry(rawContent);
      if (usesTheme) itemUsesTheme = true;

      return {
        path: `components/pdfx/${item.name}/pdfx-${fileName}`,
        content,
        type: file.type,
      };
    })
  );

  const output: Record<string, unknown> = {
    $schema: 'https://pdfx.akashpise.dev/schema/registry-item.json',
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: fileResults,
    dependencies: item.dependencies || [],
  };

  if (item.devDependencies && item.devDependencies.length > 0) {
    output.devDependencies = item.devDependencies;
  }

  // Build registryDependencies: always include "theme" for theme-aware components
  // and preserve any component-to-component dependencies declared in index.json.
  const sourceDeps = item.registryDependencies ?? [];
  if (itemUsesTheme) {
    output.registryDependencies = ['theme', ...sourceDeps.filter((d) => d !== 'theme')];
  } else if (sourceDeps.length > 0) {
    output.registryDependencies = sourceDeps;
  }

  // Validate output against registryItemSchema before writing — catches silent
  // transform regressions that drop required fields.
  const validation = registryItemSchema.safeParse(output);
  if (!validation.success) {
    throw new Error(
      `Output schema validation failed for "${item.name}":\n${validation.error.message}`
    );
  }

  const outputPath = path.join(outputDir, `${item.name}.json`);
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));

  console.log(`  ${item.name}.json`);
}

/**
 * Maps @pdfx/components exported names (or friendly aliases) to their consumer
 * component folder names (used to build the pdfx-<folder> install path).
 *
 * Both canonical names AND common aliases are listed so that block source files
 * work regardless of which name they import. Aliases are remapped to canonical
 * export names at emit time via CANONICAL_EXPORT_BY_FOLDER below.
 */
const PDFX_UI_COMPONENT_MAP: Record<string, string> = {
  // Canonical component names (match actual export names in installed files)
  Badge: 'badge',
  Card: 'card',
  DataTable: 'data-table',
  Divider: 'divider',
  Heading: 'heading',
  KeepTogether: 'keep-together',
  KeyValue: 'key-value',
  Link: 'link',
  PdfAlert: 'alert',
  PdfGraph: 'graph',
  PdfImage: 'pdf-image',
  PdfList: 'list',
  PdfPageNumber: 'page-number',
  PdfQRCode: 'qrcode',
  PdfSignatureBlock: 'signature',
  PdfWatermark: 'watermark',
  PageBreak: 'page-break',
  PageFooter: 'page-footer',
  PageHeader: 'page-header',
  Section: 'section',
  Stack: 'stack',
  Table: 'table',
  TableBody: 'table',
  TableCell: 'table',
  TableFooter: 'table',
  TableHeader: 'table',
  TableRow: 'table',
  Text: 'text',
  // Friendly aliases — block sources or AI-generated code may use these shorter names.
  // They resolve to the same folder and are remapped to canonical names at emit time.
  Alert: 'alert',
  Graph: 'graph',
  List: 'list',
  PageNumber: 'page-number',
  QRCode: 'qrcode',
  QrCode: 'qrcode',
  Signature: 'signature',
  Watermark: 'watermark',
  // Theme context
  PdfxThemeContext: 'theme-context',
  PdfxThemeProvider: 'theme-context',
  usePdfxTheme: 'theme-context',
  useSafeMemo: 'theme-context',
};

/**
 * Canonical export name for each component folder.
 *
 * Only needed for folders where the real export name doesn't match the alias
 * that might appear in block source files (e.g. a block might import `Signature`
 * but the installed file exports `PdfSignatureBlock`).
 *
 * Key: folder name (value in PDFX_UI_COMPONENT_MAP)
 * Value: the exact name exported by that component's file
 */
const CANONICAL_EXPORT_BY_FOLDER: Record<string, string> = {
  alert: 'PdfAlert',
  graph: 'PdfGraph',
  list: 'PdfList',
  'page-number': 'PdfPageNumber',
  qrcode: 'PdfQRCode',
  signature: 'PdfSignatureBlock',
  watermark: 'PdfWatermark',
};

/**
 * Transforms a block source file for consumer distribution.
 *
 * Block source files use workspace imports (`@pdfx/components`, `@pdfx/shared`) so they
 * resolve in the monorepo and can be type-checked and linted. This function
 * rewrites those imports to consumer-relative paths so installed blocks work
 * without any workspace packages.
 *
 * Transforms:
 * - `from '@pdfx/shared'` (PdfxTheme type) → `from '../../lib/pdfx-theme'`
 * - `from '@pdfx/components'` → split into per-component imports:
 *     theme context exports  → `from '../../lib/pdfx-theme-context'`
 *     component exports      → `from '../../components/pdfx/<name>/pdfx-<name>'`
 *       (components sharing a file, e.g. Table/TableRow/TableCell, are merged into one import)
 */
export function transformBlockForRegistry(content: string): string {
  let result = content;

  // 1. @pdfx/shared → ../../lib/pdfx-theme
  result = result.replace(
    /import\s+type\s+\{([^}]+)\}\s+from\s+'@pdfx\/shared';?/g,
    "import type {$1} from '../../lib/pdfx-theme';"
  );

  // 2. @pdfx/components → per-component consumer paths
  const uiImportMatch = result.match(
    /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+'@pdfx\/components';?/
  );

  if (uiImportMatch) {
    const rawNames = uiImportMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Separate theme context names from component names
    const themeContextNames: string[] = [];
    // Map: folder → [export names]
    const componentGroups: Record<string, string[]> = {};

    for (const name of rawNames) {
      const folder = PDFX_UI_COMPONENT_MAP[name];
      if (!folder) {
        console.warn(`  Warning: unknown @pdfx/components export "${name}" — skipping`);
        continue;
      }
      if (folder === 'theme-context') {
        themeContextNames.push(name);
      } else {
        if (!componentGroups[folder]) componentGroups[folder] = [];
        componentGroups[folder].push(name);
      }
    }

    const newImports: string[] = [];

    if (themeContextNames.length > 0) {
      newImports.push(
        `import { ${themeContextNames.join(', ')} } from '../../lib/pdfx-theme-context';`
      );
    }

    for (const [folder, names] of Object.entries(componentGroups).sort()) {
      // Remap any alias names to their canonical export name, then deduplicate.
      // Example: both 'Signature' and 'PdfSignatureBlock' in the same import get
      // collapsed into a single 'PdfSignatureBlock' import.
      const canonicalNames = [
        ...new Set(names.map((n) => CANONICAL_EXPORT_BY_FOLDER[folder] ?? n)),
      ];
      newImports.push(
        `import { ${canonicalNames.join(', ')} } from '../../components/pdfx/${folder}/pdfx-${folder}';`
      );
    }

    result = result.replace(
      /import\s+(?:type\s+)?\{[^}]+\}\s+from\s+'@pdfx\/components';?\n?/,
      `${newImports.join('\n')}\n`
    );
  }

  return result;
}

/**
 * Builds a block registry item from real source .tsx/.ts files.
 *
 * Block source files use workspace imports (@pdfx/components, @pdfx/shared) that
 * resolve in the monorepo. transformBlockForRegistry rewrites those to
 * consumer-relative paths before packaging into public/r/blocks/*.json.
 */
async function processBlockItem(
  item: SourceRegistryItem,
  registryBaseDir: string,
  outputDir: string
): Promise<void> {
  console.log(`Processing block ${item.name}...`);

  const files = await Promise.all(
    item.files.map(async (file) => {
      const filePath = path.resolve(registryBaseDir, file.path);

      if (!(await fileExistsAsync(filePath))) {
        throw new Error(`Missing block source file: ${file.path}`);
      }

      const rawContent = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(file.path);

      // Only transform .tsx files — .types.ts files have no workspace imports
      const content = fileName.endsWith('.tsx')
        ? transformBlockForRegistry(rawContent)
        : rawContent;

      return {
        path: `templates/pdfx/${item.name}/${fileName}`,
        content,
        type: 'registry:file' as const,
      };
    })
  );

  const output: Record<string, unknown> = {
    $schema: 'https://pdfx.akashpise.dev/schema/registry-item.json',
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files,
    dependencies: item.dependencies ?? [],
  };

  if (item.devDependencies && item.devDependencies.length > 0) {
    output.devDependencies = item.devDependencies;
  }

  if (item.peerComponents && item.peerComponents.length > 0) {
    output.peerComponents = item.peerComponents;
  }

  const blockOutputDir = path.join(outputDir, 'blocks');
  await fs.mkdir(blockOutputDir, { recursive: true });

  const outputPath = path.join(blockOutputDir, `${item.name}.json`);
  await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);

  console.log(`  ${item.name}.json (block)`);
}

async function buildRegistry() {
  console.log('Building registry...\n');

  const registryPath = path.join(__dirname, '../registry/index.json');

  if (!(await fileExistsAsync(registryPath))) {
    throw new Error(`Registry index not found at ${registryPath}`);
  }

  let registry: Registry;
  try {
    const raw = await fs.readFile(registryPath, 'utf-8');
    const result = registrySchema.safeParse(JSON.parse(raw));
    if (!result.success) {
      throw new Error(`Invalid registry schema: ${result.error.message}`);
    }
    registry = result.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse registry index: ${message}`);
  }

  if (!Array.isArray(registry.items)) {
    throw new Error('Invalid registry: missing "items" array');
  }

  const outputDir = path.join(__dirname, '../../public/r');
  await fs.mkdir(outputDir, { recursive: true });

  // Use registry dir as base for relative paths to resolve source files
  // (e.g., src/registry/components/badge/badge.tsx) to absolute paths.
  const registryBaseDir = path.dirname(registryPath);

  // Separate block items (source .tsx → generated JSON) from component items (source → transform)
  const componentItems = registry.items.filter((item) => item.type !== 'registry:block');
  const blockItems = registry.items.filter((item) => item.type === 'registry:block');

  // Process component items in parallel
  const componentResults = await Promise.allSettled(
    componentItems.map((item) => processItem(item, registryBaseDir, outputDir))
  );

  const componentFailures = componentResults.filter(
    (r): r is PromiseRejectedResult => r.status === 'rejected'
  );

  if (componentFailures.length > 0) {
    const messages = componentFailures.map((f) => String(f.reason)).join('\n  ');
    throw new Error(`Registry build had failures:\n  ${messages}`);
  }

  // Process block items from source .tsx/.ts files — generates public/r/blocks/*.json
  const blockResults = await Promise.allSettled(
    blockItems.map((item) => processBlockItem(item, registryBaseDir, outputDir))
  );

  const blockFailures = blockResults.filter(
    (r): r is PromiseRejectedResult => r.status === 'rejected'
  );

  if (blockFailures.length > 0) {
    const messages = blockFailures.map((f) => String(f.reason)).join('\n  ');
    throw new Error(`Registry build had failures:\n  ${messages}`);
  }

  const indexOutputPath = path.join(outputDir, 'index.json');
  await fs.writeFile(indexOutputPath, JSON.stringify(registry, null, 2));
  console.log('  index.json');

  console.log(`\nRegistry built successfully! Output: ${outputDir}\n`);
}

// Only run when executed directly (not when imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildRegistry().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Registry build failed:', message);
    process.exit(1);
  });
}
