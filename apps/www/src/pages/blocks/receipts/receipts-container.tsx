import { type PdfxTheme, minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import { Check, ChevronRight, Code2, Eye, FileText, Layers, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import badgeRegistry from '../../../../public/r/badge.json';
import receiptStandardRegistry from '../../../../public/r/blocks/receipt-standard.json';
import keyValueRegistry from '../../../../public/r/key-value.json';
import sectionRegistry from '../../../../public/r/section.json';
import tableRegistry from '../../../../public/r/table.json';
import textRegistry from '../../../../public/r/text.json';

import { CopyButton } from '../../../components/copy-button';
import { OpenSourceCta } from '../../../components/open-source-cta';
import { PDFPreview } from '../../../components/pdf-preview';
import {
  TemplateCodeExplorer,
  type TemplateCodeFile,
} from '../../../components/template-code-explorer';
import { useDocumentTitle } from '../../../hooks/use-document-title';
import { ReceiptStandardPreviewDocument } from './receipt-standard';

type TemplateId = 'receipt-standard';
type ThemePreset = 'professional' | 'modern' | 'minimal';
type ViewMode = 'preview' | 'code';

const RECEIPT_COMPONENT_FILES: TemplateCodeFile[] = [
  badgeRegistry,
  keyValueRegistry,
  sectionRegistry,
  tableRegistry,
  textRegistry,
].flatMap((reg) =>
  reg.files.map((f) => ({
    path: (f as { path: string; content: string }).path,
    content: (f as { path: string; content: string }).content,
  }))
);

function toCodeFiles(
  registryFiles: Array<{ path: string; content: string }>,
  templateId: TemplateId
): TemplateCodeFile[] {
  return registryFiles.map((file) => ({
    path: file.path.replace(`templates/pdfx/${templateId}/`, ''),
    content: file.content,
  }));
}

function toExplorerFiles(
  codeFiles: TemplateCodeFile[],
  componentFiles: TemplateCodeFile[]
): TemplateCodeFile[] {
  return [...codeFiles, ...componentFiles];
}

interface TemplateConfig {
  id: TemplateId;
  label: string;
  badge: string;
  description: string;
  layout: string;
  components: string[];
  codeFiles: TemplateCodeFile[];
  explorerFiles: TemplateCodeFile[];
  receiptNumber: string;
  Component: React.ComponentType<{ theme?: PdfxTheme }>;
  downloadFilename: string;
}

const TEMPLATES: TemplateConfig[] = (() => {
  const standard = toCodeFiles(receiptStandardRegistry.files, 'receipt-standard');

  return [
    {
      id: 'receipt-standard' as TemplateId,
      label: 'Standard',
      badge: 'Retail',
      description: 'Compact purchase receipt with payment status, line items, and summary totals.',
      layout: 'Compact Card · Compact Table',
      components: ['Badge', 'Table', 'KeyValue', 'Section', 'Text'],
      codeFiles: standard,
      explorerFiles: toExplorerFiles(standard, RECEIPT_COMPONENT_FILES),
      receiptNumber: 'RCPT-2026-0410',
      Component: ReceiptStandardPreviewDocument,
      downloadFilename: 'receipt-standard.pdf',
    },
  ];
})();

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
      className={`relative text-left rounded-lg border p-3 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${
            active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          }`}
        >
          {template.badge}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/60">
          {template.receiptNumber}
        </span>
      </div>
      <h3 className={`text-sm font-semibold mb-1 ${active ? 'text-primary' : 'text-foreground'}`}>
        {template.label}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{template.description}</p>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 font-mono">
        <Layers className="h-3 w-3 shrink-0" />
        <span className="truncate">{template.layout}</span>
      </div>
      {active && <div className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-primary" />}
    </button>
  );
}

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
      title={meta.description}
      className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all text-xs ${
        active
          ? 'border-primary bg-primary/5 font-medium'
          : 'border-border bg-card hover:border-primary/40 hover:bg-muted/50'
      }`}
    >
      <span
        className="shrink-0 h-3 w-3 rounded-full border border-black/10 shadow-sm"
        style={{ backgroundColor: meta.swatch }}
      />
      <span className={active ? 'text-primary' : 'text-foreground'}>{meta.label}</span>
      {active && <Check className="ml-auto h-3 w-3 text-primary" />}
    </button>
  );
}

export default function ReceiptsContainerPage() {
  const [activeId, setActiveId] = useState<TemplateId>('receipt-standard');
  const [pdfTheme, setPdfTheme] = useState<ThemePreset>('professional');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const current = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const installCmd = `npx pdfx-cli block add ${current.id}`;

  useDocumentTitle('Receipt Blocks');

  return (
    <div className="py-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Link to="/blocks" className="hover:text-foreground transition-colors">
          Blocks
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Receipts</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Receipt Blocks</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Compact PDF receipt layouts for checkout and point-of-sale flows.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-2 border border-border text-xs font-mono text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{installCmd}</span>
          <CopyButton
            value={installCmd}
            className="ml-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded p-1 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 mb-3">
        {TEMPLATES.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            active={activeId === t.id}
            onClick={() => setActiveId(t.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
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

      <div className="rounded-xl border border-border overflow-hidden shadow-sm mb-3">
        {viewMode === 'preview' ? (
          <PDFPreview
            title={`${current.label} — ${current.receiptNumber}`}
            downloadFilename={current.downloadFilename}
            height="h-[78vh]"
          >
            <current.Component theme={themeMap[pdfTheme]} />
          </PDFPreview>
        ) : (
          <TemplateCodeExplorer
            files={current.explorerFiles}
            initialPath={current.codeFiles[0]?.path}
            className="rounded-none border-0"
          />
        )}
      </div>

      <OpenSourceCta />

      <div className="flex flex-wrap gap-3 mt-3">
        <div className="rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">Components</span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground">
              {current.components.length} used
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {current.components.map((c) => (
              <code
                key={c}
                className="text-[11px] font-mono bg-muted/60 text-muted-foreground rounded px-1.5 py-0.5"
              >
                {c}
              </code>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">Block files</span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground">
              {current.codeFiles.length} files
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {current.codeFiles.map((f) => (
              <span
                key={f.path}
                className="text-[11px] font-mono text-muted-foreground bg-muted/50 rounded px-2 py-0.5 truncate"
              >
                {f.path}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            Installs to <code className="font-mono">./src/blocks/pdfx/{current.id}/</code>
          </p>
        </div>
      </div>
    </div>
  );
}
