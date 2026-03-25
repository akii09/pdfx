import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Registry, registryItemSchema, registrySchema } from '@pdfx/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input types: what we read from registry/index.json (no content yet)
interface SourceRegistryFile {
  path: string;
  type: string;
}

interface SourceRegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: SourceRegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
  peerComponents?: string[];
}

// Output types: what we generate (with content)
interface RegistryFile {
  path: string;
  content: string;
  type: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}

// interface Registry {
//   $schema: string;
//   name: string;
//   homepage: string;
//   items: RegistryItem[];
// }

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
 * - Rewrites cross-component type imports: `../table/table.types` → `./pdfx-table.types`
 * - Rewrites data-table's table component import: `../table` → `./pdfx-table`
 * - Inlines resolveColor helper and removes its import (avoids separate lib file)
 */
function transformForRegistry(content: string): { content: string; usesTheme: boolean } {
  let result = content;
  const usesTheme = result.includes('pdfx-theme');

  // ── 1. Remove @pdfx/shared type-only imports ──────────────────────────────
  result = result.replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"]@pdfx\/shared['"];?\n?/g, '');

  // ── 2. Inline PDFComponentProps for .types.ts files ───────────────────────
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

  // ── 3. PdfxTheme alias ────────────────────────────────────────────────────
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

  // ── 4. Normalize theme / context import paths ─────────────────────────────
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

  // ── 5. Rewrite intra-component companion file imports ─────────────────────
  // ./X.styles  →  ./pdfx-X.styles   (component imports its styles file)
  result = result.replace(/from\s+['"]\.\/([^'"]+)\.styles['"]/g, "from './pdfx-$1.styles'");
  // ./X.types  →  ./pdfx-X.types   (component imports its types file)
  result = result.replace(/from\s+['"]\.\/([^'"]+)\.types['"]/g, "from './pdfx-$1.types'");

  // ── 6. Rewrite cross-component type imports ───────────────────────────────
  // ../foo/foo.types  →  ./pdfx-foo.types  (e.g. data-table.types imports TableVariant)
  result = result.replace(/from\s+['"]\.\.\/([^/'"]+)\/\1\.types['"]/g, "from './pdfx-$1.types'");

  // ── 7. data-table: rewrite table component import ─────────────────────────
  // ../table  or  ./table  →  ./pdfx-table
  result = result.replace(/from\s+['"](?:\.\.\/|\.\/)table['"]/g, "from './pdfx-table'");

  // ── 8. Inline resolveColor ────────────────────────────────────────────────
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
      // Source files may reference workspace packages via relative paths
      // (e.g., ../../../../packages/ui/src/heading.tsx), so we resolve from
      // the registry base dir without the traversal check. The ensureWithinDir
      // check is used for output paths only.
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
 * Maps @pdfx/ui exported names to their consumer component file paths.
 * Key: export name, Value: component folder name (used to build the pdfx- prefixed path).
 */
const PDFX_UI_COMPONENT_MAP: Record<string, string> = {
  // Components
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
  PdfWatermark: 'watermark',
  PageBreak: 'page-break',
  PageFooter: 'page-footer',
  PageHeader: 'page-header',
  Section: 'section',
  Signature: 'signature',
  Stack: 'stack',
  Table: 'table',
  TableBody: 'table',
  TableCell: 'table',
  TableHeader: 'table',
  TableRow: 'table',
  Text: 'text',
  // Theme context
  PdfxThemeContext: 'theme-context',
  PdfxThemeProvider: 'theme-context',
  usePdfxTheme: 'theme-context',
  useSafeMemo: 'theme-context',
};

/**
 * Transforms a block source file for consumer distribution.
 *
 * Block source files use workspace imports (`@pdfx/ui`, `@pdfx/shared`) so they
 * resolve in the monorepo and can be type-checked and linted. This function
 * rewrites those imports to consumer-relative paths so installed blocks work
 * without any workspace packages.
 *
 * Transforms:
 * - `from '@pdfx/shared'` (PdfxTheme type) → `from '../../lib/pdfx-theme'`
 * - `from '@pdfx/ui'` → split into per-component imports:
 *     theme context exports  → `from '../../lib/pdfx-theme-context'`
 *     component exports      → `from '../../components/pdfx/<name>/pdfx-<name>'`
 *       (components sharing a file, e.g. Table/TableRow/TableCell, are merged into one import)
 */
function transformBlockForRegistry(content: string): string {
  let result = content;

  // ── 1. @pdfx/shared → ../../lib/pdfx-theme ───────────────────────────────
  result = result.replace(
    /import\s+type\s+\{([^}]+)\}\s+from\s+'@pdfx\/shared';?/g,
    "import type {$1} from '../../lib/pdfx-theme';"
  );

  // ── 2. @pdfx/ui → per-component consumer paths ───────────────────────────
  const uiImportMatch = result.match(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+'@pdfx\/ui';?/);

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
        console.warn(`  Warning: unknown @pdfx/ui export "${name}" — skipping`);
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
      const importNames = names.join(', ');
      newImports.push(
        `import { ${importNames} } from '../../components/pdfx/${folder}/pdfx-${folder}';`
      );
    }

    result = result.replace(
      /import\s+(?:type\s+)?\{[^}]+\}\s+from\s+'@pdfx\/ui';?\n?/,
      `${newImports.join('\n')}\n`
    );
  }

  return result;
}

/**
 * Builds a block registry item from real source .tsx/.ts files.
 *
 * Block source files use workspace imports (@pdfx/ui, @pdfx/shared) that
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

  // Use registry dir as base for relative paths. Source files may reference
  // workspace packages (e.g., ../../../../packages/ui/src/heading.tsx), so we
  // resolve relative paths from the registry dir to get absolute paths.
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

buildRegistry().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Registry build failed:', message);
  process.exit(1);
});
