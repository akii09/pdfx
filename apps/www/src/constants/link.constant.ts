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
    name: 'src',
    type: 'string',
    description: 'Alias for href. The destination URL this link points to.',
  },
  {
    name: 'variant',
    type: "'default' | 'primary' | 'muted'",
    defaultValue: "'primary'",
    description: 'Visual styling tier mapping to the active theme palette.',
  },
  {
    name: 'underline',
    type: "'hover' | 'always' | 'none'",
    defaultValue: "'always'",
    description:
      'Standard link decoration protocol. Note: PDF rendering engines typically fallback to static underlines natively if hovered states are unsupported.',
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    description: 'Text alignment. Maps to textAlign.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The interactive text or elements wrapping the destination.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer text styles overriding the variant colors.',
  },
];
