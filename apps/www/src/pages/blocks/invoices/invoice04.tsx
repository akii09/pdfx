import type { PdfxTheme } from '@pdfx/shared';
import {
  KeyValue,
  PageFooter,
  PageHeader,
  PdfImage,
  PdfxThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  usePdfxTheme,
} from '@pdfx/ui';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { invoiceDetailsType } from './invoice01.type';

const invoiceDetails: invoiceDetailsType = {
  invoiceNumber: 'INV-2026-004',
  invoiceDate: 'February 22, 2026',
  dueDate: 'March 24, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Innovative PDF Solutions',
  companyAddress: 'Nagpur, IN',
  billTo: {
    name: 'Global Industries Ltd.',
    address: '100 Corporate Plaza, Tower B',
    email: 'accounts@globalindustries.com',
    phone: '+1 (555) 888-9999',
  },
  items: [
    { description: 'Enterprise Software License', quantity: 5, unitPrice: 4500 },
    { description: 'Implementation Services', quantity: 1, unitPrice: 18000 },
    { description: 'Training Workshop (per session)', quantity: 3, unitPrice: 2500 },
    { description: 'Annual Support Package', quantity: 1, unitPrice: 8500 },
  ],
  summary: {
    subtotal: 5 * 4500 + 18000 + 3 * 2500 + 8500,
    tax: 0.08 * (5 * 4500 + 18000 + 3 * 2500 + 8500),
    total: (5 * 4500 + 18000 + 3 * 2500 + 8500) * 1.08,
  },
  paymentTerms: {
    dueDate: 'March 24, 2026',
    method: 'Wire Transfer / Corporate Account',
    gst: 'GSTIN 987654321',
  },
  notes: 'Corporate billing – Net 30 terms apply. For inquiries, contact accounts@pdfx.io',
};

const LOGO_SRC = '/PDFX-LOGO.png';

export function Invoice04Document({ theme }: { theme?: PdfxTheme }) {
  return (
    <PdfxThemeProvider theme={theme}>
      <Invoice04Content />
    </PdfxThemeProvider>
  );
}

function Invoice04Content() {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    infoGrid: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sectionGap,
      gap: 24,
    },
    infoColumn: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 9,
      fontWeight: 'bold',
      color: theme.colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 6,
    },
    summaryCard: {
      backgroundColor: theme.colors.muted,
      borderRadius: theme.primitives.borderRadius.md,
      padding: 16,
      marginTop: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });

  return (
    <Document title="PDFx Invoice INV-004 – Corporate">
      <Page size="A4" style={styles.page}>
        {/* Logo-right header with company info */}
        <PageHeader
          variant="logo-right"
          logo={<PdfImage src={LOGO_SRC} width={56} height={56} style={{ margin: 0 }} />}
          title={invoiceDetails.companyName}
          subtitle={`${invoiceDetails.subtitle}  ·  ${invoiceDetails.companyAddress}`}
          style={{ marginBottom: theme.spacing.sectionGap }}
        />

        {/* Two-column info: Invoice Details (left) + Bill To (right) */}
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel} noMargin>
              Invoice Details
            </Text>
            <KeyValue
              size="sm"
              items={[
                { key: 'Invoice #', value: invoiceDetails.invoiceNumber },
                { key: 'Issue Date', value: invoiceDetails.invoiceDate },
                { key: 'Due Date', value: invoiceDetails.dueDate },
                { key: 'Payment', value: invoiceDetails.paymentTerms.method },
              ]}
            />
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel} noMargin>
              Bill To
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
              {invoiceDetails.billTo.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.billTo.address}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.billTo.email}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.billTo.phone}
            </Text>
          </View>
        </View>

        {/* Bordered table for line items */}
        <Table variant="bordered">
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceDetails.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="right">{`$${item.unitPrice.toLocaleString()}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Summary card – executive style */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={{ width: 260 }}>
              <KeyValue
                size="md"
                dividerThickness={1}
                dividerColor="border"
                items={[
                  {
                    key: 'Subtotal',
                    value: `$${invoiceDetails.summary.subtotal.toLocaleString()}`,
                  },
                  { key: 'Tax (8%)', value: `$${invoiceDetails.summary.tax.toFixed(2)}` },
                  {
                    key: 'Total Due',
                    value: `$${invoiceDetails.summary.total.toFixed(2)}`,
                    valueStyle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
                    keyStyle: { fontSize: 13, fontWeight: 'bold' },
                  },
                ]}
                divided
              />
            </View>
          </View>
        </View>

        <PageFooter
          leftText={invoiceDetails.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
