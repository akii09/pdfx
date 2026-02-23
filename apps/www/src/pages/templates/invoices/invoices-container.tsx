import { type PdfxTheme, minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import { Check, ChevronRight, Code2, Eye, FileText, Layers, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import invoice01Registry from '../../../../public/r/templates/invoice-classic.json';
import invoice03Registry from '../../../../public/r/templates/invoice-minimal.json';
import invoice02Registry from '../../../../public/r/templates/invoice-modern.json';
import { CodeBlock } from '../../../components/code-block';
import { CopyButton } from '../../../components/copy-button';
import { PDFPreview } from '../../../components/pdf-preview';
import { useDocumentTitle } from '../../../hooks/use-document-title';
import { Invoice01Document } from './invoice01';
import { Invoice02Document } from './invoice02';
import { Invoice03Document } from './invoice03';

const invoice01Source = invoice01Registry.files.find((f) => f.path.endsWith('.tsx'))?.content ?? '';
const invoice02Source = invoice02Registry.files.find((f) => f.path.endsWith('.tsx'))?.content ?? '';
const invoice03Source = invoice03Registry.files.find((f) => f.path.endsWith('.tsx'))?.content ?? '';

type TemplateId = 'invoice-classic' | 'invoice-modern' | 'invoice-minimal';
type ThemePreset = 'professional' | 'modern' | 'minimal';
type ViewMode = 'preview' | 'code';

interface TemplateConfig {
  id: TemplateId;
  label: string;
  badge: string;
  description: string;
  layout: string;
  components: string[];
  files: string[];
  invoiceNumber: string;
  source: string;
  Component: React.ComponentType<{ theme?: PdfxTheme }>;
  downloadFilename: string;
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: 'invoice-classic',
    label: 'Classic',
    badge: 'Professional',
    description: 'Logo-left header with three-column billing info, zebra-striped grid table.',
    layout: 'Logo Left · Grid Table',
    components: ['PageHeader', 'Section', 'Table', 'KeyValue', 'PageFooter', 'Text', 'PdfImage'],
    files: ['invoice-classic.tsx', 'invoice-classic.types.ts'],
    invoiceNumber: 'INV-2026-001',
    source: invoice01Source,
    Component: Invoice01Document,
    downloadFilename: 'invoice-classic.pdf',
  },
  {
    id: 'invoice-modern',
    label: 'Modern',
    badge: 'Branded',
    description: 'Full-width branded banner, horizontal meta strip, primary-header table.',
    layout: 'Branded Banner · Primary Header Table',
    components: ['PageHeader', 'Section', 'Table', 'KeyValue', 'PageFooter', 'Text'],
    files: ['invoice-modern.tsx', 'invoice-modern.types.ts'],
    invoiceNumber: 'INV-2026-002',
    source: invoice02Source,
    Component: Invoice02Document,
    downloadFilename: 'invoice-modern.pdf',
  },
  {
    id: 'invoice-minimal',
    label: 'Minimal',
    badge: 'Clean',
    description: 'Minimal underline header, inline invoice stamp, compact table layout.',
    layout: 'Minimal · Compact Table',
    components: ['PageHeader', 'Section', 'Table', 'KeyValue', 'PageFooter', 'Text'],
    files: ['invoice-minimal.tsx', 'invoice-minimal.types.ts'],
    invoiceNumber: 'INV-2026-003',
    source: invoice03Source,
    Component: Invoice03Document,
    downloadFilename: 'invoice-minimal.pdf',
  },
];

const THEME_META: Record<
  ThemePreset,
  { label: string; description: string; swatch: string; accent: string }
> = {
  professional: {
    label: 'Professional',
    description: 'Serif headings, navy palette, generous margins',
    swatch: professionalTheme.colors.primary,
    accent: professionalTheme.colors.accent,
  },
  modern: {
    label: 'Modern',
    description: 'Sans-serif, vibrant purple, tight spacing',
    swatch: modernTheme.colors.primary,
    accent: modernTheme.colors.accent,
  },
  minimal: {
    label: 'Minimal',
    description: 'Monospace, stark black, maximum whitespace',
    swatch: minimalTheme.colors.primary,
    accent: minimalTheme.colors.accent,
  },
};

const themeMap: Record<ThemePreset, PdfxTheme> = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
};

// ─── Template card ─────────────────────────────────────────────────────────

