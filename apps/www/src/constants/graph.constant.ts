export const graphUsageCode = `import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { PdfGraph } from '@/components/pdfx/pdfx-graph';

const styles = StyleSheet.create({ page: { padding: 40 } });

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Bar chart */}
        <PdfGraph
          variant="bar"
          title="Monthly Revenue"
          data={[
            { label: 'Jan', value: 42000 },
            { label: 'Feb', value: 38000 },
            { label: 'Mar', value: 55000 },
            { label: 'Apr', value: 61000 },
            { label: 'May', value: 49000 },
            { label: 'Jun', value: 72000 },
          ]}
          showValues
        />

        {/* Line chart */}
        <PdfGraph
          variant="line"
          title="Monthly Revenue Trend"
          data={[
            { label: 'Jan', value: 42000 },
            { label: 'Feb', value: 38000 },
            { label: 'Mar', value: 55000 },
            { label: 'Apr', value: 61000 },
            { label: 'May', value: 49000 },
            { label: 'Jun', value: 72000 },
          ]}
          smooth
        />

        {/* Donut chart with center label */}
        <PdfGraph
          variant="donut"
          title="Market Share"
          data={[
            { label: 'Product A', value: 45 },
            { label: 'Product B', value: 28 },
            { label: 'Product C', value: 17 },
            { label: 'Other', value: 10 },
          ]}
          centerLabel="$1.2M"
        />
      </Page>
    </Document>
  );
}`;

export const graphProps = [
  {
    name: 'variant',
    type: "'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut'",
    defaultValue: "'bar'",
    description: 'Chart type to render.',
  },
  {
    name: 'data',
    type: 'GraphDataPoint[] | GraphSeries[]',
    required: true,
    description:
      'Single-series: array of { label, value }. Multi-series: array of { name, data[] }. Multi-series works with bar, line, and area.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Chart title rendered above the chart area.',
  },
  {
    name: 'subtitle',
    type: 'string',
    description: 'Optional subtitle or description below the title.',
  },
  {
    name: 'width',
    type: 'number',
    defaultValue: '500',
    description: 'Total chart width in PDF points.',
  },
  {
    name: 'height',
    type: 'number',
    defaultValue: '260',
    description: 'Total chart height in PDF points.',
  },
  {
    name: 'colors',
    type: 'string[]',
    description: 'Override color palette with hex values. Defaults to theme-derived colors.',
  },
  {
    name: 'showValues',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Show numeric value labels on bars or data points.',
  },
  {
    name: 'showGrid',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Show horizontal grid lines on cartesian charts.',
  },
  {
    name: 'legend',
    type: "'bottom' | 'right' | 'none'",
    defaultValue: "'bottom'",
    description: "Legend position. 'none' hides the legend. Not shown for pie/donut.",
  },
  {
    name: 'centerLabel',
    type: 'string',
    description: 'For donut variant: text displayed in the center hole.',
  },
  {
    name: 'showDots',
    type: 'boolean',
    defaultValue: 'true',
    description: 'For line/area: show dots at each data point.',
  },
  {
    name: 'smooth',
    type: 'boolean',
    defaultValue: 'false',
    description: 'For line/area: render smooth bezier curves instead of straight segments.',
  },
  {
    name: 'yTicks',
    type: 'number',
    defaultValue: '5',
    description: 'Number of Y-axis tick marks.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Keep the chart on one page. Prevents the chart from being split across pages.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer style applied to the container View.',
  },
];
