/**
 * Classic Invoice Template
 *
 * Traditional two-column business invoice layout.
 * Timeless, readable, and universally professional.
 *
 * Components used: PageHeader, PageFooter, Table, TableHeader, TableBody, TableFooter,
 * TableRow, TableCell, KeyValue, Divider, Heading, Text, Stack, Badge
 */

import {
  Badge,
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
  TableFooter,
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

interface ClassicInvoiceContentProps {
  data: InvoiceData;
}

function ClassicInvoiceContent({ data }: ClassicInvoiceContentProps) {
  return (
    <>
      {/* Header */}
      <PageHeader
        variant="two-column"
        title={data.company.name}
        subtitle={data.company.tagline}
        address={data.company.address}
        phone={data.company.phone}
        email={data.company.email}
        marginBottom={24}
      />

      {/* Invoice title row */}
      <Stack direction="horizontal" justify="between" style={{ marginBottom: 20 }}>
        <Stack direction="vertical" gap="none">
          <Heading level={2} noMargin>
            INVOICE
          </Heading>
          <Text color="mutedForeground" noMargin style={{ marginTop: 2 }}>
            {data.invoice.number}
          </Text>
        </Stack>
        <Badge label={data.invoice.status.toUpperCase()} variant="warning" size="md" />
      </Stack>

      {/* Bill-to + Invoice meta */}
      <Stack direction="horizontal" justify="between" style={{ marginBottom: 24 }}>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
            BILL TO
          </Text>
          <Text weight="semibold" noMargin>
            {data.client.name}
          </Text>
          <Text color="mutedForeground" noMargin>
            {data.client.contact}
          </Text>
          <Text color="mutedForeground" noMargin>
            {data.client.address}
          </Text>
          <Text color="mutedForeground" noMargin>
            {data.client.city}
          </Text>
          <Text color="mutedForeground" noMargin>
            {data.client.email}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <KeyValue
            direction="horizontal"
            items={[
              { key: 'Invoice Date', value: data.invoice.date },
              { key: 'Due Date', value: data.invoice.dueDate },
              { key: 'Terms', value: data.invoice.terms },
              { key: 'Reference', value: data.invoice.reference },
            ]}
            labelFlex={1}
          />
        </View>
      </Stack>

      <Divider spacing="none" style={{ marginBottom: 16 }} />

      {/* Line items table */}
      <Table variant="line">
        <TableHeader>
          <TableRow header>
            <TableCell header>Description</TableCell>
            <TableCell header align="center" width={40}>
              Qty
            </TableCell>
            <TableCell header align="right" width={70}>
              Rate
            </TableCell>
            <TableCell header align="right" width={80}>
              Amount
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.description}>
              <TableCell>
                <Stack direction="vertical" gap="none">
                  <Text weight="medium" noMargin>
                    {item.description}
                  </Text>
                  <Text variant="xs" color="mutedForeground" noMargin>
                    {item.details}
                  </Text>
                </Stack>
              </TableCell>
              <TableCell align="center" width={40}>
                {String(item.qty)}
              </TableCell>
              <TableCell align="right" width={70}>
                {formatCurrency(item.rate)}
              </TableCell>
              <TableCell align="right" width={80}>
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow footer>
            <TableCell
              footer
              style={{ flex: 1 }}
            >
              {''}
            </TableCell>
            <TableCell footer align="right" width={150} style={{ paddingRight: 8 }}>
              <Stack direction="vertical" gap="none">
                <Stack direction="horizontal" justify="between" style={{ marginBottom: 3 }}>
                  <Text variant="xs" noMargin>Subtotal</Text>
                  <Text variant="xs" noMargin>{formatCurrency(data.subtotal)}</Text>
                </Stack>
                <Stack direction="horizontal" justify="between" style={{ marginBottom: 3 }}>
                  <Text variant="xs" noMargin>Tax ({data.taxRate}%)</Text>
                  <Text variant="xs" noMargin>{formatCurrency(data.tax)}</Text>
                </Stack>
                <Divider spacing="sm" thickness="thin" />
                <Stack direction="horizontal" justify="between">
                  <Text weight="bold" noMargin>Total Due</Text>
                  <Text weight="bold" color="primary" noMargin>{formatCurrency(data.total)}</Text>
                </Stack>
              </Stack>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Payment info */}
      <View style={{ marginTop: 24 }}>
        <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
          PAYMENT DETAILS
        </Text>
        <KeyValue
          direction="horizontal"
          items={[
            { key: 'Bank', value: data.bankDetails.bankName },
            { key: 'Account', value: data.bankDetails.accountName },
            { key: 'Reference', value: data.bankDetails.reference },
          ]}
          size="sm"
        />
      </View>

      {/* Notes */}
      <View style={{ marginTop: 12 }}>
        <Divider spacing="sm" />
        <Text variant="xs" color="mutedForeground" noMargin>
          {data.notes}
        </Text>
      </View>

      {/* Footer */}
      <PageFooter
        variant="simple"
        leftText={`${data.company.name} · ${data.company.email}`}
        rightText={data.invoice.number}
        style={{ marginTop: 24 }}
      />
    </>
  );
}

export interface ClassicInvoiceProps {
  data: InvoiceData;
  theme: PdfxTheme;
}

export function ClassicInvoice({ data, theme }: ClassicInvoiceProps) {
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
          <ClassicInvoiceContent data={data} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}
