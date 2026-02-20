import { textProps, textUsageCode } from '@/constants';
import { Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

/** Preview matches the usage code exactly */
const previewDocument = (
  <Document title="PDFx Text Preview">
    <Page size="A4" style={styles.page}>
      <Text>A paragraph of body text in your PDF document.</Text>
      <Text variant="xs" color="mutedForeground">
        Caption text
      </Text>
      <Text variant="lg">Lead paragraph</Text>
    </Page>
  </Document>
);

export default function TextComponentPage() {
  useDocumentTitle('Text Component');

  return (
    <ComponentPage
      title="Text"
      description="PDF text component for body paragraphs. Renders text at 12px with 1.5 line height and 8px bottom margin."
      installCommand="npx @pdfx/cli add text"
      componentName="text"
      preview={
        <PDFPreview title="Preview" downloadFilename="text-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={textUsageCode}
      usageFilename="src/components/pdfx/pdfx-text.tsx"
      props={textProps}
    />
  );
}
