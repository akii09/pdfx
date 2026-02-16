import { Command } from 'cmdk';
import { FileText, Heading, Home, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommandItem {
  label: string;
  href: string;
  icon: React.ElementType;
  group: string;
}

const items: CommandItem[] = [
  { label: 'Home', href: '/', icon: Home, group: 'Pages' },
  { label: 'Documentation', href: '/docs', icon: FileText, group: 'Pages' },
  { label: 'Components', href: '/components', icon: Search, group: 'Pages' },
  { label: 'Heading', href: '/components/heading', icon: Heading, group: 'Components' },
  { label: 'Text', href: '/components/text', icon: FileText, group: 'Components' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

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

  // Focus trap & restore focus on close
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement;
      // Focus the input on open so keyboard users land inside the dialog
      requestAnimationFrame(() => {
        const input = dialogRef.current?.querySelector('input');
        input?.focus();
      });
    } else if (previouslyFocused.current instanceof HTMLElement) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
  }, [open]);

  // Trap Tab focus inside the dialog
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
    (href: string) => {
      setOpen(false);
      navigate(href);
    },
    [navigate]
  );

  if (!open) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] bg-transparent m-0 p-0 w-full h-full max-w-full max-h-full"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
        role="presentation"
      />

      {/* Dialog content */}
      <div ref={dialogRef} className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <Command className="rounded-xl border bg-popover shadow-2xl overflow-hidden">
          <div className="flex items-center border-b px-4">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <Command.Input
              placeholder="Type a command or search..."
              className="flex-1 h-12 bg-transparent text-sm outline-none placeholder:text-muted-foreground ml-2"
              aria-label="Search commands"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {['Pages', 'Components'].map((group) => (
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
                      value={item.label}
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
