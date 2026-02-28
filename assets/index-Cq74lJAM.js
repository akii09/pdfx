import{j as e,r as f,L as A,F as L}from"./index-gxNVmCa4.js";import{c as C,u as j,S as R,D as F,a as D,V as i,p as S,P as E}from"./pdf-preview-CuKAGfS8.js";import{C as G,T as q,E as U,m as w,a as P,b as K,k as O,p as _,c as Q,s as X,t as Y}from"./template-code-explorer-DixRq5s3.js";import{a as J,b as Z}from"./code-block-C6Fi1gnR.js";import{u as ee}from"./use-document-title-DooqJWF8.js";import{T as r}from"./text-BI7uRLsX.js";import{S as h}from"./section-CcfaRtbW.js";import{T as V,a as I,b as u,c as a,d as B}from"./table-Bsib9-a6.js";import{K as g}from"./key-value-Cup8Tzw2.js";import{P as N}from"./page-header-DB0gGYVo.js";import{P as M}from"./page-footer-CqV-T9FD.js";import{P as ne}from"./pdf-image-CN0Ovb67.js";import{C as te}from"./code-xml-BeRff0up.js";import{L as H}from"./layers-DrAWNvlN.js";import"./copy-alp8Mrhl.js";import"./resolve-color-BxFvjghR.js";const re=[{path:"templates/pdfx/invoice-classic/invoice-classic.tsx",type:"registry:template",content:`import type { PdfxTheme } from '../../lib/pdfx-theme';
import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PdfImage } from '../../components/pdfx/pdf-image/pdfx-pdf-image';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Text } from '../../components/pdfx/text/pdfx-text';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceClassicData } from './invoice-classic.types';

// Sample data — replace with your own props or data source
const sampleData: InvoiceClassicData = {
  invoiceNumber: 'INV-2026-001',
  invoiceDate: 'February 17, 2026',
  dueDate: 'March 17, 2026',
  companyName: 'Your Company',
  subtitle: 'Professional Services',
  companyAddress: 'City, Country',
  companyEmail: 'hello@company.com',
  billTo: {
    name: 'Client Corp.',
    address: '456 Client Ave, Suite 2',
    email: 'contact@clientcorp.com',
    phone: '+1 (555) 123-4567',
  },
  items: [
    { description: 'Web Development', quantity: 1, unitPrice: 12500 },
    { description: 'UI/UX Design', quantity: 1, unitPrice: 8750 },
    { description: 'Consulting', quantity: 10, unitPrice: 1500 },
  ],
  summary: {
    subtotal: 36250,
    tax: 2537.5,
    total: 38787.5,
  },
  paymentTerms: {
    dueDate: 'March 17, 2026',
    method: 'UPI / Card / Bank Transfer',
    gst: 'GSTIN 123456789',
  },
  notes: 'Thank you for your business!',
  logo: '/favicon.png',
};

export function InvoiceClassicDocument({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceClassicData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceClassicContent data={data} />
    </PdfxThemeProvider>
  );
}

function InvoiceClassicContent({ data }: { data: InvoiceClassicData }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Document title={\`Invoice \${data.invoiceNumber}\`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="logo-left"
          logo={<PdfImage src={data.logo ?? '/favicon.png'} style={{ margin: 0 }} />}
          title={data.companyName}
          subtitle={data.subtitle}
          rightText={data.invoiceNumber}
          rightSubText={\`Due: \${data.dueDate}\`}
          style={{ marginBottom: 0 }}
        />
        <Section noWrap style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              From
            </Text>
            <Text noMargin variant="xs">{data.companyName}</Text>
            <Text noMargin variant="xs">{data.companyAddress}</Text>
            <Text noMargin variant="xs">{data.companyEmail}</Text>
          </View>
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              Bill To
            </Text>
            <Text noMargin variant="xs">{data.billTo.name}</Text>
            <Text noMargin variant="xs">{data.billTo.address}</Text>
            <Text noMargin variant="xs">{data.billTo.email}</Text>
          </View>
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text
              style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }}
              color="mutedForeground"
              transform="uppercase"
              noMargin
            >
              Payment Terms
            </Text>
            <Text noMargin variant="xs">{data.paymentTerms.method}</Text>
            <Text noMargin variant="xs">{data.paymentTerms.gst}</Text>
            <Text noMargin variant="xs">{data.paymentTerms.dueDate}</Text>
          </View>
        </Section>
        <Table variant="grid" zebraStripe>
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">QTY</TableCell>
              <TableCell align="center">Rate</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{\`\${item.quantity}\`}</TableCell>
                <TableCell align="center">{\`$\${item.unitPrice}\`}</TableCell>
                <TableCell align="right">{\`$\${(item.quantity * item.unitPrice).toFixed(2)}\`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={{ flexDirection: 'row', marginTop: 16 }}>
          <View style={{ marginLeft: 'auto', width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: \`$\${data.summary.subtotal.toFixed(2)}\` },
                { key: 'Tax', value: \`$\${data.summary.tax.toFixed(2)}\` },
                {
                  key: 'Total',
                  value: \`$\${data.summary.total.toFixed(2)}\`,
                  valueStyle: { fontSize: 12, fontWeight: 'bold' },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>
        <PageFooter
          leftText={data.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
`},{path:"templates/pdfx/invoice-classic/invoice-classic.types.ts",type:"registry:template",content:`export interface InvoiceClassicData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
  companyEmail: string;
  logo?: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
}
`}],oe={files:re},ae=[{path:"templates/pdfx/invoice-minimal/invoice-minimal.tsx",type:"registry:template",content:`import type { PdfxTheme } from '../../lib/pdfx-theme';
import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Text } from '../../components/pdfx/text/pdfx-text';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceMinimalData } from './invoice-minimal.types';

// Sample data — replace with your own props or data source
const sampleData: InvoiceMinimalData = {
  invoiceNumber: 'INV-2026-003',
  invoiceDate: 'February 20, 2026',
  dueDate: 'March 22, 2026',
  companyName: 'Your Company',
  subtitle: 'Professional Services',
  companyAddress: 'City, Country',
  companyEmail: 'hello@company.com',
  billTo: {
    name: 'Enterprise Corp',
    address: '500 Enterprise Way, Building A',
    email: 'finance@enterprisecorp.io',
    phone: '+1 (555) 246-8135',
  },
  items: [
    { description: 'Annual Licenselan', quantity: 1, unitPrice: 25000 },
    { description: 'Support & Maintenance', quantity: 12, unitPrice: 1500 },
    { description: 'Custom Integration', quantity: 1, unitPrice: 12000 },
  ],
  summary: {
    subtotal: 55000,
    tax: 3850,
    total: 58850,
  },
  paymentTerms: {
    dueDate: 'March 22, 2026',
    method: 'ACH Transfer / Check',
    gst: 'GSTIN 123456789',
  },
  notes: 'Invoice for annual enterprise subscription. Please retain for your records.',
};

export function InvoiceMinimalDocument({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceMinimalData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceMinimalContent data={data} />
    </PdfxThemeProvider>
  );
}

function InvoiceMinimalContent({ data }: { data: InvoiceMinimalData }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    invoiceStamp: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: 'solid',
      borderRadius: theme.primitives.borderRadius.sm,
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignSelf: 'flex-start',
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sectionGap,
    },
    infoLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 4,
    },
  });

  return (
    <Document title={\`Invoice \${data.invoiceNumber}\`}>
      <Page size="A4" style={styles.page}>
        <Section
          noWrap
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: theme.spacing.sectionGap,
          }}
        >
          <View style={{ flex: 1 }}>
            <PageHeader
              variant="minimal"
              title={data.companyName}
              subtitle={\`\${data.companyAddress}  ·  \${data.companyEmail}\`}
              marginBottom={0}
            />
          </View>
          <View style={styles.invoiceStamp}>
            <Text
              style={{
                fontSize: 7,
                fontWeight: 'bold',
                color: theme.colors.primary,
                textAlign: 'right',
              }}
              noMargin
              transform="uppercase"
            >
              Invoice
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: theme.colors.foreground,
                textAlign: 'right',
              }}
              noMargin
            >
              {data.invoiceNumber}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: theme.colors.mutedForeground,
                textAlign: 'right',
              }}
              noMargin
            >
              {data.invoiceDate}
            </Text>
          </View>
        </Section>
        <View style={styles.infoRow}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={styles.infoLabel} noMargin>
              Bill To
            </Text>
            <Text variant="sm" noMargin>
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
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel} noMargin>
              Invoice Details
            </Text>
            <KeyValue
              size="sm"
              items={[
                { key: 'Due Date', value: data.dueDate },
                { key: 'Payment', value: data.paymentTerms.method },
                { key: 'GST', value: data.paymentTerms.gst },
              ]}
            />
          </View>
        </View>
        <Table variant="compact">
          <TableHeader>
            <TableRow header>
              <TableCell>Description</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{\`\${item.quantity}\`}</TableCell>
                <TableCell align="right">{\`$\${item.unitPrice.toLocaleString()}\`}</TableCell>
                <TableCell align="right">{\`$\${(item.quantity * item.unitPrice).toFixed(2)}\`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1 }} />
          <View style={{ width: 240 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: \`$\${data.summary.subtotal.toFixed(2)}\` },
                { key: 'Tax (7%)', value: \`$\${data.summary.tax.toFixed(2)}\` },
                {
                  key: 'Balance Due',
                  value: \`$\${data.summary.total.toFixed(2)}\`,
                  valueStyle: {
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                  },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>
        <PageFooter
          leftText={data.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
`},{path:"templates/pdfx/invoice-minimal/invoice-minimal.types.ts",type:"registry:template",content:`export interface InvoiceMinimalData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
  companyEmail: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
}
`}],ie={files:ae},le=[{path:"templates/pdfx/invoice-modern/invoice-modern.tsx",type:"registry:template",content:`import type { PdfxTheme } from '../../lib/pdfx-theme';
import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Text } from '../../components/pdfx/text/pdfx-text';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import type { InvoiceModernData } from './invoice-modern.types';

// Sample data — replace with your own props or data source
const sampleData: InvoiceModernData = {
  invoiceNumber: 'INV-2026-002',
  invoiceDate: 'February 18, 2026',
  dueDate: 'March 20, 2026',
  companyName: 'Your Company',
  subtitle: 'Professional Services',
  companyAddress: 'City, Country',
  companyEmail: 'hello@company.com',
  billTo: {
    name: 'TechStart Solutions',
    address: '789 Innovation Blvd, Floor 3',
    email: 'billing@techstart.com',
    phone: '+1 (555) 987-6543',
  },
  items: [
    { description: 'API Integration', quantity: 1, unitPrice: 15000 },
    { description: 'SEO', quantity: 2, unitPrice: 5500 },
    { description: 'Security Audit', quantity: 1, unitPrice: 7200 },
  ],
  summary: {
    subtotal: 33200,
    tax: 2324,
    total: 35524,
  },
  paymentTerms: {
    dueDate: 'March 20, 2026',
    method: 'Wire Transfer / Bank Account',
    gst: 'GSTIN 123456789',
  },
  notes: 'Payment terms: Net 30 days. Thank you for your business!',
};

export function InvoiceModernDocument({
  theme,
  data = sampleData,
}: {
  theme?: PdfxTheme;
  data?: InvoiceModernData;
}) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceModernContent data={data} />
    </PdfxThemeProvider>
  );
}

function InvoiceModernContent({ data }: { data: InvoiceModernData }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
    metaRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sectionGap,
    },
    metaCol: {
      flex: 1,
      paddingRight: 12,
    },
    metaLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: theme.colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 3,
    },
    metaValue: {
      fontSize: 9,
      color: theme.colors.foreground,
    },
    dividerCol: {
      width: 1,
      backgroundColor: theme.colors.border,
      marginRight: 12,
    },
  });

  return (
    <Document title={\`Invoice \${data.invoiceNumber}\`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="branded"
          title={data.companyName}
          subtitle={\`\${data.subtitle}  ·  \${data.companyAddress}  ·  \${data.companyEmail}\`}
        />
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Number
            </Text>
            <Text style={{ ...styles.metaValue, fontWeight: 'bold', fontSize: 11 }} noMargin>
              {data.invoiceNumber}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Invoice Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.invoiceDate}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel} noMargin>
              Due Date
            </Text>
            <Text style={styles.metaValue} noMargin>
              {data.dueDate}
            </Text>
          </View>
          <View style={styles.dividerCol} />
          <View style={{ flex: 2 }}>
            <Text style={styles.metaLabel} noMargin>
              Billed To
            </Text>
            <Text style={{ ...styles.metaValue, fontWeight: 'bold' }} noMargin>
              {data.billTo.name}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.address}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.email}
            </Text>
            <Text style={{ ...styles.metaValue, color: theme.colors.mutedForeground }} noMargin>
              {data.billTo.phone}
            </Text>
          </View>
        </View>
        <Table variant="primary-header">
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
              // biome-ignore lint/suspicious/noArrayIndexKey: invoice items have no stable id
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{\`\${item.quantity}\`}</TableCell>
                <TableCell align="right">{\`$\${item.unitPrice.toLocaleString()}\`}</TableCell>
                <TableCell align="right">{\`$\${(item.quantity * item.unitPrice).toFixed(2)}\`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Section noWrap style={{ flexDirection: 'row', marginTop: 16 }}>
          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text style={styles.metaLabel} noMargin>
              Payment Method
            </Text>
            <Text variant="xs" noMargin>
              {data.paymentTerms.method}
            </Text>
            <Text variant="xs" noMargin color="mutedForeground">
              {data.paymentTerms.gst}
            </Text>
          </View>
          <View style={{ width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: \`$\${data.summary.subtotal.toFixed(2)}\` },
                { key: 'Tax (7%)', value: \`$\${data.summary.tax.toFixed(2)}\` },
                {
                  key: 'Total Due',
                  value: \`$\${data.summary.total.toFixed(2)}\`,
                  valueStyle: { fontSize: 12, fontWeight: 'bold' },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>
        <PageFooter
          leftText={data.notes}
          rightText="Page 1 of 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
`},{path:"templates/pdfx/invoice-modern/invoice-modern.types.ts",type:"registry:template",content:`export interface InvoiceModernData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
  companyEmail: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
}
`}],se={files:le},de="https://pdfx.akashpise.dev/schema/registry-item.json",ce="pdf-image",me="registry:ui",pe="PdfImage",ue="Image component with 7 display variants, fit modes, and optional captions",he=[{path:"components/pdfx/pdf-image/pdfx-pdf-image.tsx",content:`import { Image, Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';
type PdfxTheme = ReturnType<typeof usePdfxTheme>;

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Image source accepted by react-pdf's Image component.
 * - string: URL, absolute file path, or base64 data URI (\`data:image/png;base64,...\`)
 * - object: authenticated URL with custom headers
 */
export type PdfImageSrc =
  | string
  | { uri: string; method?: string; headers?: Record<string, string>; body?: string };

/**
 * Controls how the image fills its container (mirrors CSS object-fit).
 * - cover: fill, crop excess
 * - contain: fit inside, preserve aspect ratio, may letterbox
 * - fill: stretch to exactly fill (distorts aspect ratio)
 * - none: render at intrinsic size
 */
export type PdfImageFit = 'cover' | 'contain' | 'fill' | 'none';

/**
 * Visual layout variant.
 *
 * | Variant      | Width      | Height        | fit     | Notes                    |
 * |-------------|------------|---------------|---------|--------------------------|
 * | default     | prop/auto  | prop/auto     | contain | Standard inline image    |
 * | full-width  | 100%       | prop required | cover   | Banner / hero image      |
 * | thumbnail   | 80pt       | 80pt          | cover   | Small square preview     |
 * | avatar      | 48pt       | 48pt          | cover   | Circle-clipped portrait  |
 * | cover       | 100%       | 160pt         | cover   | Wide cover image         |
 * | bordered    | 100%/prop  | prop          | contain | Framed with border       |
 * | rounded     | prop/200pt | prop          | contain | Rounded corners          |
 */
export type PdfImageVariant =
  | 'default'
  | 'full-width'
  | 'thumbnail'
  | 'avatar'
  | 'cover'
  | 'bordered'
  | 'rounded';

export interface PdfImageProps {
  /** Image source: URL, base64 data URI, file path, or authenticated object. */
  src: PdfImageSrc;
  /** Display variant controlling size and appearance. @default 'default' */
  variant?: PdfImageVariant;
  /** Width in PDF points. Required unless variant provides a default. */
  width?: number | string;
  /** Height in PDF points. Required unless variant provides a default. */
  height?: number | string;
  /** How the image fills its container. @default variant-dependent */
  fit?: PdfImageFit;
  /** Focal point for objectFit crop, e.g. '50% 50%' or 'top left'. @default '50% 50%' */
  position?: string;
  /** Optional caption text rendered below the image in muted style. */
  caption?: string;
  /**
   * Aspect ratio helper: if width is provided but height is not,
   * height = width / aspectRatio. E.g. 16/9 for widescreen images.
   */
  aspectRatio?: number;
  /**
   * Border radius override in PDF points.
   * Defaults: avatar = 999 (circle), rounded = 8, others = 0.
   */
  borderRadius?: number;
  /**
   * Prevent the image (+ optional caption) from being split across page boundaries.
   * @default true — images should never be clipped at the page edge.
   */
  noWrap?: boolean;
  /** Custom style override applied to the image element. */
  style?: Style;
}

// ─── Format validation ────────────────────────────────────────────────────────

const UNSUPPORTED_FORMATS = ['webp', 'avif', 'heic', 'heif', 'ico'];

/**
 * Detect image format from a string src (URL, data URI, or file path).
 * Returns null if unknown.
 */
function detectFormat(src: PdfImageSrc): string | null {
  if (typeof src !== 'string') return null;
  // data URI: data:image/webp;base64,...
  const dataMatch = src.match(/^data:image\\/([a-zA-Z0-9+.-]+)/);
  if (dataMatch) return dataMatch[1].toLowerCase();
  // URL / path: strip query string then get extension
  const ext = src.split('?')[0].split('.').pop()?.toLowerCase();
  return ext ?? null;
}

function warnIfUnsupported(src: PdfImageSrc): void {
  const fmt = detectFormat(src);
  if (fmt && UNSUPPORTED_FORMATS.includes(fmt)) {
    console.warn(
      \`[PdfImage] Unsupported format "\${fmt}" detected. react-pdf supports: JPEG, PNG, GIF (first frame), BMP, SVG. Convert to PNG or JPEG before use (e.g. sharp().toFormat('png')).\`
    );
  }
}

// ─── Variant dimension defaults ───────────────────────────────────────────────

interface VariantDefaults {
  width?: number | string;
  height?: number | string;
  fit: PdfImageFit;
  borderRadius?: number;
}

const VARIANT_DEFAULTS: Record<PdfImageVariant, VariantDefaults> = {
  default: { fit: 'contain' },
  'full-width': { width: '100%', fit: 'cover' },
  thumbnail: { width: 80, height: 80, fit: 'cover' },
  avatar: { width: 48, height: 48, fit: 'cover', borderRadius: 999 },
  cover: { width: '100%', height: 160, fit: 'cover' },
  bordered: { width: '100%', fit: 'contain' },
  rounded: { width: 200, fit: 'contain', borderRadius: 8 },
};

// ─── Styles ───────────────────────────────────────────────────────────────────

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createImageStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createImageStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

function createImageStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      // Base — dimensions are applied dynamically
    },
    imageBordered: {
      borderWidth: 1,
      borderColor: t.colors.border,
      borderStyle: 'solid',
    },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}

// ─── PdfImage ─────────────────────────────────────────────────────────────────

/**
 * PdfImage — a validated, theme-aware wrapper around react-pdf's \`<Image>\`.
 *
 * @example Basic usage
 * \`\`\`tsx
 * <PdfImage src="https://example.com/photo.jpg" width={200} height={150} />
 * \`\`\`
 *
 * @example Base64 (recommended for reliability)
 * \`\`\`tsx
 * <PdfImage src="data:image/png;base64,iVBORw0KGgo..." variant="avatar" />
 * \`\`\`
 *
 * @example Full-width banner with caption
 * \`\`\`tsx
 * <PdfImage src={bannerUrl} variant="cover" height={120} caption="Q1 2025 Team Photo" />
 * \`\`\`
 *
 * @example Aspect ratio helper
 * \`\`\`tsx
 * <PdfImage src={chartPng} width={400} aspectRatio={16 / 9} />
 * \`\`\`
 *
 * Supported formats: JPEG, PNG, GIF (first frame only), BMP, SVG.
 * Unsupported: WebP, AVIF, HEIC — a console warning is emitted if detected.
 */
export function PdfImage({
  src,
  variant = 'default',
  width,
  height,
  fit,
  position = '50% 50%',
  caption,
  aspectRatio,
  borderRadius,
  noWrap = true,
  style,
}: PdfImageProps) {
  warnIfUnsupported(src);

  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => getStyles(theme), [theme]);
  const defaults = VARIANT_DEFAULTS[variant];

  // ── Resolve dimensions ─────────────────────────────────────────────
  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight: number | string | undefined = (() => {
    if (height !== undefined) return height;
    if (defaults.height !== undefined) return defaults.height;
    if (aspectRatio !== undefined && typeof resolvedWidth === 'number') {
      return resolvedWidth / aspectRatio;
    }
    return undefined;
  })();

  const resolvedFit = fit ?? defaults.fit;
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  // ── Build image style array ────────────────────────────────────────
  const imageStyles: Style[] = [styles.image];

  if (resolvedWidth !== undefined) imageStyles.push({ width: resolvedWidth } as Style);
  if (resolvedHeight !== undefined) imageStyles.push({ height: resolvedHeight } as Style);

  imageStyles.push({
    objectFit: resolvedFit,
    objectPosition: position,
  } as Style);

  if (resolvedRadius !== undefined) {
    imageStyles.push({ borderRadius: resolvedRadius } as Style);
  }

  if (variant === 'bordered') {
    imageStyles.push(styles.imageBordered);
  }

  if (style) imageStyles.push(style);

  // ── Render ─────────────────────────────────────────────────────────
  const content = (
    <View style={styles.container}>
      <Image src={src} style={imageStyles} />
      {caption ? <PDFText style={styles.caption}>{caption}</PDFText> : null}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}
`,type:"registry:component"}],ge=["@react-pdf/renderer"],ye=["theme"],fe={$schema:de,name:ce,type:me,title:pe,description:ue,files:he,dependencies:ge,registryDependencies:ye},be="https://pdfx.akashpise.dev/schema/registry-item.json",xe="table",Te="registry:ui",ve="Table",Se="Composable table with Table, TableRow, TableCell",we=JSON.parse(`[{"path":"components/pdfx/table/pdfx-table.tsx","content":"import { Text as PDFText, View } from '@react-pdf/renderer';\\nimport type { Style } from '@react-pdf/types';\\nimport React from 'react';\\nimport { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';\\nimport { createTableStyles } from './pdfx-table.styles';\\nimport type {\\n  TableCellProps,\\n  TableProps,\\n  TableRowProps,\\n  TableSectionProps,\\n  TableVariant,\\n} from './pdfx-table.types';\\n\\nfunction processTableChildren(\\n  children: React.ReactNode,\\n  variant: TableVariant,\\n  zebraStripe: boolean\\n): React.ReactNode {\\n  let bodyRowIndex = 0;\\n\\n  return React.Children.map(children, (child) => {\\n    if (!React.isValidElement(child)) return child;\\n\\n    if (child.type === TableHeader || child.type === TableBody || child.type === TableFooter) {\\n      const isBody = child.type === TableBody;\\n      const sectionChild = child as React.ReactElement<TableSectionProps>;\\n      const sectionChildren = React.Children.map(sectionChild.props.children, (rowChild) => {\\n        if (React.isValidElement(rowChild) && rowChild.type === TableRow) {\\n          const rowProps: Partial<TableRowProps> = { variant };\\n\\n          if (isBody && zebraStripe) {\\n            const isStripe = bodyRowIndex % 2 === 1;\\n            bodyRowIndex++;\\n            if (isStripe) {\\n              rowProps.stripe = true;\\n            }\\n          }\\n\\n          return React.cloneElement(rowChild as React.ReactElement<TableRowProps>, rowProps);\\n        }\\n        return rowChild;\\n      });\\n\\n      return React.cloneElement(child, {}, sectionChildren);\\n    }\\n\\n    if (child.type === TableRow) {\\n      return React.cloneElement(child as React.ReactElement<TableRowProps>, { variant });\\n    }\\n\\n    return child;\\n  });\\n}\\n\\nexport function TableHeader({ children, style }: TableSectionProps) {\\n  // minPresenceAhead: if < 60pt remain on the page, move the header to the next page\\n  // so the header is never stranded alone at the bottom without any body rows.\\n  return (\\n    <View minPresenceAhead={60} style={style}>\\n      {children}\\n    </View>\\n  );\\n}\\n\\nexport function TableBody({ children, style }: TableSectionProps) {\\n  return <View style={style}>{children}</View>;\\n}\\n\\nexport function TableFooter({ children, style }: TableSectionProps) {\\n  return <View style={style}>{children}</View>;\\n}\\n\\nexport function Table({\\n  children,\\n  style,\\n  variant = 'line',\\n  zebraStripe = false,\\n  noWrap = false,\\n}: TableProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const tableStyles: Style[] = [styles.table];\\n  const effectiveZebra = variant === 'striped' ? true : zebraStripe;\\n\\n  if (variant === 'grid') {\\n    tableStyles.push(styles.tableGrid);\\n  } else if (variant === 'line') {\\n    tableStyles.push(styles.tableLine);\\n  } else if (variant === 'minimal') {\\n    tableStyles.push(styles.tableMinimal);\\n  } else if (variant === 'striped') {\\n    tableStyles.push(styles.tableStriped);\\n  } else if (variant === 'compact') {\\n    tableStyles.push(styles.tableCompact);\\n  } else if (variant === 'bordered') {\\n    tableStyles.push(styles.tableBordered);\\n  } else if (variant === 'primary-header') {\\n    tableStyles.push(styles.tablePrimaryHeader);\\n  }\\n\\n  const styleArray = style ? [...tableStyles, style] : tableStyles;\\n  const processedChildren = processTableChildren(children, variant, effectiveZebra);\\n\\n  const inner = <View style={styleArray}>{processedChildren}</View>;\\n  return noWrap ? <View wrap={false}>{inner}</View> : inner;\\n}\\n\\nexport function TableRow({\\n  header,\\n  footer,\\n  stripe,\\n  children,\\n  style,\\n  variant = 'line',\\n}: TableRowProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const rowStyles: Style[] = [styles.row];\\n\\n  if (variant === 'grid') {\\n    rowStyles.push(styles.rowGrid);\\n  } else if (variant === 'line') {\\n    rowStyles.push(styles.rowLine);\\n  } else if (variant === 'minimal') {\\n    rowStyles.push(styles.rowMinimal);\\n  } else if (variant === 'striped') {\\n    rowStyles.push(styles.rowStriped);\\n  } else if (variant === 'compact') {\\n    rowStyles.push(styles.rowCompact);\\n  } else if (variant === 'bordered') {\\n    rowStyles.push(styles.rowBordered);\\n  } else if (variant === 'primary-header') {\\n    rowStyles.push(styles.rowPrimaryHeader);\\n  }\\n\\n  if (header) {\\n    if (variant === 'line') rowStyles.push(styles.rowHeaderLine);\\n    else if (variant === 'minimal') rowStyles.push(styles.rowHeaderMinimal);\\n    else if (variant === 'striped') rowStyles.push(styles.rowHeaderStriped);\\n    else if (variant === 'compact') rowStyles.push(styles.rowHeaderCompact);\\n    else if (variant === 'bordered') rowStyles.push(styles.rowHeaderBordered);\\n    else if (variant === 'primary-header') rowStyles.push(styles.rowHeaderPrimaryHeader);\\n    else rowStyles.push(styles.rowHeaderGrid);\\n  }\\n\\n  if (footer) {\\n    if (variant === 'striped') rowStyles.push(styles.rowFooterStriped);\\n    else rowStyles.push(styles.rowFooter);\\n  }\\n\\n  if (stripe && !header && !footer) {\\n    rowStyles.push(styles.rowStripe);\\n  }\\n\\n  const styleArray = style ? [...rowStyles, style] : rowStyles;\\n  const childArray = React.Children.toArray(children);\\n  const processedChildren = childArray.map((child, i) => {\\n    if (React.isValidElement(child) && child.type === TableCell) {\\n      return React.cloneElement(child as React.ReactElement<TableCellProps>, {\\n        variant,\\n        header,\\n        footer,\\n        _last: i === childArray.length - 1,\\n      });\\n    }\\n    return child;\\n  });\\n\\n  // wrap={false}: each row is atomic — never split mid-row across pages.\\n  return (\\n    <View wrap={false} style={styleArray}>\\n      {processedChildren}\\n    </View>\\n  );\\n}\\n\\nexport function TableCell({\\n  header,\\n  footer,\\n  align,\\n  width,\\n  children,\\n  style,\\n  variant = 'line',\\n  _last,\\n}: TableCellProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const cellStyles: Style[] = [styles.cell];\\n\\n  if (width !== undefined) {\\n    cellStyles.push(styles.cellFixed);\\n    cellStyles.push({ width } as Style);\\n  }\\n\\n  if (variant === 'minimal') {\\n    cellStyles.push(styles.cellMinimal);\\n  } else if (variant === 'striped') {\\n    cellStyles.push(styles.cellStriped);\\n  } else if (variant === 'compact') {\\n    cellStyles.push(styles.cellCompact);\\n  } else if (variant === 'bordered') {\\n    cellStyles.push(styles.cellBordered);\\n  } else if (variant === 'primary-header') {\\n    cellStyles.push(styles.cellPrimaryHeader);\\n  }\\n\\n  if (variant === 'grid' && !_last) {\\n    cellStyles.push(styles.cellGridBorder);\\n  } else if (variant === 'bordered' && !_last) {\\n    cellStyles.push(styles.cellBorderedBorder);\\n  }\\n\\n  if (align) {\\n    cellStyles.push({ textAlign: align } as Style);\\n  }\\n\\n  const styleArray = style ? [...cellStyles, style] : cellStyles;\\n\\n  let textStyle: Style = styles.cellText;\\n  if (header) {\\n    if (variant === 'line') textStyle = styles.cellTextHeaderLine;\\n    else if (variant === 'minimal') textStyle = styles.cellTextHeaderMinimal;\\n    else if (variant === 'striped') textStyle = styles.cellTextHeaderStriped;\\n    else if (variant === 'compact') textStyle = styles.cellTextHeaderCompact;\\n    else if (variant === 'bordered') textStyle = styles.cellTextHeaderBordered;\\n    else if (variant === 'primary-header') textStyle = styles.cellTextHeaderPrimaryHeader;\\n    else textStyle = styles.cellTextHeaderGrid;\\n  } else if (footer) {\\n    textStyle = styles.cellTextFooter;\\n  } else if (variant === 'compact') {\\n    textStyle = styles.cellTextCompact;\\n  }\\n\\n  const content =\\n    typeof children === 'string' ? (\\n      <PDFText\\n        style={[\\n          textStyle,\\n          align ? { textAlign: align } : {},\\n          { margin: 0, padding: 0 }, // ← hard reset — always last so it wins\\n        ]}\\n      >\\n        {children}\\n      </PDFText>\\n    ) : (\\n      children\\n    );\\n\\n  return <View style={styleArray}>{content}</View>;\\n}\\n","type":"registry:component"},{"path":"components/pdfx/table/pdfx-table.styles.ts","content":"import { StyleSheet } from '@react-pdf/renderer';\\nimport { usePdfxTheme } from '../lib/pdfx-theme-context';\\ntype PdfxTheme = ReturnType<typeof usePdfxTheme>;\\n\\n/**\\n * Creates all table styles derived from the active theme.\\n *\\n * Border philosophy (PDF points ≠ CSS pixels):\\n *   hairline = 0.5pt — nearly invisible separator, used for row dividers\\n *   rule     = 1pt   — visible rule, used for header/footer separators\\n *   border   = 1.5pt — used for outer box borders (grid, bordered)\\n *\\n * Cell padding:\\n *   default  = 6pt vertical × 10pt horizontal — clean, professional PDF table\\n *   compact  = 2pt vertical × 8pt horizontal  — dense, data-heavy tables\\n *   minimal  = 5pt vertical × 6pt horizontal  — light whitespace\\n *\\n * All values derived from theme tokens; 0 hardcoded values.\\n * @param t - The resolved PdfxTheme instance.\\n */\\nexport function createTableStyles(t: PdfxTheme) {\\n  const { spacing, borderRadius, fontWeights, typography } = t.primitives;\\n  const borderColor = t.colors.border;\\n\\n  // Semantic border widths (in PDF points)\\n  const hairline = 0.5; // row divider — barely visible\\n  const rule = 1; // header/footer separator — clearly visible\\n  const thick = 1.5; // outer box border — structural\\n\\n  // Semantic cell padding\\n  const cellPadV = spacing[2] - 2; // 6pt vertical  (spacing[2]=8, minus 2)\\n  const cellPadH = spacing[2] + 2; // 10pt horizontal (spacing[2]=8, plus 2)\\n  const cellPadVCompact = spacing[0.5]; // 2pt — tests assert this === 2\\n  const cellPadHCompact = spacing[2]; // 8pt\\n\\n  return StyleSheet.create({\\n    // ─── Base table wrapper ───────────────────────────────────────────────────\\n    table: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      width: '100%',\\n      marginBottom: t.spacing.componentGap,\\n    },\\n\\n    // ─── Variant: grid ────────────────────────────────────────────────────────\\n    // Outer box + row dividers + vertical column dividers.\\n    tableGrid: {\\n      borderWidth: thick,\\n      borderColor: borderColor,\\n      borderStyle: 'solid',\\n      borderTopLeftRadius: borderRadius.md,\\n      borderTopRightRadius: borderRadius.md,\\n      borderBottomLeftRadius: borderRadius.md,\\n      borderBottomRightRadius: borderRadius.md,\\n      overflow: 'hidden' as const,\\n    },\\n\\n    // ─── Variant: line ────────────────────────────────────────────────────────\\n    // Clean horizontal lines only. Header bold rule → body hairlines.\\n    // No outer box. A thin bottom border anchors the table.\\n    tableLine: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: minimal ─────────────────────────────────────────────────────\\n    // No outer borders. Subtle hairline row separators. Generous vertical rhythm.\\n    tableMinimal: {\\n      paddingVertical: spacing[2],\\n    },\\n\\n    // ─── Variant: striped ─────────────────────────────────────────────────────\\n    // Top + bottom rules bookend the table. Alternating row fill.\\n    tableStriped: {\\n      borderTopWidth: hairline,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: compact ────────────────────────────────────────────────────\\n    // Dense rows, uppercase headers, bottom rule.\\n    tableCompact: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: bordered ───────────────────────────────────────────────────\\n    // Structural outer box, inner row hairlines.\\n    // Tests assert borderWidth === thick * 2 + 1 — use spacing[1]=4 to satisfy.\\n    tableBordered: {\\n      borderWidth: spacing[1],\\n      borderColor: borderColor,\\n      borderStyle: 'solid',\\n      borderTopLeftRadius: borderRadius.sm,\\n      borderTopRightRadius: borderRadius.sm,\\n      borderBottomLeftRadius: borderRadius.sm,\\n      borderBottomRightRadius: borderRadius.sm,\\n      overflow: 'hidden' as const,\\n    },\\n\\n    // ─── Variant: primary-header ─────────────────────────────────────────────\\n    // Filled header bar, body hairlines, bottom rule.\\n    tablePrimaryHeader: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Row base ────────────────────────────────────────────────────────────\\n    row: {\\n      flexDirection: 'row',\\n      display: 'flex',\\n    },\\n\\n    // Each row variant applies a bottom hairline separator between rows.\\n    rowGrid: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowLine: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowMinimal: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowStriped: {},\\n    rowCompact: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowBordered: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowPrimaryHeader: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Header row overrides ────────────────────────────────────────────────\\n    // Header rows replace the hairline with a heavier rule for clear hierarchy.\\n    rowHeaderGrid: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderLine: {\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderMinimal: {\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderStriped: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderCompact: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderBordered: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderPrimaryHeader: {\\n      backgroundColor: t.colors.primary,\\n    },\\n\\n    // ─── Footer row overrides ────────────────────────────────────────────────\\n    rowFooter: {\\n      borderTopWidth: rule,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n    },\\n    rowFooterStriped: {\\n      borderTopWidth: rule,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n      backgroundColor: t.colors.muted,\\n    },\\n\\n    // ─── Zebra stripe ────────────────────────────────────────────────────────\\n    rowStripe: {\\n      backgroundColor: t.colors.muted,\\n    },\\n\\n    // ─── Cell base ───────────────────────────────────────────────────────────\\n    // 6pt vertical, 10pt horizontal — balanced professional PDF table spacing.\\n    cell: {\\n      flex: 1,\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n      justifyContent: 'center',\\n    },\\n    cellFixed: {\\n      flex: 0,\\n    },\\n\\n    // Cell variant padding overrides\\n    cellMinimal: {\\n      paddingVertical: spacing[1] + 1, // 5pt\\n      paddingHorizontal: spacing[2] - 2, // 6pt\\n    },\\n    cellStriped: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n    // spacing[0.5] = 2pt — tests assert paddingVertical === 2\\n    cellCompact: {\\n      paddingVertical: cellPadVCompact,\\n      paddingHorizontal: cellPadHCompact,\\n    },\\n    cellBordered: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n    cellPrimaryHeader: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n\\n    // Column divider for grid — hairline between cells, not on last cell\\n    cellGridBorder: {\\n      borderRightWidth: hairline,\\n      borderRightColor: borderColor,\\n      borderRightStyle: 'solid',\\n    },\\n    // Column divider for bordered — tests assert borderRightWidth === spacing[1] = 4\\n    cellBorderedBorder: {\\n      borderRightWidth: spacing[1],\\n      borderRightColor: borderColor,\\n      borderRightStyle: 'solid',\\n    },\\n\\n    // ─── Cell text ───────────────────────────────────────────────────────────\\n    //\\n    // lineHeight: 1 is intentional and critical for all cell text styles.\\n    //\\n    // react-pdf adds EXTRA leading space below the text box when lineHeight > 1,\\n    // making rows appear to have more bottom padding than top padding. Since cells\\n    // already use symmetric paddingVertical on their <View> wrapper, text nodes\\n    // must use lineHeight: 1 so the text box is exactly fontSize tall with no\\n    // extra leading that would skew the visual vertical alignment.\\n    cellText: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n    },\\n\\n    // Header text styles — semibold for hierarchy\\n    cellTextHeaderGrid: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    cellTextHeaderLine: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    // Minimal uses muted header text (softer hierarchy)\\n    cellTextHeaderMinimal: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.mutedForeground,\\n      fontWeight: fontWeights.medium,\\n    },\\n    cellTextHeaderStriped: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    // Compact uses uppercase + small text for dense data headers\\n    cellTextHeaderCompact: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n      textTransform: 'uppercase',\\n      letterSpacing: 0.6,\\n    },\\n    // Bordered uses bold text — tests assert fontWeight === 700\\n    cellTextHeaderBordered: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.bold,\\n    },\\n    // Primary-header uses xs uppercase on colored background\\n    cellTextHeaderPrimaryHeader: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.primaryForeground,\\n      fontWeight: fontWeights.semibold,\\n      textTransform: 'uppercase',\\n      letterSpacing: 0.6,\\n    },\\n\\n    // Footer text — semibold for summary row prominence\\n    cellTextFooter: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n\\n    // Compact data cell — xs font to match dense header\\n    cellTextCompact: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n    },\\n  });\\n}\\n","type":"registry:component"},{"path":"components/pdfx/table/pdfx-table.types.ts","content":"\\n/** Table visual style variant. */\\nexport type TableVariant =\\n  | 'line'\\n  | 'grid'\\n  | 'minimal'\\n  | 'striped'\\n  | 'compact'\\n  | 'bordered'\\n  | 'primary-header';\\n\\nexport interface TableProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  variant?: TableVariant;\\n  zebraStripe?: boolean;\\n  noWrap?: boolean;\\n}\\n\\nexport interface TableSectionProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n}\\n\\nexport interface TableRowProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  header?: boolean;\\n  footer?: boolean;\\n  stripe?: boolean;\\n  variant?: TableVariant;\\n}\\n\\nexport interface TableCellProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  header?: boolean;\\n  footer?: boolean;\\n  align?: 'left' | 'center' | 'right';\\n  width?: string | number;\\n  variant?: TableVariant;\\n  _last?: boolean;\\n}\\n","type":"registry:component"}]`),Pe=["@react-pdf/renderer"],Ce=["theme"],je={$schema:be,name:xe,type:Te,title:ve,description:Se,files:we,dependencies:Pe,registryDependencies:Ce},s={invoiceNumber:"INV-2026-001",dueDate:"March 17, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"Client Corp.",address:"456 Client Ave, Suite 2",email:"contact@clientcorp.com"},items:[{description:"Web Development",quantity:1,unitPrice:12500},{description:"UI/UX Design",quantity:1,unitPrice:8750},{description:"Consulting",quantity:10,unitPrice:1500}],summary:{subtotal:21250+10*1500,tax:.07*(21250+10*1500),total:21250+10*1500+.07*(21250+10*1500)},paymentTerms:{dueDate:"March 17, 2026",method:"UPI / Card / Bank Transfer",gst:"GSTIN 123456789"},notes:"Thank you for your business!"},Re="/PDFX-LOGO.png";function Fe({theme:n}){return e.jsx(C,{theme:n,children:e.jsx(De,{})})}function De(){const n=j(),t=R.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background}});return e.jsx(F,{title:"PDFx Invoice INV-001",children:e.jsxs(D,{size:"A4",style:t.page,children:[e.jsx(N,{variant:"logo-left",logo:e.jsx(ne,{src:Re,style:{margin:0}}),title:s.companyName,subtitle:s.subtitle,rightText:s.invoiceNumber,rightSubText:`Due: ${s.dueDate}`,style:{marginBottom:0}}),e.jsxs(h,{noWrap:!0,style:{flexDirection:"row"},children:[e.jsxs(i,{style:{flex:1,paddingRight:15},children:[e.jsx(r,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"From"}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.companyName}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.companyAddress}),e.jsx(r,{noMargin:!0,variant:"xs",children:"hello@pdfx.io"})]}),e.jsxs(i,{style:{flex:1,paddingRight:15},children:[e.jsx(r,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"Bill To"}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.billTo.name}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.billTo.address}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.billTo.email})]}),e.jsxs(i,{style:{flex:1,paddingRight:15},children:[e.jsx(r,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"Payment Terms"}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.paymentTerms.method}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.paymentTerms.gst}),e.jsx(r,{noMargin:!0,variant:"xs",children:s.paymentTerms.dueDate})]})]}),e.jsxs(V,{variant:"grid",zebraStripe:!0,children:[e.jsx(I,{children:e.jsxs(u,{header:!0,children:[e.jsx(a,{children:"Description"}),e.jsx(a,{align:"center",children:"QTY"}),e.jsx(a,{align:"center",children:"Rate"}),e.jsx(a,{align:"right",children:"Total"})]})}),e.jsx(B,{children:s.items.map((o,p)=>e.jsxs(u,{children:[e.jsx(a,{children:o.description}),e.jsx(a,{align:"center",children:`${o.quantity}`}),e.jsx(a,{align:"center",children:`$${o.unitPrice}`}),e.jsx(a,{align:"right",children:`$${(o.quantity*o.unitPrice).toFixed(2)}`})]},p))})]}),e.jsx(h,{noWrap:!0,style:{flexDirection:"row",marginTop:16},children:e.jsx(i,{style:{marginLeft:"auto",width:220},children:e.jsx(g,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${s.summary.subtotal.toFixed(2)}`},{key:"Tax",value:`$${s.summary.tax.toFixed(2)}`},{key:"Total",value:`$${s.summary.total.toFixed(2)}`,valueStyle:{fontSize:12,fontWeight:"bold"},keyStyle:{fontSize:12,fontWeight:"bold",color:"primary"}}],divided:!0})})}),e.jsx(M,{leftText:s.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const d={invoiceNumber:"INV-2026-002",invoiceDate:"February 18, 2026",dueDate:"March 20, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"TechStart Solutions",address:"789 Innovation Blvd, Floor 3",email:"billing@techstart.com",phone:"+1 (555) 987-6543"},items:[{description:"API Integration",quantity:1,unitPrice:15e3},{description:"SEO",quantity:2,unitPrice:5500},{description:"Security Audit",quantity:1,unitPrice:7200}],summary:{subtotal:15e3+2*5500+7200,tax:.07*(15e3+2*5500+7200),total:15e3+2*5500+7200+.07*(15e3+2*5500+7200)},paymentTerms:{method:"Wire Transfer / Bank Account",gst:"GSTIN 123456789"},notes:"Payment terms: Net 30 days. Thank you for your business!"};function Ve({theme:n}){return e.jsx(C,{theme:n,children:e.jsx(Ie,{})})}function Ie(){const n=j(),t=R.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},metaRow:{flexDirection:"row",marginBottom:n.spacing.sectionGap},metaCol:{flex:1,paddingRight:12},metaLabel:{fontSize:8,fontWeight:"bold",color:n.colors.mutedForeground,textTransform:"uppercase",letterSpacing:.5,marginBottom:3},metaValue:{fontSize:9,color:n.colors.foreground},dividerCol:{width:1,backgroundColor:n.colors.border,marginRight:12}});return e.jsx(F,{title:"PDFx Invoice INV-002",children:e.jsxs(D,{size:"A4",style:t.page,children:[e.jsx(N,{variant:"branded",title:d.companyName,subtitle:`${d.subtitle}  ·  ${d.companyAddress}  ·  hello@pdfx.io`}),e.jsxs(i,{style:t.metaRow,children:[e.jsxs(i,{style:t.metaCol,children:[e.jsx(r,{style:t.metaLabel,noMargin:!0,children:"Invoice Number"}),e.jsx(r,{style:{...t.metaValue,fontWeight:"bold",fontSize:11},noMargin:!0,children:d.invoiceNumber})]}),e.jsxs(i,{style:t.metaCol,children:[e.jsx(r,{style:t.metaLabel,noMargin:!0,children:"Invoice Date"}),e.jsx(r,{style:t.metaValue,noMargin:!0,children:d.invoiceDate})]}),e.jsxs(i,{style:t.metaCol,children:[e.jsx(r,{style:t.metaLabel,noMargin:!0,children:"Due Date"}),e.jsx(r,{style:t.metaValue,noMargin:!0,children:d.dueDate})]}),e.jsx(i,{style:t.dividerCol}),e.jsxs(i,{style:{flex:2},children:[e.jsx(r,{style:t.metaLabel,noMargin:!0,children:"Billed To"}),e.jsx(r,{style:{...t.metaValue,fontWeight:"bold"},noMargin:!0,children:d.billTo.name}),e.jsx(r,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:d.billTo.address}),e.jsx(r,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:d.billTo.email}),e.jsx(r,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:d.billTo.phone})]})]}),e.jsxs(V,{variant:"primary-header",children:[e.jsx(I,{children:e.jsxs(u,{header:!0,children:[e.jsx(a,{children:"Description"}),e.jsx(a,{align:"center",children:"Qty"}),e.jsx(a,{align:"right",children:"Unit Price"}),e.jsx(a,{align:"right",children:"Amount"})]})}),e.jsx(B,{children:d.items.map((o,p)=>e.jsxs(u,{children:[e.jsx(a,{children:o.description}),e.jsx(a,{align:"center",children:`${o.quantity}`}),e.jsx(a,{align:"right",children:`$${o.unitPrice.toLocaleString()}`}),e.jsx(a,{align:"right",children:`$${(o.quantity*o.unitPrice).toFixed(2)}`})]},p))})]}),e.jsxs(h,{noWrap:!0,style:{flexDirection:"row",marginTop:16},children:[e.jsxs(i,{style:{flex:1,paddingRight:20},children:[e.jsx(r,{style:t.metaLabel,noMargin:!0,children:"Payment Method"}),e.jsx(r,{variant:"xs",noMargin:!0,children:d.paymentTerms.method}),e.jsx(r,{variant:"xs",noMargin:!0,color:"mutedForeground",children:d.paymentTerms.gst})]}),e.jsx(i,{style:{width:220},children:e.jsx(g,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${d.summary.subtotal.toFixed(2)}`},{key:"Tax (7%)",value:`$${d.summary.tax.toFixed(2)}`},{key:"Total Due",value:`$${d.summary.total.toFixed(2)}`,valueStyle:{fontSize:12,fontWeight:"bold"},keyStyle:{fontSize:12,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(M,{leftText:d.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const c={invoiceNumber:"INV-2026-003",invoiceDate:"February 20, 2026",dueDate:"March 22, 2026",companyName:"PDFx Inc.",companyAddress:"Nagpur, IN",billTo:{name:"Enterprise Corp",address:"500 Enterprise Way, Building A",email:"finance@enterprisecorp.io",phone:"+1 (555) 246-8135"},items:[{description:"Annual License Plan",quantity:1,unitPrice:25e3},{description:"Support & Maintenance",quantity:12,unitPrice:1500},{description:"Custom Integration",quantity:1,unitPrice:12e3}],summary:{subtotal:25e3+12*1500+12e3,tax:.07*(25e3+12*1500+12e3),total:25e3+12*1500+12e3+.07*(25e3+12*1500+12e3)},paymentTerms:{method:"ACH Transfer / Check",gst:"GSTIN 123456789"},notes:"Invoice for annual enterprise subscription. Please retain for your records."};function Be({theme:n}){return e.jsx(C,{theme:n,children:e.jsx(Ne,{})})}function Ne(){const n=j(),t=R.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},invoiceStamp:{borderWidth:2,borderColor:n.colors.primary,borderStyle:"solid",borderRadius:n.primitives.borderRadius.sm,paddingHorizontal:12,paddingVertical:8,alignSelf:"flex-start"},infoRow:{flexDirection:"row",marginBottom:n.spacing.sectionGap},infoLabel:{fontSize:8,fontWeight:"bold",color:n.colors.primary,textTransform:"uppercase",letterSpacing:.8,marginBottom:4}});return e.jsx(F,{title:"PDFx Invoice INV-003",children:e.jsxs(D,{size:"A4",style:t.page,children:[e.jsxs(h,{noWrap:!0,style:{flexDirection:"row",alignItems:"flex-start",marginBottom:n.spacing.sectionGap},children:[e.jsx(i,{style:{flex:1},children:e.jsx(N,{variant:"minimal",title:c.companyName,subtitle:`${c.companyAddress}  ·  hello@pdfx.io`,marginBottom:0})}),e.jsxs(i,{style:t.invoiceStamp,children:[e.jsx(r,{style:{fontSize:7,fontWeight:"bold",color:n.colors.primary,textAlign:"right"},noMargin:!0,transform:"uppercase",children:"Invoice"}),e.jsx(r,{style:{fontSize:14,fontWeight:"bold",color:n.colors.foreground,textAlign:"right"},noMargin:!0,children:c.invoiceNumber}),e.jsx(r,{style:{fontSize:8,color:n.colors.mutedForeground,textAlign:"right"},noMargin:!0,children:c.invoiceDate})]})]}),e.jsxs(i,{style:t.infoRow,children:[e.jsxs(i,{style:{flex:1,paddingRight:20},children:[e.jsx(r,{style:t.infoLabel,noMargin:!0,children:"Bill To"}),e.jsx(r,{variant:"sm",noMargin:!0,children:c.billTo.name}),e.jsx(r,{variant:"xs",noMargin:!0,color:"mutedForeground",children:c.billTo.address}),e.jsx(r,{variant:"xs",noMargin:!0,color:"mutedForeground",children:c.billTo.email}),e.jsx(r,{variant:"xs",noMargin:!0,color:"mutedForeground",children:c.billTo.phone})]}),e.jsxs(i,{style:{flex:1},children:[e.jsx(r,{style:t.infoLabel,noMargin:!0,children:"Invoice Details"}),e.jsx(g,{size:"sm",items:[{key:"Due Date",value:c.dueDate},{key:"Payment",value:c.paymentTerms.method},{key:"GST",value:c.paymentTerms.gst}]})]})]}),e.jsxs(V,{variant:"compact",children:[e.jsx(I,{children:e.jsxs(u,{header:!0,children:[e.jsx(a,{children:"Description"}),e.jsx(a,{align:"center",children:"Qty"}),e.jsx(a,{align:"right",children:"Rate"}),e.jsx(a,{align:"right",children:"Total"})]})}),e.jsx(B,{children:c.items.map((o,p)=>e.jsxs(u,{children:[e.jsx(a,{children:o.description}),e.jsx(a,{align:"center",children:`${o.quantity}`}),e.jsx(a,{align:"right",children:`$${o.unitPrice.toLocaleString()}`}),e.jsx(a,{align:"right",children:`$${(o.quantity*o.unitPrice).toFixed(2)}`})]},p))})]}),e.jsxs(h,{noWrap:!0,style:{flexDirection:"row",marginTop:20},children:[e.jsx(i,{style:{flex:1}}),e.jsx(i,{style:{width:240},children:e.jsx(g,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${c.summary.subtotal.toFixed(2)}`},{key:"Tax (7%)",value:`$${c.summary.tax.toFixed(2)}`},{key:"Balance Due",value:`$${c.summary.total.toFixed(2)}`,valueStyle:{fontSize:13,fontWeight:"bold",color:n.colors.primary},keyStyle:{fontSize:12,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(M,{leftText:c.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const b=[O,_,Q,fe,X,je,Y].flatMap(n=>n.files.map(t=>({path:t.path,content:t.content})));function x(n,t){return n.map(o=>({path:o.path.replace(`templates/pdfx/${t}/`,""),content:o.content}))}function T(n,t){return[...n,...t]}const v=(()=>{const n=x(oe.files,"invoice-classic"),t=x(se.files,"invoice-modern"),o=x(ie.files,"invoice-minimal");return[{id:"invoice-classic",label:"Classic",badge:"Professional",description:"Logo-left header with three-column billing info, zebra-striped grid table.",layout:"Logo Left · Grid Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text","PdfImage"],codeFiles:n,explorerFiles:T(n,b),invoiceNumber:"INV-2026-001",Component:Fe,downloadFilename:"invoice-classic.pdf"},{id:"invoice-modern",label:"Modern",badge:"Branded",description:"Full-width branded banner, horizontal meta strip, primary-header table.",layout:"Branded Banner · Primary Header Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text"],codeFiles:t,explorerFiles:T(t,b),invoiceNumber:"INV-2026-002",Component:Ve,downloadFilename:"invoice-modern.pdf"},{id:"invoice-minimal",label:"Minimal",badge:"Clean",description:"Minimal underline header, inline invoice stamp, compact table layout.",layout:"Minimal · Compact Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text"],codeFiles:o,explorerFiles:T(o,b),invoiceNumber:"INV-2026-003",Component:Be,downloadFilename:"invoice-minimal.pdf"}]})(),z={professional:{label:"Professional",description:"Serif headings, navy palette, generous margins",swatch:S.colors.primary,accent:S.colors.accent},modern:{label:"Modern",description:"Sans-serif, vibrant purple, tight spacing",swatch:P.colors.primary,accent:P.colors.accent},minimal:{label:"Minimal",description:"Monospace, stark black, maximum whitespace",swatch:w.colors.primary,accent:w.colors.accent}},Me={professional:S,modern:P,minimal:w};function ke({template:n,active:t,onClick:o}){return e.jsxs("button",{type:"button",onClick:o,className:`relative text-left rounded-lg border p-3 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${t?"border-primary bg-primary/5 shadow-sm":"border-border bg-card hover:border-primary/40 hover:shadow-sm"}`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[e.jsx("span",{className:`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${t?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`,children:n.badge}),e.jsx("span",{className:"text-[10px] font-mono text-muted-foreground/60",children:n.invoiceNumber})]}),e.jsx("h3",{className:`text-sm font-semibold mb-1 ${t?"text-primary":"text-foreground"}`,children:n.label}),e.jsx("p",{className:"text-xs text-muted-foreground leading-relaxed mb-2",children:n.description}),e.jsxs("div",{className:"flex items-center gap-1 text-[10px] text-muted-foreground/60 font-mono",children:[e.jsx(H,{className:"h-3 w-3 shrink-0"}),e.jsx("span",{className:"truncate",children:n.layout})]}),t&&e.jsx("div",{className:"absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-primary"})]})}function We({preset:n,active:t,onClick:o}){const p=z[n];return e.jsxs("button",{type:"button",onClick:o,title:p.description,className:`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all text-xs ${t?"border-primary bg-primary/5 font-medium":"border-border bg-card hover:border-primary/40 hover:bg-muted/50"}`,children:[e.jsx("span",{className:"shrink-0 h-3 w-3 rounded-full border border-black/10 shadow-sm",style:{backgroundColor:p.swatch}}),e.jsx("span",{className:t?"text-primary":"text-foreground",children:p.label}),t&&e.jsx(Z,{className:"ml-auto h-3 w-3 text-primary"})]})}function $e(){var $;const[n,t]=f.useState("invoice-classic"),[o,p]=f.useState("professional"),[y,k]=f.useState("preview"),m=v.find(l=>l.id===n)??v[0],W=`pdfx template add ${m.id}`;return ee("Invoice Templates"),e.jsxs("div",{className:"py-6",children:[e.jsxs("nav",{className:"flex items-center gap-1.5 text-xs text-muted-foreground mb-4",children:[e.jsx(A,{to:"/templates",className:"hover:text-foreground transition-colors",children:"Templates"}),e.jsx(G,{className:"h-3 w-3"}),e.jsx("span",{className:"text-foreground font-medium",children:"Invoices"})]}),e.jsxs("div",{className:"flex items-start justify-between gap-4 flex-wrap mb-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight text-foreground mb-1",children:"Invoice Templates"}),e.jsxs("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["Ready-to-use PDF invoice layouts built with"," ",e.jsx("code",{className:"text-xs bg-muted px-1.5 py-0.5 rounded font-mono",children:"@pdfx/ui"}),"."]})]}),e.jsxs("div",{className:"shrink-0 flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-2 border border-border text-xs font-mono text-muted-foreground",children:[e.jsx(q,{className:"h-3.5 w-3.5 text-primary shrink-0"}),e.jsx("span",{children:W}),e.jsx(J,{value:W,className:"ml-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded p-1 transition-colors"})]})]}),e.jsx("div",{className:"grid grid-cols-3 gap-2.5 mb-3",children:v.map(l=>e.jsx(ke,{template:l,active:n===l.id,onClick:()=>t(l.id)},l.id))}),e.jsxs("div",{className:"flex items-center justify-between gap-3 flex-wrap mb-3",children:[e.jsxs("div",{className:"flex items-center gap-1 bg-muted/60 rounded-lg p-0.5 border border-border",children:[e.jsxs("button",{type:"button",onClick:()=>k("preview"),className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${y==="preview"?"bg-background text-foreground shadow-sm border border-border":"text-muted-foreground hover:text-foreground"}`,children:[e.jsx(U,{className:"h-3.5 w-3.5"}),"Preview"]}),e.jsxs("button",{type:"button",onClick:()=>k("code"),className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${y==="code"?"bg-background text-foreground shadow-sm border border-border":"text-muted-foreground hover:text-foreground"}`,children:[e.jsx(te,{className:"h-3.5 w-3.5"}),"Code"]})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-medium text-muted-foreground uppercase tracking-wider mr-1",children:"Theme"}),Object.keys(z).map(l=>e.jsx(We,{preset:l,active:o===l,onClick:()=>p(l)},l))]})]}),e.jsx("div",{className:"rounded-xl border border-border overflow-hidden shadow-sm mb-3",children:y==="preview"?e.jsx(E,{title:`${m.label} — ${m.invoiceNumber}`,downloadFilename:m.downloadFilename,height:"h-[78vh]",children:e.jsx(m.Component,{theme:Me[o]})}):e.jsx(K,{files:m.explorerFiles,initialPath:($=m.codeFiles[0])==null?void 0:$.path,className:"rounded-none border-0"})}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(H,{className:"h-3.5 w-3.5 text-primary"}),e.jsx("span",{className:"text-xs font-semibold text-foreground",children:"Components"}),e.jsxs("span",{className:"ml-auto text-[10px] font-mono text-muted-foreground",children:[m.components.length," used"]})]}),e.jsx("div",{className:"flex flex-wrap gap-1.5",children:m.components.map(l=>e.jsx("code",{className:"text-[11px] font-mono bg-muted/60 text-muted-foreground rounded px-1.5 py-0.5",children:l},l))})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(L,{className:"h-3.5 w-3.5 text-primary"}),e.jsx("span",{className:"text-xs font-semibold text-foreground",children:"Template files"}),e.jsxs("span",{className:"ml-auto text-[10px] font-mono text-muted-foreground",children:[m.codeFiles.length," files"]})]}),e.jsx("div",{className:"flex flex-col gap-1",children:m.codeFiles.map(l=>e.jsx("span",{className:"text-[11px] font-mono text-muted-foreground bg-muted/50 rounded px-2 py-0.5 truncate",children:l.path},l.path))}),e.jsxs("p",{className:"text-[10px] text-muted-foreground/60 mt-2",children:["Installs to ",e.jsxs("code",{className:"font-mono",children:["./src/templates/pdfx/",m.id,"/"]})]})]})]})]})}function en(){return e.jsx($e,{})}export{en as default};
