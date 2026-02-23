import type { PdfxTheme } from '@pdfx/shared';
import {
  KeyValue,
  PageFooter,
  PageHeader,
  PdfxThemeProvider,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  usePdfxTheme,
} from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceData } from './invoice01.type';

const sampleData: InvoiceData = {
  invoiceNumber: 'INV-2026-002',
  invoiceDate: 'February 18, 2026',
  dueDate: 'March 20, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Innovative PDF Solutions',
  companyAddress: 'Nagpur, IN',
  companyEmail: 'hello@pdfx.io',
  billTo: {
    name: 'TechStart Solutions',
    address: '789 Innovation Blvd, Floor 3',
    email: 'billing@techstart.com',
    phone: '+1 (555) 987-6543',
  },
  items: [
    { description: 'API Integration', quantity: 1, unitPrice: 15000 },
    { description: 'SEO', quantity: 2, unitPrice: 5500 },
    { description: 'Security Audit', quantity: 1, unitPrice: 7200 },
  ],
  summary: {
    subtotal: 15000 + 2 * 5500 + 7200,
    tax: 0.07 * (15000 + 2 * 5500 + 7200),
    total: 15000 + 2 * 5500 + 7200 + 0.07 * (15000 + 2 * 5500 + 7200),
  },
  paymentTerms: {
    dueDate: 'March 20, 2026',
    method: 'Wire Transfer / Bank Account',
    gst: 'GSTIN 123456789',
  },
  notes: 'Payment terms: Net 30 days. Thank you for your business!',
};

export function Invoice02Document({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <Invoice02Content data={data} />
    </PdfxThemeProvider>
  );
}

function Invoice02Content({ data }: { data: InvoiceData }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    metaRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sectionGap,
    },
    metaCol: {
      flex: 1,
      paddingRight: 12,
    },
    metaLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 3,
    },
    metaValue: {
      fontSize: 9,
      color: theme.colors.foreground,
    },
    dividerCol: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginRight: 12,
    },
  });

  return (
    <Document title={`Invoice ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* Branded full-width banner header */}
        <PageHeader
          variant="branded"
          title={data.companyName}
          subtitle={`${data.subtitle}  ·  ${data.companyAddress}  ·  ${data.companyEmail}`}
        />

        {/* Invoice meta row: details left, billed-to right */}
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Number
            </Text>
            <Text style={{ ...styles.metaValue, fontWeight: 'bold', fontSize: 11 }} noMargin>
              {data.invoiceNumber}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.invoiceDate}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Due Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.dueDate}
            </Text>
          </View>
          <View style={styles.dividerCol} />
          <View style={{ flex: 2 }}>
            <Text style={styles.metaLabel} noMargin>
              Billed To
            </Text>
            <Text style={{ ...styles.metaValue, fontWeight: 'bold' }} noMargin>
              {data.billTo.name}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.address}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.email}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.phone}
            </Text>
          </View>
        </View>

        {/* Items table — primary-header variant, no zebra */}
        <Table variant="primary-header">
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="right">{`$${item.unitPrice.toLocaleString()}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Summary */}
        <Section noWrap style={{ flexDirection: 'row', marginTop: 16 }}>
          {/* Payment method info — left side */}
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={styles.metaLabel} noMargin>
              Payment Method
            </Text>
            <Text variant="xs" noMargin>
              {data.paymentTerms.method}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.paymentTerms.gst}
            </Text>
          </View>
          {/* Totals — right */}
          <View style={{ width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: `$${data.summary.subtotal.toFixed(2)}` },
                { key: 'Tax (7%)', value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: 'Total Due',
                  value: `$${data.summary.total.toFixed(2)}`,
                  valueStyle: { fontSize: 12, fontWeight: 'bold' },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>

        <PageFooter leftText={data.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
      </Page>
    </Document>
  );
}
