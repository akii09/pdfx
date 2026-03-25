import {
  KeyValue,
  PageFooter,
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

// Extended type for hourly billing
interface ConsultantInvoiceDetails {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  subtitle: string;
  consultant: {
    name: string;
    title: string;
    email: string;
  };
  client: {
    name: string;
    company: string;
    address: string;
    email: string;
  };
  services: {
    description: string;
    hours: number;
    rate: number;
  }[];
  summary: {
    totalHours: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
  };
  projectRef?: string;
  notes?: string;
}

const invoiceDetails: ConsultantInvoiceDetails = {
  invoiceNumber: 'INV-2026-006',
  invoiceDate: 'February 26, 2026',
  dueDate: 'March 28, 2026',
  companyName: 'PDFx Inc.',
  subtitle: 'Professional Consulting Services',
  companyAddress: 'Nagpur, IN · hello@pdfx.io',
  consultant: {
    name: 'John Smith',
    title: 'Senior Technical Consultant',
    email: 'john.smith@pdfx.io',
  },
  client: {
    name: 'Sarah Johnson',
    company: 'Acme Technologies',
    address: '500 Tech Park, Suite 200',
    email: 'sarah.johnson@acmetech.com',
  },
  services: [
    { description: 'Architecture Review & Planning', hours: 16, rate: 175 },
    { description: 'Code Review & Optimization', hours: 24, rate: 150 },
    { description: 'Technical Documentation', hours: 12, rate: 125 },
    { description: 'Team Training & Knowledge Transfer', hours: 8, rate: 200 },
  ],
  summary: {
    totalHours: 16 + 24 + 12 + 8,
    subtotal: 16 * 175 + 24 * 150 + 12 * 125 + 8 * 200,
    tax: 0.05 * (16 * 175 + 24 * 150 + 12 * 125 + 8 * 200),
    total: 1.05 * (16 * 175 + 24 * 150 + 12 * 125 + 8 * 200),
  },
  paymentTerms: {
    dueDate: 'March 28, 2026',
    method: 'Bank Transfer / Check',
  },
  projectRef: 'PROJ-2026-ACME-001',
  notes: 'Services rendered for February 2026. All hours verified and approved by client.',
};

export function Invoice06Document({ theme }: { theme?: PdfxTheme }) {
  return (
    <PdfxThemeProvider theme={theme}>
      <Invoice06Content />
    </PdfxThemeProvider>
  );
}

function Invoice06Content() {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sectionGap,
      paddingBottom: theme.spacing.componentGap,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
      borderBottomStyle: 'solid',
    },
    companyInfo: {
      flex: 1,
    },
    invoiceInfo: {
      alignItems: 'flex-end',
    },
    partiesRow: {
      flexDirection: 'row',
      gap: 40,
      marginBottom: theme.spacing.sectionGap,
    },
    partyColumn: {
      flex: 1,
    },
    partyLabel: {
      fontSize: 9,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 6,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      borderBottomStyle: 'solid',
    },
    projectRef: {
      backgroundColor: theme.colors.muted,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: theme.primitives.borderRadius.sm,
      marginBottom: theme.spacing.sectionGap,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    summaryRow: {
      flexDirection: 'row',
      marginTop: 20,
    },
    hoursBox: {
      flex: 1,
      paddingRight: 24,
    },
    hoursBadge: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryForeground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: theme.primitives.borderRadius.sm,
      alignSelf: 'flex-start',
    },
    totalsBox: {
      width: 250,
    },
    calloutNote: {
      backgroundColor: theme.colors.muted,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.info,
      borderLeftStyle: 'solid',
      paddingLeft: 12,
      paddingVertical: 8,
      marginTop: 16,
    },
  });

  return (
    <Document title="PDFx Invoice INV-006 – Consultant">
      <Page size="A4" style={styles.page}>
        {/* Two-column header: Company info left, Invoice info right */}
        <View style={styles.headerRow}>
          <View style={styles.companyInfo}>
            <Text variant="xl" weight="bold" noMargin>
              {invoiceDetails.companyName}
            </Text>
            <Text variant="sm" color="mutedForeground" noMargin>
              {invoiceDetails.subtitle}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {invoiceDetails.companyAddress}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text variant="xs" color="mutedForeground" transform="uppercase" noMargin>
              Invoice
            </Text>
            <Text variant="lg" weight="bold" noMargin>
              {invoiceDetails.invoiceNumber}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              {invoiceDetails.invoiceDate}
            </Text>
            <Text variant="xs" color="mutedForeground" noMargin>
              Due: {invoiceDetails.dueDate}
            </Text>
          </View>
        </View>

        {/* Project reference badge */}
        {invoiceDetails.projectRef && (
          <View style={styles.projectRef}>
            <Text variant="xs" weight="semibold" color="mutedForeground" noMargin>
              Project Reference:
            </Text>
            <Text variant="xs" weight="bold" noMargin>
              {invoiceDetails.projectRef}
            </Text>
          </View>
        )}

        {/* Two-column: Consultant + Client */}
        <View style={styles.partiesRow}>
          <View style={styles.partyColumn}>
            <Text style={styles.partyLabel} noMargin>
              From (Consultant)
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
              {invoiceDetails.consultant.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.consultant.title}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.consultant.email}
            </Text>
          </View>
          <View style={styles.partyColumn}>
            <Text style={styles.partyLabel} noMargin>
              Bill To (Client)
            </Text>
            <Text variant="sm" weight="semibold" noMargin>
              {invoiceDetails.client.name}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.client.company}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.client.address}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {invoiceDetails.client.email}
            </Text>
          </View>
        </View>

        {/* Line table with Hours and Rate columns */}
        <Table variant="line">
          <TableHeader>
            <TableRow header>
              <TableCell>Service Description</TableCell>
              <TableCell align="center">Hours</TableCell>
              <TableCell align="right">Rate ($/hr)</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceDetails.services.map((service, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{service.description}</TableCell>
                <TableCell align="center">{`${service.hours}`}</TableCell>
                <TableCell align="right">{`$${service.rate}`}</TableCell>
                <TableCell align="right">{`$${(service.hours * service.rate).toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Summary: Total hours badge left, financial totals right */}
        <Section noWrap style={styles.summaryRow}>
          <View style={styles.hoursBox}>
            <View style={styles.hoursBadge}>
              <Text
                style={{ fontSize: 9, fontWeight: 'bold', color: theme.colors.primaryForeground }}
                noMargin
              >
                Total Hours: {invoiceDetails.summary.totalHours}
              </Text>
            </View>
            <Text variant="xs" color="mutedForeground" style={{ marginTop: 8 }}>
              Payment: {invoiceDetails.paymentTerms.method}
            </Text>
          </View>
          <View style={styles.totalsBox}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: `$${invoiceDetails.summary.subtotal.toLocaleString()}` },
                { key: 'Tax (5%)', value: `$${invoiceDetails.summary.tax.toFixed(2)}` },
                {
                  key: 'Amount Due',
                  value: `$${invoiceDetails.summary.total.toFixed(2)}`,
                  valueStyle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
                  keyStyle: { fontSize: 13, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>

        {/* Notes callout */}
        {invoiceDetails.notes && (
          <View style={styles.calloutNote}>
            <Text variant="xs" color="mutedForeground">
              {invoiceDetails.notes}
            </Text>
          </View>
        )}

        <PageFooter
          leftText="Professional services invoice – Please retain for records"
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
