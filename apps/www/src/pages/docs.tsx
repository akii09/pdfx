import { useState } from 'react';
import { CodeBlock } from '../components/code-block';
import { PackageManagerTabs } from '../components/package-manager-tabs';
import { TableOfContents } from '../components/table-of-contents';
import { useDocumentTitle } from '../hooks/use-document-title';
import { cn } from '../lib/utils';

const usageExample = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Hello World</Heading>
        <Text>This is a paragraph of body text.</Text>
      </Page>
    </Document>
  );
}`;

const cliCommands = `# Initialize PDFX in your project (includes theme setup)
npx @pdfx/cli init

# Add components
npx @pdfx/cli add heading text

# List available components
npx @pdfx/cli list

# Compare local vs registry
npx @pdfx/cli diff heading`;

const themeCommands = `# Initialize or replace your theme
npx @pdfx/cli theme init

# Switch to a different preset
npx @pdfx/cli theme switch modern

# Validate your theme file
npx @pdfx/cli theme validate`;

const themeCustomization = `// src/lib/pdfx-theme.ts — this file is yours to customize
import type { PdfxTheme } from './pdfx-theme'; // type is inlined

export const theme: PdfxTheme = {
  name: 'my-custom-theme',
  colors: {
    primary: '#2563eb',        // your brand color
    foreground: '#1a1a1a',
    background: '#ffffff',
    // ... other color tokens
  },
  typography: {
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: { h1: 36, h2: 28, h3: 22, h4: 18, h5: 15, h6: 12 },
    },
    body: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
    },
  },
  // ... spacing, page tokens
};`;

// ── Manual installation code blocks ────────────────────────────────

const manualStep1Deps = 'npm install @react-pdf/renderer';

const manualStep2Pdfxjson = `{
  "registryUrl": "https://pdfx.akashpise.dev/r",
  "componentDir": "src/components/pdfx",
  "theme": "professional"
}`;

const manualStep3Theme = `// src/lib/pdfx-theme.ts
// This is the theme file all PDFX components import from.
// You own this file — customize colors, fonts, spacing to match your brand.

export const theme = {
  name: "professional",
  primitives: {
    typography: { xs: 10, sm: 12, base: 15, lg: 18, xl: 22, "2xl": 28, "3xl": 36 },
    spacing: { 0: 0, 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 },
    fontWeights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeights: { tight: 1.2, normal: 1.4, relaxed: 1.6 },
    borderRadius: { none: 0, sm: 2, md: 4, lg: 8, full: 9999 },
    letterSpacing: { tight: -0.025, normal: 0, wide: 0.025, wider: 0.05 },
  },
  colors: {
    foreground: "#18181b",
    background: "#ffffff",
    muted: "#f4f4f5",
    mutedForeground: "#71717a",
    primary: "#18181b",
    primaryForeground: "#ffffff",
    border: "#e4e4e7",
    accent: "#3b82f6",
    destructive: "#dc2626",
    success: "#16a34a",
    warning: "#d97706",
    info: "#0ea5e9",
  },
  typography: {
    body: { fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.6 },
    heading: {
      fontFamily: "Times-Roman",
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: { h1: 32, h2: 24, h3: 20, h4: 16, h5: 14, h6: 12 },
    },
  },
  spacing: {
    page: { marginTop: 56, marginRight: 48, marginBottom: 56, marginLeft: 48 },
    sectionGap: 28,
    paragraphGap: 10,
    componentGap: 14,
  },
  page: { size: "A4", orientation: "portrait" },
};`;

const manualStep4Structure = `your-project/
  src/
    lib/
      pdfx-theme.ts        # Theme file (Step 3)
    components/
      pdfx/
        pdfx-heading.tsx    # Components go here
        pdfx-text.tsx
        ...
  pdfx.json                # Project config (Step 2)`;

const manualStep5AddComponent = `# Now you can copy components from each component's Manual tab.
# Or use the CLI to add them:
npx @pdfx/cli add heading text table`;

