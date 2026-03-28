import dedent from 'dedent';
import { z } from 'zod';
import { BLOCKS_BASE, fetchRegistryIndex, fetchRegistryItem, textResponse } from '../utils.js';

export const listBlocksSchema = z.object({});

export async function listBlocks(): Promise<ReturnType<typeof textResponse>> {
  const items = await fetchRegistryIndex();
  const blocks = items.filter((i) => i.type === 'registry:block');

  const invoices = blocks.filter((b) => b.name.startsWith('invoice-'));
  const reports = blocks.filter((b) => b.name.startsWith('report-'));
  const others = blocks.filter(
    (b) => !b.name.startsWith('invoice-') && !b.name.startsWith('report-')
  );

  const formatBlock = (b: (typeof blocks)[number]) => {
    const peers = b.peerComponents?.length ? ` _(requires: ${b.peerComponents.join(', ')})_` : '';
    return `- **${b.name}** — ${b.description ?? 'No description'}${peers}`;
  };

  const sections: string[] = [];
  if (invoices.length > 0) {
    sections.push(
      `### Invoice Blocks (${invoices.length})\n${invoices.map(formatBlock).join('\n')}`
    );
  }
  if (reports.length > 0) {
    sections.push(`### Report Blocks (${reports.length})\n${reports.map(formatBlock).join('\n')}`);
  }
  if (others.length > 0) {
    sections.push(`### Other Blocks (${others.length})\n${others.map(formatBlock).join('\n')}`);
  }

  return textResponse(dedent`
    # PDFx Blocks (${blocks.length})

    Blocks are complete, copy-paste ready document layouts. Unlike components, they are full documents ready to customize.

    ${sections.join('\n\n')}

    ---
    Add a block: \`npx pdfx-cli block add <name>\`
    See full source: call \`get_block\` with the block name
  `);
}

export const getBlockSchema = z.object({
  block: z.string().min(1).describe("Block name, e.g. 'invoice-modern', 'report-financial'"),
});

export async function getBlock(
  args: z.infer<typeof getBlockSchema>
): Promise<ReturnType<typeof textResponse>> {
  const item = await fetchRegistryItem(args.block, BLOCKS_BASE);

  const fileList = item.files.map((f) => `- \`${f.path}\``).join('\n');
  const peers = item.peerComponents?.length ? item.peerComponents.join(', ') : 'none';

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

    ## Required PDFx Components
    ${peers}

    ## Add Command
    \`\`\`bash
    npx pdfx-cli block add ${args.block}
    \`\`\`

    ## Source Code
    ${fileSources}
  `);
}
