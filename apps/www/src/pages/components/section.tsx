import { Heading, Section, Text } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 30 },
});

const usageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Section } from '@/components/pdfx/pdfx-section';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Section spacing="lg">
          <Heading level={2}>Introduction</Heading>
          <Text>This is the intro section.</Text>
        </Section>
        <Section spacing="md">
          <Heading level={2}>Details</Heading>
          <Text>More content here.</Text>
        </Section>
      </Page>
    </Document>
  );
}`;

const previewDocument = (
  <Document title="PDFX Section Preview">
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

const sectionProps = [
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Vertical spacing (margin) around the section. Maps to theme.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];

export default function SectionComponentPage() {
  useDocumentTitle('Section Component');

  return (
    <ComponentPage
      title="Section"
      description="Logical section with theme-based vertical spacing."
      installCommand="npx @pdfx/cli add section"
      componentName="section"
      preview={
        <PDFPreview title="Preview" downloadFilename="section-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={usageCode}
      usageFilename="src/components/pdfx/pdfx-section.tsx"
      props={sectionProps}
    />
  );
}
