import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

interface TemplateCategory {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  count: number;
  tags: string[];
}

const categories: TemplateCategory[] = [
  {
    title: 'Invoices',
    description:
      'Professional invoice templates for agencies, freelancers, and businesses. Four distinct styles — classic, modern, minimal, and bold.',
    href: '/templates/invoices',
    icon: <FileText className="h-6 w-6" />,
    count: 4,
    tags: ['billing', 'finance', 'PDF'],
  },
];

export default function TemplatesIndexPage() {
  useDocumentTitle('Templates');

  return (
    <div className="flex-1 min-w-0 py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Templates</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Production-ready PDF document templates built with PDFx components. Each template is
          fully theme-aware, customizable, and installable via the CLI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            to={cat.href}
            className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-accent/30 transition-all duration-200"
          >
            {/* Icon + count */}
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                {cat.count} templates
              </span>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-lg font-semibold tracking-tight mb-1 group-hover:text-primary transition-colors">
                {cat.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md bg-muted/70 text-muted-foreground font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {/* Coming soon placeholder */}
        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-6 opacity-60">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-muted text-muted-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              Coming soon
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight mb-1 text-muted-foreground">
              Reports
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Business reports, analytics summaries, and executive dashboards.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-6 opacity-60">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-muted text-muted-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              Coming soon
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight mb-1 text-muted-foreground">
              Proposals
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Project proposals, quotes, and statements of work.
            </p>
          </div>
        </div>
      </div>

      {/* CLI hint */}
      <div className="mt-12 rounded-lg border border-border bg-muted/40 p-6">
        <h3 className="text-sm font-semibold mb-2">Install any template with the CLI</h3>
        <p className="text-sm text-muted-foreground mb-3">
          The PDFx CLI can scaffold any template into your project with all required components in
          one command.
        </p>
        <code className="block text-sm font-mono bg-background border border-border rounded-md px-4 py-3 text-foreground">
          npx @pdfx/cli template add invoice-classic
        </code>
      </div>
    </div>
  );
}
