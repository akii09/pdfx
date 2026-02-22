import { stackProps, stackUsageCode } from '@/constants';
import { Divider, Heading, Stack, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFx Stack Preview">
    <Page size="A4" style={styles.page}>
      <Stack gap="md">
        <Heading level={2}>Section</Heading>
        <Text>First paragraph.</Text>
        <Text>Second paragraph.</Text>
      </Stack>
      <Divider spacing="lg" />
      <Stack gap="lg">
        <Heading level={3}>Wider gap</Heading>
        <Text>Content with larger spacing.</Text>
      </Stack>
    </Page>
  </Document>
);

export default function StackComponentPage() {
  useDocumentTitle('Stack Component');

  return (
    <ComponentPage
      title="Stack"
      description="Vertical layout with theme-based gap between children."
      installCommand="npx @pdfx/cli add stack"
      componentName="stack"
      preview={
        <PDFPreview title="Preview" downloadFilename="stack-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={stackUsageCode}
      usageFilename="src/components/pdfx/stack/pdfx-stack.tsx"
      props={stackProps}
    />
  );
}
