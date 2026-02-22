import { pageBreakProps, pageBreakUsageCode } from '@/constants';
import { Heading, PageBreak, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFx PageBreak Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={1}>Section 1</Heading>
      <Text>Content on first page.</Text>
      <PageBreak />
      <Heading level={1}>Section 2</Heading>
      <Text>Content on second page.</Text>
    </Page>
  </Document>
);

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
      usageCode={pageBreakUsageCode}
      usageFilename="src/components/pdfx/page-break/pdfx-page-break.tsx"
      props={pageBreakProps}
    />
  );
}
