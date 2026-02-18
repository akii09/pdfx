import { pageFooterProps, pageFooterUsageCode } from '@/constants';
import { Heading, PageFooter, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFX PageFooter Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={2}>Simple (default)</Heading>
      <Text>Left text, center text, and right text with a top border.</Text>
      <PageFooter
        leftText="© 2026 Acme Corp. All rights reserved."
        centerText="Confidential"
        rightText="Page 1 of 1"
      />

      <Heading level={2}>Centered</Heading>
      <Text>All text centered — great for formal documents.</Text>
      <PageFooter leftText="© 2026 Acme Corp" rightText="Page 1 of 1" variant="centered" />

      <Heading level={2}>Minimal</Heading>
      <Text>Subtle muted text with a thin top border.</Text>
      <PageFooter leftText="confidential@acme.com" rightText="1" variant="minimal" />

      <Heading level={2}>Branded</Heading>
      <Text>Solid primary-color band with white text.</Text>
      <PageFooter leftText="Acme Corp" rightText="Page 1" variant="branded" />
    </Page>
  </Document>
);

export default function PageFooterComponentPage() {
  useDocumentTitle('PageFooter Component');

  return (
    <ComponentPage
      title="PageFooter"
      description="Document footer band with left, center, and right text slots. Supports simple, centered, minimal, and branded variants."
      installCommand="npx @pdfx/cli add page-footer"
      componentName="page-footer"
      preview={
        <PDFPreview title="Preview" downloadFilename="page-footer-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={pageFooterUsageCode}
      usageFilename="src/components/pdfx/pdfx-page-footer.tsx"
      props={pageFooterProps}
    />
  );
}
