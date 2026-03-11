import { Database, FileText, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

interface TemplateCategoryCard {
  href: string;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  tags: string[];
}

const TEMPLATES: TemplateCategoryCard[] = [
  {
    href: '/templates/invoice-template',
    title: 'Invoice Template',
    description:
      'Data-driven invoice PDF. Pass company, client, and line items — get a complete, themed invoice.',
    status: 'available',
    tags: ['3 Variants', 'Auto-calculate', 'Currency support'],
  },
  {
    href: '/templates/resume-template',
    title: 'Resume Template',
    description:
      'Professional resume generator. Pass experience, education, and skills — get a polished PDF.',
    status: 'available',
    tags: ['3 Variants', 'Accent colors', 'Multi-section'],
  },
  {
    href: '/templates/report-template',
    title: 'Report Template',
    description:
      'Business report generator for finance, operations, and analytics with charts and summaries.',
    status: 'coming-soon',
    tags: ['Graphs', 'DataTable', 'Executive summary'],
  },
  {
    href: '/templates/certificate-template',
    title: 'Certificate Template',
    description:
      'Achievement and completion certificates with elegant layouts and customizable designs.',
    status: 'coming-soon',
    tags: ['Signatures', 'Badges', 'QR Codes'],
  },
];

export default function TemplatesIndex() {
  useDocumentTitle('Templates');

  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Templates</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Data-driven PDF generators. Import from{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">@pdfx/ui</code>, pass
          your data, get a complete document.
        </p>
      </div>

      {/* What are Templates */}
      <div className="mb-10 p-5 rounded-xl border bg-card">
        <h2 className="text-lg font-semibold mb-3">What are Templates?</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Data-Driven API</p>
              <p className="text-muted-foreground">
                Pass structured props (company, items, experience) and receive a complete PDF.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Multiple Variants</p>
              <p className="text-muted-foreground">
                Each template offers different visual styles (classic, modern, minimal).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick usage example */}
      <div className="mb-10 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">Quick Example</span>
        </h3>
        <pre className="text-xs bg-card p-4 rounded-lg border overflow-x-auto">
          <code>{`import { InvoiceTemplate } from '@pdfx/ui';

<InvoiceTemplate
  variant="modern"
  company={{ name: 'Acme Inc', ... }}
  client={{ name: 'Client Corp', ... }}
  items={[{ description: 'Service', quantity: 1, unitPrice: 100 }]}
/>`}</code>
        </pre>
        <p className="text-xs text-muted-foreground mt-3">
          Looking for copy-paste designs instead?{' '}
          <Link to="/blocks" className="text-primary hover:underline">
            Check out Blocks →
          </Link>
        </p>
      </div>

      {/* Template grid */}
      <h2 className="text-lg font-semibold mb-4">Available Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((tmpl) => (
          <Link
            key={tmpl.href}
            to={tmpl.status === 'available' ? tmpl.href : '#'}
            className={`group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all ${
              tmpl.status === 'coming-soon' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={(e) => tmpl.status === 'coming-soon' && e.preventDefault()}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-4.5 w-4.5 text-primary" />
              </div>
              {tmpl.status === 'coming-soon' && (
                <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 border border-primary/30 rounded px-1.5 py-0.5">
                  Coming Soon
                </span>
              )}
            </div>

            <h2 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {tmpl.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tmpl.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {tmpl.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-[10px] text-muted-foreground/80 bg-muted rounded px-1.5 py-0.5 font-mono"
                >
                  <Layers className="h-2.5 w-2.5 shrink-0" />
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
