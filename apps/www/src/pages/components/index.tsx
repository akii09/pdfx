import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  ClipboardList,
  FileStack,
  FileText,
  Hash,
  Heading as HeadingIcon,
  ImageIcon,
  LayoutList,
  Link as LinkIcon,
  List,
  Minus,
  PanelBottom,
  PanelTop,
  PenLine,
  QrCode,
  Rows3,
  Search,
  Square,
  Stamp,
  Table,
  Tag,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyButton } from '../../components/copy-button';
import { useDocumentTitle } from '../../hooks/use-document-title';
import { usePrefetch } from '../../hooks/use-prefetch';

type Category = 'All' | 'Typography' | 'Layout' | 'Data' | 'Visual' | 'Forms';

const CATEGORIES: Category[] = ['All', 'Typography', 'Layout', 'Data', 'Visual', 'Forms'];

const components = [
  {
    name: 'Alert',
    description: 'Info, success, warning, and error callout boxes with icons.',
    href: '/components/alert',
    icon: AlertTriangle,
    install: 'npx @akii09/pdfx-cli add alert',
    category: 'Data' as Category,
  },
  {
    name: 'Badge',
    description: 'Compact status label with semantic color variants for PDF documents.',
    href: '/components/badge',
    icon: Tag,
    install: 'npx @akii09/pdfx-cli add badge',
    category: 'Data' as Category,
  },
  {
    name: 'Card',
    description: 'Content container with default, bordered, and muted variants.',
    href: '/components/card',
    icon: Square,
    install: 'npx @akii09/pdfx-cli add card',
    category: 'Layout' as Category,
  },
  {
    name: 'DataTable',
    description: 'Data-driven table from columns and data.',
    href: '/components/data-table',
    icon: Table,
    install: 'npx @akii09/pdfx-cli add data-table',
    category: 'Data' as Category,
  },
  {
    name: 'Divider',
    description: 'Horizontal rule with theme-based spacing.',
    href: '/components/divider',
    icon: Minus,
    install: 'npx @akii09/pdfx-cli add divider',
    category: 'Layout' as Category,
  },
  {
    name: 'Form',
    description: 'Label-value form section with single, two-column, and three-column layouts.',
    href: '/components/form',
    icon: LayoutList,
    install: 'npx @akii09/pdfx-cli add form',
    category: 'Forms' as Category,
  },
  {
    name: 'Graph',
    description: 'Native SVG charts: bar, line, area, pie, donut, horizontal-bar.',
    href: '/components/graph',
    icon: BarChart2,
    install: 'npx @akii09/pdfx-cli add graph',
    category: 'Visual' as Category,
  },
  {
    name: 'Heading',
    description: 'Heading levels h1-h6 with theme-based sizing.',
    href: '/components/heading',
    icon: HeadingIcon,
    install: 'npx @akii09/pdfx-cli add heading',
    category: 'Typography' as Category,
  },
  {
    name: 'Image',
    description: 'Validated image component with 7 variants and format detection.',
    href: '/components/pdf-image',
    icon: ImageIcon,
    install: 'npx @akii09/pdfx-cli add pdf-image',
    category: 'Visual' as Category,
  },
  {
    name: 'KeepTogether',
    description: 'Prevent content from splitting across page boundaries.',
    href: '/components/keep-together',
    icon: Rows3,
    install: 'npx @akii09/pdfx-cli add keep-together',
    category: 'Layout' as Category,
  },
  {
    name: 'KeyValue',
    description: 'Labeled key-value pairs with horizontal and vertical layouts.',
    href: '/components/key-value',
    icon: List,
    install: 'npx @akii09/pdfx-cli add key-value',
    category: 'Data' as Category,
  },
  {
    name: 'Link',
    description: 'Clickable hyperlinks in PDF viewers.',
    href: '/components/link',
    icon: LinkIcon,
    install: 'npx @akii09/pdfx-cli add link',
    category: 'Typography' as Category,
  },
  {
    name: 'List',
    description: 'Bullet, numbered, checklist, icon, multi-level, and descriptive variants.',
    href: '/components/list',
    icon: ClipboardList,
    install: 'npx @akii09/pdfx-cli add list',
    category: 'Data' as Category,
  },
  {
    name: 'PageBreak',
    description: 'Forces content to start on a new page.',
    href: '/components/page-break',
    icon: FileStack,
    install: 'npx @akii09/pdfx-cli add page-break',
    category: 'Layout' as Category,
  },
  {
    name: 'PageFooter',
    description: 'Document footer band with left, center, and right text slots.',
    href: '/components/page-footer',
    icon: PanelBottom,
    install: 'npx @akii09/pdfx-cli add page-footer',
    category: 'Layout' as Category,
  },
  {
    name: 'PageHeader',
    description: 'Document header band with title, subtitle, and optional right metadata.',
    href: '/components/page-header',
    icon: PanelTop,
    install: 'npx @akii09/pdfx-cli add page-header',
    category: 'Layout' as Category,
  },
  {
    name: 'PageNumber',
    description: 'Dynamic page numbers with customizable format.',
    href: '/components/page-number',
    icon: Hash,
    install: 'npx @akii09/pdfx-cli add page-number',
    category: 'Layout' as Category,
  },
  {
    name: 'QRCode',
    description: 'Native SVG QR code for URLs, payments, and verification.',
    href: '/components/qrcode',
    icon: QrCode,
    install: 'npx @akii09/pdfx-cli add qrcode',
    category: 'Visual' as Category,
  },
  {
    name: 'Section',
    description: 'Logical section with vertical spacing.',
    href: '/components/section',
    icon: PanelTop,
    install: 'npx @akii09/pdfx-cli add section',
    category: 'Layout' as Category,
  },
  {
    name: 'Signature',
    description: 'Signature block with single, double, and inline variants.',
    href: '/components/signature',
    icon: PenLine,
    install: 'npx @akii09/pdfx-cli add signature',
    category: 'Forms' as Category,
  },
  {
    name: 'Stack',
    description: 'Vertical layout with theme-based gaps.',
    href: '/components/stack',
    icon: LayoutList,
    install: 'npx @akii09/pdfx-cli add stack',
    category: 'Layout' as Category,
  },
  {
    name: 'Table',
    description: 'Composable table with rows and cells.',
    href: '/components/table',
    icon: Table,
    install: 'npx @akii09/pdfx-cli add table',
    category: 'Data' as Category,
  },
  {
    name: 'Text',
    description: 'Body text with variants and line height control.',
    href: '/components/text',
    icon: FileText,
    install: 'npx @akii09/pdfx-cli add text',
    category: 'Typography' as Category,
  },
  {
    name: 'Watermark',
    description: 'Diagonal or positioned text overlay for DRAFT, CONFIDENTIAL, etc.',
    href: '/components/watermark',
    icon: Stamp,
    install: 'npx @akii09/pdfx-cli add watermark',
    category: 'Layout' as Category,
  },
];

export default function ComponentsIndexPage() {
  useDocumentTitle('Components');
  const { prefetch } = usePrefetch();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    let result = components;
    if (activeCategory !== 'All') {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.install.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  return (
    <div className="py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Components</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Browse all available PDFx components. Each component is copied into your project — you own
          the code.
        </p>
      </div>

      <div className="sticky top-14 z-30 -mx-1 px-1 pb-4 pt-2 bg-background/95 backdrop-blur-sm space-y-3">
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search components"
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
            onMouseEnter={() => prefetch(component.href)}
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
            <div className="flex items-center gap-1">
              <code className="flex-1 text-[10px] font-mono text-muted-foreground/80 bg-muted/60 px-1.5 py-0.5 rounded border border-border/50 truncate">
                {component.install}
              </code>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <CopyButton value={component.install} className="h-6 w-6 p-1 shrink-0" />
              </div>
            </div>
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
