export const pageBreakUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { PageBreak } from '@/components/pdfx/page-break/pdfx-page-break';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Section 1</Heading>
        <Text>Content on first page.</Text>
        <PageBreak />
        <Heading level={1}>Section 2</Heading>
        <Text>Content on second page.</Text>
      </Page>
    </Document>
  );
}`;

export const pageBreakProps = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Optional elements to render before executing the break.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Additional @react-pdf/renderer styles mapped to the invisible break block.',
  },
];
