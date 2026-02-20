import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Registry, registrySchema } from '@pdfx/shared';

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
 * - Removes @pdfx/shared type imports (workspace-only package)
 * - Inlines the PDFComponentProps interface with style and children
 * - Strips PdfxTheme type annotation (uses structural typing)
 * - Normalizes theme import path to '../lib/pdfx-theme'
 * - Adds @react-pdf/types import for Style type
 */
function transformForRegistry(content: string): { content: string; usesTheme: boolean } {
  let result = content;
  const usesTheme = result.includes('pdfx-theme');

  // Remove @pdfx/shared type-only imports
  result = result.replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"]@pdfx\/shared['"];?\n?/g, '');

  // Handle PDFComponentProps: inline the interface with both style and children
  if (result.includes('PDFComponentProps')) {
    // Add Style import from @react-pdf/types if not already present
    if (!result.includes("from '@react-pdf/types'")) {
      result = result.replace(
        /(import\s+.*from\s+['"][^'"]+['"];?\n)(?!import)/,
        "$1import type { Style } from '@react-pdf/types';\n"
      );
    }

    // Handle Omit<PDFComponentProps, 'children'> (e.g., Divider, PageBreak)
    result = result.replace(
      /extends\s+Omit<PDFComponentProps,\s*['"]children['"]>/g,
      'extends { style?: Style }'
    );

    // Replace `extends PDFComponentProps {}` (empty body) with inlined props
    result = result.replace(
      /export\s+interface\s+(\w+)\s+extends\s+PDFComponentProps\s*\{\s*\}/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Content to render */\n  children: React.ReactNode;\n}'
    );

    // Replace `extends PDFComponentProps {` (non-empty body) with inlined props
    result = result.replace(
      /export\s+interface\s+(\w+)\s+extends\s+PDFComponentProps\s*\{/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Content to render */\n  children: React.ReactNode;'
    );
  }

  // Strip PdfxTheme type annotation — use structural typing for self-contained components
  result = result.replace(/\(t:\s*PdfxTheme\)/g, '(t: any)');

  // Normalize theme import: ../../lib/pdfx-theme or ./lib/pdfx-theme → ../lib/pdfx-theme
  result = result.replace(
    /from\s+['"](?:\.\.\/\.\.\/|\.\/?)lib\/pdfx-theme['"]/g,
    "from '../lib/pdfx-theme'"
  );

  // For data-table: table is emitted as pdfx-table.tsx, so fix the import path
  // Handles both '../table' (subdirectory layout) and './table' (flat layout)
  result = result.replace(/from\s+['"](?:\.\.\/|\.\/)table['"]/g, "from './pdfx-table'");

  // Inline resolveColor and remove the import (avoids separate lib file in distributed components)
  const resolveColorInline = `const THEME_COLOR_KEYS = ['foreground','muted','mutedForeground','primary','primaryForeground','accent','destructive','success','warning','info'] as const;
function resolveColor(value: string, colors: Record<string, string>): string {
  return THEME_COLOR_KEYS.includes(value as (typeof THEME_COLOR_KEYS)[number]) ? colors[value] : value;
}
`;
  if (result.includes('resolve-color')) {
    // Handle both ../../lib/resolve-color.js (subdirectory) and ./lib/resolve-color.js (flat)
    result = result.replace(
      /import\s+\{[^}]*resolveColor[^}]*\}\s+from\s+['"](?:\.\.\/\.\.\/|\.\/?)lib\/resolve-color\.js['"];?\n?/g,
      ''
    );
    result = result.replace(/(\n)(function create\w+Styles)/, `$1${resolveColorInline}$2`);
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
        path: `components/pdfx/pdfx-${fileName}`,
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

  // Add registryDependencies for theme-aware components
  if (itemUsesTheme) {
    output.registryDependencies = ['theme'];
  }

  const outputPath = path.join(outputDir, `${item.name}.json`);
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2));

  console.log(`  ${item.name}.json`);
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

  // Process all items in parallel
  const results = await Promise.allSettled(
    registry.items.map((item) => processItem(item, registryBaseDir, outputDir))
  );

  const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');

  if (failures.length > 0) {
    const messages = failures.map((f) => String(f.reason)).join('\n  ');
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
