export const pageFooterUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PageFooter } from '@/components/pdfx/pdfx-page-footer';
import { Text } from '@/components/pdfx/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Text>Document body content goes here.</Text>
        <PageFooter
          leftText="© 2026 Acme Corp. All rights reserved."
          centerText="Confidential"
          rightText="Page 1 of 1"
        />
      </Page>
    </Document>
  );
}`;

export const pageFooterProps = [
  {
    name: 'leftText',
    type: 'string',
    description:
      'Left-aligned footer text (or center text in centered variant). Common use: company name, copyright notice.',
  },
  {
    name: 'rightText',
    type: 'string',
    description:
      'Right-aligned footer text. Common use: page numbers, document reference. Ignored in centered variant.',
  },
  {
    name: 'centerText',
    type: 'string',
    description:
      'Optional center text appearing between left and right columns. Only shown in simple and minimal variants.',
  },
  {
    name: 'variant',
    type: "'simple' | 'centered' | 'branded' | 'minimal'",
    defaultValue: "'simple'",
    description:
      'Visual layout variant. simple shows left/center/right columns with a top border. centered stacks text centered. branded uses a solid primary background. minimal uses a subtle muted style.',
  },
  {
    name: 'background',
    type: 'string',
    description:
      'Custom background color for the footer band. Use a theme token (e.g. "muted", "primary") or any CSS color.',
  },
  {
    name: 'textColor',
    type: 'string',
    description: 'Custom text color override for all footer text. Use a theme token or CSS color.',
  },
  {
    name: 'marginTop',
    type: 'number',
    description:
      'Top margin above the footer (space between content and footer). Defaults to theme sectionGap.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults.',
  },
];
