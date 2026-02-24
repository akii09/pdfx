export const cardUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfCard } from '@/components/pdfx/card/pdfx-card';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Default card with title */}
        <PdfCard title="Project Summary" variant="default" padding="md">
          <Text noMargin>
            This card contains grouped content with a subtle border and padding.
          </Text>
        </PdfCard>

        {/* Bordered card for emphasis */}
        <PdfCard title="Important Notice" variant="bordered" padding="md">
          <Text noMargin>
            Use the bordered variant to draw attention to key information.
          </Text>
        </PdfCard>

        {/* Muted card for secondary content */}
        <PdfCard title="Additional Notes" variant="muted" padding="md">
          <Text noMargin>
            The muted variant uses a subtle background for secondary content.
          </Text>
        </PdfCard>
      </Page>
    </Document>
  );
}`;

export const cardProps = [
  {
    name: 'variant',
    type: "'default' | 'bordered' | 'muted'",
    defaultValue: "'default'",
    description:
      'Visual style. default = 1px border, bordered = 2px emphasized border, muted = muted background fill.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Optional card title rendered above the content with a bottom border separator.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    defaultValue: '-',
    description: 'Card body content. String children are auto-wrapped in styled text.',
  },
  {
    name: 'padding',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Inner padding of the card. sm = 8pt, md = 12pt, lg = 16pt.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the card container.',
  },
  {
    name: 'wrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Allow card content to split across pages. Disabled by default.',
  },
];
