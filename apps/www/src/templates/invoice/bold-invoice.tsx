/**
 * Bold Invoice Template
 *
 * Strong visual identity with accent-colored highlights.
 * High-contrast design for maximum brand impact.
 *
 * Components used: PageHeader, PageFooter, Table, TableHeader, TableBody,
 * TableRow, TableCell, Badge, Section, Heading, Text, Stack, Divider, KeyValue
 */

import {
  Badge,
  Divider,
  Heading,
  KeyValue,
  PageFooter,
  PdfxThemeProvider,
  Section,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@pdfx/ui';
import type { PdfxTheme } from '@pdfx/shared';
import { Document, Page, StyleSheet, Text as PDFText, View } from '@react-pdf/renderer';
import type { InvoiceData } from './invoice-data';

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface BoldInvoiceContentProps {
  data: InvoiceData;
  theme: PdfxTheme;
}

function BoldInvoiceContent({ data, theme }: BoldInvoiceContentProps) {
  return (
    <>
      {/* Bold top header with accent strip */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          paddingBottom: 20,
          borderBottomWidth: 3,
          borderBottomColor: theme.colors.primary,
          borderBottomStyle: 'solid',
        }}
      >
        <View style={{ flex: 1 }}>
          <PDFText
            style={{
              fontFamily: theme.typography.heading.fontFamily,
              fontSize: theme.typography.heading.fontSize.h1,
              fontWeight: theme.typography.heading.fontWeight,
              color: theme.colors.primary,
              lineHeight: theme.typography.heading.lineHeight,
            }}
          >
            INVOICE
          </PDFText>
          <PDFText
            style={{
              fontFamily: theme.typography.body.fontFamily,
              fontSize: theme.primitives.typography.sm,
              color: theme.colors.mutedForeground,
              marginTop: 4,
            }}
          >
            {data.invoice.number}
          </PDFText>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <PDFText
            style={{
              fontFamily: theme.typography.heading.fontFamily,
              fontSize: theme.typography.heading.fontSize.h3,
              fontWeight: theme.typography.heading.fontWeight,
              color: theme.colors.foreground,
            }}
          >
            {data.company.name}
          </PDFText>
          <PDFText
            style={{
              fontFamily: theme.typography.body.fontFamily,
              fontSize: theme.primitives.typography.xs,
              color: theme.colors.mutedForeground,
              marginTop: 3,
            }}
          >
            {data.company.tagline}
          </PDFText>
          <PDFText
            style={{
              fontFamily: theme.typography.body.fontFamily,
              fontSize: theme.primitives.typography.xs,
              color: theme.colors.mutedForeground,
              marginTop: 2,
            }}
          >
            {data.company.email}
          </PDFText>
          <PDFText
            style={{
              fontFamily: theme.typography.body.fontFamily,
              fontSize: theme.primitives.typography.xs,
              color: theme.colors.mutedForeground,
              marginTop: 2,
            }}
          >
            {data.company.phone}
          </PDFText>
        </View>
      </View>

      {/* Date + client in side-by-side callout sections */}
      <Stack direction="horizontal" gap="md" style={{ marginBottom: 24 }}>
        <Section variant="callout" accentColor="primary" padding="md" style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
            BILLED TO
          </Text>
          <Text weight="bold" noMargin>
            {data.client.name}
          </Text>
          <Text variant="xs" noMargin>
            {data.client.address}
          </Text>
          <Text variant="xs" noMargin>
            {data.client.city}
          </Text>
          <Text variant="xs" color="accent" noMargin>
            {data.client.email}
          </Text>
        </Section>

        <Section variant="callout" accentColor="accent" padding="md" style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
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
          <View style={{ marginTop: 8 }}>
            <Badge label={data.invoice.status.toUpperCase()} variant="warning" size="sm" />
          </View>
        </Section>
      </Stack>

      {/* Line items - striped for bold feel */}
      <Table variant="striped">
        <TableHeader>
          <TableRow header>
            <TableCell header>Description</TableCell>
            <TableCell header align="center" width={45}>
              Qty
            </TableCell>
            <TableCell header align="right" width={75}>
              Rate
            </TableCell>
            <TableCell header align="right" width={85}>
              Amount
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.description}>
              <TableCell>
                <Stack direction="vertical" gap="none">
                  <Text weight="semibold" noMargin>
                    {item.description}
                  </Text>
                  <Text variant="xs" color="mutedForeground" noMargin>
                    {item.details}
                  </Text>
                </Stack>
              </TableCell>
              <TableCell align="center" width={45}>
                {String(item.qty)}
              </TableCell>
              <TableCell align="right" width={75}>
                {formatCurrency(item.rate)}
              </TableCell>
              <TableCell align="right" width={85}>
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary row */}
      <Stack direction="horizontal" gap="lg" align="start" style={{ marginTop: 20 }}>
        <View style={{ flex: 1 }}>
          <Text variant="xs" weight="semibold" transform="uppercase" noMargin style={{ marginBottom: 6 }}>
            PAYMENT INFO
          </Text>
          <KeyValue
            direction="horizontal"
            size="sm"
            items={[
              { key: 'Bank', value: data.bankDetails.bankName },
              { key: 'Account', value: data.bankDetails.accountName },
              { key: 'Reference', value: data.bankDetails.reference },
            ]}
          />
          <Divider spacing="sm" />
          <Text variant="xs" color="mutedForeground" noMargin>
            {data.notes}
          </Text>
        </View>

        <View style={{ minWidth: 190 }}>
          <Section variant="highlight" accentColor="primary" padding="md" noWrap>
            <Stack direction="horizontal" justify="between" style={{ marginBottom: 5 }}>
              <Text variant="xs" noMargin>Subtotal</Text>
              <Text variant="xs" noMargin>{formatCurrency(data.subtotal)}</Text>
            </Stack>
            <Stack direction="horizontal" justify="between" style={{ marginBottom: 5 }}>
              <Text variant="xs" noMargin>Tax ({data.taxRate}%)</Text>
              <Text variant="xs" noMargin>{formatCurrency(data.tax)}</Text>
            </Stack>
            <Divider spacing="sm" />
            <Stack direction="horizontal" justify="between">
              <Heading level={4} noMargin>TOTAL DUE</Heading>
              <Heading level={4} color="primary" noMargin>{formatCurrency(data.total)}</Heading>
            </Stack>
          </Section>
        </View>
      </Stack>

      {/* Footer */}
      <PageFooter
        variant="branded"
        leftText={`${data.company.name} · ${data.company.website}`}
        rightText={data.invoice.number}
        style={{ marginTop: 20 }}
      />
    </>
  );
}

export interface BoldInvoiceProps {
  data: InvoiceData;
  theme: PdfxTheme;
}

export function BoldInvoice({ data, theme }: BoldInvoiceProps) {
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
          <BoldInvoiceContent data={data} theme={theme} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}
