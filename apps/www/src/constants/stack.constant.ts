export const stackUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Stack } from '@/components/pdfx/stack/pdfx-stack';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Stack gap="md">
          <Heading level={2}>Section</Heading>
          <Text>First paragraph.</Text>
          <Text>Second paragraph.</Text>
        </Stack>
      </Page>
    </Document>
  );
}`;

export const stackProps = [
  {
    name: 'gap',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    defaultValue: "'md'",
    description: 'Gap between children. Maps to theme spacing scale.',
  },
  {
    name: 'direction',
    type: "'vertical' | 'horizontal'",
    defaultValue: "'vertical'",
    description: 'Stack direction.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'stretch'",
    description: 'Cross-axis alignment.',
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between' | 'around'",
    description: 'Main-axis distribution.',
  },
  {
    name: 'wrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Enable flex-wrap for horizontal stacks.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevent stack from splitting across pages.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];
