import {
  boldInvoiceCode,
  classicInvoiceCode,
  minimalInvoiceCode,
  modernInvoiceCode,
  templateCliCommands,
  templateCustomizationGuide,
  templateRequiredComponents,
  templatesTocItems,
} from '@/constants';
import { themePresets } from '@pdfx/shared';
import type { ThemePresetName } from '@pdfx/shared';
import { CodeBlock } from '../../components/code-block';
import { PDFPreview } from '../../components/pdf-preview';
import { TableOfContents } from '../../components/table-of-contents';
import { useDocumentTitle } from '../../hooks/use-document-title';
import {
  BoldInvoice,
  ClassicInvoice,
  MinimalInvoice,
  ModernInvoice,
  sampleInvoice,
} from '../../templates/invoice';

const themeOptions = [
  { value: 'professional' as ThemePresetName, label: 'Professional' },
  { value: 'modern' as ThemePresetName, label: 'Modern' },
  { value: 'minimal' as ThemePresetName, label: 'Minimal' },
];

const requiredComponents = [
  'heading',
  'text',
  'divider',
  'stack',
  'section',
  'table',
  'data-table',
  'key-value',
  'badge',
  'page-header',
  'page-footer',
];

export default function InvoicesPage() {
  useDocumentTitle('Invoice Templates');

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0 py-12 max-w-4xl">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              Templates
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              Invoice
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Invoice Templates</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Four professional invoice templates built with PDFx components. Each template is fully
            theme-aware — switch between Professional, Modern, and Minimal themes using the dropdown
            in each preview.
          </p>
        </div>

        {/* CLI Installation */}
        <section id="cli-install" className="mb-10 scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">CLI Installation</h2>
          <p className="text-muted-foreground mb-4">
            Use the PDFx CLI to scaffold any invoice template directly into your project.
          </p>
          <CodeBlock code={templateCliCommands} language="bash" filename="terminal" />
        </section>

        {/* Required Components */}
        <section id="requirements" className="mb-10 scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Required Components</h2>
          <p className="text-muted-foreground mb-4">
            Invoice templates compose multiple PDFx components. Install them all with one command,
            or add them individually — each has its own docs page with manual copy-paste tabs.
          </p>

          {/* Required components grid */}
          <div className="flex flex-wrap gap-2 mb-6">
            {requiredComponents.map((comp) => (
              <a
                key={comp}
                href={`/components/${comp}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-mono bg-muted hover:bg-accent/60 text-foreground border border-border transition-colors"
              >
                {comp}
              </a>
            ))}
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30 p-4 mb-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-semibold">Manual installation:</span> If you prefer not to use
              the CLI, visit each component's page above and use the{' '}
              <span className="font-mono text-xs bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">
                Manual
              </span>{' '}
              tab to copy the source files directly into your project.
            </p>
          </div>

          <CodeBlock
            code={templateRequiredComponents}
            language="bash"
            filename="Install all required components"
          />
        </section>

        {/* Template 1: Classic */}
        <section id="template-classic" className="mb-14 scroll-mt-20">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Classic</h2>
            <p className="text-muted-foreground">
              Traditional two-column business invoice. Timeless, universally readable layout with a
              clear hierarchy. Best for agencies, consultants, and B2B services.
            </p>
          </div>

          <PDFPreview
            title="Classic Invoice"
            downloadFilename="classic-invoice.pdf"
            height="h-[720px]"
            variants={{
              options: themeOptions,
              defaultValue: 'professional',
              label: 'Theme',
            }}
          >
            {(themeName) => (
              <ClassicInvoice data={sampleInvoice} theme={themePresets[themeName]} />
            )}
          </PDFPreview>

          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3">Source code</h3>
            <CodeBlock
              code={classicInvoiceCode}
              language="tsx"
              filename="classic-invoice.tsx"
            />
          </div>
        </section>

        {/* Template 2: Modern */}
        <section id="template-modern" className="mb-14 scroll-mt-20">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Modern</h2>
            <p className="text-muted-foreground">
              Bold branded header with card-based layout. Contemporary feel for startups, tech
              companies, and design-forward businesses.
            </p>
          </div>

          <PDFPreview
            title="Modern Invoice"
            downloadFilename="modern-invoice.pdf"
            height="h-[720px]"
            variants={{
              options: themeOptions,
              defaultValue: 'modern',
              label: 'Theme',
            }}
          >
            {(themeName) => (
              <ModernInvoice data={sampleInvoice} theme={themePresets[themeName]} />
            )}
          </PDFPreview>

          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3">Source code</h3>
            <CodeBlock
              code={modernInvoiceCode}
              language="tsx"
              filename="modern-invoice.tsx"
            />
          </div>
        </section>

        {/* Template 3: Minimal */}
        <section id="template-minimal" className="mb-14 scroll-mt-20">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Minimal</h2>
            <p className="text-muted-foreground">
              Ultra-clean whitespace-forward design. Maximum readability with minimal visual noise.
              Perfect for freelancers and boutique studios.
            </p>
          </div>

          <PDFPreview
            title="Minimal Invoice"
            downloadFilename="minimal-invoice.pdf"
            height="h-[720px]"
            variants={{
              options: themeOptions,
              defaultValue: 'minimal',
              label: 'Theme',
            }}
          >
            {(themeName) => (
              <MinimalInvoice data={sampleInvoice} theme={themePresets[themeName]} />
            )}
          </PDFPreview>

          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3">Source code</h3>
            <CodeBlock
              code={minimalInvoiceCode}
              language="tsx"
              filename="minimal-invoice.tsx"
            />
          </div>
        </section>

        {/* Template 4: Bold */}
        <section id="template-bold" className="mb-14 scroll-mt-20">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Bold</h2>
            <p className="text-muted-foreground">
              Strong visual identity with accent-colored highlights and structured callout sections.
              High-contrast design for maximum brand impact.
            </p>
          </div>

          <PDFPreview
            title="Bold Invoice"
            downloadFilename="bold-invoice.pdf"
            height="h-[720px]"
            variants={{
              options: themeOptions,
              defaultValue: 'professional',
              label: 'Theme',
            }}
          >
            {(themeName) => (
              <BoldInvoice data={sampleInvoice} theme={themePresets[themeName]} />
            )}
          </PDFPreview>

          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3">Source code</h3>
            <CodeBlock
              code={boldInvoiceCode}
              language="tsx"
              filename="bold-invoice.tsx"
            />
          </div>
        </section>

        {/* Customizing */}
        <section id="customizing" className="mb-10 scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Customizing</h2>
          <p className="text-muted-foreground mb-4">
            Every template accepts a <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">theme</code> prop.
            Pass any built-in preset or your own custom theme to instantly restyle the entire document.
          </p>
          <CodeBlock
            code={templateCustomizationGuide}
            language="tsx"
            filename="customization.tsx"
          />
        </section>
      </div>

      <TableOfContents items={templatesTocItems} />
    </div>
  );
}
