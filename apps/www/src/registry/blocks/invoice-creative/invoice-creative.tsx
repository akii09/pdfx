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
} from '@pdfx/components';
import type { PdfxTheme } from '@pdfx/shared';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceCreativeData } from './invoice-creative.types';

const sampleData: InvoiceCreativeData = {
  invoiceNumber: 'INV-2026-005',
  invoiceDate: 'February 24, 2026',
  dueDate: 'March 26, 2026',
  companyName: 'Your Agency',
  subtitle: 'Creative Services',
  companyAddress: 'City, Country · hello@agency.com',
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
    subtotal: 22700,
    tax: 1475.5,
    total: 24175.5,
  },
  paymentTerms: {
    dueDate: 'March 26, 2026',
    method: 'Credit Card / PayPal / Stripe',
    gst: 'GSTIN 456789123',
  },
  notes: 'Creative work is protected under copyright. Full usage rights transfer upon payment.',
};

export function InvoiceCreativeDocument({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceCreativeData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceCreativeContent data={data} />
    </PdfxThemeProvider>
  );
}

function InvoiceCreativeContent({ data }: { data: InvoiceCreativeData }) {
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
    <Document title={`Invoice ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <PageHeader
              variant="centered"
              title={data.companyName}
              subtitle={`${data.subtitle}  ·  ${data.companyAddress}`}
              marginBottom={0}
            />
          </View>
          <View style={styles.invoiceBadge}>
            <Text style={styles.badgeLabel} noMargin>
              Invoice
            </Text>
            <Text style={styles.badgeNumber} noMargin>
              {data.invoiceNumber}
            </Text>
          </View>
        </View>
        <View style={styles.accentBlock}>
          <View style={styles.infoGrid}>
            <View style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Billed To
              </Text>
              <Text variant="sm" weight="semibold" noMargin>
                {data.billTo.name}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {data.billTo.address}
              </Text>
              <Text variant="xs" noMargin color="mutedForeground">
                {data.billTo.email} · {data.billTo.phone}
              </Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.sectionLabel} noMargin>
                Invoice Info
              </Text>
              <KeyValue
                size="sm"
                items={[
                  { key: 'Issue Date', value: data.invoiceDate },
                  { key: 'Due Date', value: data.dueDate },
                  { key: 'Payment', value: data.paymentTerms.method },
                ]}
              />
            </View>
          </View>
        </View>
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
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static PDF list, no reordering
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{`${item.quantity}`}</TableCell>
                <TableCell align="right">{`$${item.unitPrice.toLocaleString()}`}</TableCell>
                <TableCell align="right">{`$${(item.quantity * item.unitPrice).toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={styles.summarySection}>
          <View style={styles.summaryLeft}>
            <Text style={styles.sectionLabel} noMargin>
              Notes & Terms
            </Text>
            <Text variant="xs" color="mutedForeground">
              {data.notes}
            </Text>
            <Text variant="xs" color="mutedForeground" style={{ marginTop: 4 }}>
              GST: {data.paymentTerms.gst}
            </Text>
          </View>
          <View style={styles.summaryRight}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: `$${data.summary.subtotal.toLocaleString()}` },
                { key: 'Tax (6.5%)', value: `$${data.summary.tax.toFixed(2)}` },
                {
                  key: 'Total',
                  value: `$${data.summary.total.toFixed(2)}`,
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
          centerText="Thank you for choosing us for your creative needs!"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
