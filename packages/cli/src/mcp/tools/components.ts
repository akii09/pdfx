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
    Add a component: \`npx @akii09/pdfx-cli add <name>\`
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
  // what to import after running `npx @akii09/pdfx-cli@latest add`.
  const primaryContent = item.files[0]?.content ?? '';
  const primaryPath = item.files[0]?.path ?? '';
  const exportNames = extractAllExportNames(primaryContent);
  const mainExport = extractExportName(primaryContent);

  const exportSection =
    exportNames.length > 0
      ? dedent`
          ## Exports
          **Main component export:** \`${mainExport ?? exportNames[0]}\`

          All named exports from \`${primaryPath}\`:
          ${exportNames.map((n) => `- \`${n}\``).join('\n')}

          **Import after \`npx @akii09/pdfx-cli@latest add ${args.component}\`:**
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
    npx @akii09/pdfx-cli add ${args.component}
    \`\`\`

    ## Source Code
    ${fileSources}
  `);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extracts the primary exported component function/const name from source.
 * Returns the first PascalCase `export function` or `export const` declaration.
 */
function extractExportName(source?: string): string | null {
  if (!source) return null;

  // Match: export function FooBar(  OR  export const FooBar =
  const matches = [...source.matchAll(/export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g)];
  if (matches.length === 0) return null;

  // Return the first PascalCase export — that's the component
  return matches[0][1] ?? null;
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
