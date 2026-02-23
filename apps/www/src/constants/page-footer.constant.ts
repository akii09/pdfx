export const pageFooterUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PageFooter } from '@/components/pdfx/page-footer/pdfx-page-footer';
import { Text } from '@/components/pdfx/text/pdfx-text';

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
      'Left-aligned footer text (or center text in centered variant). Common use: company name, copyright notice. In the detailed variant, used as the company name (bold).',
  },
  {
    name: 'rightText',
    type: 'string',
    description:
      'Right-aligned footer text. Common use: page numbers, document reference. Ignored in centered variant. In the detailed variant, shown centered at the bottom as the page number.',
  },
  {
    name: 'centerText',
    type: 'string',
    description:
      'Optional center text appearing between left and right columns. Only shown in simple and minimal variants.',
  },
  {
    name: 'variant',
    type: "'simple' | 'centered' | 'branded' | 'minimal' | 'three-column' | 'detailed'",
    defaultValue: "'simple'",
    description:
      'Visual layout variant. simple = left/center/right columns with a top border. centered = text stacked centered. branded = solid primary background. minimal = subtle muted style. three-column = company left, contact info center, page number right. detailed = two-row layout with company + contact info on top and page number centered below.',
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
    name: 'sticky',
    type: 'boolean',
    description:
      'If true, the footer will be anchored to the bottom of the page with absolute positioning. Requires pagePadding to be set to avoid overlap with page content.',
  },
  {
    name: 'pagePadding',
    type: 'number',
    description:
      'Horizontal padding to apply when the footer is sticky. Should match the page padding to ensure proper alignment.',
  },
  {
    name: 'address',
    type: 'string',
    description:
      'Company address for three-column and detailed variants. Shown below the company name in the left column.',
  },
  {
    name: 'phone',
    type: 'string',
    description:
      'Phone number for three-column and detailed variants. Shown in the center (three-column) or right (detailed) column.',
  },
  {
    name: 'email',
    type: 'string',
    description:
      'Email address for three-column and detailed variants. Shown in the center (three-column) or right (detailed) column.',
  },
  {
    name: 'website',
    type: 'string',
    description:
      'Website URL for three-column and detailed variants. Shown in the center (three-column) or right (detailed) column.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults.',
  },
  {
    name: 'fixed',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Fix the footer to the bottom of each page.',
  },
  {
    name: 'noWrap',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Prevent inline footer blocks from splitting across pages.',
  },
];
