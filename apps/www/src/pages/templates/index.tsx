import { FileText, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

interface TemplateCategoryCard {
  href: string;
  title: string;
  description: string;
  count: number;
  tags: string[];
}

const CATEGORIES: TemplateCategoryCard[] = [
  {
    href: '/templates/invoices',
    title: 'Invoices',
    description:
      'Professional invoice PDFs with full theme support. Classic, Modern, and Minimal layouts ready to install.',
    count: 3,
    tags: ['A4', 'Theme-aware', 'Table', 'KeyValue'],
  },
];

export default function TemplatesIndex() {
  useDocumentTitle('Templates');

  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Templates</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Full-page PDF layouts built with{' '}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">@pdfx/ui</code>.
          Preview in three themes, then install in one command.
        </p>
      </div>

      {/* Category grid */}
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
                {cat.count} templates
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

        {/* Coming soon placeholder */}
        <div className="rounded-xl border border-dashed border-border bg-muted/20 p-5 flex items-center justify-center">
          <p className="text-sm text-muted-foreground/60 text-center">More templates coming soon</p>
        </div>
      </div>
    </div>
  );
}
