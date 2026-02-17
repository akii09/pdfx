export const dividerUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Divider } from '@/components/pdfx/pdfx-divider';
import { Heading } from '@/components/pdfx/pdfx-heading';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={2}>Section 1</Heading>
        <Text>Content here.</Text>
        <Divider />
        <Heading level={2}>Section 2</Heading>
        <Text>More content.</Text>
      </Page>
    </Document>
  );
}`;

export const dividerProps = [
  {
    name: 'spacing',
    type: "'none' | 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Vertical spacing above and below. Maps to theme spacing scale.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];
