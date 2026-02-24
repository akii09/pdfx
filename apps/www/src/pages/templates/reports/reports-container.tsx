import { type PdfxTheme, minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import { Check, ChevronRight, Code2, Eye, FileText, Layers, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Template registry files ──────────────────────────────────────────────────
import reportFinancialRegistry from '../../../../public/r/templates/report-financial.json';
import reportMarketingRegistry from '../../../../public/r/templates/report-marketing.json';
import reportOperationsRegistry from '../../../../public/r/templates/report-operations.json';
import reportSecurityRegistry from '../../../../public/r/templates/report-security.json';

// ── Component registry files ─────────────────────────────────────────────────
import badgeRegistry from '../../../../public/r/badge.json';
import dataTableRegistry from '../../../../public/r/data-table.json';
import dividerRegistry from '../../../../public/r/divider.json';
import graphRegistry from '../../../../public/r/graph.json';
import keyValueRegistry from '../../../../public/r/key-value.json';
import listRegistry from '../../../../public/r/list.json';
import pageFooterRegistry from '../../../../public/r/page-footer.json';
import pageHeaderRegistry from '../../../../public/r/page-header.json';
import sectionRegistry from '../../../../public/r/section.json';
import stackRegistry from '../../../../public/r/stack.json';
import textRegistry from '../../../../public/r/text.json';

import { CopyButton } from '../../../components/copy-button';
import { PDFPreview } from '../../../components/pdf-preview';
import {
  TemplateCodeExplorer,
  type TemplateCodeFile,
} from '../../../components/template-code-explorer';
import { useDocumentTitle } from '../../../hooks/use-document-title';
import { FinancialReportDocument } from './report-financial';
import { MarketingReportDocument } from './report-marketing';
import { OperationsReportDocument } from './report-operations';
import { SecurityReportDocument } from './report-security';

type TemplateId = 'report-financial' | 'report-operations' | 'report-security' | 'report-marketing';
type ThemePreset = 'professional' | 'modern' | 'minimal';
type ViewMode = 'preview' | 'code';

// ── Component file map ───────────────────────────────────────────────────────
// All report templates share report-layout.tsx which uses these components.
const REPORT_COMPONENT_FILES: TemplateCodeFile[] = [
  badgeRegistry,
  dataTableRegistry,
  dividerRegistry,
  graphRegistry,
  keyValueRegistry,
  listRegistry,
  pageFooterRegistry,
  pageHeaderRegistry,
  sectionRegistry,
  stackRegistry,
  textRegistry,
].flatMap((reg) =>
  reg.files.map((f) => ({
    path: (f as { path: string; content: string }).path,
    content: (f as { path: string; content: string }).content,
  }))
);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Template files only — used for the Files metadata panel. */
function toCodeFiles(
  registryFiles: Array<{ path: string; content: string }>,
  templateId: TemplateId
): TemplateCodeFile[] {
  return registryFiles.map((file) => ({
    path: file.path.replace(`templates/pdfx/${templateId}/`, ''),
    content: file.content,
  }));
}

/** All files for the code explorer (template + components). */
function toExplorerFiles(
  codeFiles: TemplateCodeFile[],
  componentFiles: TemplateCodeFile[]
): TemplateCodeFile[] {
  return [...codeFiles, ...componentFiles];
}

// ── Types ────────────────────────────────────────────────────────────────────

interface TemplateConfig {
  id: TemplateId;
  label: string;
  badge: string;
  description: string;
  layout: string;
  components: string[];
  codeFiles: TemplateCodeFile[];
  explorerFiles: TemplateCodeFile[];
  reportNumber: string;
  Component: React.ComponentType<{ theme?: PdfxTheme }>;
  downloadFilename: string;
}

// ── Template configs ─────────────────────────────────────────────────────────

const TEMPLATES: TemplateConfig[] = (() => {
  const financial = toCodeFiles(reportFinancialRegistry.files, 'report-financial');
  const operations = toCodeFiles(reportOperationsRegistry.files, 'report-operations');
  const security = toCodeFiles(reportSecurityRegistry.files, 'report-security');
  const marketing = toCodeFiles(reportMarketingRegistry.files, 'report-marketing');

  return [
    {
      id: 'report-financial' as TemplateId,
      label: 'Financial',
      badge: 'Executive',
      reportNumber: 'RPT-2026-Q1',
      description: 'Revenue, margin, and cash-focused report for finance and leadership reviews.',
      layout: 'Summary Cards · Trend · KPI Table',
      components: [
        'PageHeader',
        'PageFooter',
        'PdfGraph',
        'DataTable',
        'KeyValue',
        'Badge',
        'PdfList',
      ],
      codeFiles: financial,
      explorerFiles: toExplorerFiles(financial, REPORT_COMPONENT_FILES),
      Component: FinancialReportDocument,
      downloadFilename: 'report-financial.pdf',
    },
    {
      id: 'report-operations' as TemplateId,
      label: 'Operations',
      badge: 'Delivery',
      reportNumber: 'RPT-2026-M02',
      description:
        'Service delivery report tracking SLA health, backlog pressure, and escalations.',
      layout: 'Status Pill · Throughput Trend · Delivery Table',
      components: ['PageHeader', 'PageFooter', 'PdfGraph', 'DataTable', 'Badge', 'Section'],
      codeFiles: operations,
      explorerFiles: toExplorerFiles(operations, REPORT_COMPONENT_FILES),
      Component: OperationsReportDocument,
      downloadFilename: 'report-operations.pdf',
    },
    {
      id: 'report-security' as TemplateId,
      label: 'Security',
      badge: 'Risk',
      reportNumber: 'RPT-2026-S05',
      description:
        'Security posture report for vulnerabilities, remediation SLA, and control maturity.',
      layout: 'Risk Summary · Trendline · Risk Register',
      components: ['PageHeader', 'PageFooter', 'PdfGraph', 'DataTable', 'KeyValue', 'Badge'],
      codeFiles: security,
      explorerFiles: toExplorerFiles(security, REPORT_COMPONENT_FILES),
      Component: SecurityReportDocument,
      downloadFilename: 'report-security.pdf',
    },
    {
      id: 'report-marketing' as TemplateId,
      label: 'Growth',
      badge: 'Pipeline',
      reportNumber: 'RPT-2026-C02',
      description:
        'Marketing and growth report with MQL quality, CAC efficiency, and channel progress.',
      layout: 'Acquisition Summary · Conversion Trend · Channel Table',
      components: ['PageHeader', 'PageFooter', 'PdfGraph', 'DataTable', 'Badge', 'PdfList'],
      codeFiles: marketing,
      explorerFiles: toExplorerFiles(marketing, REPORT_COMPONENT_FILES),
      Component: MarketingReportDocument,
      downloadFilename: 'report-marketing.pdf',
    },
  ];
})();

// ── Theme metadata ────────────────────────────────────────────────────────────

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

// ── Sub-components ────────────────────────────────────────────────────────────

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
          {template.reportNumber}
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReportsContainerPage() {
  const [activeId, setActiveId] = useState<TemplateId>('report-financial');
  const [pdfTheme, setPdfTheme] = useState<ThemePreset>('professional');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const current = TEMPLATES.find((t) => t.id === activeId) ?? TEMPLATES[0];
  const installCmd = `pdfx template add ${current.id}`;

  useDocumentTitle('Report Templates');

  return (
    <div className="py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Link to="/templates" className="hover:text-foreground transition-colors">
          Templates
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Reports</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
            Report Templates
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Production-ready PDF reports for finance, operations, security, and growth teams.
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

      {/* Template cards — 2 cols on sm, 4 on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
        {TEMPLATES.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            active={activeId === t.id}
            onClick={() => setActiveId(t.id)}
          />
        ))}
      </div>

      {/* Controls bar */}
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

      {/* Preview / Code explorer */}
      <div className="rounded-xl border border-border overflow-hidden shadow-sm mb-3">
        {viewMode === 'preview' ? (
          <PDFPreview
            title={`${current.label} — ${current.reportNumber}`}
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

      {/* Metadata row */}
      <div className="flex flex-wrap gap-3">
        {/* Components used */}
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

        {/* Template files */}
        <div className="rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">Template files</span>
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
            Installs to <code className="font-mono">./src/templates/pdfx/{current.id}/</code>
          </p>
        </div>
      </div>
    </div>
  );
}
