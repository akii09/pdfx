import {
  ArrowRight,
  FileStack,
  FileText,
  Heading as HeadingIcon,
  LayoutList,
  Link as LinkIcon,
  Minus,
  PanelTop,
  Table,
} from 'lucide-react';
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
  {
    name: 'Link',
    description: 'PDF link component for hyperlinks. Renders as clickable in PDF viewers.',
    href: '/components/link',
    icon: LinkIcon,
    install: 'npx @pdfx/cli add link',
  },
  {
    name: 'Divider',
    description: 'Horizontal rule with theme-based border color and spacing.',
    href: '/components/divider',
    icon: Minus,
    install: 'npx @pdfx/cli add divider',
  },
  {
    name: 'PageBreak',
    description: 'Forces content after it to start on a new page.',
    href: '/components/page-break',
    icon: FileStack,
    install: 'npx @pdfx/cli add page-break',
  },
  {
    name: 'Stack',
    description: 'Vertical layout with theme-based gap between children.',
    href: '/components/stack',
    icon: LayoutList,
    install: 'npx @pdfx/cli add stack',
  },
  {
    name: 'Section',
    description: 'Logical section with theme-based vertical spacing.',
    href: '/components/section',
    icon: PanelTop,
    install: 'npx @pdfx/cli add section',
  },
  {
    name: 'Table',
    description: 'Composable table with TableRow, TableCell, semantic wrappers.',
    href: '/components/table',
    icon: Table,
    install: 'npx @pdfx/cli add table',
  },
  {
    name: 'DataTable',
    description: 'Data-driven table API. Pass columns and data array for automatic rendering.',
    href: '/components/data-table',
    icon: Table,
    install: 'npx @pdfx/cli add data-table',
  },
];

export default function ComponentsIndexPage() {
  useDocumentTitle('Components');

  return (
    <div className="py-12 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Components</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Browse all available PDFX components. Each component is copied into your project — you own
          the code.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {components.map((component) => (
          <Link
            key={component.name}
            to={component.href}
            className="group relative rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-border/80 hover:bg-muted/40 hover:shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="rounded-md bg-muted/80 p-2">
                <component.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground/60 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
            <h3 className="text-base font-semibold mb-1 tracking-tight">{component.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {component.description}
            </p>
            <code className="text-xs font-mono text-muted-foreground/90 bg-muted/60 px-2 py-0.5 rounded border border-border/50">
              {component.install}
            </code>
          </Link>
        ))}
      </div>
    </div>
  );
}
