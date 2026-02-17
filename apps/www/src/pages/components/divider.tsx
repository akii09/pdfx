import { Divider, Heading, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Divider } from '@/components/pdfx/pdfx-divider';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={2}>Section 1</Heading>
        <Text>Content here.</Text>
        <Divider />
        <Heading level={2}>Section 2</Heading>
        <Text>More content.</Text>
      </Page>
    </Document>
  );
}`;

const previewDocument = (
  <Document title="PDFX Divider Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={2}>Section 1</Heading>
      <Text>Content here.</Text>
      <Divider />
      <Heading level={2}>Section 2</Heading>
      <Text>More content.</Text>
    </Page>
  </Document>
);

const dividerProps = [
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Vertical spacing above and below. Maps to theme spacing scale.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

export default function DividerComponentPage() {
  useDocumentTitle('Divider Component');

  return (
    <ComponentPage
      title="Divider"
      description="Horizontal rule with theme-based border color and spacing."
      installCommand="npx @pdfx/cli add divider"
      componentName="divider"
      preview={
        <PDFPreview title="Preview" downloadFilename="divider-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-divider.tsx"
      props={dividerProps}
    />
  );
}
