export const headingUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2} align="center" color="primary">Subtitle</Heading>
        <Heading level={3} weight="medium" tracking="wide">Section</Heading>
        <Heading level={4} transform="uppercase">Label</Heading>
        <Heading level={1} keepWithNext>Stays with next paragraph</Heading>
      </Page>
    </Document>
  );
}`;

export const headingProps = [
  {
    name: 'level',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '1',
    description:
      'Heading level corresponding to h1–h6 sizing. Controls font size, weight, and spacing.',
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
    description:
      'Font weight override. Defaults to the heading font weight set by the active theme.',
  },
  {
    name: 'tracking',
    type: "'tighter' | 'tight' | 'normal' | 'wide' | 'wider'",
    description: 'Letter spacing. Use wide or wider for uppercase section labels.',
  },
  {
    name: 'transform',
    type: "'uppercase' | 'lowercase' | 'capitalize' | 'none'",
    description: 'Text transform. Common for section headers and eyebrow labels.',
  },
  {
    name: 'noMargin',
    type: 'boolean',
    description: 'Removes the default bottom margin added below headings.',
  },
  {
    name: 'keepWithNext',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Prevents the heading from being stranded at the bottom of a page without content following it. Equivalent to CSS widow/orphan control. Enabled by default.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The heading text content.',
    required: true,
  },
  {
    name: 'style',
    type: 'Style',
    description:
      'Custom @react-pdf/renderer styles to merge with defaults. Applied last, so it overrides everything.',
  },
];
