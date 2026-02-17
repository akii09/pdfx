import { FileText, Github, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../theme-toggle';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset on pathname change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileText className="h-5 w-5" />
          PDFX
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/docs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            to="/components"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </Link>
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
            className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            Search...
            <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>
          </button>
          <a
            href="https://github.com/akii09/pdfx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View PDFX on GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          'md:hidden border-t overflow-hidden transition-all duration-200',
          mobileOpen ? 'max-h-64' : 'max-h-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-2 px-4 py-4">
          <Link
            to="/docs"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground py-2"
          >
            Docs
          </Link>
          <Link
            to="/components"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground py-2"
          >
            Components
          </Link>
          <a
            href="https://github.com/akii09/pdfx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground py-2"
          >
            GitHub
          </a>
          <div className="py-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
