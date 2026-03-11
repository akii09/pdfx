import { Document, Text as PDFText, Page, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { KeyValue } from '../../components/key-value';
import { PageFooter } from '../../components/page-footer';
import { PageHeader } from '../../components/page-header';
import { PdfImage } from '../../components/pdf-image';
import { Section } from '../../components/section';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/table';
import { Text } from '../../components/text';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createInvoiceStyles } from './invoice.styles';
import type {
  InvoiceCurrency,
  InvoiceLineItem,
  InvoiceSummary,
  InvoiceTemplateProps,
  InvoiceVariant,
} from './invoice.types';

// ─── Helper Functions ────────────────────────────────────────────────────────

/**
 * Formats a number as currency.
 */
function formatCurrency(
  amount: number,
  currency: InvoiceCurrency = { symbol: '$', position: 'before', decimals: 2 }
): string {
  const { symbol = '$', position = 'before', decimals = 2 } = currency;
  const formatted = amount.toFixed(decimals);
  return position === 'before' ? `${symbol}${formatted}` : `${formatted}${symbol}`;
}

/**
 * Calculates invoice summary from line items.
 */
function calculateSummary(items: InvoiceLineItem[], taxRate = 0): InvoiceSummary {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  return { subtotal, tax, taxRate, total };
}

// ─── Variant Components ──────────────────────────────────────────────────────

function ClassicVariant({
  props,
  styles,
  summary,
  currency,
}: {
  props: InvoiceTemplateProps;
  styles: ReturnType<typeof createInvoiceStyles>;
  summary: InvoiceSummary;
  currency: InvoiceCurrency;
}) {
  const { company, client, invoiceNumber, dueDate, items, payment, notes } = props;

  return (
    <>
      <PageHeader
        variant="logo-left"
        logo={company.logo ? <PdfImage src={company.logo} style={{ margin: 0 }} /> : undefined}
        title={company.name}
        subtitle={company.subtitle}
        rightText={invoiceNumber}
        rightSubText={`Due: ${dueDate}`}
        style={{ marginBottom: 0 }}
      />

      <Section noWrap style={styles.billingSection as Style}>
        <View style={styles.billingColumn}>
          <PDFText style={styles.billingLabel}>From</PDFText>
          <PDFText style={styles.billingText}>{company.name}</PDFText>
          <PDFText style={styles.billingText}>{company.address}</PDFText>
          {company.email && <PDFText style={styles.billingText}>{company.email}</PDFText>}
          {company.phone && <PDFText style={styles.billingText}>{company.phone}</PDFText>}
        </View>
        <View style={styles.billingColumn}>
          <PDFText style={styles.billingLabel}>Bill To</PDFText>
          <PDFText style={styles.billingText}>{client.name}</PDFText>
          <PDFText style={styles.billingText}>{client.address}</PDFText>
          {client.email && <PDFText style={styles.billingText}>{client.email}</PDFText>}
          {client.phone && <PDFText style={styles.billingText}>{client.phone}</PDFText>}
        </View>
        {payment && (
          <View style={styles.billingColumn}>
            <PDFText style={styles.billingLabel}>Payment</PDFText>
            {payment.methods && <PDFText style={styles.billingText}>{payment.methods}</PDFText>}
            {payment.terms && <PDFText style={styles.billingText}>{payment.terms}</PDFText>}
            {company.taxId && <PDFText style={styles.billingText}>{company.taxId}</PDFText>}
          </View>
        )}
      </Section>

      <Table variant="grid" zebraStripe>
        <TableHeader>
          <TableRow header>
            <TableCell>Description</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`item-${item.description}-${index}`}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="center">
                {`${item.quantity}${item.unit ? ` ${item.unit}` : ''}`}
              </TableCell>
              <TableCell align="center">{formatCurrency(item.unitPrice, currency)}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.quantity * item.unitPrice, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <KeyValue
            size="sm"
            dividerThickness={1}
            items={[
              { key: 'Subtotal', value: formatCurrency(summary.subtotal, currency) },
              ...(summary.tax
                ? [
                    {
                      key: `Tax${summary.taxRate ? ` (${summary.taxRate}%)` : ''}`,
                      value: formatCurrency(summary.tax, currency),
                    },
                  ]
                : []),
              ...(summary.discount
                ? [{ key: 'Discount', value: `-${formatCurrency(summary.discount, currency)}` }]
                : []),
              ...(summary.shipping
                ? [{ key: 'Shipping', value: formatCurrency(summary.shipping, currency) }]
                : []),
              {
                key: 'Total',
                value: formatCurrency(summary.total, currency),
                valueStyle: { fontSize: 12, fontWeight: 700 },
                keyStyle: { fontSize: 12, fontWeight: 700 },
              },
            ]}
            divided
          />
        </View>
      </View>

      {notes && (
        <View style={styles.notesSection}>
          <PDFText style={styles.notesLabel}>Notes</PDFText>
          <PDFText style={styles.notesText}>{notes}</PDFText>
        </View>
      )}

      <PageFooter leftText={notes || ''} rightText="Page 1 of 1" sticky pagePadding={25} />
    </>
  );
}

