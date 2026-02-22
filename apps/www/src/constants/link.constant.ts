export const linkUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { Link } from '@/components/pdfx/link/pdfx-link';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <Link href="https://pdfx.akashpise.dev">Documentation</Link>
        <Link href="#section-1" color="primary">Internal link</Link>
      </Page>
    </Document>
  );
}`;

export const linkProps = [
  {
    name: 'href',
    type: 'string',
    description:
      'URL or anchor ID (prefix with # for internal links). Maps to @react-pdf Link src.',
    required: true,
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
      "Text color. Use theme token ('primary', 'accent', etc.) or any CSS color. Defaults to primary.",
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The link text content',
    required: true,
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles to merge with defaults',
  },
];
