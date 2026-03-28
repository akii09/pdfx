import dedent from 'dedent';
import { z } from 'zod';
import { textResponse } from '../utils.js';

export const getInstallationSchema = z.object({
  framework: z.enum(['nextjs', 'react', 'vite', 'remix', 'other']).describe('Target framework'),
  package_manager: z.enum(['npm', 'pnpm', 'yarn', 'bun']).describe('Package manager to use'),
});

type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';
type Framework = 'nextjs' | 'react' | 'vite' | 'remix' | 'other';

function installCmd(pm: PM, pkg: string, dev = false): string {
  const base = { npm: 'npm install', pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' }[pm];
  const devFlag = { npm: '--save-dev', pnpm: '-D', yarn: '--dev', bun: '-d' }[pm];
  return dev ? `${base} ${devFlag} ${pkg}` : `${base} ${pkg}`;
}

const FRAMEWORK_NOTES: Record<Framework, string> = {
  nextjs: dedent`
    ## Next.js Notes

    **App Router** — Use a Route Handler to serve PDFs:
    \`\`\`tsx
    // app/api/pdf/route.ts
    import { renderToBuffer } from '@react-pdf/renderer';
    import { MyDocument } from '@/components/pdfx/my-document';

    export async function GET() {
      const buffer = await renderToBuffer(<MyDocument />);
      return new Response(buffer, {
        headers: { 'Content-Type': 'application/pdf' },
      });
    }
    \`\`\`

    **Important:** Do NOT render PDFx components inside React Server Components.
    Always use a \`'use client'\` boundary or a Route Handler.

    **Pages Router** — Use an API route:
    \`\`\`tsx
    // pages/api/pdf.ts
    import type { NextApiRequest, NextApiResponse } from 'next';
    import { renderToBuffer } from '@react-pdf/renderer';
    import { MyDocument } from '@/components/pdfx/my-document';

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      const buffer = await renderToBuffer(<MyDocument />);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    }
    \`\`\`
  `,
  react: dedent`
    ## React Notes

    Display a PDF inline with \`PDFViewer\`:
    \`\`\`tsx
    import { PDFViewer } from '@react-pdf/renderer';
    import { MyDocument } from './components/pdfx/my-document';

    export function App() {
      return (
        <PDFViewer width="100%" height="600px">
          <MyDocument />
        </PDFViewer>
      );
    }
    \`\`\`

    Trigger a download with \`PDFDownloadLink\`:
    \`\`\`tsx
    import { PDFDownloadLink } from '@react-pdf/renderer';
    import { MyDocument } from './components/pdfx/my-document';

    export function DownloadButton() {
      return (
        <PDFDownloadLink document={<MyDocument />} fileName="document.pdf">
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      );
    }
    \`\`\`
  `,
  vite: dedent`
    ## Vite Notes

    Works with both \`vite + react\` and \`vite + react-swc\` templates.

    For client-side rendering, use \`PDFViewer\` or \`PDFDownloadLink\` from \`@react-pdf/renderer\`.

    For server-side generation, use a separate Node.js server or Vite's server-side features.
  `,
  remix: dedent`
    ## Remix Notes

    Use a resource route to serve PDFs:
    \`\`\`tsx
    // app/routes/pdf.tsx
    import { renderToStream } from '@react-pdf/renderer';
    import { MyDocument } from '~/components/pdfx/my-document';

    export async function loader() {
      const stream = await renderToStream(<MyDocument />);
      return new Response(stream as unknown as ReadableStream, {
        headers: { 'Content-Type': 'application/pdf' },
      });
    }
    \`\`\`
  `,
  other: dedent`
    ## General Notes

    \`@react-pdf/renderer\` works in any Node.js ≥ 18 environment.

    - **Buffer output**: \`await renderToBuffer(<MyDocument />)\`
    - **Stream output**: \`await renderToStream(<MyDocument />)\`
    - **Client-side**: Use \`PDFViewer\` or \`PDFDownloadLink\` from \`@react-pdf/renderer\`
  `,
};

export async function getInstallation(
  args: z.infer<typeof getInstallationSchema>
): Promise<ReturnType<typeof textResponse>> {
  const pm = args.package_manager;
  const fw = args.framework;

  return textResponse(dedent`
    # PDFx Setup Guide: ${fw} + ${pm}

    ## Step 1 — Install the peer dependency

    \`\`\`bash
    ${installCmd(pm, '@react-pdf/renderer')}
    \`\`\`

    ## Step 2 — Initialize PDFx in your project

    \`\`\`bash
    npx pdfx-cli init
    \`\`\`

    This creates \`pdfx.json\` in your project root and generates a theme file at \`src/lib/pdfx-theme.ts\`.

    ## Step 3 — Add your first component

    \`\`\`bash
    npx pdfx-cli add heading text table
    \`\`\`

    Components are copied into \`src/components/pdfx/\`. You own the source — there is no runtime package dependency.

    ## Step 4 — Or start with a complete document block

    \`\`\`bash
    npx pdfx-cli block add invoice-modern
    \`\`\`

    ${FRAMEWORK_NOTES[fw]}

    ## Generated pdfx.json

    \`\`\`json
    {
      "$schema": "https://pdfx.akashpise.dev/schema.json",
      "componentDir": "./src/components/pdfx",
      "blockDir": "./src/blocks/pdfx",
      "registry": "https://pdfx.akashpise.dev/r",
      "theme": "./src/lib/pdfx-theme.ts"
    }
    \`\`\`

    ## pdfx.json Field Reference

    All four fields are **required**. Relative paths must start with \`./\` or \`../\`.

    | Field | Type | Description | Default |
    |-------|------|-------------|---------|
    | \`componentDir\` | string | Where individual components are installed | \`./src/components/pdfx\` |
    | \`blockDir\` | string | Where full document blocks are installed | \`./src/blocks/pdfx\` |
    | \`registry\` | string (URL) | Registry base URL (must start with http) | \`https://pdfx.akashpise.dev/r\` |
    | \`theme\` | string | Path to your generated theme file | \`./src/lib/pdfx-theme.ts\` |

    > **Non-interactive init (CI / AI agents):** pass \`--yes\` to accept all defaults:
    > \`\`\`bash
    > npx pdfx-cli init --yes
    > \`\`\`

    ## Troubleshooting

    | Problem | Fix |
    |---------|-----|
    | TypeScript errors on \`@react-pdf/renderer\` | \`${installCmd(pm, '@react-pdf/types', true)}\` |
    | "Cannot find module @/components/pdfx/..." | Run \`npx pdfx-cli@latest add <component>\` to install it |
    | PDF renders blank | Ensure root returns \`<Document><Page>...</Page></Document>\` |
    | "Invalid hook call" | PDFx components cannot use React hooks — pass data as props |

    ---
    Next: call \`get_audit_checklist\` to verify your setup is correct.
  `);
}
