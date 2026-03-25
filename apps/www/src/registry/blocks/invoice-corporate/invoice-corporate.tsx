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
import type { InvoiceCorporateData } from './invoice-corporate.types';

const sampleData: InvoiceCorporateData = {
  invoiceNumber: 'INV-2026-004',
  invoiceDate: 'February 22, 2026',
  dueDate: 'March 24, 2026',
  companyName: 'Your Company',
  subtitle: 'Professional Services',
  companyAddress: 'City, Country',
  companyEmail: 'hello@company.com',
  logo: '/favicon.png',
  billTo: {
    name: 'Global Industries Ltd.',
    address: '100 Corporate Plaza, Tower B',
    email: 'accounts@globalindustries.com',
    phone: '+1 (555) 888-9999',
  },
  items: [
    { description: 'Enterprise Software License', quantity: 5, unitPrice: 4500 },
    { description: 'Implementation Services', quantity: 1, unitPrice: 18000 },
    { description: 'Training Workshop', quantity: 3, unitPrice: 2500 },
    { description: 'Annual Support Package', quantity: 1, unitPrice: 8500 },
  ],
  summary: {
    subtotal: 57000,
    tax: 4560,
    total: 61560,
  },
  paymentTerms: {
    dueDate: 'March 24, 2026',
    method: 'Wire Transfer / Corporate Account',
    gst: 'GSTIN 987654321',
  },
  notes: 'Corporate billing – Net 30 terms apply.',
};

export function InvoiceCorporateDocument({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceCorporateData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceCorporateContent data={data} />
    </PdfxThemeProvider>
  );
}

function InvoiceCorporateContent({ data }: { data: InvoiceCorporateData }) {
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
    <Document title={`Invoice ${data.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="logo-right"
          logo={
            <PdfImage
              src={data.logo ?? '/favicon.png'}
              width={56}
              height={56}
              style={{ margin: 0 }}
            />
          }
          title={data.companyName}
          subtitle={`${data.subtitle}  ·  ${data.companyAddress}`}
          style={{ marginBottom: theme.spacing.sectionGap }}
        />
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel} noMargin>
              Invoice Details
            </Text>
            <KeyValue
              size="sm"
              items={[
                { key: 'Invoice #', value: data.invoiceNumber },
                { key: 'Issue Date', value: data.invoiceDate },
                { key: 'Due Date', value: data.dueDate },
                { key: 'Payment', value: data.paymentTerms.method },
              ]}
            />
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel} noMargin>
              Bill To
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
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
        </View>
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
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={{ width: 260 }}>
              <KeyValue
                size="md"
                dividerThickness={1}
                dividerColor="border"
                items={[
                  { key: 'Subtotal', value: `$${data.summary.subtotal.toLocaleString()}` },
                  { key: 'Tax (8%)', value: `$${data.summary.tax.toFixed(2)}` },
                  {
                    key: 'Total Due',
                    value: `$${data.summary.total.toFixed(2)}`,
                    valueStyle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
                    keyStyle: { fontSize: 13, fontWeight: 'bold' },
                  },
                ]}
                divided
              />
            </View>
          </View>
        </View>
        <PageFooter leftText={data.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
      </Page>
    </Document>
  );
}
