import {
  ArrowRight,
  ClipboardList,
  FileStack,
  FileText,
  Heading as HeadingIcon,
  LayoutList,
  Link as LinkIcon,
  List,
  Minus,
  PanelBottom,
  PanelTop,
  PenLine,
  Search,
  Square,
  Table,
  Tag,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/use-document-title';

const components = [
  {
    name: 'Heading',
    description: 'Heading levels h1-h6 with theme-based sizing.',
    href: '/components/heading',
    icon: HeadingIcon,
    install: 'npx @pdfx/cli add heading',
  },
  {
    name: 'Text',
    description: 'Body text with variants and line height control.',
    href: '/components/text',
    icon: FileText,
    install: 'npx @pdfx/cli add text',
  },
  {
    name: 'Link',
    description: 'Clickable hyperlinks in PDF viewers.',
    href: '/components/link',
    icon: LinkIcon,
    install: 'npx @pdfx/cli add link',
  },
  {
    name: 'Divider',
    description: 'Horizontal rule with theme-based spacing.',
    href: '/components/divider',
    icon: Minus,
    install: 'npx @pdfx/cli add divider',
  },
  {
    name: 'PageBreak',
    description: 'Forces content to start on a new page.',
    href: '/components/page-break',
    icon: FileStack,
    install: 'npx @pdfx/cli add page-break',
  },
  {
    name: 'Stack',
    description: 'Vertical layout with theme-based gaps.',
    href: '/components/stack',
    icon: LayoutList,
    install: 'npx @pdfx/cli add stack',
  },
  {
    name: 'Section',
    description: 'Logical section with vertical spacing.',
    href: '/components/section',
    icon: PanelTop,
    install: 'npx @pdfx/cli add section',
  },
  {
    name: 'Table',
    description: 'Composable table with rows and cells.',
    href: '/components/table',
    icon: Table,
    install: 'npx @pdfx/cli add table',
  },
  {
    name: 'DataTable',
    description: 'Data-driven table from columns and data.',
    href: '/components/data-table',
    icon: Table,
    install: 'npx @pdfx/cli add data-table',
  },
  {
    name: 'List',
    description: 'Bullet, numbered, checklist, icon, multi-level, and descriptive variants.',
    href: '/components/list',
    icon: ClipboardList,
    install: 'npx @pdfx/cli add list',
  },
  {
    name: 'Card',
    description: 'Content container with default, bordered, and muted variants.',
    href: '/components/card',
    icon: Square,
    install: 'npx @pdfx/cli add card',
  },
  {
    name: 'Form',
    description: 'Label-value form section with single, two-column, and three-column layouts.',
    href: '/components/form',
    icon: LayoutList,
    install: 'npx @pdfx/cli add form',
  },
  {
    name: 'Signature',
    description: 'Signature block with single, double, and inline variants.',
    href: '/components/signature',
    icon: PenLine,
    install: 'npx @pdfx/cli add signature',
  },
  {
    name: 'PageHeader',
    description: 'Document header band with title, subtitle, and optional right metadata.',
    href: '/components/page-header',
    icon: PanelTop,
    install: 'npx @pdfx/cli add page-header',
  },
  {
    name: 'PageFooter',
    description: 'Document footer band with left, center, and right text slots.',
    href: '/components/page-footer',
    icon: PanelBottom,
    install: 'npx @pdfx/cli add page-footer',
  },
  {
    name: 'Badge',
    description: 'Compact status label with semantic color variants for PDF documents.',
    href: '/components/badge',
    icon: Tag,
    install: 'npx @pdfx/cli add badge',
  },
  {
    name: 'KeyValue',
    description: 'Labeled key-value pairs with horizontal and vertical layouts.',
    href: '/components/key-value',
    icon: List,
    install: 'npx @pdfx/cli add key-value',
  },
];

export default function ComponentsIndexPage() {
  useDocumentTitle('Components');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return components;
    const q = search.toLowerCase();
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.install.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Components</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Browse all available PDFx components. Each component is copied into your project — you own
          the code.
        </p>
      </div>

      {/* Sticky search bar */}
      <div className="sticky top-14 z-30 -mx-1 px-1 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          />
          {search && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((component) => (
          <Link
            key={component.name}
            to={component.href}
            className="group relative rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-border/80 hover:bg-muted/40 hover:shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="rounded-md bg-muted/80 p-1.5">
                <component.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight">{component.name}</h3>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/60 opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {component.description}
            </p>
            <code className="text-[10px] font-mono text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded border border-border/50">
              {component.install}
            </code>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No components found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}
