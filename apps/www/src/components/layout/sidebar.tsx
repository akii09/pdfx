import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SidebarLink {
  title: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const sections: SidebarSection[] = [
  {
    title: 'Getting Started',
    links: [{ title: 'Introduction', href: '/docs' }],
  },
  {
    title: 'Installation',
    links: [{ title: 'Setup Guide', href: '/installation' }],
  },
  {
    title: 'Components',
    links: [
      { title: 'Badge', href: '/components/badge' },
      { title: 'Card', href: '/components/card' },
      { title: 'DataTable', href: '/components/data-table' },
      { title: 'Divider', href: '/components/divider' },
      { title: 'Form', href: '/components/form' },
      { title: 'Graph', href: '/components/graph' },
      { title: 'Heading', href: '/components/heading' },
      { title: 'KeepTogether', href: '/components/keep-together' },
      { title: 'KeyValue', href: '/components/key-value' },
      { title: 'Link', href: '/components/link' },
      { title: 'List', href: '/components/list' },
      { title: 'PageBreak', href: '/components/page-break' },
      { title: 'PageFooter', href: '/components/page-footer' },
      { title: 'PageHeader', href: '/components/page-header' },
      { title: 'PdfAlert', href: '/components/alert' },
      { title: 'PdfImage', href: '/components/pdf-image' },
      { title: 'PdfPageNumber', href: '/components/page-number' },
      { title: 'PdfQRCode', href: '/components/qrcode' },
      { title: 'PdfWatermark', href: '/components/watermark' },
      { title: 'Section', href: '/components/section' },
      { title: 'Signature', href: '/components/signature' },
      { title: 'Stack', href: '/components/stack' },
      { title: 'Table', href: '/components/table' },
      { title: 'Text', href: '/components/text' },
    ],
  },
  {
    title: 'Templates',
    links: [
      { title: 'Overview', href: '/templates' },
      { title: 'InvoiceTemplate', href: '/templates/invoice-template' },
      { title: 'ResumeTemplate', href: '/templates/resume-template' },
    ],
  },
  {
    title: 'Blocks',
    links: [
      { title: 'Overview', href: '/blocks' },
      { title: 'Invoices', href: '/blocks/invoices' },
      { title: 'Reports', href: '/blocks/reports' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith('/docs') ||
    location.pathname.startsWith('/components') ||
    location.pathname.startsWith('/installation') ||
    location.pathname.startsWith('/templates') ||
    location.pathname.startsWith('/blocks');
  const isComponentsIndex = location.pathname === '/components';

  if (!showSidebar) return null;

  return (
    <aside className="hidden lg:block w-52 shrink-0 border-r">
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden py-6 pr-4 scrollbar-hide">
        {sections.map((section, sectionIndex) => {
          // On the components index page, show a condensed components section
          // since the main content already displays the full component browser
          if (section.title === 'Components' && isComponentsIndex) {
            return (
              <div
                key={section.title}
                className={cn(sectionIndex > 0 && 'mt-6 pt-6 border-t border-border/60')}
              >
                {/* Section header — always rendered before the menu items */}
                <div className="mb-2 px-3 flex items-center gap-2">
                  <span className="w-1 h-3 rounded-full bg-primary/50 shrink-0" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.title}
                  </h4>
                </div>
                <p className="px-3 text-xs text-muted-foreground/70">
                  Browse all components in the main view
                </p>
              </div>
            );
          }

          return (
            <div
              key={section.title}
              className={cn(sectionIndex > 0 && 'mt-6 pt-6 border-t border-border/60')}
            >
              {/* Section header — always rendered before the menu items */}
              <div className="mb-2 px-3 flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-primary/50 shrink-0" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              </div>
              <ul className="space-y-0.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-md px-3 py-1.5 text-sm transition-colors',
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        )
                      }
                    >
                      {link.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
