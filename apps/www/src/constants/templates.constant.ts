/**
 * Constants for the invoice templates documentation page.
 * Includes CLI commands, required component lists, and source code snippets.
 */

export const templatesTocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'cli-install', title: 'CLI Installation', level: 2 },
  { id: 'requirements', title: 'Required Components', level: 2 },
  { id: 'template-classic', title: 'Classic', level: 2 },
  { id: 'template-modern', title: 'Modern', level: 2 },
  { id: 'template-minimal', title: 'Minimal', level: 2 },
  { id: 'template-bold', title: 'Bold', level: 2 },
  { id: 'customizing', title: 'Customizing', level: 2 },
];

export const templateCliCommands = `# Install a specific invoice template
npx @pdfx/cli template add invoice-classic
npx @pdfx/cli template add invoice-modern
npx @pdfx/cli template add invoice-minimal
npx @pdfx/cli template add invoice-bold

# List all available templates
npx @pdfx/cli template list

# Install all invoice templates at once
npx @pdfx/cli template add invoice-classic invoice-modern invoice-minimal invoice-bold`;

export const templateRequiredComponents = `# Install all components used by invoice templates
npx @pdfx/cli add heading text divider stack section
npx @pdfx/cli add table data-table key-value badge
npx @pdfx/cli add page-header page-footer`;

export const classicInvoiceCode = `import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import {
  Badge, Divider, Heading, KeyValue, PageFooter, PageHeader,
  PdfxThemeProvider, Stack, Table, TableBody, TableCell,
  TableFooter, TableHeader, TableRow, Text,
} from '@/components/pdfx';
import { professionalTheme } from '@/lib/pdfx-theme';

const data = {
  company: { name: 'Acme Studio', email: 'hello@acme.com', phone: '+1 555 123-4567' },
  client: { name: 'TechCorp Inc.', address: '456 Business Ave, New York' },
  invoice: { number: 'INV-2026-001', date: 'Feb 22, 2026', dueDate: 'Mar 22, 2026' },
  items: [
    { description: 'Brand Identity Design', qty: 1, rate: 2500, amount: 2500 },
    { description: 'Frontend Development', qty: 40, rate: 95, amount: 3800 },
  ],
  subtotal: 6300, tax: 630, total: 6930,
};

export function ClassicInvoice() {
  const theme = professionalTheme;
  return (
    <Document>
      <Page size="A4" style={{ padding: 48 }}>
        <PdfxThemeProvider theme={theme}>
          <PageHeader
            variant="two-column"
            title={data.company.name}
            address={data.client.address}
            email={data.company.email}
            phone={data.company.phone}
          />
          <Stack direction="horizontal" justify="between" style={{ marginBottom: 20 }}>
            <Heading level={2} noMargin>INVOICE</Heading>
            <Badge label="UNPAID" variant="warning" />
          </Stack>
          <Table variant="line">
            <TableHeader>
              <TableRow header>
                <TableCell header>Description</TableCell>
                <TableCell header align="right" width={80}>Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.description}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right" width={80}>\${item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <KeyValue
            direction="horizontal"
            items={[
              { key: 'Subtotal', value: \`\$\${data.subtotal}\` },
              { key: 'Tax (10%)', value: \`\$\${data.tax}\` },
              { key: 'Total Due', value: \`\$\${data.total}\`, valueColor: 'primary' },
            ]}
          />
          <PageFooter variant="simple" leftText={data.company.name} rightText={data.invoice.number} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}`;

export const modernInvoiceCode = `import { Document, Page } from '@react-pdf/renderer';
import {
  Badge, DataTable, Divider, Heading, KeyValue, PageFooter, PageHeader,
  PdfxThemeProvider, Section, Stack, Text,
} from '@/components/pdfx';
import { modernTheme } from '@/lib/pdfx-theme';

const columns = [
  { key: 'description', header: 'Service', width: '45%' },
  { key: 'qty', header: 'Qty', align: 'center', width: '10%' },
  { key: 'rate', header: 'Rate', align: 'right', width: '20%', render: (v) => \`\$\${v}\` },
  { key: 'amount', header: 'Total', align: 'right', width: '25%', render: (v) => \`\$\${v}\` },
];

export function ModernInvoice({ data, theme = modernTheme }) {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <PdfxThemeProvider theme={theme}>
          <PageHeader variant="branded" title={data.company.name} subtitle={data.company.email} />
          <Stack direction="horizontal" gap="md" style={{ marginBottom: 24 }}>
            <Section variant="card" padding="md" style={{ flex: 1 }}>
              <Text variant="label">BILLED TO</Text>
              <Text weight="bold">{data.client.name}</Text>
              <Text variant="small">{data.client.address}</Text>
            </Section>
            <Section variant="card" padding="md" style={{ flex: 1 }}>
              <KeyValue items={[
                { key: 'Invoice', value: data.invoice.number },
                { key: 'Due', value: data.invoice.dueDate },
              ]} />
              <Badge label="UNPAID" variant="warning" />
            </Section>
          </Stack>
          <DataTable columns={columns} data={data.items} variant="primary-header" />
          <Section variant="card" padding="md" style={{ alignSelf: 'flex-end', minWidth: 200 }}>
            <KeyValue items={[
              { key: 'Subtotal', value: \`\$\${data.subtotal}\` },
              { key: 'Tax', value: \`\$\${data.tax}\` },
              { key: 'Total Due', value: \`\$\${data.total}\`, valueColor: 'primary' },
            ]} boldValue />
          </Section>
          <PageFooter variant="minimal" leftText={data.company.name} rightText={data.invoice.number} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}`;

