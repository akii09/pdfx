import { pageHeaderProps, pageHeaderUsageCode } from '@/constants';
import { Heading, PageHeader, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFX PageHeader Preview">
    <Page size="A4" style={styles.page}>
      <PageHeader
        title="Invoice #1042"
        subtitle="Acme Corp"
        rightText="March 2026"
        rightSubText="Due: 2026-03-31"
      />
      <Heading level={2}>Simple (default)</Heading>
      <Text>Left title with subtitle and right metadata.</Text>

      <PageHeader title="Centered Header" subtitle="All content centered" variant="centered" />
      <Heading level={2}>Centered</Heading>
      <Text>Title and subtitle centered — great for certificates.</Text>

      <PageHeader
        title="Minimal Header"
        rightText="Page 1"
        variant="minimal"
      />
      <Heading level={2}>Minimal</Heading>
      <Text>Primary accent border with title and optional right text.</Text>

      <PageHeader title="Branded Header" subtitle="Strong brand presence" variant="branded" />
      <Heading level={2}>Branded</Heading>
      <Text>Solid primary-color background with white text.</Text>
    </Page>
  </Document>
);

export default function PageHeaderComponentPage() {
  useDocumentTitle('PageHeader Component');

  return (
    <ComponentPage
      title="PageHeader"
      description="Document header band with title, subtitle, and optional right metadata. Supports simple, centered, minimal, and branded variants."
      installCommand="npx @pdfx/cli add page-header"
      componentName="page-header"
      preview={
        <PDFPreview title="Preview" downloadFilename="page-header-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={pageHeaderUsageCode}
      usageFilename="src/components/pdfx/pdfx-page-header.tsx"
      props={pageHeaderProps}
    />
  );
}
