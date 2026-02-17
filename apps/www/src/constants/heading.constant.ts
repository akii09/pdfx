export const headingUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/pdfx-heading';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2} align="center" color="primary">Subtitle</Heading>
        <Heading level={3} style={{ color: 'navy' }}>Custom Styled</Heading>
      </Page>
    </Document>
  );
}`;

export const headingProps = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '1',
    description: 'Heading level corresponding to h1-h6 sizing',
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
    name: 'transform',
    type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
    description: 'Text transform. Common for section headers.',
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
