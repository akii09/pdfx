import { type PdfxTheme, minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import { Palette } from 'lucide-react';
import { useState } from 'react';
import { PDFPreview } from '../../../components/pdf-preview';
import { useDocumentTitle } from '../../../hooks/use-document-title';
import { Invoice01Document } from './invoice01';
import { Invoice02Document } from './invoice02';
import { Invoice03Document } from './invoice03';

type InvoiceTab = 'inv-001' | 'inv-002' | 'inv-003';
type ThemePreset = 'professional' | 'modern' | 'minimal';

interface InvoiceConfig {
  id: InvoiceTab;
  title: string;
  number: string;
  Component: React.ComponentType<{ theme?: PdfxTheme }>;
  downloadFilename: string;
}

const invoiceConfigs: InvoiceConfig[] = [
  {
    id: 'inv-001',
    title: 'Invoice #INV-001',
    number: 'INV-2026-001',
    Component: Invoice01Document,
    downloadFilename: 'invoice-INV-001.pdf',
  },
  {
    id: 'inv-002',
    title: 'Invoice #INV-002',
    number: 'INV-2026-002',
    Component: Invoice02Document,
    downloadFilename: 'invoice-INV-002.pdf',
  },
  {
    id: 'inv-003',
    title: 'Invoice #INV-003',
    number: 'INV-2026-003',
    Component: Invoice03Document,
    downloadFilename: 'invoice-INV-003.pdf',
  },
];

const themeMap: Record<ThemePreset, PdfxTheme> = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
};

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-b-2 border-primary'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      }`}
    >
      {children}
    </button>
  );
}

function ThemeSelector({
  currentTheme,
  onChange,
}: {
  currentTheme: ThemePreset;
  onChange: (theme: ThemePreset) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border">
      <Palette className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">PDF Theme:</span>
      <div className="flex gap-2">
        {(['professional', 'modern', 'minimal'] as const).map((theme) => (
          <button
            key={theme}
            type="button"
            onClick={() => onChange(theme)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              currentTheme === theme
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground border border-border hover:bg-muted'
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InvoicesContainerPage() {
  const [activeTab, setActiveTab] = useState<InvoiceTab>('inv-001');
  const [pdfTheme, setPdfTheme] = useState<ThemePreset>('professional');

  const currentConfig = invoiceConfigs.find((config) => config.id === activeTab);

  useDocumentTitle('Invoices - Multiple Templates');

  if (!currentConfig) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-sm mx-auto my-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoice Templates</h1>
          <p className="text-muted-foreground">
            Browse and preview different invoices with customizable PDF themes
          </p>
        </div>

        {/* Theme Selector */}
        <div className="mb-6">
          <ThemeSelector currentTheme={pdfTheme} onChange={setPdfTheme} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {invoiceConfigs.map((config) => (
            <TabButton
              key={config.id}
              active={activeTab === config.id}
              onClick={() => setActiveTab(config.id)}
            >
              {config.number}
            </TabButton>
          ))}
        </div>

        {/* PDF Preview */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <PDFPreview
            title={`Preview - ${currentConfig.title}`}
            downloadFilename={currentConfig.downloadFilename}
            height="h-[75vh]"
          >
            <currentConfig.Component theme={themeMap[pdfTheme]} />
          </PDFPreview>
        </div>

        {/* Invoice Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {invoiceConfigs.map((config) => (
            <button
              type="button"
              key={config.id}
              onClick={() => setActiveTab(config.id)}
              className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                activeTab === config.id
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted/30 border-border hover:border-primary/50'
              }`}
            >
              <h3 className="font-semibold text-foreground mb-1">{config.number}</h3>
              <p className="text-sm text-muted-foreground">Click to view details</p>
            </button>
          ))}
        </div>

        {/* Theme Info */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-2">About PDF Themes</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Switch between professional, modern, and minimal themes to see how the PDF layout and
            styling changes dynamically. The theme affects colors, typography, spacing, and overall
            visual hierarchy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase mb-1">Professional</h4>
              <p className="text-xs text-muted-foreground">
                Serif headings, navy colors, generous margins
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase mb-1">Modern</h4>
              <p className="text-xs text-muted-foreground">
                Sans-serif, vibrant purple, tight spacing
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase mb-1">Minimal</h4>
              <p className="text-xs text-muted-foreground">
                Monospace, stark black, maximum whitespace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
