export const textUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Text>A paragraph of body text in your PDF document.</Text>
        <Text variant="xs" color="mutedForeground">Caption text</Text>
        <Text variant="lg" weight="semibold">Lead paragraph</Text>
        <Text italic decoration="underline">Styled inline text</Text>
        <Text transform="uppercase" variant="sm">Section label</Text>
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
      "Text color. Use a theme token ('primary', 'mutedForeground', 'accent', etc.) or any CSS color string.",
  },
  {
    name: 'weight',
    type: "'normal' | 'medium' | 'semibold' | 'bold'",
    description: 'Font weight override. Defaults to the body font weight from the active theme.',
  },
  {
    name: 'italic',
    type: 'boolean',
    description: 'Renders text in italic style.',
  },
  {
    name: 'decoration',
    type: "'underline' | 'line-through' | 'none'",
    description:
      'Text decoration. Use underline for links or emphasis, line-through for strikethrough.',
  },
  {
    name: 'transform',
    type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
    description: 'Text transform. Useful for section labels and all-caps styling.',
  },
  {
    name: 'noMargin',
    type: 'boolean',
    description: 'Removes the default bottom margin added between text blocks.',
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
    description:
      'Custom @react-pdf/renderer styles to merge with defaults. Applied last, so it overrides everything.',
  },
];
