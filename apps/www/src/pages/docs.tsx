import { CodeBlock } from '../components/code-block';
import { PackageManagerTabs } from '../components/package-manager-tabs';
import { useDocumentTitle } from '../hooks/use-document-title';

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

export default function DocsPage() {
  useDocumentTitle('Documentation');

  return (
    <div className="py-12 max-w-3xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Documentation</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Get started with PDFX in your React project. Copy, paste, and customize beautiful PDF
          components.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          Initialize PDFX in your project. Components are installed to{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            ./src/components/pdfx/
          </code>{' '}
          by default (configurable during init).
        </p>
        <PackageManagerTabs command="npx @pdfx/cli init" className="mb-4" />
        <p className="text-muted-foreground mb-4">Then add the components you need:</p>
        <PackageManagerTabs command="npx @pdfx/cli add heading text" />
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          Usage
        </h2>
        <p className="text-muted-foreground mb-4">
          Import components from your local pdfx directory and use them inside a @react-pdf/renderer
          Document:
        </p>
        <CodeBlock code={usageExample} language="tsx" filename="my-document.tsx" />
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          CLI Commands
        </h2>
        <CodeBlock code={cliCommands} language="bash" filename="terminal" />
      </section>

      <section className="mb-14">
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

        <h3 className="text-lg font-semibold mb-3">Theme CLI Commands</h3>
        <CodeBlock code={themeCommands} language="bash" filename="terminal" />

        <h3 className="text-lg font-semibold mb-3 mt-8">Customizing Your Theme</h3>
        <p className="text-muted-foreground mb-4">
          The theme file is scaffolded into your project — you own it. Edit colors, fonts, spacing,
          and page settings to match your brand:
        </p>
        <CodeBlock code={themeCustomization} language="tsx" filename="src/lib/pdfx-theme.ts" />
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <span className="flex h-6 w-1 rounded-full bg-primary" />
          How It Works
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">1. Initialize</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Run{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx init</code> to
              create a pdfx.json config file with your registry URL and component directory.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">2. Choose a Theme</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Select a theme preset during init. A self-contained theme file is scaffolded into your
              project with all design tokens (colors, typography, spacing, page settings).
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5 hover:border-border transition-colors">
            <h3 className="font-semibold mb-1.5">3. Add Components</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pdfx add</code>{' '}
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
  );
}
