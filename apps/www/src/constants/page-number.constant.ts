export const pageNumberUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfPageNumber } from '@/components/pdfx/page-number/pdfx-page-number';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Multi-Page Report</Heading>
        <Text>This is page content...</Text>

        {/* Fixed page number at bottom - repeats on every page */}
        <PdfPageNumber
          format="Page {page} of {total}"
          align="center"
          fixed
          style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}
        />
      </Page>
    </Document>
  );
}`;

export const pageNumberProps = [
  {
    name: 'format',
    type: 'string',
    defaultValue: "'Page {page} of {total}'",
    description:
      'Format string for the page number. Use {page} for current page and {total} for total pages.',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    defaultValue: "'center'",
    description: 'Text alignment for the page number.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md'",
    defaultValue: "'sm'",
    description: 'Size preset for the text. xs ≈ 9pt, sm ≈ 10pt, md ≈ 11pt.',
  },
  {
    name: 'fixed',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Whether the page number should be fixed (appear on every page). Use with absolute positioning.',
  },
  {
    name: 'muted',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Use muted color (mutedForeground) instead of foreground.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults.',
  },
];
