export const textUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Text>A paragraph of body text in your PDF document.</Text>
        <Text variant="xs" color="mutedForeground">Caption text</Text>
        <Text variant="lg">Lead paragraph</Text>
      </Page>
    </Document>
  );
}`;

export const textProps = [
  {
    name: 'variant',
    type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'",
    description:
      'Typography scale. Default (undefined) uses typography.body. Maps to primitives.typography.',
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
