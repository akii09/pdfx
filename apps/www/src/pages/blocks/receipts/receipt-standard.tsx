import {
  Badge,
  KeyValue,
  PdfxThemeProvider,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  usePdfxTheme,
} from '@pdfx/components';
import type { PdfxTheme } from '@pdfx/shared';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { ReceiptStandardData } from '../../../registry/blocks/receipt-standard/receipt-standard.types';

const sampleReceipt: ReceiptStandardData = {
  receiptNumber: 'RCPT-2026-0410',
  issuedAt: 'April 10, 2026 · 2:45 PM',
  merchantName: 'PDFx Market',
  merchantAddress: '118 Mercer Street, New York, NY 10012',
  merchantEmail: 'hello@pdfx.io',
  cashier: 'A. Rivera',
  paymentStatus: 'Paid',
  paymentMethod: 'Visa •••• 2048',
  currency: '$',
  customerName: 'Maya Chen',
  items: [
    { name: 'Pocket Notebook Set', quantity: 2, unitPrice: 14.5 },
    { name: 'Archival Ink Pen', quantity: 3, unitPrice: 6.25 },
    { name: 'Desk Organizer Tray', quantity: 1, unitPrice: 28 },
  ],
  summary: {
    subtotal: 75.75,
    tax: 6.44,
    total: 82.19,
  },
  notes: 'Compact retail-style receipt using Table, Badge, and KeyValue.',
};

function formatMoney(amount: number, currency: string) {
  return `${currency}${amount.toFixed(2)}`;
}

function getStatusVariant(status: ReceiptStandardData['paymentStatus']) {
  if (status === 'Paid') return 'success';
  if (status === 'Refunded') return 'outline';
  return 'warning';
}

export function ReceiptStandardPreviewDocument({ theme }: { theme?: PdfxTheme }) {
  return (
    <PdfxThemeProvider theme={theme}>
      <ReceiptStandardPreviewContent />
    </PdfxThemeProvider>
  );
}

function ReceiptStandardPreviewContent() {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingLeft: theme.spacing.page.marginLeft,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    shell: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.border,
      borderRadius: theme.primitives.borderRadius.lg,
      padding: 18,
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 8,
    },
    metaBlock: {
      flex: 1,
    },
    label: {
      fontSize: 8,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      color: theme.colors.mutedForeground,
      marginBottom: 3,
    },
    value: {
      fontSize: 9,
      color: theme.colors.foreground,
      marginBottom: 1,
    },
    totalCard: {
      marginTop: 10,
      marginLeft: 'auto',
      width: 220,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: theme.colors.border,
    },
  });

  return (
    <Document title={`Receipt ${sampleReceipt.receiptNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.shell}>
          <View style={styles.headerRow}>
            <View>
              <Text variant="lg" style={{ fontWeight: 'bold', marginBottom: 3 }} noMargin>
                {sampleReceipt.merchantName}
              </Text>
              <Text variant="xs" color="mutedForeground" noMargin>
                {sampleReceipt.merchantAddress}
              </Text>
              <Text variant="xs" color="mutedForeground" noMargin>
                {sampleReceipt.merchantEmail}
              </Text>
            </View>
            <Badge
              label={sampleReceipt.paymentStatus}
              variant={getStatusVariant(sampleReceipt.paymentStatus)}
              size="sm"
            />
          </View>

          <Section style={{ marginBottom: 10 }}>
            <View style={styles.metaRow}>
              <View style={styles.metaBlock}>
                <Text style={styles.label} noMargin>
                  Receipt No.
                </Text>
                <Text style={styles.value} noMargin>
                  {sampleReceipt.receiptNumber}
                </Text>
              </View>
              <View style={styles.metaBlock}>
                <Text style={styles.label} noMargin>
                  Issued
                </Text>
                <Text style={styles.value} noMargin>
                  {sampleReceipt.issuedAt}
                </Text>
              </View>
              <View style={styles.metaBlock}>
                <Text style={styles.label} noMargin>
                  Cashier
                </Text>
                <Text style={styles.value} noMargin>
                  {sampleReceipt.cashier}
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaBlock}>
                <Text style={styles.label} noMargin>
                  Customer
                </Text>
                <Text style={styles.value} noMargin>
                  {sampleReceipt.customerName}
                </Text>
              </View>
              <View style={styles.metaBlock}>
                <Text style={styles.label} noMargin>
                  Payment Method
                </Text>
                <Text style={styles.value} noMargin>
                  {sampleReceipt.paymentMethod}
                </Text>
              </View>
            </View>
          </Section>

          <Table variant="compact" zebraStripe>
            <TableHeader>
              <TableRow header>
                <TableCell>Item</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleReceipt.items.map((item) => (
                <TableRow key={`${item.name}-${item.quantity}-${item.unitPrice}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{`${item.quantity}`}</TableCell>
                  <TableCell align="right">
                    {formatMoney(item.unitPrice, sampleReceipt.currency)}
                  </TableCell>
                  <TableCell align="right">
                    {formatMoney(item.quantity * item.unitPrice, sampleReceipt.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <View style={styles.totalCard}>
            <KeyValue
              size="sm"
              divided
              items={[
                {
                  key: 'Subtotal',
                  value: formatMoney(sampleReceipt.summary.subtotal, sampleReceipt.currency),
                },
                {
                  key: 'Tax',
                  value: formatMoney(sampleReceipt.summary.tax, sampleReceipt.currency),
                },
                {
                  key: 'Total',
                  value: formatMoney(sampleReceipt.summary.total, sampleReceipt.currency),
                  keyStyle: { fontWeight: 'bold', color: theme.colors.foreground },
                  valueStyle: { fontWeight: 'bold', fontSize: 12 },
                },
              ]}
            />
          </View>

          <Text variant="xs" color="mutedForeground" style={{ marginTop: 14 }} noMargin>
            {sampleReceipt.notes}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
