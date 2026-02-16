import { Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Text } from '@/components/pdfx/pdfx-text';

<Text>A paragraph of body text in your PDF document.</Text>
<Text style={{ fontSize: 14, color: 'gray' }}>Custom styled text.</Text>`;

const textProps = [
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
      preview={
        <PDFPreview>
          <Document>
            <Page size="A4" style={styles.page}>
              <Text>
                This is a paragraph of body text rendered using the PDFX Text component. It uses
                12px font size with 1.5 line height for comfortable reading.
              </Text>
              <Text>
                Multiple Text components stack vertically with an 8px bottom margin between each
                paragraph, creating clean document layouts.
              </Text>
              <Text style={{ color: 'gray', fontSize: 10 }}>
                Text components support custom styles for fine-grained control over typography.
              </Text>
            </Page>
          </Document>
        </PDFPreview>
      }
      usageCode={usageCode}
      props={textProps}
    />
  );
}