function ModernVariant({
  props,
  styles,
  summary,
  currency,
}: {
  props: InvoiceTemplateProps;
  styles: ReturnType<typeof createInvoiceStyles>;
  summary: InvoiceSummary;
  currency: InvoiceCurrency;
}) {
  const { company, client, invoiceNumber, invoiceDate, dueDate, items, notes } = props;

  return (
    <>
      {/* Full-width branded header */}
      <View style={styles.modernHeader}>
        <PDFText style={styles.modernHeaderTitle}>{company.name}</PDFText>
        {company.subtitle && (
          <PDFText style={styles.modernHeaderSubtitle}>{company.subtitle}</PDFText>
        )}
      </View>

      {/* Invoice meta strip */}
      <View style={styles.invoiceMeta}>
        <View style={styles.invoiceMetaItem}>
          <PDFText style={styles.invoiceMetaLabel}>Invoice</PDFText>
          <PDFText style={styles.invoiceMetaValue}>{invoiceNumber}</PDFText>
        </View>
        <View style={styles.invoiceMetaItem}>
          <PDFText style={styles.invoiceMetaLabel}>Date</PDFText>
          <PDFText style={styles.invoiceMetaValue}>{invoiceDate}</PDFText>
        </View>
        <View style={styles.invoiceMetaItem}>
          <PDFText style={styles.invoiceMetaLabel}>Due Date</PDFText>
          <PDFText style={styles.invoiceMetaValue}>{dueDate}</PDFText>
        </View>
        <View style={styles.invoiceMetaItem}>
          <PDFText style={styles.invoiceMetaLabel}>Amount Due</PDFText>
          <PDFText style={styles.invoiceMetaValue}>
            {formatCurrency(summary.total, currency)}
          </PDFText>
        </View>
      </View>

      {/* Billing info */}
      <Section noWrap style={styles.billingSection as Style}>
        <View style={styles.billingColumn}>
          <PDFText style={styles.billingLabel}>From</PDFText>
          <PDFText style={styles.billingText}>{company.name}</PDFText>
          <PDFText style={styles.billingText}>{company.address}</PDFText>
          {company.email && <PDFText style={styles.billingText}>{company.email}</PDFText>}
        </View>
        <View style={styles.billingColumn}>
          <PDFText style={styles.billingLabel}>Bill To</PDFText>
          <PDFText style={styles.billingText}>{client.name}</PDFText>
          <PDFText style={styles.billingText}>{client.address}</PDFText>
          {client.email && <PDFText style={styles.billingText}>{client.email}</PDFText>}
        </View>
      </Section>

      {/* Items table */}
      <Table variant="primary-header">
        <TableHeader>
          <TableRow header>
            <TableCell>Description</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`item-${item.description}-${index}`}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="center">{`${item.quantity}`}</TableCell>
              <TableCell align="center">{formatCurrency(item.unitPrice, currency)}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.quantity * item.unitPrice, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <KeyValue
            size="sm"
            items={[
              { key: 'Subtotal', value: formatCurrency(summary.subtotal, currency) },
              ...(summary.tax
                ? [{ key: 'Tax', value: formatCurrency(summary.tax, currency) }]
                : []),
              {
                key: 'Total',
                value: formatCurrency(summary.total, currency),
                valueStyle: { fontSize: 14, fontWeight: 700 },
                keyStyle: { fontSize: 14, fontWeight: 700 },
              },
            ]}
            divided
          />
        </View>
      </View>

      {notes && (
        <View style={styles.notesSection}>
          <PDFText style={styles.notesLabel}>Notes</PDFText>
          <PDFText style={styles.notesText}>{notes}</PDFText>
        </View>
      )}
    </>
  );
}

