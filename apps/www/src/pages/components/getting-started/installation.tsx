import { CodeBlock } from '@/components/code-block';
import { PackageManagerTabs } from '@/components/package-manager-tabs';
import {
  manualStep1Deps,
  manualStep2Pdfxjson,
  manualStep3Theme,
  manualStep4Context,
  manualStep5Structure,
  manualStep6AddComponent,
} from '@/constants/docs.constant';
import {
  SHADCN_ADD_EXAMPLE_COMMAND,
  SHADCN_LIST_COMMAND,
  SHADCN_REGISTRY_ADD_COMMAND,
  SHADCN_REGISTRY_URL,
} from '@/constants/site';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Installation() {
  const [installTab, setInstallTab] = useState<'cli' | 'shadcn' | 'manual'>('cli');
  return (
    <>
      <section id="installation" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          Set up PDFx in your project using the CLI or manually configure your project.
        </p>

        {/* Installation Tabs */}
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center gap-0 border-b bg-muted/40 px-1 pt-1">
            <button
              type="button"
              onClick={() => setInstallTab('cli')}
              className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
                installTab === 'cli'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              pdfx-cli
            </button>
            <button
              type="button"
              onClick={() => setInstallTab('shadcn')}
              className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
                installTab === 'shadcn'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              shadcn CLI
            </button>
            <button
              type="button"
              onClick={() => setInstallTab('manual')}
              className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-t-md transition-all',
                installTab === 'manual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Manual
            </button>
          </div>

          {/* CLI Tab Content */}
          {installTab === 'cli' && (
            <div className="p-4 bg-background space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Initialize PDFx in your project. Components are installed to{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    ./src/components/pdfx/
                  </code>{' '}
                  by default (configurable during init).
                </p>
                <PackageManagerTabs
                  command="npx pdfx-cli init"
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Then add the components you need:
                </p>
                <PackageManagerTabs
                  command="npx pdfx-cli add heading text"
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
            </div>
          )}

          {installTab === 'shadcn' && (
            <div className="p-4 bg-background space-y-4">
              <p className="text-sm text-muted-foreground">
                Use this path when the project already has shadcn (
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  components.json
                </code>
                ). If it does not, run{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  npx shadcn@latest init
                </code>{' '}
                first — or use the pdfx-cli tab. The namespace is always{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  @pdfx
                </code>{' '}
                so names never collide with shadcn/ui.
              </p>
              <p className="text-sm text-muted-foreground">
                Components land in{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  src/components/pdfx/
                </code>
                . Blocks such as{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  @pdfx/invoice-modern
                </code>{' '}
                land in{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  src/blocks/pdfx/&lt;name&gt;/
                </code>
                .
              </p>
              <div>
                <p className="text-sm text-muted-foreground mb-1">1. Register the PDFx namespace</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Leave <code className="rounded bg-muted px-1 py-0.5 font-mono">{'{name}'}</code>{' '}
                  as a placeholder. The CLI replaces it per item, so{' '}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono">@pdfx/heading</code>{' '}
                  fetches{' '}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono">
                    /r/shadcn/heading.json
                  </code>
                  .
                </p>
                <PackageManagerTabs
                  command={SHADCN_REGISTRY_ADD_COMMAND}
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">2. Add components or blocks</p>
                <PackageManagerTabs
                  command={SHADCN_ADD_EXAMPLE_COMMAND}
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">3. List everything in @pdfx</p>
                <PackageManagerTabs
                  command={SHADCN_LIST_COMMAND}
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Theme files and{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">@react-pdf/renderer</code>{' '}
                are pulled in automatically via{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">@pdfx/theme</code> and each
                item&apos;s dependencies. pdfx-cli stays the PDF-native CLI for{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">theme switch</code>,{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">diff</code>, and MCP.{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">npx pdfx-cli init</code>{' '}
                offers to write this{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">@pdfx</code> entry when{' '}
                <code className="rounded bg-muted px-1 py-0.5 font-mono">components.json</code>{' '}
                already exists — it asks first, and never edits the file unprompted.
              </p>
            </div>
          )}

          {/* Manual Tab Content */}
          {installTab === 'manual' && (
            <div className="p-6 bg-background space-y-6">
              <p className="text-sm text-muted-foreground">
                If you prefer not to use the CLI, follow these steps to configure your project
                manually.
              </p>

              {/* Step 1 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    1
                  </span>
                  Install dependencies
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  PDFx components are built on{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    @react-pdf/renderer
                  </code>
                  . Install it if you haven't already.
                </p>
                <div className="pl-8">
                  <PackageManagerTabs
                    command={manualStep1Deps}
                    className="border-0 rounded-lg shadow-none"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    2
                  </span>
                  Create pdfx.json
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Create a{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx.json
                  </code>{' '}
                  file in your project root.
                </p>
                <div className="pl-8">
                  <CodeBlock code={manualStep2Pdfxjson} language="json" filename="pdfx.json" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    3
                  </span>
                  Add the theme file
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Create{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    src/lib/pdfx-theme.ts
                  </code>
                  . All PDFx components import their design tokens from this file.
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep3Theme}
                    language="tsx"
                    filename="src/lib/pdfx-theme.ts"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    4
                  </span>
                  Add the theme context file
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Create{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    src/lib/pdfx-theme-context.tsx
                  </code>{' '}
                  in the same directory as your theme file. Components use{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    usePdfxTheme()
                  </code>{' '}
                  from this file to read the active theme, and{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    PdfxThemeProvider
                  </code>{' '}
                  enables runtime theme switching.
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep4Context}
                    language="tsx"
                    filename="src/lib/pdfx-theme-context.tsx"
                  />
                </div>
              </div>

              {/* Step 5 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    5
                  </span>
                  Create component directory
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Create{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    src/components/pdfx/
                  </code>
                  . Your project structure should look like:
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep5Structure}
                    language="text"
                    filename="project structure"
                  />
                </div>
              </div>

              {/* Step 6 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    6
                  </span>
                  Add components
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Go to any component page and switch to the <strong>Manual</strong> tab to copy the
                  component code.
                </p>
                <div className="pl-8">
                  <CodeBlock code={manualStep6AddComponent} language="bash" filename="terminal" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">
                    Why{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                      src/components/pdfx/
                    </code>
                    ?
                  </strong>{' '}
                  PDFx components are placed in their own subdirectory, separate from your regular
                  UI components. This prevents naming conflicts — for example, your app can have a
                  web <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Text</code>{' '}
                  component alongside{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    pdfx-text.tsx
                  </code>{' '}
                  for PDFs without ambiguity.
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> Components read the active
                  theme via{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx-theme-context.tsx
                  </code>
                  , which imports{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx-theme.ts
                  </code>
                  . Both are scaffolded automatically by{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx init
                  </code>{' '}
                  and kept in sync by{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx add
                  </code>
                  .
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="shadcn" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          shadcn CLI
        </h2>
        <p className="text-muted-foreground mb-4">
          PDFx publishes a second, shadcn-compatible registry next to the existing pdfx-cli
          registry. Both stay in sync from the same source. pdfx-cli URLs do not change. The
          commands in the <strong>shadcn CLI</strong> tab above are the full install; this is the{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">components.json</code>{' '}
          contract behind them.
        </p>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              shadcn registry add
            </code>{' '}
            requires an existing{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              components.json
            </code>
            . If you do not have one, run{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              npx shadcn@latest init
            </code>{' '}
            first. You can register the namespace with the CLI, or add it by hand — keep{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">{'{name}'}</code>{' '}
            literal:
          </p>
          <CodeBlock
            code={`{
  "registries": {
    "@pdfx": "${SHADCN_REGISTRY_URL}"
  }
}`}
            language="json"
            filename="components.json"
          />
          <p>
            Then install with{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              @pdfx/&lt;name&gt;
            </code>
            . Never use a bare name —{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">heading</code> and{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">table</code> collide
            with shadcn/ui.
          </p>
          <CodeBlock
            code={`npx shadcn@latest add @pdfx/heading @pdfx/table
npx shadcn@latest add @pdfx/invoice-modern
npx shadcn@latest list @pdfx`}
            language="bash"
            filename="terminal"
          />
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <strong className="text-foreground">Keep both CLIs.</strong> shadcn copies components.
            Use pdfx-cli for{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">theme switch</code>,{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">diff</code>, blocks-aware
            prompts, and the MCP server. Running{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">npx pdfx-cli init</code> in a
            shadcn project offers to add the{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">@pdfx</code> entry to an
            existing <code className="rounded bg-muted px-1 py-0.5 font-mono">components.json</code>{' '}
            — it prompts before writing, and uses whichever registry URL you configured. Pass{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono">--register-shadcn</code> (or
            <code className="rounded bg-muted px-1 py-0.5 font-mono">--no-register-shadcn</code>) to
            skip the question in CI.
          </div>
        </div>
      </section>
    </>
  );
}
