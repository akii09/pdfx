import { Heading } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2} align="center" color="primary">Subtitle</Heading>
        <Heading level={3} style={{ color: 'navy' }}>Custom Styled</Heading>
      </Page>
    </Document>
  );
}`;

/** Preview matches the usage code exactly */
const previewDocument = (
  <Document title="PDFX Heading Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={1}>Main Title</Heading>
      <Heading level={2} align="center" color="primary">
        Subtitle
      </Heading>
      <Heading level={3} style={{ color: 'navy' }}>
        Custom Styled
      </Heading>
    </Page>
  </Document>
);

const headingProps = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '1',
    description: 'Heading level corresponding to h1-h6 sizing',
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
    name: 'transform',
    type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
    description: 'Text transform. Common for section headers.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The heading text content',
    required: true,
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

export default function HeadingComponentPage() {
  useDocumentTitle('Heading Component');

  return (
    <ComponentPage
      title="Heading"
      description="PDF heading component with 6 levels. Uses browser-standard heading sizes (32px for h1 down to 10.72px for h6)."
      installCommand="npx @pdfx/cli add heading"
      componentName="heading"
      preview={
        <PDFPreview title="Preview" downloadFilename="heading-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-heading.tsx"
      props={headingProps}
    />
  );
}
