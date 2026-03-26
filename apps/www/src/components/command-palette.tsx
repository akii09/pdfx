import { Command } from 'cmdk';
import { Clock, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { commandItems as items } from '../constants';

const groupOrder = ['Pages', 'Components', 'Blocks'] as const;
const RECENT_SEARCHES_KEY = 'pdfx-recent-searches';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(search: string) {
  const recent = getRecentSearches().filter((s) => s !== search);
  const updated = [search, ...recent].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}

const exampleSearches = ['table', 'heading', 'invoice', 'graph'];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      requestAnimationFrame(() => {
        const input = dialogRef.current?.querySelector('input');
        input?.focus();
      });
    } else if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"]), a[href], [role="option"]'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  const handleSelect = useCallback(
    (href: string, searchQuery?: string) => {
      if (searchQuery) {
        saveRecentSearch(searchQuery);
        setRecentSearches(getRecentSearches());
      }
      setOpen(false);
      navigate(href);
    },
    [navigate]
  );

  const handleRecentClick = useCallback((search: string) => {
    setQuery(search);
  }, []);

  if (!open) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] bg-transparent m-0 p-0 w-full h-full max-w-full max-h-full"
      aria-label="Command palette"
    >
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        role="presentation"
      />

      <div
        ref={dialogRef}
        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg text-primary"
      >
        <Command className="rounded-xl border bg-popover shadow-2xl overflow-hidden">
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command or search..."
              className="ml-2 h-12 flex-1 bg-transparent text-sm !outline-none placeholder:text-muted-foreground"
              aria-label="Search commands"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            {!query && recentSearches.length > 0 && (
              <Command.Group heading="Recent" className="text-xs text-muted-foreground px-2 py-1.5">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    type="button"
                    onClick={() => handleRecentClick(search)}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm w-full text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {search}
                  </button>
                ))}
              </Command.Group>
            )}

            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              <p>No results found.</p>
              <p className="text-xs mt-2">
                Try:{' '}
                {exampleSearches.map((s, i) => (
                  <span key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="text-primary hover:underline"
                    >
                      {s}
                    </button>
                    {i < exampleSearches.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </Command.Empty>

            {query &&
              groupOrder.map((group) => {
                const groupItems = items.filter(
                  (item) =>
                    item.group === group &&
                    `${item.label} ${item.group} ${item.href} ${item.keywords?.join(' ') ?? ''}`
                      .toLowerCase()
                      .includes(query.toLowerCase())
                );
                if (groupItems.length === 0) return null;
                return (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="text-xs text-muted-foreground px-2 py-1.5"
                  >
                    {groupItems.map((item) => (
                      <Command.Item
                        key={item.href}
                        value={`${item.label} ${item.group} ${item.href} ${item.keywords?.join(' ') ?? ''}`}
                        onSelect={() => handleSelect(item.href, query)}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        {item.label}
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}

            {!query &&
              groupOrder.map((group) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="text-xs text-muted-foreground px-2 py-1.5"
                >
                  {items
                    .filter((item) => item.group === group)
                    .map((item) => (
                      <Command.Item
                        key={item.href}
                        value={`${item.label} ${item.group} ${item.href} ${item.keywords?.join(' ') ?? ''}`}
                        onSelect={() => handleSelect(item.href)}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm cursor-pointer data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        {item.label}
                      </Command.Item>
                    ))}
                </Command.Group>
              ))}
          </Command.List>

          <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center gap-4">
            <span>
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd>{' '}
              to close
            </span>
            <span>
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Enter
              </kbd>{' '}
              to select
            </span>
          </div>
        </Command>
      </div>
    </dialog>
  );
}
