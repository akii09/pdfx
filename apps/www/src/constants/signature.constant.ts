export const signatureUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfSignatureBlock } from '@/components/pdfx/signature/pdfx-signature';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        {/* Single signature */}
        <PdfSignatureBlock
          variant="single"
          label="Authorized By"
          name="John Doe"
          title="CEO, Acme Corp"
          date="15 February 2026"
        />

        {/* Double signature side by side */}
        <PdfSignatureBlock
          variant="double"
          signers={[
            { label: 'Authorized By', name: 'John Doe', title: 'CEO' },
            { label: 'Approved By', name: 'Jane Smith', title: 'CFO' },
          ]}
        />

        {/* Inline compact signature */}
        <PdfSignatureBlock
          variant="inline"
          label="Signed by"
          name="John Doe"
          date="15 February 2026"
        />
      </Page>
    </Document>
  );
}`;

export const signatureProps = [
  {
    name: 'variant',
    type: "'single' | 'double' | 'inline'",
    defaultValue: "'single'",
    description:
      'Layout variant. single = one signature block with line, name, title, date. double = two blocks side by side. inline = compact horizontal row.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: "'Authorized By'",
    description: 'Label text shown above the signature line (single and inline variants).',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: '-',
    description: 'Signer name displayed below the signature line.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Signer title or role displayed below the name (single variant).',
  },
  {
    name: 'date',
    type: 'string',
    defaultValue: '-',
    description: 'Date string displayed below the signature area.',
  },
  {
    name: 'signers',
    type: '[SignatureSigner, SignatureSigner]',
    defaultValue: '-',
    description:
      'Array of exactly 2 signers for the double variant. Each has label, name, and optional title.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the outer container.',
  },
];
