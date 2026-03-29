import dedent from 'dedent';
import { z } from 'zod';
import { fetchRegistryIndex, fetchRegistryItem, textResponse } from '../utils.js';

export const listComponentsSchema = z.object({});

export async function listComponents(): Promise<ReturnType<typeof textResponse>> {
  const items = await fetchRegistryIndex();
  const components = items.filter((i) => i.type === 'registry:ui');

  const rows = components
    .map((c) => `- **${c.name}** — ${c.description ?? 'No description'}`)
    .join('\n');

  return textResponse(dedent`
    # PDFx Components (${components.length})

    ${rows}

    ---
    Add a component: \`npx pdfx-cli add <name>\`
    See full source, props, and exact export name: call \`get_component\` with the component name
  `);
}

export const getComponentSchema = z.object({
  component: z.string().min(1).describe("Component name, e.g. 'table', 'heading', 'data-table'"),
});

export async function getComponent(
  args: z.infer<typeof getComponentSchema>
): Promise<ReturnType<typeof textResponse>> {
  const item = await fetchRegistryItem(args.component);

  const fileList = item.files.map((f) => `- \`${f.path}\``).join('\n');
  const deps = item.dependencies?.length ? item.dependencies.join(', ') : 'none';
  const devDeps = item.devDependencies?.length ? item.devDependencies.join(', ') : 'none';
  const registryDeps = item.registryDependencies?.length
    ? item.registryDependencies.join(', ')
    : 'none';

  // Extract all named exports from the primary file so the AI knows exactly
  // what to import after running `npx pdfx-cli@latest add`.
  const primaryContent = item.files[0]?.content ?? '';
  const primaryPath = item.files[0]?.path ?? '';
  const exportNames = extractAllExportNames(primaryContent);
  const mainExport = extractExportName(primaryContent, args.component);

  const exportSection =
    exportNames.length > 0
      ? dedent`
          ## Exports
          **Main component export:** \`${mainExport ?? exportNames[0]}\`

          All named exports from \`${primaryPath}\`:
          ${exportNames.map((n) => `- \`${n}\``).join('\n')}

          **Import after \`npx pdfx-cli@latest add ${args.component}\`:**
          \`\`\`tsx
          import { ${mainExport ?? exportNames[0]} } from './components/pdfx/${args.component}/pdfx-${args.component}';
          \`\`\`
        `
      : '';

  const fileSources = item.files
    .map(
      (f) => dedent`
        ### \`${f.path}\`
        \`\`\`tsx
        ${f.content}
        \`\`\`
      `
    )
    .join('\n\n');

  return textResponse(dedent`
    # ${item.title ?? item.name}

    ${item.description ?? ''}

    ## Files
    ${fileList}

    ## Dependencies
    - Runtime: ${deps}
    - Dev: ${devDeps}
    - Other PDFx components required: ${registryDeps}

    ${exportSection}

    ## Add Command
    \`\`\`bash
    npx pdfx-cli add ${args.component}
    \`\`\`

    ## Source Code
    ${fileSources}
  `);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extracts the primary exported component function name from source.
 *
 * Strategy (in priority order):
 *  1. Exact match: an `export function` whose name lowercased equals the
 *     component name with hyphens removed  (e.g. "table" → "Table").
 *  2. Suffix match: an `export function` whose name ends with the normalised
 *     component name  (e.g. "graph" → "PdfGraph").
 *  3. First PascalCase `export function` — `export const` is intentionally
 *     excluded because non-component consts (e.g. `A4_WIDTH`, `GRAPH_SAFE_WIDTHS`)
 *     appear before the actual component function in several files and would
 *     otherwise be returned as the "main export".
 */
function extractExportName(source?: string, componentName?: string): string | null {
  if (!source) return null;

  // Only match `export function`, not `export const` — constants are not components.
  const matches = [...source.matchAll(/export\s+function\s+([A-Z][A-Za-z0-9]*)/g)];
  const names = matches.map((m) => m[1]).filter(Boolean) as string[];

  if (names.length === 0) return null;
  if (!componentName) return names[0];

  // Normalise: strip hyphens, lowercase  (e.g. "data-table" → "datatable")
  const norm = componentName.replace(/-/g, '').toLowerCase();

  // 1. Exact match  (e.g. "table" → "Table")
  const exact = names.find((n) => n.toLowerCase() === norm);
  if (exact) return exact;

  // 2. Suffix match  (e.g. "graph" → "PdfGraph", "alert" → "PdfAlert")
  const suffix = names.find((n) => n.toLowerCase().endsWith(norm));
  if (suffix) return suffix;

  // 3. First export function — best available fallback
  return names[0];
}

/**
 * Extracts ALL named exports from source that look like public API symbols
 * (PascalCase components, camelCase hooks, exported types/interfaces).
 */
function extractAllExportNames(source: string): string[] {
  const seen = new Set<string>();
  const results: string[] = [];

  // export function Foo / export const Foo / export class Foo
  for (const m of source.matchAll(/export\s+(?:function|const|class)\s+([A-Za-z][A-Za-z0-9]*)/g)) {
    const name = m[1];
    if (name && !seen.has(name)) {
      seen.add(name);
      results.push(name);
    }
  }

  // export { Foo, Bar } — named re-exports
  for (const m of source.matchAll(/export\s+\{([^}]+)\}/g)) {
    for (const part of m[1].split(',')) {
      const name = part
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (name && /^[A-Za-z]/.test(name) && !seen.has(name)) {
        seen.add(name);
        results.push(name);
      }
    }
  }

  return results;
}
