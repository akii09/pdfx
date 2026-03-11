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
import type { invoiceDetailsType } from './invoice01.type';

const invoiceDetails: invoiceDetailsType = {
  invoiceNumber: 'INV-2026-005',
  invoiceDate: 'February 24, 2026',
  dueDate: 'March 26, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Innovative PDF Solutions',
  companyAddress: 'Nagpur, IN',
  billTo: {
    name: 'Creative Agency Co.',
    address: '250 Design District, Loft 5',
    email: 'studio@creativeagency.co',
    phone: '+1 (555) 321-7654',
  },
  items: [
    { description: 'Brand Identity Design', quantity: 1, unitPrice: 8500 },
    { description: 'Marketing Collateral Package', quantity: 1, unitPrice: 4200 },
    { description: 'Social Media Assets (per set)', quantity: 4, unitPrice: 750 },
    { description: 'Motion Graphics (30s)', quantity: 2, unitPrice: 3500 },
  ],
  summary: {
    subtotal: 8500 + 4200 + 4 * 750 + 2 * 3500,
    tax: 0.065 * (8500 + 4200 + 4 * 750 + 2 * 3500),
    total: (8500 + 4200 + 4 * 750 + 2 * 3500) * 1.065,
  },
  paymentTerms: {
    dueDate: 'March 26, 2026',
    method: 'Credit Card / PayPal / Stripe',
    gst: 'GSTIN 456789123',
  },
  notes: 'Creative work is protected under copyright. Full usage rights transfer upon payment.',
};

export function Invoice05Document({ theme }: { theme?: PdfxTheme }) {
  return (
    <PdfxThemeProvider theme={theme}>
      <Invoice05Content />
    </PdfxThemeProvider>
  );
}

function Invoice05Content() {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    heroSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sectionGap,
    },
    invoiceBadge: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.primitives.borderRadius.md,
      paddingHorizontal: 20,
      paddingVertical: 14,
      alignItems: 'center',
    },
    badgeLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.primaryForeground,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 2,
    },
    badgeNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primaryForeground,
    },
    accentBlock: {
      backgroundColor: theme.colors.muted,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.accent,
      borderLeftStyle: 'solid',
      paddingLeft: 14,
      paddingVertical: 10,
      marginBottom: theme.spacing.sectionGap,
    },
    infoGrid: {
      flexDirection: 'row',
      gap: 32,
    },
    infoColumn: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.accent,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 6,
    },
    summarySection: {
      flexDirection: 'row',
      marginTop: 24,
    },
    summaryLeft: {
      flex: 1,
      paddingRight: 20,
    },
    summaryRight: {
      width: 240,
      backgroundColor: theme.colors.muted,
      borderRadius: theme.primitives.borderRadius.sm,
      padding: 14,
    },
  });

  return (
    <Document title="PDFx Invoice INV-005 – Creative">
      <Page size="A4" style={styles.page}>
        {/* Hero section: Centered header + large invoice badge */}
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <PageHeader
              variant="centered"
              title={invoiceDetails.companyName}
              subtitle={`${invoiceDetails.subtitle}  ·  ${invoiceDetails.companyAddress}  ·  hello@pdfx.io`}
              marginBottom={0}
            />
          </View>
          <View style={styles.invoiceBadge}>
            <Text style={styles.badgeLabel} noMargin>
              Invoice
            </Text>
            <Text style={styles.badgeNumber} noMargin>
              {invoiceDetails.invoiceNumber}
            </Text>
          </View>
        </View>

        {/* Accent block with billing info */}
        <View style={styles.accentBlock}>
          <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Billed To
              </Text>
              <Text variant="sm" weight="semibold" noMargin>
                {invoiceDetails.billTo.name}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {invoiceDetails.billTo.address}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {invoiceDetails.billTo.email} · {invoiceDetails.billTo.phone}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Invoice Info
              </Text>
              <KeyValue
                size="sm"
                items={[
                  { key: 'Issue Date', value: invoiceDetails.invoiceDate },
                  { key: 'Due Date', value: invoiceDetails.dueDate },
                  { key: 'Payment', value: invoiceDetails.paymentTerms.method },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Striped table for creative deliverables */}
        <Table variant="striped" zebraStripe>
          <TableHeader>
            <TableRow header>
              <TableCell>Deliverable</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
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

        {/* Summary section with notes left, totals right */}
        <Section noWrap style={styles.summarySection}>
          <View style={styles.summaryLeft}>
            <Text style={styles.sectionLabel} noMargin>
              Notes & Terms
            </Text>
            <Text variant="xs" color="mutedForeground">
              {invoiceDetails.notes}
            </Text>
            <Text variant="xs" color="mutedForeground" style={{ marginTop: 4 }}>
              GST: {invoiceDetails.paymentTerms.gst}
            </Text>
          </View>
          <View style={styles.summaryRight}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: `$${invoiceDetails.summary.subtotal.toLocaleString()}` },
                { key: 'Tax (6.5%)', value: `$${invoiceDetails.summary.tax.toFixed(2)}` },
                {
                  key: 'Total',
                  value: `$${invoiceDetails.summary.total.toFixed(2)}`,
                  valueStyle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.accent },
                  keyStyle: { fontSize: 13, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>

        <PageFooter
          variant="centered"
          centerText="Thank you for choosing PDFx Inc. for your creative needs!"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
