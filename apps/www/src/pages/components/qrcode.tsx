import { qrcodeProps, qrcodeUsageCode } from '@/constants';
import { Heading, PdfQRCode, Section, Stack, Text } from '@pdfx/components';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const previewDocument = (
  <Document title="PDFx QRCode Preview">
    <Page size="A4" style={styles.page}>
      <Heading level={1}>Invoice #12345</Heading>
      <Text>Amount Due: $500.00</Text>

      <Section>
        <Stack direction="horizontal" gap="lg" align="start">
          <PdfQRCode
            value="https://pay.example.com/invoice/12345"
            size={100}
            caption="Scan to pay"
          />
          <PdfQRCode value="https://example.com/verify/12345" size={80} caption="Verify document" />
        </Stack>
      </Section>

      <Text>
        QR codes can encode URLs, text, or any string data. They render as crisp SVG graphics.
      </Text>
    </Page>
  </Document>
);

export default function QRCodeComponentPage() {
  useDocumentTitle('QRCode Component');

  return (
    <ComponentPage
      title="PdfQRCode"
      description="Renders a QR code using native SVG primitives. Perfect for invoices, tickets, verification docs, and payment links. The QR code is generated using the qrcode library and rendered as vector graphics for crisp output at any size."
      installCommand="npx pdfx-cli add qrcode"
      componentName="qrcode"
      preview={
        <PDFPreview title="Preview" downloadFilename="qrcode-preview.pdf">
          {previewDocument}
        </PDFPreview>
      }
      usageCode={qrcodeUsageCode}
      usageFilename="src/components/pdfx/qrcode/pdfx-qrcode.tsx"
      props={qrcodeProps}
    />
  );
}
