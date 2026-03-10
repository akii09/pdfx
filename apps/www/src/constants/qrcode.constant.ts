export const qrcodeUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { PdfQRCode } from '@/components/pdfx/qrcode/pdfx-qrcode';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Invoice #12345</Heading>
        <Text>Amount Due: $500.00</Text>

        {/* QR code linking to payment page */}
        <PdfQRCode
          value="https://pay.example.com/invoice/12345"
          size={100}
          caption="Scan to pay"
        />
      </Page>
    </Document>
  );
}`;

export const qrcodeExamples = {
  basic: `<PdfQRCode value="https://example.com" />`,
  styled: `<PdfQRCode
  value="https://example.com"
  size={120}
  color="primary"
  backgroundColor="muted"
  errorLevel="H"
/>`,
  ticket: `<PdfQRCode
  value="TICKET-12345-ABC"
  size={80}
  caption="Scan at entrance"
/>`,
};

export const qrcodeProps = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'The data to encode in the QR code. Can be a URL, text, or any string data.',
  },
  {
    name: 'size',
    type: 'number',
    defaultValue: '100',
    description: 'Size of the QR code in PDF points. The QR code is always square.',
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: "'foreground'",
    description:
      'Color of the QR code modules (dark squares). Can be a hex color or theme color key.',
  },
  {
    name: 'backgroundColor',
    type: 'string',
    defaultValue: "'background'",
    description:
      'Background color of the QR code. Can be a hex color, theme color key, or "transparent".',
  },
  {
    name: 'errorLevel',
    type: "'L' | 'M' | 'Q' | 'H'",
    defaultValue: "'M'",
    description:
      'Error correction level. L = ~7% recovery, M = ~15%, Q = ~25%, H = ~30%. Higher levels are more resilient but create denser codes.',
  },
  {
    name: 'margin',
    type: 'number',
    defaultValue: '2',
    description: 'Margin around the QR code in modules (not points).',
  },
  {
    name: 'caption',
    type: 'string',
    description: 'Optional caption text displayed below the QR code.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles applied to the container.',
  },
];
