/**
 * Modern Invoice Template
 *
 * Bold branded header with structured card summary.
 * Clean sans-serif design for contemporary businesses.
 *
 * Components used: PageHeader, PageFooter, DataTable, Badge, Section,
 * KeyValue, Heading, Text, Stack, Divider
 */

import {
  Badge,
  DataTable,
  Divider,
  Heading,
  KeyValue,
  PageFooter,
  PageHeader,
  PdfxThemeProvider,
  Section,
  Stack,
  Text,
} from '@pdfx/ui';
import type { PdfxTheme } from '@pdfx/shared';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceData } from './invoice-data';

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface ModernInvoiceContentProps {
  data: InvoiceData;
}

function ModernInvoiceContent({ data }: ModernInvoiceContentProps) {
  const columns = [
    {
      key: 'description' as const,
      header: 'Service',
      width: '40%',
    },
    {
      key: 'qty' as const,
      header: 'Qty',
      align: 'center' as const,
      width: '10%',
      render: (val: unknown) => String(val),
    },
    {
      key: 'unit' as const,
      header: 'Unit',
      align: 'center' as const,
      width: '12%',
    },
    {
      key: 'rate' as const,
      header: 'Rate',
      align: 'right' as const,
      width: '18%',
      render: (val: unknown) => formatCurrency(Number(val)),
    },
    {
      key: 'amount' as const,
      header: 'Total',
      align: 'right' as const,
      width: '20%',
      render: (val: unknown) => formatCurrency(Number(val)),
    },
  ];

  return (
    <>
      {/* Branded header */}
      <PageHeader
        variant="branded"
        title={data.company.name}
        subtitle={`${data.company.email} · ${data.company.phone} · ${data.company.website}`}
        marginBottom={24}
      />

      {/* Invoice number + status row */}
      <Stack direction="horizontal" justify="between" align="center" style={{ marginBottom: 20 }}>
        <View>
          <Heading level={3} noMargin style={{ marginBottom: 2 }}>
            Invoice {data.invoice.number}
          </Heading>
          <Text color="mutedForeground" noMargin>
            {data.invoice.reference}
          </Text>
        </View>
        <Badge label={data.invoice.status.toUpperCase()} variant="warning" size="lg" />
      </Stack>

      {/* Bill-to + Meta cards */}
      <Stack direction="horizontal" gap="md" style={{ marginBottom: 24 }}>
        <Section variant="card" padding="md" style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            BILLED TO
          </Text>
          <Text weight="bold" noMargin>
            {data.client.name}
          </Text>
          <Text variant="xs" noMargin>
            {data.client.contact}
          </Text>
          <Text variant="xs" noMargin>
            {data.client.address}
          </Text>
          <Text variant="xs" noMargin>
            {data.client.city}
          </Text>
          <Text variant="xs" color="accent" noMargin style={{ marginTop: 4 }}>
            {data.client.email}
          </Text>
        </Section>

        <Section variant="card" padding="md" style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            INVOICE DETAILS
          </Text>
          <KeyValue
            direction="horizontal"
            size="sm"
            items={[
              { key: 'Issued', value: data.invoice.date },
              { key: 'Due', value: data.invoice.dueDate },
              { key: 'Terms', value: data.invoice.terms },
            ]}
          />
        </Section>
      </Stack>

      {/* Line items */}
      <DataTable
        columns={columns}
        data={data.items}
        variant="primary-header"
        size="md"
        style={{ marginBottom: 20 }}
      />

      {/* Summary + Notes row */}
      <Stack direction="horizontal" gap="lg" align="start">
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
            NOTES
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.notes}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin style={{ marginTop: 6 }}>
            Bank: {data.bankDetails.bankName} · Ref: {data.bankDetails.reference}
          </Text>
        </View>

        <Section variant="card" padding="md" noWrap style={{ minWidth: 180 }}>
          <Stack direction="horizontal" justify="between" style={{ marginBottom: 4 }}>
            <Text variant="xs" noMargin>Subtotal</Text>
            <Text variant="xs" noMargin>{formatCurrency(data.subtotal)}</Text>
          </Stack>
          <Stack direction="horizontal" justify="between" style={{ marginBottom: 4 }}>
            <Text variant="xs" noMargin>Tax ({data.taxRate}%)</Text>
            <Text variant="xs" noMargin>{formatCurrency(data.tax)}</Text>
          </Stack>
          <Divider spacing="sm" />
          <Stack direction="horizontal" justify="between">
            <Text weight="bold" noMargin>Total Due</Text>
            <Text weight="bold" color="primary" noMargin>{formatCurrency(data.total)}</Text>
          </Stack>
        </Section>
      </Stack>

      {/* Footer */}
      <PageFooter
        variant="minimal"
        leftText={data.company.name}
        rightText={`${data.invoice.number} · ${data.invoice.dueDate}`}
        style={{ marginTop: 20 }}
      />
    </>
  );
}

export interface ModernInvoiceProps {
  data: InvoiceData;
  theme: PdfxTheme;
}

export function ModernInvoice({ data, theme }: ModernInvoiceProps) {
  const styles = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Document title={`${data.invoice.number} — ${data.company.name}`}>
      <Page size={theme.page.size} style={styles.page}>
        <PdfxThemeProvider theme={theme}>
          <ModernInvoiceContent data={data} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}