export const minimalInvoiceCode = `import { Document, Page } from '@react-pdf/renderer';
import {
  Divider, Heading, KeyValue, PageFooter, PageHeader,
  PdfxThemeProvider, Stack, Table, TableBody, TableCell,
  TableHeader, TableRow, Text,
} from '@/components/pdfx';
import { minimalTheme } from '@/lib/pdfx-theme';

export function MinimalInvoice({ data, theme = minimalTheme }) {
  return (
    <Document>
      <Page size="A4" style={{ paddingTop: 72, paddingRight: 56, paddingBottom: 72, paddingLeft: 56 }}>
        <PdfxThemeProvider theme={theme}>
          <PageHeader
            variant="minimal"
            title={data.company.name}
            rightText="INVOICE"
            rightSubText={data.invoice.number}
          />
          <Stack direction="horizontal" justify="between" style={{ marginBottom: 32 }}>
            <Stack direction="vertical" gap="none">
              <Text variant="label">From</Text>
              <Text weight="medium">{data.company.name}</Text>
              <Text variant="small" color="mutedForeground">{data.company.email}</Text>
            </Stack>
            <Stack direction="vertical" gap="none">
              <Text variant="label">To</Text>
              <Text weight="medium">{data.client.name}</Text>
              <Text variant="small" color="mutedForeground">{data.client.email}</Text>
            </Stack>
          </Stack>
          <Divider spacing="none" />
          <Table variant="minimal">
            <TableHeader>
              <TableRow header>
                <TableCell header>Service</TableCell>
                <TableCell header align="right" width={90}>Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.description}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right" width={90}>\$\${item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider spacing="none" />
          <Stack direction="horizontal" justify="end" style={{ marginTop: 16 }}>
            <KeyValue items={[
              { key: 'Subtotal', value: \`\$\${data.subtotal}\` },
              { key: 'Tax', value: \`\$\${data.tax}\` },
              { key: 'Total', value: \`\$\${data.total}\` },
            ]} />
          </Stack>
          <PageFooter variant="centered" leftText={data.company.name} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}`;

export const boldInvoiceCode = `import { Document, Page } from '@react-pdf/renderer';
import {
  Badge, Divider, Heading, KeyValue, PageFooter,
  PdfxThemeProvider, Section, Stack, Table, TableBody,
  TableCell, TableHeader, TableRow, Text,
} from '@/components/pdfx';

export function BoldInvoice({ data, theme }) {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <PdfxThemeProvider theme={theme}>
          {/* Bold header with primary accent border */}
          <Stack
            direction="horizontal"
            justify="between"
            style={{ borderBottomWidth: 3, borderBottomColor: theme.colors.primary, paddingBottom: 20, marginBottom: 24 }}
          >
            <Heading level={1} color="primary" noMargin>INVOICE</Heading>
            <Stack direction="vertical" gap="none" style={{ alignItems: 'flex-end' }}>
              <Text weight="bold">{data.company.name}</Text>
              <Text variant="small" color="mutedForeground">{data.company.email}</Text>
            </Stack>
          </Stack>

          <Stack direction="horizontal" gap="md" style={{ marginBottom: 24 }}>
            <Section variant="callout" accentColor="primary" padding="md" style={{ flex: 1 }}>
              <Text variant="label">BILLED TO</Text>
              <Text weight="bold">{data.client.name}</Text>
              <Text variant="small">{data.client.address}</Text>
            </Section>
            <Section variant="callout" accentColor="accent" padding="md" style={{ flex: 1 }}>
              <KeyValue items={[
                { key: 'Invoice', value: data.invoice.number },
                { key: 'Due', value: data.invoice.dueDate },
              ]} size="sm" />
              <Badge label="UNPAID" variant="warning" />
            </Section>
          </Stack>

          <Table variant="striped">
            <TableHeader>
              <TableRow header>
                <TableCell header>Description</TableCell>
                <TableCell header align="right" width={85}>Amount</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.description}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right" width={85}>\$\${item.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Section variant="highlight" accentColor="primary" padding="md" style={{ alignSelf: 'flex-end', marginTop: 20 }}>
            <Heading level={4} noMargin>TOTAL DUE: \$\${data.total}</Heading>
          </Section>
          <PageFooter variant="branded" leftText={data.company.name} rightText={data.invoice.number} />
        </PdfxThemeProvider>
      </Page>
    </Document>
  );
}`;

export const templateCustomizationGuide = `// 1. Switch themes by passing any PdfxTheme
import { modernTheme, minimalTheme } from '@pdfx/shared';

<ClassicInvoice data={invoiceData} theme={modernTheme} />

// 2. Create a custom theme for your brand
const brandTheme: PdfxTheme = {
  ...professionalTheme,
  colors: {
    ...professionalTheme.colors,
    primary: '#6366f1',   // your brand color
    accent: '#f59e0b',    // accent highlights
  },
};

<ModernInvoice data={invoiceData} theme={brandTheme} />

// 3. Override individual fields at the data level
const myInvoiceData = {
  ...sampleInvoice,
  company: {
    name: 'Your Company Name',
    email: 'you@yourcompany.com',
    // ...
  },
};`;
