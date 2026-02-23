import {
  KeyValue,
  PageFooter,
  PageHeader,
  PdfImage,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { PDFPreview } from '../../../components/pdf-preview';
import { useDocumentTitle } from '../../../hooks/use-document-title';
import type { invoiceDetailsType } from './invoice01.type';

const styles = StyleSheet.create({
  page: { padding: 25, paddingBottom: 55 },
});
const invoiceDetails: invoiceDetailsType = {
  invoiceNumber: 'INV-2026-001',
  invoiceDate: 'February 17, 2026',
  dueDate: 'March 17, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Innovative PDF Solutions',
  companyAddress: 'Nagpur, IN',
  billTo: {
    name: 'Client Corp.',
    address: '456 Client Ave, Suite 2',
    email: 'contact@clientcorp.com',
    phone: '+1 (555) 123-4567',
  },
  items: [
    { description: 'Web Development', quantity: 1, unitPrice: 12500 },
    { description: 'UI/UX Design', quantity: 1, unitPrice: 8750 },
    { description: 'Consulting', quantity: 10, unitPrice: 1500 },
  ],
  summary: {
    subtotal: 12500 + 8750 + 10 * 1500,
    tax: 0.07 * (12500 + 8750 + 10 * 1500),
    total: 12500 + 8750 + 10 * 1500 + 0.07 * (12500 + 8750 + 10 * 1500),
  },
  paymentTerms: {
    dueDate: 'March 17, 2026',
    method: 'UPI / Card / Bank Transfer',
    gst: 'GSTIN 123456789',
  },
  notes: 'Thank you for your business!',
};
const AVATAR_BASE64 = '/favicon.png';
const renderPreviewDocument = () => (
  <Document title="PDFx Table Preview">
    <Page size="A4" style={styles.page}>
      <PageHeader
        variant="logo-left"
        logo={<PdfImage src={AVATAR_BASE64} style={{ margin: 0 }} />}
        title={invoiceDetails.companyName}
        subtitle={invoiceDetails.subtitle}
        rightText={invoiceDetails.invoiceNumber}
        rightSubText={`Due: ${invoiceDetails.dueDate}`}
        style={{ marginBottom: 0 }}
      />
      {/* Three-column section: From | Bill to | Payment Details */}
      <Section noWrap style={{ flexDirection: 'row' }}>
        {/* Left: From */}
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text
            style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
            color="mutedForeground"
            transform="uppercase"
            noMargin
          >
            From
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.companyName}
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.companyAddress}
          </Text>
          <Text noMargin variant="xs">
            hello@pdfx.io
          </Text>
        </View>
        {/* Middle: Bill to */}
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text
            style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
            color="mutedForeground"
            transform="uppercase"
            noMargin
          >
            Bill To
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.billTo.name}
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.billTo.address}
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.billTo.email}
          </Text>
        </View>

        {/* Right: Payment Terms */}
        <View style={{ flex: 1, paddingRight: 15 }}>
          <Text
            style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
            color="mutedForeground"
            transform="uppercase"
            noMargin
          >
            Payment Terms
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.paymentTerms.method}
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.paymentTerms.gst}
          </Text>
          <Text noMargin variant="xs">
            {invoiceDetails.paymentTerms.dueDate}
          </Text>
        </View>
      </Section>
      {/* <Divider /> */}
      <Table variant="grid" zebraStripe>
        <TableHeader>
          <TableRow header>
            <TableCell>Description</TableCell>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceDetails.items.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
            <TableRow key={index}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="center">{`${item.quantity}`}</TableCell>
              <TableCell align="center">{`$${item.unitPrice}`}</TableCell>
              <TableCell align="right">{`$${(item.quantity * item.unitPrice)?.toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Section noWrap style={{ flexDirection: 'row', marginTop: 16 }}>
        <View style={{ marginLeft: 'auto', width: 220 }}>
          <KeyValue
            size="sm"
            dividerThickness={1}
            items={[
              { key: 'Subtotal', value: `$${invoiceDetails.summary.subtotal.toFixed(2)}` },
              { key: 'Tax', value: `$${invoiceDetails.summary.tax.toFixed(2)}` },
              {
                key: 'Total',
                value: `$${invoiceDetails.summary.total.toFixed(2)}`,
                valueStyle: { fontSize: 12, fontWeight: 'bold' },
                keyStyle: { fontSize: 12, fontWeight: 'bold', color: 'primary' },
              },
            ]}
            divided
          />
        </View>
      </Section>
      <PageFooter leftText={invoiceDetails.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
    </Page>
  </Document>
);

export default function Invoice01Page() {
  useDocumentTitle('Invoice #INV-001');
  return (
    <PDFPreview title="Preview" downloadFilename="invoice-INV-001.pdf" height={'h-[100vh]'}>
      {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
      {renderPreviewDocument as any}
    </PDFPreview>
  );
}
