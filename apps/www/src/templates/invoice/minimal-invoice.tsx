/**
 * Minimal Invoice Template
 *
 * Ultra-clean, whitespace-forward design.
 * Maximum readability with minimal visual noise.
 *
 * Components used: PageHeader, PageFooter, Table, TableHeader, TableBody,
 * TableRow, TableCell, Divider, Heading, Text, Stack, KeyValue
 */

import {
  Divider,
  Heading,
  KeyValue,
  PageFooter,
  PageHeader,
  PdfxThemeProvider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@pdfx/ui';
import type { PdfxTheme } from '@pdfx/shared';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceData } from './invoice-data';

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface MinimalInvoiceContentProps {
  data: InvoiceData;
}

function MinimalInvoiceContent({ data }: MinimalInvoiceContentProps) {
  return (
    <>
      {/* Clean minimal header */}
      <PageHeader
        variant="minimal"
        title={data.company.name}
        subtitle={data.company.tagline}
        rightText="INVOICE"
        rightSubText={data.invoice.number}
        marginBottom={32}
      />

      {/* Metadata row */}
      <Stack direction="horizontal" justify="between" style={{ marginBottom: 32 }}>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            Invoice No.
          </Text>
          <Text weight="semibold" noMargin>
            {data.invoice.number}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            Invoice Date
          </Text>
          <Text weight="semibold" noMargin>
            {data.invoice.date}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            Due Date
          </Text>
          <Text weight="semibold" noMargin>
            {data.invoice.dueDate}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            Terms
          </Text>
          <Text weight="semibold" noMargin>
            {data.invoice.terms}
          </Text>
        </View>
      </Stack>

      {/* Bill to */}
      <Stack direction="horizontal" justify="between" style={{ marginBottom: 32 }}>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            From
          </Text>
          <Text weight="medium" noMargin>
            {data.company.name}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.company.address}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.company.city}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.company.email}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 8 }}>
            To
          </Text>
          <Text weight="medium" noMargin>
            {data.client.name}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.client.address}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.client.city}
          </Text>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.client.email}
          </Text>
        </View>
      </Stack>

      <Divider spacing="none" style={{ marginBottom: 0 }} />

      {/* Line items - clean minimal variant */}
      <Table variant="minimal">
        <TableHeader>
          <TableRow header>
            <TableCell header>Service</TableCell>
            <TableCell header align="center" width={50}>
              Qty
            </TableCell>
            <TableCell header align="right" width={80}>
              Rate
            </TableCell>
            <TableCell header align="right" width={90}>
              Amount
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.description}>
              <TableCell>
                <Text weight="medium" noMargin>
                  {item.description}
                </Text>
                <Text variant="xs" color="mutedForeground" noMargin>
                  {item.details}
                </Text>
              </TableCell>
              <TableCell align="center" width={50}>
                {String(item.qty)}
              </TableCell>
              <TableCell align="right" width={80}>
                {formatCurrency(item.rate)}
              </TableCell>
              <TableCell align="right" width={90}>
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider spacing="none" />

      {/* Totals - right-aligned */}
      <Stack direction="horizontal" justify="end" style={{ marginTop: 16, marginBottom: 24 }}>
        <View style={{ minWidth: 200 }}>
          <KeyValue
            direction="horizontal"
            size="sm"
            items={[
              { key: 'Subtotal', value: formatCurrency(data.subtotal) },
              { key: `Tax (${data.taxRate}%)`, value: formatCurrency(data.tax) },
            ]}
            style={{ marginBottom: 8 }}
          />
          <Divider spacing="sm" thickness="medium" />
          <Stack direction="horizontal" justify="between">
            <Heading level={4} noMargin>Total</Heading>
            <Heading level={4} noMargin>{formatCurrency(data.total)}</Heading>
          </Stack>
        </View>
      </Stack>

      <Divider spacing="sm" />

      {/* Notes + payment info */}
      <Stack direction="horizontal" gap="lg" style={{ marginTop: 8 }}>
        <View style={{ flex: 1 }}>
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.notes}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <KeyValue
            direction="horizontal"
            size="sm"
            items={[
              { key: 'Bank', value: data.bankDetails.bankName },
              { key: 'Ref', value: data.bankDetails.reference },
            ]}
          />
        </View>
      </Stack>

      {/* Footer */}
      <PageFooter
        variant="centered"
        leftText={`${data.company.name} · ${data.company.email} · ${data.company.phone}`}
        style={{ marginTop: 24 }}
      />
    </>
  );
}

export interface MinimalInvoiceProps {
  data: InvoiceData;
  theme: PdfxTheme;
}

export function MinimalInvoice({ data, theme }: MinimalInvoiceProps) {
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
          <MinimalInvoiceContent data={data} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}
