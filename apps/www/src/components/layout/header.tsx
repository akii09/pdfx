import {
  Award,
  ChevronDown,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Github,
  GraduationCap,
  Mail,
  Menu,
  MessageSquarePlus,
  Palette,
  Receipt,
  Search,
  User,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ThemeToggle } from '../theme-toggle';

// ─── Template data ─────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    icon: Receipt,
    name: 'Invoice',
    description: 'Professional billing invoice with itemized table and totals.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: FileSpreadsheet,
    name: 'Reports',
    description: 'Business or analytics report with charts and summary sections.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    icon: Award,
    name: 'Certificate',
    description: 'Completion or achievement certificate with elegant layout.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
  },
  {
    icon: ClipboardList,
    name: 'Registration Form',
    description: 'Structured registration or enrollment form with field sections.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
  },
  {
    icon: Mail,
    name: 'Letter',
    description: 'Formal business letter with header, body, and signature block.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
  },
  {
    icon: User,
    name: 'Resume',
    description: 'Clean single-page resume with skills, experience, and education.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
  },
  {
    icon: GraduationCap,
    name: 'Academic Report',
    description: 'Student or course progress report with grade tables.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
  },
  {
    icon: FileText,
    name: 'Proposal',
    description: 'Project or business proposal with sections and timeline.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
  },
];

// ─── Request modal ─────────────────────────────────────────────────────────

function TemplateRequestModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open a pre-filled GitHub issue as the submission mechanism
    const title = encodeURIComponent(`[Template Request] ${name}`);
    const body = encodeURIComponent(
      `**Template Name:** ${name}\n\n**What should it include:**\n${description}${email ? `\n\n**Contact email:** ${email}` : ''}`
    );
    window.open(
      `https://github.com/akii09/pdfx/issues/new?title=${title}&body=${body}&labels=template-request`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={handleOverlayClick}
      onKeyDown={undefined}
    >
      <div className="relative w-full max-w-md rounded-xl border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="rounded-md bg-primary/10 p-1.5">
              <MessageSquarePlus className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-base font-semibold">Request a Template</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <MessageSquarePlus className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="font-semibold mb-1">Request submitted!</p>
            <p className="text-sm text-muted-foreground">
              Your GitHub issue has been opened. We'll review the request soon.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Don't see the template you need? Describe it and we'll add it to the roadmap.
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tmpl-name" className="text-sm font-medium">
                Template name <span className="text-destructive">*</span>
              </label>
              <input
                id="tmpl-name"
                type="text"
                required
                placeholder="e.g. Purchase Order, Lease Agreement…"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tmpl-desc" className="text-sm font-medium">
                What should it include? <span className="text-destructive">*</span>
              </label>
              <textarea
                id="tmpl-desc"
                required
                rows={3}
                placeholder="Describe the sections, fields, or features you need…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tmpl-email" className="text-sm font-medium">
                Email{' '}
                <span className="text-muted-foreground font-normal">(optional — for updates)</span>
              </label>
              <input
                id="tmpl-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Submit via GitHub
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Templates dropdown ─────────────────────────────────────────────────────

function TemplatesDropdown() {
  const [open, setOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
          <div className="absolute left-0 top-full mt-2.5 z-[100] w-[640px] rounded-xl border bg-popover shadow-xl overflow-hidden">
            {/* Panel header */}
            <div className="px-4 py-3 border-b bg-muted/30">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                PDF Templates
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy-paste ready document templates built on PDFx components.
              </p>
            </div>

            {/* Template grid */}
            <div className="grid grid-cols-3 gap-2 p-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="group flex flex-col gap-2 rounded-lg border border-border/60 bg-card p-3 text-left hover:border-border hover:bg-muted/40 hover:shadow-sm transition-all duration-150 cursor-not-allowed opacity-70"
                  title="Coming soon"
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
                  <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/60 border border-border/50 rounded px-1.5 py-0.5 w-fit">
                    Coming soon
                  </span>
                </button>
              ))}

              {/* Request a template card */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setRequestOpen(true);
                }}
                className="group flex flex-col gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 text-left hover:border-primary/70 hover:bg-primary/10 transition-all duration-150"
              >
                <div className="rounded-md bg-primary/10 p-1.5 w-fit">
                  <MessageSquarePlus className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight text-primary">
                    Request a Template
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    Don't see what you need? Tell us and we'll build it.
                  </p>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-wider text-primary/70 border border-primary/30 rounded px-1.5 py-0.5 w-fit group-hover:bg-primary/10 transition-colors">
                  Open a request →
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {requestOpen && <TemplateRequestModal onClose={() => setRequestOpen(false)} />}
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
            {/* Theme Customizer — coming soon */}
            <button
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
            </button>
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
          mobileOpen ? 'max-h-80' : 'max-h-0'
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
          <span className="text-sm text-muted-foreground/60 py-2 flex items-center gap-1.5">
            Templates
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground border border-border">
              Soon
            </span>
          </span>
          <span className="text-sm text-muted-foreground/60 py-2 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5" />
            Theme Customizer
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary/70 border border-primary/20">
              Soon
            </span>
          </span>
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
