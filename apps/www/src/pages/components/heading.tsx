import { headingProps, headingUsageCode } from '@/constants';
import { Heading } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

/** Preview matches the usage code exactly */
const previewDocument = (
  <Document title="PDFx Heading Preview">
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
      usageCode={headingUsageCode}
      usageFilename="src/components/pdfx/heading/pdfx-heading.tsx"
      props={headingProps}
    />
  );
}
