import dedent from 'dedent';
import { z } from 'zod';
import { textResponse } from '../utils.js';

export const getAddCommandSchema = z.object({
  items: z
    .array(z.string().min(1))
    .min(1)
    .describe(
      "Item names to add, e.g. ['table', 'heading'] for components or ['invoice-modern'] for blocks"
    ),
  type: z.enum(['component', 'block']).describe('Whether the items are components or blocks'),
});

export async function getAddCommand(
  args: z.infer<typeof getAddCommandSchema>
): Promise<ReturnType<typeof textResponse>> {
  const isBlock = args.type === 'block';
  const cmd = isBlock
    ? `npx pdfx-cli block add ${args.items.join(' ')}`
    : `npx pdfx-cli add ${args.items.join(' ')}`;

  const installDir = isBlock ? 'src/blocks/pdfx/' : 'src/components/pdfx/';
  const inspectTool = isBlock ? 'get_block' : 'get_component';
  const itemList = args.items.map((i) => `- \`${i}\``).join('\n');

  return textResponse(dedent`
    # Add Command

    \`\`\`bash
    ${cmd}
    \`\`\`

    **Items:**
    ${itemList}

    **What this does:**
    - Copies source files into \`${installDir}\`
    - You own the code — no runtime package is added
    ${isBlock ? '- The block includes a complete document layout ready to customize' : '- Each component gets its own subdirectory inside componentDir'}

    **Before running:** make sure \`pdfx.json\` exists. Run \`npx pdfx-cli init\` if not.

    **See source first:** call \`${inspectTool}\` with the item name to review the code before adding.

    **After adding:** call \`get_audit_checklist\` to verify your setup is correct.
  `);
}
