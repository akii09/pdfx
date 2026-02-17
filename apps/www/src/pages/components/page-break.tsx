import { Heading, PageBreak, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { PageBreak } from '@/components/pdfx/pdfx-page-break';
import { Text } from '@/components/pdfx/pdfx-text';

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

const previewDocument = (
  <Document title="PDFX PageBreak Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={1}>Section 1</Heading>
      <Text>Content on first page.</Text>
      <PageBreak />
      <Heading level={1}>Section 2</Heading>
      <Text>Content on second page.</Text>
    </Page>
  </Document>
);

const pageBreakProps = [
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

export default function PageBreakComponentPage() {
  useDocumentTitle('PageBreak Component');

  return (
    <ComponentPage
      title="PageBreak"
      description="Forces content after it to start on a new page. Wraps @react-pdf View with break prop."
      installCommand="npx @pdfx/cli add page-break"
      componentName="page-break"
      preview={
        <PDFPreview title="Preview" downloadFilename="page-break-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-page-break.tsx"
      props={pageBreakProps}
    />
  );
}
