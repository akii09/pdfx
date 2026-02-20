import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-48 shrink-0">
      <nav className="sticky top-20 py-8">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On This Page
        </h4>
        <ul className="space-y-1.5 border-l">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'block text-xs leading-relaxed transition-colors border-l -ml-px pl-3 py-0.5',
                  item.level > 2 && 'pl-5',
                  activeId === item.id
                    ? 'border-primary text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40'
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
