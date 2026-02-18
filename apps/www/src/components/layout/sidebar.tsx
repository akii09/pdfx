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
    links: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs#installation' },
    ],
  },
  {
    title: 'Components',
    links: [
      { title: 'Heading', href: '/components/heading' },
      { title: 'Text', href: '/components/text' },
      { title: 'Link', href: '/components/link' },
      { title: 'Divider', href: '/components/divider' },
      { title: 'PageBreak', href: '/components/page-break' },
      { title: 'Stack', href: '/components/stack' },
      { title: 'Section', href: '/components/section' },
      { title: 'Table', href: '/components/table' },
      { title: 'DataTable', href: '/components/data-table' },
      { title: 'List', href: '/components/list' },
      { title: 'Card', href: '/components/card' },
      { title: 'Form', href: '/components/form' },
      { title: 'Signature', href: '/components/signature' },
      { title: 'PageHeader', href: '/components/page-header' },
      { title: 'PageFooter', href: '/components/page-footer' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith('/docs') || location.pathname.startsWith('/components');
  const isComponentsIndex = location.pathname === '/components';

  if (!showSidebar) return null;

  return (
    <aside className="hidden lg:block w-52 shrink-0 border-r">
      <nav className="sticky top-16 space-y-5 py-6 pr-4">
        {sections.map((section) => {
          // On the components index page, show a condensed components section
          // since the main content already displays the full component browser
          if (section.title === 'Components' && isComponentsIndex) {
            return (
              <div key={section.title}>
                <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
                <p className="px-3 text-xs text-muted-foreground/70">
                  Browse all components in the main view
                </p>
              </div>
            );
          }

          return (
            <div key={section.title}>
              <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
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
