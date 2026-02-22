import { graphProps, graphUsageCode } from '@/constants';
import { PdfGraph } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

type GraphVariant = 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const monthlyData = [
  { label: 'Jan', value: 42000 },
  { label: 'Feb', value: 38000 },
  { label: 'Mar', value: 55000 },
  { label: 'Apr', value: 61000 },
  { label: 'May', value: 49000 },
  { label: 'Jun', value: 72000 },
];

const marketShareData = [
  { label: 'Product A', value: 45 },
  { label: 'Product B', value: 28 },
  { label: 'Product C', value: 17 },
  { label: 'Other', value: 10 },
];

const departmentData = [
  { label: 'Engineering', value: 42 },
  { label: 'Marketing', value: 18 },
  { label: 'Sales', value: 31 },
  { label: 'HR', value: 9 },
];

function getDataForVariant(variant: GraphVariant) {
  if (variant === 'pie' || variant === 'donut') return marketShareData;
  if (variant === 'horizontal-bar') return departmentData;
  return monthlyData;
}

function getTitleForVariant(variant: GraphVariant): string {
  const titles: Record<GraphVariant, string> = {
    bar: 'Monthly Revenue',
    'horizontal-bar': 'Team Headcount by Department',
    line: 'Monthly Revenue Trend',
    area: 'Revenue Over Time',
    pie: 'Market Share',
    donut: 'Market Share',
  };
  return titles[variant];
}

const renderPreviewDocument = (variant: GraphVariant) => (
  <Document title="PDFx Graph Preview">
    <Page size="A4" style={styles.page}>
      <PdfGraph
        variant={variant}
        title={getTitleForVariant(variant)}
        subtitle="FY 2025"
        data={getDataForVariant(variant)}
        showValues={variant === 'bar' || variant === 'horizontal-bar'}
        centerLabel={variant === 'donut' ? '$1.2M' : undefined}
        smooth={variant === 'line' || variant === 'area'}
        width={480}
        height={260}
      />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'bar' as GraphVariant, label: 'Bar' },
  { value: 'horizontal-bar' as GraphVariant, label: 'Horizontal Bar' },
  { value: 'line' as GraphVariant, label: 'Line' },
  { value: 'area' as GraphVariant, label: 'Area' },
  { value: 'pie' as GraphVariant, label: 'Pie' },
  { value: 'donut' as GraphVariant, label: 'Donut' },
];

export default function GraphComponentPage() {
  useDocumentTitle('Graph Component');

  return (
    <ComponentPage
      title="Graph"
      description="Native SVG charts rendered inside react-pdf documents — no external charting libraries required. Supports bar, horizontal-bar, line, area, pie, and donut variants. All rendering uses react-pdf's built-in SVG primitives for crisp vector output at any PDF resolution."
      installCommand="npx @pdfx/cli add graph"
      componentName="graph"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="graph-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'bar' as GraphVariant,
            label: 'Chart type',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={graphUsageCode}
      usageFilename="src/components/pdfx/graph/pdfx-graph.tsx"
      props={graphProps}
      additionalInfo={
        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Chart Variant Guide</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">bar</strong> — Compare values across
                  categories. Supports multi-series side-by-side groups.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">horizontal-bar</strong> — Best for long
                  category names or rankings. Single-series only.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">line</strong> — Trends over time. Use{' '}
                  <code className="font-mono text-xs">smooth</code> for bezier curves.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">area</strong> — Like line but with filled
                  area. Good for volume or cumulative metrics.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">•</span>
                <span>
                  <strong className="text-foreground">pie / donut</strong> — Part-to-whole
                  proportions. Donut accepts a{' '}
                  <code className="font-mono text-xs">centerLabel</code> (e.g. total value).
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="text-sm font-semibold mb-2">Multi-Series Example</h3>
            <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
              {`<PdfGraph
  variant="bar"
  data={[
    { name: 'Revenue', data: [{ label: 'Q1', value: 42000 }, ...] },
    { name: 'Expenses', data: [{ label: 'Q1', value: 28000 }, ...] },
  ]}
/>`}
            </pre>
          </div>
          <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4">
            <h3 className="text-sm font-semibold mb-1 text-amber-900 dark:text-amber-200">
              SVG Limitations in react-pdf
            </h3>
            <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-300">
              <li>• No CSS filters, drop shadows, or blur effects</li>
              <li>• No animations (PDFs are static)</li>
              <li>• SVG text uses SVG font attributes, not StyleSheet fonts</li>
              <li>• RadialGradient support is limited — use LinearGradient</li>
              <li>• Keep bar charts under ~20 categories for readability</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