const tocItems = [
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'usage', title: 'Usage', level: 2 },
  { id: 'cli-commands', title: 'CLI Commands', level: 2 },
  { id: 'theming', title: 'Theming', level: 2 },
  { id: 'theme-cli', title: 'Theme CLI', level: 3 },
  { id: 'customizing', title: 'Customizing', level: 3 },
  { id: 'how-it-works', title: 'How It Works', level: 2 },
];

export default function DocsPage() {
  useDocumentTitle('Documentation');
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-12 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Documentation</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get started with PDFX in your React project. Copy, paste, and customize beautiful PDF
            components.
          </p>
        </div>

        <section id="installation" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            Set up PDFX in your project using the CLI or manually configure your project.
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
                Using CLI
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
                    Initialize PDFX in your project. Components are installed to{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                      ./src/components/pdfx/
                    </code>{' '}
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
                    PDFX components are built on{' '}
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
                    . All PDFX components import their design tokens from this file.
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
                    Create{' '}
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
                    Go to any component page and switch to the <strong>Manual</strong> tab to copy
                    the component code.
                  </p>
                  <div className="pl-8">
                    <CodeBlock code={manualStep5AddComponent} language="bash" filename="terminal" />
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> Components import the theme
                  from{' '}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono font-semibold">
                    ../lib/pdfx-theme
                  </code>
                  . If your theme file is in a different location, update the import path in each
                  component.
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="usage" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            Usage
          </h2>
          <p className="text-muted-foreground mb-4">
            Import components from your local pdfx directory and use them inside a
            @react-pdf/renderer Document:
          </p>
          <CodeBlock code={usageExample} language="tsx" filename="my-document.tsx" />
        </section>

        <section id="cli-commands" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            CLI Commands
          </h2>
          <CodeBlock code={cliCommands} language="bash" filename="terminal" />
        </section>

        <section id="theming" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            Theming
          </h2>
          <p className="text-muted-foreground mb-6">
            PDFX includes a comprehensive theme system. During{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">pdfx init</code>, you
            choose from three preset themes:
          </p>
          <div className="grid gap-4 mb-8">
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">Professional</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Serif headings (Times-Roman), navy primary color, generous margins. Ideal for formal
                documents, reports, and business correspondence.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">Modern</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sans-serif throughout (Helvetica), vibrant purple accent, tight spacing. Perfect for
                startups, marketing materials, and contemporary designs.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">Minimal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monospace headings (Courier), stark black palette, maximum whitespace. Great for
                technical documentation, developer-facing content, and clean aesthetics.
              </p>
            </div>
          </div>

          <h3 id="theme-cli" className="text-lg font-semibold mb-3 scroll-mt-20">
            Theme CLI Commands
          </h3>
          <CodeBlock code={themeCommands} language="bash" filename="terminal" />

          <h3 id="customizing" className="text-lg font-semibold mb-3 mt-8 scroll-mt-20">
            Customizing Your Theme
          </h3>
          <p className="text-muted-foreground mb-4">
            The theme file is scaffolded into your project — you own it. Edit colors, fonts,
            spacing, and page settings to match your brand:
          </p>
          <CodeBlock code={themeCustomization} language="tsx" filename="src/lib/pdfx-theme.ts" />
        </section>

        <section id="how-it-works" className="mb-14 scroll-mt-20">
          <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
            <span className="flex h-6 w-1 rounded-full bg-primary" />
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">1. Initialize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Run{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx init</code>{' '}
                to create a pdfx.json config file with your registry URL and component directory.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">2. Choose a Theme</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select a theme preset during init. A self-contained theme file is scaffolded into
                your project with all design tokens (colors, typography, spacing, page settings).
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">3. Add Components</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use{' '}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx add</code>{' '}
                to fetch components from the registry. Theme imports are automatically resolved to
                your theme file.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
              <h3 className="font-semibold mb-1.5">4. Customize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The code is yours. Edit the theme file, tweak component styles, add props, compose
                components together.
              </p>
            </div>
          </div>
        </section>
      </div>

      <TableOfContents items={tocItems} />
    </div>
  );
}
