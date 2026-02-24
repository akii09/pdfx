export const sectionUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Section } from '@/components/pdfx/section/pdfx-section';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

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
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    defaultValue: "'md'",
    description: 'Vertical spacing (margin) around the section. Maps to theme.',
  },
  {
    name: 'padding',
    type: "'none' | 'sm' | 'md' | 'lg'",
    description: 'Inner padding scale for the section.',
  },
  {
    name: 'background',
    type: 'string',
    description: 'Background color token or raw CSS color.',
  },
  {
    name: 'border',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Adds a standard border around default variant sections.',
  },
  {
    name: 'variant',
    type: "'default' | 'callout' | 'highlight' | 'card'",
    defaultValue: "'default'",
    description: 'Visual section variant with predefined styling.',
  },
  {
    name: 'accentColor',
    type: 'string',
    description: 'Accent color for callout/highlight left border.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevent section content from splitting across pages.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];
