import dedent from 'dedent';
import { z } from 'zod';
import { fetchRegistryIndex, textResponse } from '../utils.js';

export const searchRegistrySchema = z.object({
  query: z
    .string()
    .min(1)
    .describe('Search query — matched against component name, title, and description'),
  type: z
    .enum(['all', 'component', 'block'])
    .optional()
    .default('all')
    .describe('Filter by item type (default: all)'),
  limit: z
    .number()
    .int()
    .positive()
    .max(50)
    .optional()
    .default(20)
    .describe('Maximum number of results to return (default: 20, max: 50)'),
});

export async function searchRegistry(
  args: z.infer<typeof searchRegistrySchema>
): Promise<ReturnType<typeof textResponse>> {
  const items = await fetchRegistryIndex();
  const q = args.query.toLowerCase();

  // Filter by type first
  let pool = items;
  if (args.type === 'component') {
    pool = items.filter((i) => i.type === 'registry:ui');
  } else if (args.type === 'block') {
    pool = items.filter((i) => i.type === 'registry:block');
  }

  // Score each item — exact name match ranks highest
  const scored = pool
    .map((item) => {
      const name = item.name.toLowerCase();
      const title = (item.title ?? '').toLowerCase();
      const desc = (item.description ?? '').toLowerCase();

      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80;
      else if (name.includes(q)) score = 60;
      else if (title.includes(q)) score = 40;
      else if (desc.includes(q)) score = 20;

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, args.limit);

  if (scored.length === 0) {
    return textResponse(dedent`
      # Search: "${args.query}"

      No results found. Try a broader query or browse all items:
      - \`list_components\` — see all 24 components
      - \`list_blocks\` — see all 10 blocks
    `);
  }

  const rows = scored.map(({ item }) => {
    const typeLabel = item.type === 'registry:ui' ? 'component' : 'block';
    const addCmd =
      item.type === 'registry:ui'
        ? `npx pdfx-cli add ${item.name}`
        : `npx pdfx-cli block add ${item.name}`;
    return dedent`
      - **${item.name}** _(${typeLabel})_ — ${item.description ?? 'No description'}
        \`${addCmd}\`
    `;
  });

  const typeLabel =
    args.type === 'all'
      ? 'components + blocks'
      : args.type === 'component'
        ? 'components'
        : 'blocks';

  return textResponse(dedent`
    # Search: "${args.query}" — ${scored.length} result${scored.length === 1 ? '' : 's'} (${typeLabel})

    ${rows.join('\n')}
  `);
}
