import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Registry, registrySchema } from '@pdfx/shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 * - Inlines the PDFComponentProps interface
 * - Strips PdfxTheme type annotation (uses structural typing)
 * - Normalizes theme import path to '../lib/pdfx-theme'
 * - Adds @react-pdf/types import for Style type
 */
function transformForRegistry(content: string): { content: string; usesTheme: boolean } {
  let result = content;
  const usesTheme = result.includes('pdfx-theme');

  // Remove @pdfx/shared type-only imports
  result = result.replace(/import\s+type\s+\{[^}]*\}\s+from\s+['"]@pdfx\/shared['"];?\n?/g, '');
  result = result.replace(/extends PDFComponentProps\s*\{\s*\}/g, '...');
  result = result.replace(/\(t:\s*PdfxTheme\)/g, '(t: any)');

  // If the component extended PDFComponentProps, replace with an inline interface
  // using @react-pdf/types Style
  if (result.includes('extends PDFComponentProps')) {
    // Add Style import from @react-pdf/types if not already present
    if (!result.includes("from '@react-pdf/types'")) {
      // Insert after the last import statement
      result = result.replace(
        /(import\s+.*from\s+['"][^'"]+['"];?\n)(?!import)/,
        "$1import type { Style } from '@react-pdf/types';\n"
      );
    }

    // Replace `extends PDFComponentProps {}` (empty body) with inlined props
    result = result.replace(
      /export\s+interface\s+(\w+)\s+extends\s+PDFComponentProps\s*\{\s*\}/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Text content to render */\n  children: React.ReactNode;\n}'
    );

    // Replace `extends PDFComponentProps {` (non-empty body) with inlined props
    result = result.replace(
      /export\s+interface\s+(\w+)\s+extends\s+PDFComponentProps\s*\{/g,
      'export interface $1 {\n  /** Custom styles to merge with component defaults */\n  style?: Style;\n  /** Text content to render */\n  children: React.ReactNode;'
    );
  }

  // Strip PdfxTheme type annotation — use structural typing for self-contained components
  result = result.replace(/\(t:\s*PdfxTheme\)/g, '(t: any)');

  // Normalize theme import: ./lib/pdfx-theme → ../lib/pdfx-theme
  // (source files import from ./lib/pdfx-theme relative to packages/ui/src,
  //  but distributed components live in components/pdfx/ so they need ../lib/pdfx-theme)
  result = result.replace(/from\s+['"]\.\/lib\/pdfx-theme['"]/g, "from '../lib/pdfx-theme'");

  return { content: result, usesTheme };
}

async function processItem(
  item: RegistryItem,
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
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
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
