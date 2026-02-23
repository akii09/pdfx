export const dividerUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Divider } from '@/components/pdfx/divider/pdfx-divider';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

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
    name: 'label',
    type: 'string',
    description:
      'Optional text label displayed in the center of the divider. Common for "OR", "Section N", etc.',
  },
  {
    name: 'color',
    type: 'string',
    description:
      'Line color. Use theme token (e.g. "border", "muted", "primary") or any CSS color.',
  },
  {
    name: 'variant',
    type: "'solid' | 'dashed' | 'dotted'",
    defaultValue: "'solid'",
    description: 'Line variant style.',
  },
  {
    name: 'thickness',
    type: "'thin' | 'medium' | 'thick'",
    defaultValue: "'thin'",
    description: 'Line thickness.',
  },
  {
    name: 'width',
    type: 'string | number',
    description:
      'Width of the divider line. Use a percentage string (e.g. "60%") or number (pts). Defaults to "100%".',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];
