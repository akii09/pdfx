import { ArrowRight, FileText, Heading as HeadingIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

const components = [
  {
    name: 'Heading',
    description:
      'PDF heading component with 6 levels (h1-h6). Uses browser-standard heading sizes.',
    href: '/components/heading',
    icon: HeadingIcon,
    install: 'npx @pdfx/cli add heading',
  },
  {
    name: 'Text',
    description: 'PDF text component for body paragraphs with 12px font and 1.5 line height.',
    href: '/components/text',
    icon: FileText,
    install: 'npx @pdfx/cli add text',
  },
];

export default function ComponentsIndexPage() {
  useDocumentTitle('Components');

  return (
    <div className="py-12 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Components</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Browse all available PDFX components. Each component is copied into your project — you own
        the code.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {components.map((component) => (
          <Link
            key={component.name}
            to={component.href}
            className="group relative rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:bg-accent/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="rounded-lg bg-muted/60 p-2.5">
                <component.icon className="h-6 w-6 text-foreground/70 group-hover:text-foreground transition-colors" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
            <h3 className="text-lg font-semibold mb-1.5">{component.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {component.description}
            </p>
            <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              {component.install}
            </code>
          </Link>
        ))}
      </div>
    </div>
  );
}
