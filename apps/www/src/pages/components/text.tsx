import { Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Text>A paragraph of body text in your PDF document.</Text>
        <Text variant="xs" color="mutedForeground">Caption text</Text>
        <Text variant="lg">Lead paragraph</Text>
      </Page>
    </Document>
  );
}`;

/** Preview matches the usage code exactly */
const previewDocument = (
  <Document title="PDFX Text Preview">
    <Page size="A4" style={styles.page}>
      <Text>A paragraph of body text in your PDF document.</Text>
      <Text variant="xs" color="mutedForeground">
        Caption text
      </Text>
      <Text variant="lg">Lead paragraph</Text>
    </Page>
  </Document>
);

const textProps = [
  {
    name: 'variant',
    type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'",
    description:
      'Typography scale. Default (undefined) uses typography.body. Maps to primitives.typography.',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    description: 'Text alignment. Maps to textAlign.',
  },
  {
    name: 'color',
    type: 'string',
    description:
      "Text color. Use theme token ('primary', 'muted', 'accent', etc.) or any CSS color.",
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The text content to render',
    required: true,
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

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
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-text.tsx"
      props={textProps}
    />
  );
}