function TemplateCard({
  template,
  active,
  onClick,
}: {
  template: TemplateConfig;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-xl border p-4 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
            active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          }`}
        >
          {template.badge}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/70">
          {template.invoiceNumber}
        </span>
      </div>
      <h3 className={`text-sm font-semibold mb-1 ${active ? 'text-primary' : 'text-foreground'}`}>
        {template.label}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{template.description}</p>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70 font-mono">
        <Layers className="h-3 w-3 shrink-0" />
        <span>{template.layout}</span>
      </div>
      {active && <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary" />}
    </button>
  );
}

// ─── Theme swatch button ──────────────────────────────────────────────────

function ThemeSwatch({
  preset,
  active,
  onClick,
}: {
  preset: ThemePreset;
  active: boolean;
  onClick: () => void;
}) {
  const meta = THEME_META[preset];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left transition-all text-xs ${
        active
          ? 'border-primary bg-primary/5 font-medium'
          : 'border-border bg-card hover:border-primary/40 hover:bg-muted/50'
      }`}
    >
      <span
        className="shrink-0 h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
        style={{ backgroundColor: meta.swatch }}
      />
      <span className={active ? 'text-primary' : 'text-foreground'}>{meta.label}</span>
      {active && <Check className="ml-auto h-3 w-3 text-primary" />}
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function InvoicesContainerPage() {
  const [activeId, setActiveId] = useState<TemplateId>('invoice-classic');
  const [pdfTheme, setPdfTheme] = useState<ThemePreset>('professional');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const current = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const installCmd = `pdfx template add ${current.id}`;

  useDocumentTitle('Invoice Templates');

  return (
    <div className="py-8">
      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link to="/templates" className="hover:text-foreground transition-colors">
          Templates
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Invoices</span>
      </nav>

      {/* ── Page header ───────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1.5">
            Invoice Templates
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Ready-to-use PDF invoice layouts built with{' '}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">@pdfx/ui</code>. Pick
            a style, choose a theme, copy the install command.
          </p>
        </div>
        {/* Install command pill */}
        <div className="shrink-0 flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-2 border border-border text-xs font-mono text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{installCmd}</span>
          <CopyButton
            value={installCmd}
            className="ml-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded p-1 transition-colors"
          />
        </div>
      </div>

      {/* ── Template selector cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {TEMPLATES.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            active={activeId === t.id}
            onClick={() => setActiveId(t.id)}
          />
        ))}
      </div>

      {/* ── Toolbar: Preview/Code tabs + Theme swatches ───────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        {/* Tab toggle */}
        <div className="flex items-center gap-1 bg-muted/60 rounded-lg p-0.5 border border-border">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'preview'
                ? 'bg-background text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'code'
                ? 'bg-background text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {/* Theme swatches — only meaningful in preview */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mr-1">
            Theme
          </span>
          {(Object.keys(THEME_META) as ThemePreset[]).map((preset) => (
            <ThemeSwatch
              key={preset}
              preset={preset}
              active={pdfTheme === preset}
              onClick={() => setPdfTheme(preset)}
            />
          ))}
        </div>
      </div>

      {/* ── Preview / Code panel ──────────────────────────────────── */}
      <div className="rounded-xl border border-border overflow-hidden shadow-sm mb-5">
        {viewMode === 'preview' ? (
          <PDFPreview
            title={`${current.label} — ${current.invoiceNumber}`}
            downloadFilename={current.downloadFilename}
            height="h-[78vh]"
          >
            <current.Component theme={themeMap[pdfTheme]} />
          </PDFPreview>
        ) : (
          <CodeBlock
            code={current.source}
            filename={`${current.id}.tsx`}
            language="tsx"
            className="rounded-none border-0 max-h-[78vh] overflow-auto"
          />
        )}
      </div>

      {/* ── Details: Components + Files ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Components used */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Components</h3>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {current.components.length} used
            </span>
          </div>
          <ul className="space-y-1">
            {current.components.map((c) => (
              <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                <code className="font-mono">{c}</code>
              </li>
            ))}
          </ul>
        </div>

        {/* Files generated */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Files</h3>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {current.files.length} files
            </span>
          </div>
          <ul className="space-y-1.5">
            {current.files.map((f) => (
              <li
                key={f}
                className="text-xs font-mono text-muted-foreground bg-muted/50 rounded px-2 py-1"
              >
                {f}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-muted-foreground/70 mt-3 leading-relaxed">
            Installed to <code className="font-mono">./src/templates/pdfx/{current.id}/</code>
          </p>
        </div>
      </div>
    </div>
  );
}
