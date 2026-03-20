import { FileText, Heading, Home, Search } from 'lucide-react';

interface CommandItem {
  label: string;
  href: string;
  icon: React.ElementType;
  group: string;
  keywords?: string[];
}

export const commandItems: CommandItem[] = [
  { label: 'Home', href: '/', icon: Home, group: 'Pages', keywords: ['landing', 'overview'] },
  {
    label: 'Documentation',
    href: '/docs',
    icon: FileText,
    group: 'Pages',
    keywords: ['guide', 'docs'],
  },
  {
    label: 'Installation',
    href: '/installation',
    icon: FileText,
    group: 'Pages',
    keywords: ['setup', 'getting started'],
  },
  {
    label: 'Components',
    href: '/components',
    icon: Search,
    group: 'Pages',
    keywords: ['ui', 'library'],
  },
  { label: 'Blocks', href: '/blocks', icon: FileText, group: 'Pages', keywords: ['templates'] },

  { label: 'Heading', href: '/components/heading', icon: Heading, group: 'Components' },
  { label: 'Text', href: '/components/text', icon: FileText, group: 'Components' },
  { label: 'Link', href: '/components/link', icon: FileText, group: 'Components' },
  { label: 'Divider', href: '/components/divider', icon: FileText, group: 'Components' },
  { label: 'Page Break', href: '/components/page-break', icon: FileText, group: 'Components' },
  { label: 'Stack', href: '/components/stack', icon: FileText, group: 'Components' },
  { label: 'Section', href: '/components/section', icon: FileText, group: 'Components' },
  { label: 'Table', href: '/components/table', icon: FileText, group: 'Components' },
  {
    label: 'Data Table',
    href: '/components/data-table',
    icon: FileText,
    group: 'Components',
  },
  { label: 'List', href: '/components/list', icon: FileText, group: 'Components' },
  { label: 'Card', href: '/components/card', icon: FileText, group: 'Components' },
  { label: 'Form', href: '/components/form', icon: FileText, group: 'Components' },
  { label: 'Signature', href: '/components/signature', icon: FileText, group: 'Components' },
  {
    label: 'Page Header',
    href: '/components/page-header',
    icon: FileText,
    group: 'Components',
  },
  {
    label: 'Page Footer',
    href: '/components/page-footer',
    icon: FileText,
    group: 'Components',
  },
  { label: 'Badge', href: '/components/badge', icon: FileText, group: 'Components' },
  {
    label: 'Key Value',
    href: '/components/key-value',
    icon: FileText,
    group: 'Components',
    keywords: ['key-value', 'metadata'],
  },
  {
    label: 'Keep Together',
    href: '/components/keep-together',
    icon: FileText,
    group: 'Components',
    keywords: ['pagination', 'widow', 'orphan'],
  },
  {
    label: 'PDF Image',
    href: '/components/pdf-image',
    icon: FileText,
    group: 'Components',
    keywords: ['image'],
  },
  { label: 'Graph', href: '/components/graph', icon: FileText, group: 'Components' },
  {
    label: 'Page Number',
    href: '/components/page-number',
    icon: FileText,
    group: 'Components',
  },
  { label: 'Watermark', href: '/components/watermark', icon: FileText, group: 'Components' },
  { label: 'QRCode', href: '/components/qrcode', icon: FileText, group: 'Components' },
  { label: 'Alert', href: '/components/alert', icon: FileText, group: 'Components' },

  {
    label: 'Invoice Blocks',
    href: '/blocks/invoices',
    icon: FileText,
    group: 'Blocks',
    keywords: ['template', 'invoice'],
  },
  {
    label: 'Report Blocks',
    href: '/blocks/reports',
    icon: FileText,
    group: 'Blocks',
    keywords: ['template', 'report'],
  },
];
