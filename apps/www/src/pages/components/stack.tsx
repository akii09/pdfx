import { Divider, Heading, Stack, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Stack } from '@/components/pdfx/pdfx-stack';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Stack gap="md">
          <Heading level={2}>Section</Heading>
          <Text>First paragraph.</Text>
          <Text>Second paragraph.</Text>
        </Stack>
      </Page>
    </Document>
  );
}`;

const previewDocument = (
  <Document title="PDFX Stack Preview">
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

const stackProps = [
  {
    name: 'gap',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Gap between children. Maps to theme spacing scale.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

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
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-stack.tsx"
      props={stackProps}
    />
  );
}
