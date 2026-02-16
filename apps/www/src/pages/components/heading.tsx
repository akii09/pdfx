import { Heading } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Heading } from '@/components/pdfx/pdfx-heading';

<Heading level={1}>Main Title</Heading>
<Heading level={2}>Subtitle</Heading>
<Heading level={3} style={{ color: 'navy' }}>Custom Styled</Heading>`;

const headingProps = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '1',
    description: 'Heading level corresponding to h1-h6 sizing',
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
      preview={
        <PDFPreview>
          <Document>
            <Page size="A4" style={styles.page}>
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
            </Page>
          </Document>
        </PDFPreview>
      }
      usageCode={usageCode}
      props={headingProps}
    />
  );
}
