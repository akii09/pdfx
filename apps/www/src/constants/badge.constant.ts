export const badgeUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Badge } from '@/components/pdfx/pdfx-badge';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Status badges */}
        <Badge label="Paid" variant="success" />
        <Badge label="Pending" variant="warning" />
        <Badge label="Overdue" variant="destructive" />

        {/* Informational badges */}
        <Badge label="Draft" variant="default" />
        <Badge label="New" variant="primary" />
        <Badge label="Info" variant="info" />
        <Badge label="Outline" variant="outline" />

        {/* Size variants */}
        <Badge label="Small" size="sm" />
        <Badge label="Medium" size="md" />
        <Badge label="Large" size="lg" />
      </Page>
    </Document>
  );
}`;

export const badgeProps = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'The text displayed inside the badge.',
  },
  {
    name: 'variant',
    type: "'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'outline'",
    defaultValue: "'default'",
    description:
      'Visual color variant. default = neutral muted, primary = brand color, success/warning/destructive/info = semantic status colors, outline = transparent with border.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Badge size. Controls padding and font size. sm ≈ 9pt, md = 10pt, lg = 12pt.',
  },
  {
    name: 'background',
    type: 'string',
    description:
      'Custom background color override. Use a theme token (e.g. "muted", "primary") or any CSS color.',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Custom text color override. Use a theme token or any CSS color.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles applied to the badge container.',
  },
];
