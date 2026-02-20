import { dividerProps, dividerUsageCode } from '@/constants';
import { Divider, Heading, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFx Divider Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={2}>Section 1</Heading>
      <Text>Content here.</Text>
      <Divider />
      <Heading level={2}>Section 2</Heading>
      <Text>More content.</Text>
      <Divider variant='dashed'/>
      <Heading level={2}>Section 3</Heading>
      <Text>More content.</Text>
      <Divider variant='dotted'/>
      <Heading level={2}>Section 4</Heading>
      <Text>More content.</Text>
      <Divider label='Section Divider' />
      <Heading level={2}>Section 5</Heading>
      <Text>More content.</Text>
    </Page>
  </Document>
);

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
      usageCode={dividerUsageCode}
      usageFilename="src/components/pdfx/pdfx-divider.tsx"
      props={dividerProps}
    />
  );
}
