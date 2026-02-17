import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { PackageManagerTabs } from "@/components/package-manager-tabs";
import { cn } from "@/lib/utils";
import { manualStep1Deps, manualStep2Pdfxjson, manualStep3Theme, manualStep4Structure, manualStep5AddComponent } from "@/constants/docs.constant";

export default function Installation() {
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');
  return (
    <>
      <section id="installation" className="mb-14 scroll-mt-20">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          Set up PDFX in your project using the CLI or manually configure your
          project.
        </p>

        {/* Installation Tabs */}
        <div className="rounded-lg border overflow-hidden">
          <div className="flex items-center gap-0 border-b bg-muted/40 px-1 pt-1">
            <button
              type="button"
              onClick={() => setInstallTab("cli")}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-t-md transition-all",
                installTab === "cli"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Using CLI
            </button>
            <button
              type="button"
              onClick={() => setInstallTab("manual")}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-t-md transition-all",
                installTab === "manual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Manual
            </button>
          </div>

          {/* CLI Tab Content */}
          {installTab === "cli" && (
            <div className="p-4 bg-background space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Initialize PDFX in your project. Components are installed to{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    ./src/components/pdfx/
                  </code>{" "}
                  by default (configurable during init).
                </p>
                <PackageManagerTabs
                  command="npx @pdfx/cli init"
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Then add the components you need:
                </p>
                <PackageManagerTabs
                  command="npx @pdfx/cli add heading text"
                  className="border-0 rounded-lg shadow-none"
                />
              </div>
            </div>
          )}

          {/* Manual Tab Content */}
          {installTab === "manual" && (
            <div className="p-6 bg-background space-y-6">
              <p className="text-sm text-muted-foreground">
                If you prefer not to use the CLI, follow these steps to
                configure your project manually.
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
                  PDFX components are built on{" "}
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
                  Create a{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    pdfx.json
                  </code>{" "}
                  file in your project root.
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep2Pdfxjson}
                    language="json"
                    filename="pdfx.json"
                  />
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
                  Create{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    src/lib/pdfx-theme.ts
                  </code>
                  . All PDFX components import their design tokens from this
                  file.
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
                  Create component directory
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Create{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    src/components/pdfx/
                  </code>
                  . Your project structure should look like:
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep4Structure}
                    language="text"
                    filename="project structure"
                  />
                </div>
              </div>

              {/* Step 5 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2.5">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    5
                  </span>
                  Add components
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Go to any component page and switch to the{" "}
                  <strong>Manual</strong> tab to copy the component code.
                </p>
                <div className="pl-8">
                  <CodeBlock
                    code={manualStep5AddComponent}
                    language="bash"
                    filename="terminal"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Note:</strong> Components
                import the theme from{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                  ../lib/pdfx-theme
                </code>
                . If your theme file is in a different location, update the
                import path in each component.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
