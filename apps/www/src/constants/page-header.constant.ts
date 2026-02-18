export const pageHeaderUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PageHeader } from '@/components/pdfx/pdfx-page-header';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <PageHeader
          title="Invoice #1042"
          subtitle="Acme Corp"
          rightText="March 2026"
          rightSubText="Due: 2026-03-31"
        />
        <Text>Document body content goes here.</Text>
      </Page>
    </Document>
  );
}`;

export const pageHeaderProps = [
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'Main heading / document title displayed in the header.',
  },
  {
    name: 'subtitle',
    type: 'string',
    description: 'Optional subtitle or organization name shown below the title.',
  },
  {
    name: 'rightText',
    type: 'string',
    description:
      'Text displayed on the right side of the header (e.g. date, invoice number). Ignored in centered and branded variants.',
  },
  {
    name: 'rightSubText',
    type: 'string',
    description: 'Secondary right text shown below rightText (e.g. "Due: 2026-02-28").',
  },
  {
    name: 'variant',
    type: "'simple' | 'centered' | 'minimal' | 'branded'",
    defaultValue: "'simple'",
    description:
      'Visual layout variant. simple shows left title + right meta. centered centers everything. minimal adds a primary accent border. branded uses a solid primary background.',
  },
  {
    name: 'background',
    type: 'string',
    description:
      'Custom background color. Use a theme token (e.g. "muted", "primary") or any CSS color. Applies to simple, centered, and minimal variants.',
  },
  {
    name: 'titleColor',
    type: 'string',
    description: 'Custom text color for the title. Use a theme token or CSS color.',
  },
  {
    name: 'marginBottom',
    type: 'number',
    description:
      'Bottom margin below the header before document content begins. Defaults to theme sectionGap.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults.',
  },
];
