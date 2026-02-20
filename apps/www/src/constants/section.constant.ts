export const sectionUsageCode = `import { Document, Page } from '@react-pdf/renderer';
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

export const sectionProps = [
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
