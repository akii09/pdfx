import {
  Award,
  ChevronDown,
  Copy,
  Database,
  FileSpreadsheet,
  Github,
  Menu,
  Receipt,
  Search,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../theme-toggle';

// ─── Template data (Data-driven, import from @pdfx/ui) ────────────────────────

const TEMPLATES = [
  {
    icon: Receipt,
    name: 'Invoice Template',
    description: 'Data-driven invoice template. Pass data, get a complete PDF.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    isDisabled: false,
    path: '/templates/invoice-template',
  },
  {
    icon: User,
    name: 'Resume Template',
    description: 'Data-driven resume template with professional, modern, and minimal variants.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    isDisabled: false,
    path: '/templates/resume-template',
  },
  {
    icon: FileSpreadsheet,
    name: 'Report Template',
    description: 'Business or analytics report with charts and summary sections.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    isDisabled: true,
    path: '/templates/report-template',
  },
  {
    icon: Award,
    name: 'Certificate Template',
    description: 'Completion or achievement certificate with elegant layout.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    isDisabled: true,
    path: '/templates/certificate-template',
  },
];

// ─── Blocks data (Composition-based, copy-paste) ───────────────────────────────

const BLOCKS = [
  {
    icon: Receipt,
    name: 'Invoices',
    description: '6 pre-designed invoice layouts. Copy, paste, and customize.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    isDisabled: false,
    path: '/blocks/invoices',
    count: 6,
  },
  {
    icon: FileSpreadsheet,
    name: 'Reports',
    description: '4 production-ready report designs for various business needs.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    isDisabled: false,
    path: '/blocks/reports',
    count: 4,
  },
  {
    icon: User,
    name: 'Resumes',
    description: 'Professional resume layouts with multiple styles.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    isDisabled: true,
    path: '/blocks/resumes',
    count: 0,
  },
  {
    icon: Award,
    name: 'Certificates',
    description: 'Award and achievement certificate designs.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    isDisabled: true,
    path: '/blocks/certificates',
    count: 0,
  },
];

// ─── Templates dropdown (Data-driven) ────────────────────────────────────

function TemplatesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center gap-1 text-sm transition-colors',
            open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Templates
          <ChevronDown
            className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-2.5 z-[100] w-[480px] rounded-xl border bg-popover shadow-xl overflow-hidden">
            {/* Panel header */}
            <div className="px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Data-Driven Templates
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Import from{' '}
                <code className="text-[10px] bg-muted px-1 py-0.5 rounded font-mono">@pdfx/ui</code>
                , pass your data, get a complete PDF.
              </p>
            </div>

            {/* Template grid */}
            <div className="grid grid-cols-2 gap-2 p-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => {
                    if (!t.isDisabled) {
                      navigate(t.path);
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    'group flex flex-col gap-2 rounded-lg border border-border/60 bg-card p-3 text-left hover:border-border hover:bg-muted/40 hover:shadow-sm transition-all duration-150 cursor-pointer',
                    t.isDisabled && 'opacity-70 cursor-not-allowed'
                  )}
                  title={t.isDisabled ? 'Coming soon' : undefined}
                >
                  <div className={cn('rounded-md p-1.5 w-fit', t.bg)}>
                    <t.icon className={cn('h-4 w-4', t.color)} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                      {t.description}
                    </p>
                  </div>
                  {t.isDisabled && (
                    <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 border border-primary/30 rounded px-1.5 py-0.5 w-fit mt-auto">
                      Coming Soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Blocks dropdown (Composition-based) ──────────────────────────────────

function BlocksDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center gap-1 text-sm transition-colors',
            open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Blocks
          <ChevronDown
            className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-2.5 z-[100] w-[480px] rounded-xl border bg-popover shadow-xl overflow-hidden">
            {/* Panel header */}
            <div className="px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Copy className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pre-Composed Blocks
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Copy, paste, and customize. Full design ownership in your codebase.
              </p>
            </div>

            {/* Blocks grid */}
            <div className="grid grid-cols-2 gap-2 p-4">
              {BLOCKS.map((b) => (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => {
                    if (!b.isDisabled) {
                      navigate(b.path);
                      setOpen(false);
                    }
                  }}
                  className={cn(
                    'group flex flex-col gap-2 rounded-lg border border-border/60 bg-card p-3 text-left hover:border-border hover:bg-muted/40 hover:shadow-sm transition-all duration-150 cursor-pointer',
                    b.isDisabled && 'opacity-70 cursor-not-allowed'
                  )}
                  title={b.isDisabled ? 'Coming soon' : undefined}
                >
                  <div className="flex items-start justify-between">
                    <div className={cn('rounded-md p-1.5 w-fit', b.bg)}>
                      <b.icon className={cn('h-4 w-4', b.color)} />
                    </div>
                    {b.count > 0 && (
                      <span className="text-[10px] font-mono text-muted-foreground/70 bg-muted rounded px-1.5 py-0.5">
                        {b.count} designs
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight">{b.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                      {b.description}
                    </p>
                  </div>
                  {b.isDisabled && (
                    <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 border border-primary/30 rounded px-1.5 py-0.5 w-fit mt-auto">
                      Coming Soon
                    </span>
                  )}
                </button>
              ))}

              {/* Request a block card */}
              <a
                href="https://github.com/akii09/pdfx/discussions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex flex-col gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 text-left hover:border-primary/70 hover:bg-primary/10 transition-all duration-150"
              >
                <div className="rounded-md bg-primary/10 p-1.5 w-fit">
                  <Github className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight text-primary">
                    Request a Block
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    Tell us what designs you need on GitHub Discussions.
                  </p>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 border border-primary/30 rounded px-1.5 py-0.5 w-fit group-hover:bg-primary/10 transition-colors">
                  Open discussion →
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Header ─────────────────────────────────────────────────────────────────

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
      <div className="container-fluid mx-auto flex h-14 items-center justify-between px-4">
        {/* Left: Logo + primary nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <img src="/pdfx.png" alt="PDFx" className="h-10 w-auto dark:invert dark:brightness-0" />
          </Link>

          {/* Desktop primary nav — left side */}
          <nav className="hidden md:flex items-center gap-5">
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
            <TemplatesDropdown />
            <BlocksDropdown />
            {/* Theme Customizer — coming soon */}
            {/* <button
              type="button"
              disabled
              className="flex items-center gap-1.5 text-sm text-muted-foreground/50 cursor-not-allowed select-none"
              title="Theme Customizer — Coming Soon"
            >
              <Palette className="h-3.5 w-3.5" />
              Theme Customizer
              <span className="ml-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary/70 border border-primary/20">
                Soon
              </span>
            </button> */}
          </nav>
        </div>

        {/* Right: search, github, theme toggle */}
        <div className="hidden md:flex items-center gap-3">
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
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View PDFx on GitHub"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>

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
          mobileOpen ? 'max-h-[420px]' : 'max-h-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
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
          {/* Templates section (Data-driven) */}
          <div className="py-2">
            <span className="text-sm font-medium text-foreground">Templates</span>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">
              Data-driven, import from @pdfx/ui
            </p>
            <div className="mt-2 ml-3 flex flex-col gap-1 border-l border-border pl-3">
              <Link
                to="/templates/invoice-template"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-1.5 flex items-center gap-2"
              >
                <Receipt className="h-3.5 w-3.5 text-blue-500" />
                Invoice Template
              </Link>
              <Link
                to="/templates/resume-template"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-1.5 flex items-center gap-2"
              >
                <User className="h-3.5 w-3.5 text-pink-500" />
                Resume Template
              </Link>
            </div>
          </div>
          {/* Blocks section (Composition-based) */}
          <div className="py-2">
            <span className="text-sm font-medium text-foreground">Blocks</span>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">
              Copy-paste, customize in your code
            </p>
            <div className="mt-2 ml-3 flex flex-col gap-1 border-l border-border pl-3">
              <Link
                to="/blocks/invoices"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-1.5 flex items-center gap-2"
              >
                <Receipt className="h-3.5 w-3.5 text-blue-500" />
                Invoices
              </Link>
              <Link
                to="/blocks/reports"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground py-1.5 flex items-center gap-2"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                Reports
              </Link>
            </div>
          </div>
          {/* <span className="text-sm text-muted-foreground/60 py-2 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5" />
            Theme Customizer
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary/70 border border-primary/20">
              Soon
            </span>
          </span> */}
          <div className="h-px bg-border my-2" />
          <a
            href="https://github.com/akii09/pdfx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground py-2 flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <div className="py-2 flex items-center gap-2">
            <ThemeToggle />
            <span className="text-xs text-muted-foreground">Toggle theme</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
