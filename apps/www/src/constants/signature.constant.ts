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

        {/* Three signature places, arranged in two columns */}
        <PdfSignatureBlock
          variant="double"
          count={3}
          signers={[
            { label: 'Authorized By', name: 'John Doe', title: 'CEO' },
            { label: 'Approved By', name: 'Jane Smith', title: 'CFO' },
            { label: 'Witness', name: 'Alex Lee', title: 'Witness' },
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
      'Layout variant. single = one signature block with line, name, title, date. double = 2–4 signature blocks, arranged in rows of up to two. inline = compact horizontal row.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: "'Signature'",
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
    name: 'count',
    type: '2 | 3 | 4',
    defaultValue: 'signers.length or 2',
    description:
      'Number of signature places in the double variant. Additional signers appear in a second row, with up to two signers per row.',
  },
  {
    name: 'signers',
    type: '2–4 SignatureSigner entries',
    defaultValue: '-',
    description:
      'Signer details for the double variant. Each entry can include a label, name, title, and date. When count is larger than the provided array, remaining places use default labels.',
  },
  {
    name: 'style',
    type: 'Style',
    defaultValue: '-',
    description: 'Custom @react-pdf/renderer styles applied to the outer container.',
  },
];
