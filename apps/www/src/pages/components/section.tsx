import { sectionProps, sectionUsageCode } from '@/constants';
import { Heading, Section, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const previewDocument = (
  <Document title="PDFx Section Preview">
    <Page size="A4" style={styles.page}>
      <Section spacing="lg">
        <Heading level={2}>Introduction</Heading>
        <Text>This is the intro section with larger spacing.</Text>
      </Section>
      <Section spacing="md">
        <Heading level={2}>Details</Heading>
        <Text>This section uses default section gap.</Text>
      </Section>
    </Page>
  </Document>
);

export default function SectionComponentPage() {
  useDocumentTitle('Section Component');

  return (
    <ComponentPage
      title="Section"
      description="Logical section with theme-based vertical spacing."
      installCommand="npx @akii09/pdfx-cli add section"
      componentName="section"
      preview={
        <PDFPreview title="Preview" downloadFilename="section-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={sectionUsageCode}
      usageFilename="src/components/pdfx/section/pdfx-section.tsx"
      props={sectionProps}
    />
  );
}
