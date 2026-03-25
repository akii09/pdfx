import { watermarkProps, watermarkUsageCode } from '@/constants';
import { Heading, PdfWatermark, Text } from '@pdfx/components';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const previewDocument = (
  <Document title="PDFx Watermark Preview">
    <Page size="A4" style={styles.page}>
      <PdfWatermark text="DRAFT" />
      <Heading level={1}>Draft Document</Heading>
      <Text>This document demonstrates the PdfWatermark component.</Text>
      <Text>The diagonal "DRAFT" watermark appears behind the content.</Text>
      <Text>
        Watermarks are useful for marking documents as confidential, draft, paid, void, etc.
      </Text>
    </Page>
  </Document>
);

export default function WatermarkComponentPage() {
  useDocumentTitle('Watermark Component');

  return (
    <ComponentPage
      title="PdfWatermark"
      description="Displays a diagonal or positioned text overlay on PDF pages. Common uses include 'DRAFT', 'CONFIDENTIAL', 'PAID', 'VOID'. The watermark appears behind content and can repeat on every page using the fixed prop."
      installCommand="npx @akii09/pdfx-cli add watermark"
      componentName="watermark"
      preview={
        <PDFPreview title="Preview" downloadFilename="watermark-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={watermarkUsageCode}
      usageFilename="src/components/pdfx/watermark/pdfx-watermark.tsx"
      props={watermarkProps}
    />
  );
}
