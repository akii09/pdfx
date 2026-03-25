import { Copy, FileText, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

interface BlockCategoryCard {
  href: string;
  title: string;
  description: string;
  count: number;
  tags: string[];
}

const CATEGORIES: BlockCategoryCard[] = [
  {
    href: '/blocks/invoices',
    title: 'Invoices',
    description:
      'Professional invoice PDF designs. Copy the code, customize colors, fonts, and layout to match your brand.',
    count: 6,
    tags: ['A4', 'Theme-aware', 'Table', 'KeyValue'],
  },
  {
    href: '/blocks/reports',
    title: 'Reports',
    description:
      'Production-ready business report layouts for finance, operations, security, and marketing teams.',
    count: 4,
    tags: ['Executive', 'Graph', 'DataTable', 'Best Practices'],
  },
];

export default function BlocksIndex() {
  useDocumentTitle('Blocks');

  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Copy className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blocks</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Pre-composed PDF layouts you copy, paste, and own. Unlike Templates (which you import and
          pass data to), Blocks give you the source code to customize freely.
        </p>
      </div>

      {/* What are Blocks */}
      <div className="mb-10 p-5 rounded-xl border bg-card">
        <h2 className="text-lg font-semibold mb-3">What are Blocks?</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Copy className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Copy & Customize</p>
              <p className="text-muted-foreground">
                Full source code ownership. Modify colors, spacing, fonts, and layout.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Built with PDFx Components</p>
              <p className="text-muted-foreground">
                Uses Heading, Table, Badge, Card, and other{' '}
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded font-mono">
                  @pdfx/components
                </code>{' '}
                components.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blocks vs Templates comparison */}
      <div className="mb-10 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">Blocks vs Templates — When to use which?</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium mb-1.5">Use Blocks when:</p>
            <ul className="space-y-1 text-muted-foreground list-disc pl-4">
              <li>You need full design control and want to customize everything</li>
              <li>Your design differs significantly from the default layout</li>
              <li>You're building a unique document that doesn't fit a standard schema</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1.5">
              Use{' '}
              <Link to="/templates" className="text-primary hover:underline">
                Templates
              </Link>{' '}
              when:
            </p>
            <ul className="space-y-1 text-muted-foreground list-disc pl-4">
              <li>You want a quick, consistent output with minimal code</li>
              <li>Your data fits the template's schema (invoice items, resume sections, etc.)</li>
              <li>You prefer importing a component over copying source code</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <h2 className="text-lg font-semibold mb-4">Available Blocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            to={cat.href}
            className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="text-xs font-mono text-muted-foreground/70 bg-muted rounded px-1.5 py-0.5">
                {cat.count} designs
              </span>
            </div>

            <h2 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {cat.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((tag) => (
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
