import { pageNumberProps, pageNumberUsageCode } from '@/constants';
import { Heading, PdfPageNumber, Text } from '@pdfx/components';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40, position: 'relative' },
  content: { marginBottom: 60 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40 },
});

const previewDocument = (
  <Document title="PDFx PageNumber Preview">
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Heading level={1}>Multi-Page Report</Heading>
        <Text>This demonstrates the PdfPageNumber component.</Text>
        <Text>The page number appears at the bottom of the page.</Text>
      </View>
      <View style={styles.footer}>
        <PdfPageNumber format="Page {page} of {total}" align="center" />
      </View>
    </Page>
  </Document>
);

export default function PageNumberComponentPage() {
  useDocumentTitle('PageNumber Component');

  return (
    <ComponentPage
      title="PdfPageNumber"
      description="Displays page numbers with customizable format like 'Page X of Y'. Uses react-pdf's render prop internally to access dynamic page information. Supports the fixed prop for repeating on every page."
      installCommand="npx @akii09/pdfx-cli add page-number"
      componentName="page-number"
      preview={
        <PDFPreview title="Preview" downloadFilename="page-number-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={pageNumberUsageCode}
      usageFilename="src/components/pdfx/page-number/pdfx-page-number.tsx"
      props={pageNumberProps}
    />
  );
}