function MinimalVariant({
  props,
  styles,
  summary,
  currency,
}: {
  props: InvoiceTemplateProps;
  styles: ReturnType<typeof createInvoiceStyles>;
  summary: InvoiceSummary;
  currency: InvoiceCurrency;
}) {
  const { company, client, invoiceNumber, invoiceDate, dueDate, items, notes } = props;

  return (
    <>
      {/* Minimal header with invoice stamp */}
      <View style={styles.minimalHeader}>
        <View>
          <Text variant="lg" weight="bold" noMargin>
            {company.name}
          </Text>
          <Text variant="sm" color="mutedForeground" noMargin>
            {company.address}
          </Text>
          {company.email && (
            <Text variant="sm" color="mutedForeground" noMargin>
              {company.email}
            </Text>
          )}
        </View>
        <View style={styles.minimalInvoiceStamp}>
          <PDFText style={styles.minimalInvoiceLabel}>Invoice</PDFText>
          <PDFText style={styles.minimalInvoiceNumber}>{invoiceNumber}</PDFText>
          <Text variant="xs" color="mutedForeground" noMargin>
            {invoiceDate} • Due {dueDate}
          </Text>
        </View>
      </View>

      {/* Two-column billing */}
      <Section noWrap style={styles.billingSection as Style}>
        <View style={styles.billingColumn}>
          <PDFText style={styles.billingLabel}>Bill To</PDFText>
          <PDFText style={styles.billingText}>{client.name}</PDFText>
          <PDFText style={styles.billingText}>{client.address}</PDFText>
          {client.email && <PDFText style={styles.billingText}>{client.email}</PDFText>}
        </View>
      </Section>

      {/* Compact table */}
      <Table variant="minimal">
        <TableHeader>
          <TableRow header>
            <TableCell>Item</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`item-${item.description}-${index}`}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="center">{`${item.quantity}`}</TableCell>
              <TableCell align="right">
                {formatCurrency(item.quantity * item.unitPrice, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Inline summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <KeyValue
            size="sm"
            direction="horizontal"
            items={[
              { key: 'Subtotal', value: formatCurrency(summary.subtotal, currency) },
              ...(summary.tax
                ? [{ key: 'Tax', value: formatCurrency(summary.tax, currency) }]
                : []),
              {
                key: 'Total Due',
                value: formatCurrency(summary.total, currency),
                valueStyle: { fontWeight: 700 },
              },
            ]}
          />
        </View>
      </View>

      {notes && (
        <View style={styles.notesSection}>
          <PDFText style={styles.notesText}>{notes}</PDFText>
        </View>
      )}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * InvoiceTemplate — A data-driven invoice PDF generator.
 *
 * Supports three visual variants: classic, modern, and minimal.
 * Pass structured data (company, client, items) and get a professional invoice.
 *
 * @example Basic usage
 * ```tsx
 * <InvoiceTemplate
 *   invoiceNumber="INV-001"
 *   invoiceDate="March 1, 2026"
 *   dueDate="March 31, 2026"
 *   company={{ name: "Acme Inc", address: "123 Main St" }}
 *   client={{ name: "Client Co", address: "456 Oak Ave" }}
 *   items={[{ description: "Consulting", quantity: 10, unitPrice: 150 }]}
 * />
 * ```
 *
 * @example Modern variant with tax
 * ```tsx
 * <InvoiceTemplate
 *   variant="modern"
 *   invoiceNumber="INV-002"
 *   invoiceDate="March 1, 2026"
 *   dueDate="March 31, 2026"
 *   company={{ name: "TechCorp", address: "789 Tech Blvd", logo: "/logo.png" }}
 *   client={{ name: "StartupXYZ", address: "321 Innovation Dr" }}
 *   items={[{ description: "Development", quantity: 1, unitPrice: 5000 }]}
 *   taxRate={8.5}
 * />
 * ```
 */
export function InvoiceTemplate(props: InvoiceTemplateProps) {
  const {
    variant = 'classic',
    invoiceNumber,
    items,
    summary: providedSummary,
    taxRate = 0,
    currency = { symbol: '$', position: 'before', decimals: 2 },
    style,
    title,
  } = props;

  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createInvoiceStyles(theme), [theme]);

  // Calculate summary if not provided
  const summary = providedSummary || calculateSummary(items, taxRate);

  const pageStyles: Style[] = [styles.page];
  if (style) {
    pageStyles.push(style);
  }

  const variantMap: Record<InvoiceVariant, React.ReactNode> = {
    classic: <ClassicVariant props={props} styles={styles} summary={summary} currency={currency} />,
    modern: <ModernVariant props={props} styles={styles} summary={summary} currency={currency} />,
    minimal: <MinimalVariant props={props} styles={styles} summary={summary} currency={currency} />,
  };

  return (
    <Document title={title || `Invoice ${invoiceNumber}`}>
      <Page size="A4" style={pageStyles}>
        {variantMap[variant]}
      </Page>
    </Document>
  );
}
