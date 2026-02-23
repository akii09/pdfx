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
  invoiceNumber: 'INV-2026-003',
  invoiceDate: 'February 20, 2026',
  dueDate: 'March 22, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Innovative PDF Solutions',
  companyAddress: 'Nagpur, IN',
  companyEmail: 'hello@pdfx.io',
  billTo: {
    name: 'Enterprise Corp',
    address: '500 Enterprise Way, Building A',
    email: 'finance@enterprisecorp.io',
    phone: '+1 (555) 246-8135',
  },
  items: [
    { description: 'Annual License', quantity: 1, unitPrice: 25000 },
    { description: 'Support & Maintenance', quantity: 12, unitPrice: 1500 },
    { description: 'Custom Integration', quantity: 1, unitPrice: 12000 },
  ],
  summary: {
    subtotal: 25000 + 12 * 1500 + 12000,
    tax: 0.07 * (25000 + 12 * 1500 + 12000),
    total: 25000 + 12 * 1500 + 12000 + 0.07 * (25000 + 12 * 1500 + 12000),
  },
  paymentTerms: {
    dueDate: 'March 22, 2026',
    method: 'ACH Transfer / Check',
    gst: 'GSTIN 123456789',
  },
  notes: 'Invoice for annual enterprise subscription. Please retain for your records.',
};

export function Invoice03Document({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <Invoice03Content data={data} />
    </PdfxThemeProvider>
  );
}

function Invoice03Content({ data }: { data: InvoiceData }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    invoiceStamp: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: 'solid',
      borderRadius: theme.primitives.borderRadius.sm,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignSelf: 'flex-start',
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sectionGap,
    },
    infoLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 4,
    },
  });

  return (
    <Document title={`Invoice ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        {/* Minimal header: company on left, invoice stamp on right */}
        <Section
          noWrap
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: theme.spacing.sectionGap,
          }}
        >
          <View style={{ flex: 1 }}>
            <PageHeader
              variant="minimal"
              title={data.companyName}
              subtitle={`${data.companyAddress}  ·  ${data.companyEmail}`}
              marginBottom={0}
            />
          </View>
          <View style={styles.invoiceStamp}>
            <Text
              style={{
                fontSize: 7,
                fontWeight: 'bold',
                color: theme.colors.primary,
                textAlign: 'right',
              }}
              noMargin
              transform="uppercase"
            >
              Invoice
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: theme.colors.foreground,
                textAlign: 'right',
              }}
              noMargin
            >
              {data.invoiceNumber}
            </Text>
            <Text
              style={{ fontSize: 8, color: theme.colors.mutedForeground, textAlign: 'right' }}
              noMargin
            >
              {data.invoiceDate}
            </Text>
          </View>
        </Section>

        {/* 2-col info: Bill To (left) + Invoice Details (right) */}
        <View style={styles.infoRow}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={styles.infoLabel} noMargin>
              Bill To
            </Text>
            <Text variant="sm" noMargin>
              {data.billTo.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.billTo.address}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.billTo.email}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.billTo.phone}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel} noMargin>
              Invoice Details
            </Text>
            <KeyValue
              size="sm"
              items={[
                { key: 'Due Date', value: data.dueDate },
                { key: 'Payment', value: data.paymentTerms.method },
                { key: 'GST', value: data.paymentTerms.gst },
              ]}
            />
          </View>
        </View>

        {/* Items table — compact variant, clean lines */}
        <Table variant="compact">
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Total</TableCell>
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

        {/* Summary — right-aligned totals */}
        <Section noWrap style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1 }} />
          <View style={{ width: 240 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: `$${data.summary.subtotal.toFixed(2)}` },
                { key: 'Tax (7%)', value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: 'Balance Due',
                  value: `$${data.summary.total.toFixed(2)}`,
                  valueStyle: {
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>

        <PageFooter
          leftText={data.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
