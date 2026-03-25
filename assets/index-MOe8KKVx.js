import{j as e,S as C,D as S,P,V as a}from"./vendor-react-pdf-BZRS4xaB.js";import{b as j,u as D,p as $,P as q}from"./pdf-preview-4aabFIBH.js";import{C as O,T as K,t as U,E as _,m as z,a as H,b as J,k as Q,p as Y,c as X,s as Z,d as ee}from"./template-code-explorer-DRdfJhfT.js";import{r as M,L as ne}from"./vendor-router-DN-v89qs.js";import{a as te,b as oe}from"./code-block-BcojrypW.js";import{c as re,l as ie,G as ae,F as le}from"./index-B_o5uybQ.js";import{u as se}from"./use-document-title-NYaeU_iE.js";import{T as o}from"./text-DezJmATW.js";import{S as b}from"./section-BuaFIBmv.js";import{T as F,a as I,b as h,c as i,d as k}from"./table-DUZjQsIT.js";import{K as x}from"./key-value-CbGxcOmi.js";import{P as B}from"./page-header-C08WiFO8.js";import{P as R}from"./page-footer-Ccd9wxyX.js";import{P as L}from"./pdf-image-B5_dIuOr.js";import{C as de}from"./code-xml-BPlol08V.js";import{L as G}from"./layers-ClVwgzxH.js";import"./resolve-color-BxFvjghR.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],me=re("message-circle",ce),pe=[{path:"templates/pdfx/invoice-classic/invoice-classic.tsx",content:`import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { PdfImage } from '../../components/pdfx/pdf-image/pdfx-pdf-image';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { Text } from '../../components/pdfx/text/pdfx-text';
import type { PdfxTheme } from '../../lib/pdfx-theme';
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
            <Text noMargin variant="xs">
              {data.companyName}
            </Text>
            <Text noMargin variant="xs">
              {data.companyAddress}
            </Text>
            <Text noMargin variant="xs">
              {data.companyEmail}
            </Text>
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
            <Text noMargin variant="xs">
              {data.billTo.name}
            </Text>
            <Text noMargin variant="xs">
              {data.billTo.address}
            </Text>
            <Text noMargin variant="xs">
              {data.billTo.email}
            </Text>
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
            <Text noMargin variant="xs">
              {data.paymentTerms.method}
            </Text>
            <Text noMargin variant="xs">
              {data.paymentTerms.gst}
            </Text>
            <Text noMargin variant="xs">
              {data.paymentTerms.dueDate}
            </Text>
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
        <PageFooter leftText={data.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
      </Page>
    </Document>
  );
}
`,type:"registry:file"},{path:"templates/pdfx/invoice-classic/invoice-classic.types.ts",content:`export interface InvoiceClassicData {
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
`,type:"registry:file"}],ue={files:pe},ge=JSON.parse(`[{"path":"templates/pdfx/invoice-consultant/invoice-consultant.tsx","content":"import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';\\nimport { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';\\nimport { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';\\nimport { Section } from '../../components/pdfx/section/pdfx-section';\\nimport { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';\\nimport { Text } from '../../components/pdfx/text/pdfx-text';\\nimport type { PdfxTheme } from '../../lib/pdfx-theme';\\nimport { Document, Page, StyleSheet, View } from '@react-pdf/renderer';\\nimport type { InvoiceConsultantData } from './invoice-consultant.types';\\n\\nconst sampleData: InvoiceConsultantData = {\\n  invoiceNumber: 'INV-2026-006',\\n  invoiceDate: 'February 26, 2026',\\n  dueDate: 'March 28, 2026',\\n  companyName: 'Your Consulting',\\n  subtitle: 'Professional Consulting Services',\\n  companyAddress: 'City, Country · hello@consulting.com',\\n  consultant: {\\n    name: 'John Smith',\\n    title: 'Senior Technical Consultant',\\n    email: 'john.smith@consulting.com',\\n  },\\n  client: {\\n    name: 'Sarah Johnson',\\n    company: 'Acme Technologies',\\n    address: '500 Tech Park, Suite 200',\\n    email: 'sarah.johnson@acmetech.com',\\n  },\\n  services: [\\n    { description: 'Architecture Review & Planning', hours: 16, rate: 175 },\\n    { description: 'Code Review & Optimization', hours: 24, rate: 150 },\\n    { description: 'Technical Documentation', hours: 12, rate: 125 },\\n    { description: 'Team Training & Knowledge Transfer', hours: 8, rate: 200 },\\n  ],\\n  summary: {\\n    totalHours: 60,\\n    subtotal: 10300,\\n    tax: 515,\\n    total: 10815,\\n  },\\n  paymentTerms: {\\n    dueDate: 'March 28, 2026',\\n    method: 'Bank Transfer / Check',\\n  },\\n  projectRef: 'PROJ-2026-ACME-001',\\n  notes: 'Services rendered for February 2026. All hours verified and approved by client.',\\n};\\n\\nexport function InvoiceConsultantDocument({\\n  theme,\\n  data = sampleData,\\n}: {\\n  theme?: PdfxTheme;\\n  data?: InvoiceConsultantData;\\n}) {\\n  return (\\n    <PdfxThemeProvider theme={theme}>\\n      <InvoiceConsultantContent data={data} />\\n    </PdfxThemeProvider>\\n  );\\n}\\n\\nfunction InvoiceConsultantContent({ data }: { data: InvoiceConsultantData }) {\\n  const theme = usePdfxTheme();\\n\\n  const styles = StyleSheet.create({\\n    page: {\\n      padding: theme.spacing.page.marginTop,\\n      paddingBottom: theme.spacing.page.marginBottom,\\n      backgroundColor: theme.colors.background,\\n    },\\n    headerRow: {\\n      flexDirection: 'row',\\n      justifyContent: 'space-between',\\n      alignItems: 'flex-start',\\n      marginBottom: theme.spacing.sectionGap,\\n      paddingBottom: theme.spacing.componentGap,\\n      borderBottomWidth: 2,\\n      borderBottomColor: theme.colors.primary,\\n      borderBottomStyle: 'solid',\\n    },\\n    companyInfo: {\\n      flex: 1,\\n    },\\n    invoiceInfo: {\\n      alignItems: 'flex-end',\\n    },\\n    partiesRow: {\\n      flexDirection: 'row',\\n      gap: 40,\\n      marginBottom: theme.spacing.sectionGap,\\n    },\\n    partyColumn: {\\n      flex: 1,\\n    },\\n    partyLabel: {\\n      fontSize: 9,\\n      fontWeight: 'bold',\\n      color: theme.colors.primary,\\n      textTransform: 'uppercase',\\n      letterSpacing: 0.6,\\n      marginBottom: 6,\\n      paddingBottom: 4,\\n      borderBottomWidth: 1,\\n      borderBottomColor: theme.colors.border,\\n      borderBottomStyle: 'solid',\\n    },\\n    projectRef: {\\n      backgroundColor: theme.colors.muted,\\n      paddingHorizontal: 10,\\n      paddingVertical: 6,\\n      borderRadius: theme.primitives.borderRadius.sm,\\n      marginBottom: theme.spacing.sectionGap,\\n      flexDirection: 'row',\\n      alignItems: 'center',\\n      gap: 8,\\n    },\\n    summaryRow: {\\n      flexDirection: 'row',\\n      marginTop: 20,\\n    },\\n    hoursBox: {\\n      flex: 1,\\n      paddingRight: 24,\\n    },\\n    hoursBadge: {\\n      backgroundColor: theme.colors.primary,\\n      color: theme.colors.primaryForeground,\\n      paddingHorizontal: 12,\\n      paddingVertical: 8,\\n      borderRadius: theme.primitives.borderRadius.sm,\\n      alignSelf: 'flex-start',\\n    },\\n    totalsBox: {\\n      width: 250,\\n    },\\n    calloutNote: {\\n      backgroundColor: theme.colors.muted,\\n      borderLeftWidth: 3,\\n      borderLeftColor: theme.colors.info,\\n      borderLeftStyle: 'solid',\\n      paddingLeft: 12,\\n      paddingVertical: 8,\\n      marginTop: 16,\\n    },\\n  });\\n\\n  return (\\n    <Document title={\`Invoice \${data.invoiceNumber}\`}>\\n      <Page size=\\"A4\\" style={styles.page}>\\n        <View style={styles.headerRow}>\\n          <View style={styles.companyInfo}>\\n            <Text variant=\\"xl\\" weight=\\"bold\\" noMargin>\\n              {data.companyName}\\n            </Text>\\n            <Text variant=\\"sm\\" color=\\"mutedForeground\\" noMargin>\\n              {data.subtitle}\\n            </Text>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\" noMargin>\\n              {data.companyAddress}\\n            </Text>\\n          </View>\\n          <View style={styles.invoiceInfo}>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\" transform=\\"uppercase\\" noMargin>\\n              Invoice\\n            </Text>\\n            <Text variant=\\"lg\\" weight=\\"bold\\" noMargin>\\n              {data.invoiceNumber}\\n            </Text>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\" noMargin>\\n              {data.invoiceDate}\\n            </Text>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\" noMargin>\\n              Due: {data.dueDate}\\n            </Text>\\n          </View>\\n        </View>\\n        {data.projectRef && (\\n          <View style={styles.projectRef}>\\n            <Text variant=\\"xs\\" weight=\\"semibold\\" color=\\"mutedForeground\\" noMargin>\\n              Project Reference:\\n            </Text>\\n            <Text variant=\\"xs\\" weight=\\"bold\\" noMargin>\\n              {data.projectRef}\\n            </Text>\\n          </View>\\n        )}\\n        <View style={styles.partiesRow}>\\n          <View style={styles.partyColumn}>\\n            <Text style={styles.partyLabel} noMargin>\\n              From (Consultant)\\n            </Text>\\n            <Text variant=\\"sm\\" weight=\\"semibold\\" noMargin>\\n              {data.consultant.name}\\n            </Text>\\n            <Text variant=\\"xs\\" noMargin color=\\"mutedForeground\\">\\n              {data.consultant.title}\\n            </Text>\\n            <Text variant=\\"xs\\" noMargin color=\\"mutedForeground\\">\\n              {data.consultant.email}\\n            </Text>\\n          </View>\\n          <View style={styles.partyColumn}>\\n            <Text style={styles.partyLabel} noMargin>\\n              Bill To (Client)\\n            </Text>\\n            <Text variant=\\"sm\\" weight=\\"semibold\\" noMargin>\\n              {data.client.name}\\n            </Text>\\n            <Text variant=\\"xs\\" noMargin color=\\"mutedForeground\\">\\n              {data.client.company}\\n            </Text>\\n            <Text variant=\\"xs\\" noMargin color=\\"mutedForeground\\">\\n              {data.client.address}\\n            </Text>\\n            <Text variant=\\"xs\\" noMargin color=\\"mutedForeground\\">\\n              {data.client.email}\\n            </Text>\\n          </View>\\n        </View>\\n        <Table variant=\\"line\\">\\n          <TableHeader>\\n            <TableRow header>\\n              <TableCell>Service Description</TableCell>\\n              <TableCell align=\\"center\\">Hours</TableCell>\\n              <TableCell align=\\"right\\">Rate ($/hr)</TableCell>\\n              <TableCell align=\\"right\\">Amount</TableCell>\\n            </TableRow>\\n          </TableHeader>\\n          <TableBody>\\n            {data.services.map((service, index) => (\\n              // biome-ignore lint/suspicious/noArrayIndexKey: static PDF list, no reordering\\n              <TableRow key={index}>\\n                <TableCell>{service.description}</TableCell>\\n                <TableCell align=\\"center\\">{\`\${service.hours}\`}</TableCell>\\n                <TableCell align=\\"right\\">{\`$\${service.rate}\`}</TableCell>\\n                <TableCell align=\\"right\\">{\`$\${(service.hours * service.rate).toLocaleString()}\`}</TableCell>\\n              </TableRow>\\n            ))}\\n          </TableBody>\\n        </Table>\\n        <Section noWrap style={styles.summaryRow}>\\n          <View style={styles.hoursBox}>\\n            <View style={styles.hoursBadge}>\\n              <Text\\n                style={{ fontSize: 9, fontWeight: 'bold', color: theme.colors.primaryForeground }}\\n                noMargin\\n              >\\n                Total Hours: {data.summary.totalHours}\\n              </Text>\\n            </View>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\" style={{ marginTop: 8 }}>\\n              Payment: {data.paymentTerms.method}\\n            </Text>\\n          </View>\\n          <View style={styles.totalsBox}>\\n            <KeyValue\\n              size=\\"sm\\"\\n              dividerThickness={1}\\n              items={[\\n                { key: 'Subtotal', value: \`$\${data.summary.subtotal.toLocaleString()}\` },\\n                { key: 'Tax (5%)', value: \`$\${data.summary.tax.toFixed(2)}\` },\\n                {\\n                  key: 'Amount Due',\\n                  value: \`$\${data.summary.total.toFixed(2)}\`,\\n                  valueStyle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },\\n                  keyStyle: { fontSize: 13, fontWeight: 'bold' },\\n                },\\n              ]}\\n              divided\\n            />\\n          </View>\\n        </Section>\\n        {data.notes && (\\n          <View style={styles.calloutNote}>\\n            <Text variant=\\"xs\\" color=\\"mutedForeground\\">\\n              {data.notes}\\n            </Text>\\n          </View>\\n        )}\\n        <PageFooter\\n          leftText=\\"Professional services invoice – Please retain for records\\"\\n          rightText=\\"Page 1 of 1\\"\\n          sticky\\n          pagePadding={25}\\n        />\\n      </Page>\\n    </Document>\\n  );\\n}\\n","type":"registry:file"},{"path":"templates/pdfx/invoice-consultant/invoice-consultant.types.ts","content":"export interface InvoiceConsultantData {\\n  invoiceNumber: string;\\n  invoiceDate: string;\\n  dueDate: string;\\n  companyName: string;\\n  subtitle: string;\\n  companyAddress: string;\\n  consultant: {\\n    name: string;\\n    title: string;\\n    email: string;\\n  };\\n  client: {\\n    name: string;\\n    company: string;\\n    address: string;\\n    email: string;\\n  };\\n  services: {\\n    description: string;\\n    hours: number;\\n    rate: number;\\n  }[];\\n  summary: {\\n    totalHours: number;\\n    subtotal: number;\\n    tax: number;\\n    total: number;\\n  };\\n  paymentTerms: {\\n    dueDate: string;\\n    method: string;\\n  };\\n  projectRef?: string;\\n  notes?: string;\\n}\\n","type":"registry:file"}]`),ye={files:ge},he=[{path:"templates/pdfx/invoice-corporate/invoice-corporate.tsx",content:`import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { PdfImage } from '../../components/pdfx/pdf-image/pdfx-pdf-image';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { Text } from '../../components/pdfx/text/pdfx-text';
import type { PdfxTheme } from '../../lib/pdfx-theme';
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
    <Document title={\`Invoice \${data.invoiceNumber}\`}>
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
          subtitle={\`\${data.subtitle}  ·  \${data.companyAddress}\`}
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
                <TableCell align="center">{\`\${item.quantity}\`}</TableCell>
                <TableCell align="right">{\`$\${item.unitPrice.toLocaleString()}\`}</TableCell>
                <TableCell align="right">{\`$\${(item.quantity * item.unitPrice).toLocaleString()}\`}</TableCell>
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
                  { key: 'Subtotal', value: \`$\${data.summary.subtotal.toLocaleString()}\` },
                  { key: 'Tax (8%)', value: \`$\${data.summary.tax.toFixed(2)}\` },
                  {
                    key: 'Total Due',
                    value: \`$\${data.summary.total.toFixed(2)}\`,
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
`,type:"registry:file"},{path:"templates/pdfx/invoice-corporate/invoice-corporate.types.ts",content:`export interface InvoiceCorporateData {
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
`,type:"registry:file"}],xe={files:he},be=[{path:"templates/pdfx/invoice-creative/invoice-creative.tsx",content:`import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { Text } from '../../components/pdfx/text/pdfx-text';
import type { PdfxTheme } from '../../lib/pdfx-theme';
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
    <Document title={\`Invoice \${data.invoiceNumber}\`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <PageHeader
              variant="centered"
              title={data.companyName}
              subtitle={\`\${data.subtitle}  ·  \${data.companyAddress}\`}
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
                <TableCell align="center">{\`\${item.quantity}\`}</TableCell>
                <TableCell align="right">{\`$\${item.unitPrice.toLocaleString()}\`}</TableCell>
                <TableCell align="right">{\`$\${(item.quantity * item.unitPrice).toLocaleString()}\`}</TableCell>
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
                { key: 'Subtotal', value: \`$\${data.summary.subtotal.toLocaleString()}\` },
                { key: 'Tax (6.5%)', value: \`$\${data.summary.tax.toFixed(2)}\` },
                {
                  key: 'Total',
                  value: \`$\${data.summary.total.toFixed(2)}\`,
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
`,type:"registry:file"},{path:"templates/pdfx/invoice-creative/invoice-creative.types.ts",content:`export interface InvoiceCreativeData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  subtitle: string;
  companyAddress: string;
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
`,type:"registry:file"}],fe={files:be},Te=[{path:"templates/pdfx/invoice-minimal/invoice-minimal.tsx",content:`import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { Text } from '../../components/pdfx/text/pdfx-text';
import type { PdfxTheme } from '../../lib/pdfx-theme';
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
        <PageFooter leftText={data.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
      </Page>
    </Document>
  );
}
`,type:"registry:file"},{path:"templates/pdfx/invoice-minimal/invoice-minimal.types.ts",content:`export interface InvoiceMinimalData {
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
`,type:"registry:file"}],ve={files:Te},we=[{path:"templates/pdfx/invoice-modern/invoice-modern.tsx",content:`import { PdfxThemeProvider, usePdfxTheme } from '../../lib/pdfx-theme-context';
import { KeyValue } from '../../components/pdfx/key-value/pdfx-key-value';
import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';
import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';
import { Section } from '../../components/pdfx/section/pdfx-section';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/pdfx/table/pdfx-table';
import { Text } from '../../components/pdfx/text/pdfx-text';
import type { PdfxTheme } from '../../lib/pdfx-theme';
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
        <PageFooter leftText={data.notes} rightText="Page 1 of 1" sticky pagePadding={25} />
      </Page>
    </Document>
  );
}
`,type:"registry:file"},{path:"templates/pdfx/invoice-modern/invoice-modern.types.ts",content:`export interface InvoiceModernData {
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
`,type:"registry:file"}],Ce={files:we},Se="https://pdfx.akashpise.dev/schema/registry-item.json",Pe="pdf-image",je="registry:ui",De="Image",Fe="Image component with 7 display variants, fit modes, and optional captions",Ie=[{path:"components/pdfx/pdf-image/pdfx-pdf-image.tsx",content:`import { Image, Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';
type PdfxTheme = ReturnType<typeof usePdfxTheme>;

/** HTTP method used when fetching the image from a URL. */
export type PdfImageHTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type PdfImageSrc =
  | string
  | { uri: string; method?: PdfImageHTTPMethod; headers?: Record<string, string>; body?: string };

export type PdfImageFit = 'cover' | 'contain' | 'fill' | 'none';

export type PdfImageVariant =
  | 'default'
  | 'full-width'
  | 'thumbnail'
  | 'avatar'
  | 'cover'
  | 'bordered'
  | 'rounded';

export interface PdfImageProps {
  /** Image source — a URL string, file path, base64 data URI, or a request object with HTTP method/headers. */
  src: PdfImageSrc;
  /** Layout and sizing preset. @default 'default' */
  variant?: PdfImageVariant;
  /** Override the variant's default width. Accepts PDF points or CSS-like string (e.g. '100%'). */
  width?: number | string;
  /** Override the variant's default height in PDF points. */
  height?: number | string;
  /** Object-fit mode for how the image fills its container. Defaults to the variant's preset. */
  fit?: PdfImageFit;
  /** Object-position for the image within its container (e.g. '50% 50%', 'top left'). @default '50% 50%' */
  position?: string;
  /** Optional caption text rendered below the image. */
  caption?: string;
  /** Derive height from width using this ratio (width / aspectRatio). Ignored when \`height\` is set. */
  aspectRatio?: number;
  /** Border radius in PDF points. Overrides the variant's default radius. */
  borderRadius?: number;
  /** Prevent the image and its caption from splitting across pages. @default true */
  noWrap?: boolean;
  /** Custom @react-pdf/renderer styles applied to the image element. */
  style?: Style;
}

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

const UNSUPPORTED_FORMATS = ['webp', 'avif', 'heic', 'heif', 'ico'];

function detectFormat(src: PdfImageSrc): string | null {
  if (typeof src !== 'string') return null;
  const dataMatch = src.match(/^data:image\\/([a-zA-Z0-9+.-]+)/);
  if (dataMatch) return dataMatch[1].toLowerCase();
  return src.split('?')[0].split('.').pop()?.toLowerCase() ?? null;
}

function warnIfUnsupported(src: PdfImageSrc): void {
  const fmt = detectFormat(src);
  if (fmt && UNSUPPORTED_FORMATS.includes(fmt)) {
    console.warn(
      \`[PdfImage] Unsupported format "\${fmt}" detected. react-pdf supports: JPEG, PNG, GIF (first frame), BMP, SVG. Convert to PNG or JPEG before use.\`
    );
  }
}

function createImageStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: { flexDirection: 'column' },
    image: {},
    imageBordered: { borderWidth: 1, borderColor: t.colors.border, borderStyle: 'solid' },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}

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
  const styles = useSafeMemo(() => createImageStyles(theme), [theme]);
  const defaults = VARIANT_DEFAULTS[variant];

  const resolvedWidth = width ?? defaults.width;
  const resolvedHeight: number | string | undefined = (() => {
    if (height !== undefined) return height;
    if (defaults.height !== undefined) return defaults.height;
    if (aspectRatio !== undefined && typeof resolvedWidth === 'number')
      return resolvedWidth / aspectRatio;
    return undefined;
  })();

  const resolvedFit = fit ?? defaults.fit;
  const resolvedRadius = borderRadius ?? defaults.borderRadius;

  const imageStyles: Style[] = [styles.image];
  if (resolvedWidth !== undefined) imageStyles.push({ width: resolvedWidth } as Style);
  if (resolvedHeight !== undefined) imageStyles.push({ height: resolvedHeight } as Style);
  imageStyles.push({ objectFit: resolvedFit, objectPosition: position } as Style);
  if (resolvedRadius !== undefined) imageStyles.push({ borderRadius: resolvedRadius } as Style);
  if (variant === 'bordered') imageStyles.push(styles.imageBordered);
  if (style) imageStyles.push(style);

  const content = (
    <View style={styles.container}>
      <Image src={src} style={imageStyles} />
      {caption ? <PDFText style={styles.caption}>{caption}</PDFText> : null}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}
`,type:"registry:component"}],ke=["@react-pdf/renderer"],Re=["theme"],Ve={$schema:Se,name:Pe,type:je,title:De,description:Fe,files:Ie,dependencies:ke,registryDependencies:Re},Be="https://pdfx.akashpise.dev/schema/registry-item.json",Me="table",Ne="registry:ui",$e="Table",ze="Composable table with Table, TableRow, TableCell",He=JSON.parse(`[{"path":"components/pdfx/table/pdfx-table.tsx","content":"import { Text as PDFText, View } from '@react-pdf/renderer';\\nimport type { Style } from '@react-pdf/types';\\nimport { Children, type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';\\nimport { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';\\nimport { createTableStyles } from './pdfx-table.styles';\\nimport type {\\n  TableCellProps,\\n  TableProps,\\n  TableRowProps,\\n  TableSectionProps,\\n  TableVariant,\\n} from './pdfx-table.types';\\n\\nfunction processTableChildren(\\n  children: ReactNode,\\n  variant: TableVariant,\\n  zebraStripe: boolean\\n): ReactNode {\\n  let bodyRowIndex = 0;\\n\\n  return Children.map(children, (child) => {\\n    if (!isValidElement(child)) return child;\\n\\n    if (child.type === TableHeader || child.type === TableBody || child.type === TableFooter) {\\n      const isBody = child.type === TableBody;\\n      const sectionChild = child as ReactElement<TableSectionProps>;\\n      const sectionChildren = Children.map(sectionChild.props.children, (rowChild) => {\\n        if (isValidElement(rowChild) && rowChild.type === TableRow) {\\n          const rowProps: Partial<TableRowProps> = { variant };\\n\\n          if (isBody && zebraStripe) {\\n            const isStripe = bodyRowIndex % 2 === 1;\\n            bodyRowIndex++;\\n            if (isStripe) {\\n              rowProps.stripe = true;\\n            }\\n          }\\n\\n          return cloneElement(rowChild as ReactElement<TableRowProps>, rowProps);\\n        }\\n        return rowChild;\\n      });\\n\\n      return cloneElement(child, {}, sectionChildren);\\n    }\\n\\n    if (child.type === TableRow) {\\n      return cloneElement(child as ReactElement<TableRowProps>, { variant });\\n    }\\n\\n    return child;\\n  });\\n}\\n\\nexport function TableHeader({ children, style }: TableSectionProps) {\\n  // minPresenceAhead: if < 60pt remain on the page, move the header to the next page\\n  // so the header is never stranded alone at the bottom without any body rows.\\n  return (\\n    <View minPresenceAhead={60} style={style}>\\n      {children}\\n    </View>\\n  );\\n}\\n\\nexport function TableBody({ children, style }: TableSectionProps) {\\n  return <View style={style}>{children}</View>;\\n}\\n\\nexport function TableFooter({ children, style }: TableSectionProps) {\\n  return <View style={style}>{children}</View>;\\n}\\n\\nexport function Table({\\n  children,\\n  style,\\n  variant = 'line',\\n  zebraStripe = false,\\n  noWrap = false,\\n}: TableProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const tableStyles: Style[] = [styles.table];\\n  const effectiveZebra = variant === 'striped' ? true : zebraStripe;\\n\\n  tableStyles.push(\\n    {\\n      grid: styles.tableGrid,\\n      line: styles.tableLine,\\n      minimal: styles.tableMinimal,\\n      striped: styles.tableStriped,\\n      compact: styles.tableCompact,\\n      bordered: styles.tableBordered,\\n      'primary-header': styles.tablePrimaryHeader,\\n    }[variant]\\n  );\\n\\n  const styleArray = style ? [...tableStyles, style] : tableStyles;\\n  const processedChildren = processTableChildren(children, variant, effectiveZebra);\\n\\n  const inner = <View style={styleArray}>{processedChildren}</View>;\\n  return noWrap ? <View wrap={false}>{inner}</View> : inner;\\n}\\n\\nexport function TableRow({\\n  header,\\n  footer,\\n  stripe,\\n  children,\\n  style,\\n  variant = 'line',\\n}: TableRowProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const rowStyles: Style[] = [styles.row];\\n\\n  rowStyles.push(\\n    {\\n      grid: styles.rowGrid,\\n      line: styles.rowLine,\\n      minimal: styles.rowMinimal,\\n      striped: styles.rowStriped,\\n      compact: styles.rowCompact,\\n      bordered: styles.rowBordered,\\n      'primary-header': styles.rowPrimaryHeader,\\n    }[variant]\\n  );\\n\\n  if (header) {\\n    rowStyles.push(\\n      {\\n        grid: styles.rowHeaderGrid,\\n        line: styles.rowHeaderLine,\\n        minimal: styles.rowHeaderMinimal,\\n        striped: styles.rowHeaderStriped,\\n        compact: styles.rowHeaderCompact,\\n        bordered: styles.rowHeaderBordered,\\n        'primary-header': styles.rowHeaderPrimaryHeader,\\n      }[variant]\\n    );\\n  }\\n\\n  if (footer) {\\n    if (variant === 'striped') rowStyles.push(styles.rowFooterStriped);\\n    else rowStyles.push(styles.rowFooter);\\n  }\\n\\n  if (stripe && !header && !footer) {\\n    rowStyles.push(styles.rowStripe);\\n  }\\n\\n  const styleArray = style ? [...rowStyles, style] : rowStyles;\\n  const childArray = Children.toArray(children);\\n  const processedChildren = childArray.map((child, i) => {\\n    if (isValidElement(child) && child.type === TableCell) {\\n      return cloneElement(child as ReactElement<TableCellProps>, {\\n        variant,\\n        header,\\n        footer,\\n        _last: i === childArray.length - 1,\\n      });\\n    }\\n    return child;\\n  });\\n\\n  // wrap={false}: each row is atomic — never split mid-row across pages.\\n  return (\\n    <View wrap={false} style={styleArray}>\\n      {processedChildren}\\n    </View>\\n  );\\n}\\n\\nexport function TableCell({\\n  header,\\n  footer,\\n  align,\\n  width,\\n  children,\\n  style,\\n  variant = 'line',\\n  _last,\\n}: TableCellProps) {\\n  const theme = usePdfxTheme();\\n  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);\\n  const cellStyles: Style[] = [styles.cell];\\n\\n  if (width !== undefined) {\\n    cellStyles.push(styles.cellFixed);\\n    cellStyles.push({ width } as Style);\\n  }\\n\\n  // Only certain variants carry a cell-level style override; grid/line use the base cell style.\\n  const cellVariantStyle = (\\n    {\\n      minimal: styles.cellMinimal,\\n      striped: styles.cellStriped,\\n      compact: styles.cellCompact,\\n      bordered: styles.cellBordered,\\n      'primary-header': styles.cellPrimaryHeader,\\n    } as Partial<Record<TableVariant, Style>>\\n  )[variant];\\n  if (cellVariantStyle) cellStyles.push(cellVariantStyle);\\n\\n  if (variant === 'grid' && !_last) {\\n    cellStyles.push(styles.cellGridBorder);\\n  } else if (variant === 'bordered' && !_last) {\\n    cellStyles.push(styles.cellBorderedBorder);\\n  }\\n\\n  if (align) {\\n    cellStyles.push({ textAlign: align } as Style);\\n  }\\n\\n  const styleArray = style ? [...cellStyles, style] : cellStyles;\\n\\n  let textStyle: Style = styles.cellText;\\n  if (header) {\\n    textStyle = {\\n      grid: styles.cellTextHeaderGrid,\\n      line: styles.cellTextHeaderLine,\\n      minimal: styles.cellTextHeaderMinimal,\\n      striped: styles.cellTextHeaderStriped,\\n      compact: styles.cellTextHeaderCompact,\\n      bordered: styles.cellTextHeaderBordered,\\n      'primary-header': styles.cellTextHeaderPrimaryHeader,\\n    }[variant];\\n  } else if (footer) {\\n    textStyle = styles.cellTextFooter;\\n  } else if (variant === 'compact') {\\n    textStyle = styles.cellTextCompact;\\n  }\\n\\n  const content =\\n    typeof children === 'string' ? (\\n      <PDFText\\n        style={[\\n          textStyle,\\n          align ? { textAlign: align } : {},\\n          { margin: 0, padding: 0 }, // ← hard reset — always last so it wins\\n        ]}\\n      >\\n        {children}\\n      </PDFText>\\n    ) : (\\n      children\\n    );\\n\\n  return <View style={styleArray}>{content}</View>;\\n}\\n","type":"registry:component"},{"path":"components/pdfx/table/pdfx-table.styles.ts","content":"import { StyleSheet } from '@react-pdf/renderer';\\nimport { usePdfxTheme } from '../lib/pdfx-theme-context';\\ntype PdfxTheme = ReturnType<typeof usePdfxTheme>;\\n\\n/**\\n * Creates all table styles derived from the active theme.\\n *\\n * Border philosophy (PDF points ≠ CSS pixels):\\n *   hairline = 0.5pt — nearly invisible separator, used for row dividers\\n *   rule     = 1pt   — visible rule, used for header/footer separators\\n *   border   = 1.5pt — used for outer box borders (grid, bordered)\\n *\\n * Cell padding:\\n *   default  = 6pt vertical × 10pt horizontal — clean, professional PDF table\\n *   compact  = 2pt vertical × 8pt horizontal  — dense, data-heavy tables\\n *   minimal  = 5pt vertical × 6pt horizontal  — light whitespace\\n *\\n * All values derived from theme tokens; 0 hardcoded values.\\n * @param t - The resolved PdfxTheme instance.\\n */\\nexport function createTableStyles(t: PdfxTheme) {\\n  const { spacing, borderRadius, fontWeights, typography } = t.primitives;\\n  const borderColor = t.colors.border;\\n\\n  // Semantic border widths (in PDF points)\\n  const hairline = 0.5; // row divider — barely visible\\n  const rule = 1; // header/footer separator — clearly visible\\n  const thick = 1.5; // outer box border — structural\\n\\n  // Semantic cell padding\\n  const cellPadV = spacing[2] - 2;\\n  const cellPadH = spacing[2] + 2;\\n  const cellPadVCompact = spacing[0.5]; // 2pt — tests assert this === 2\\n  const cellPadHCompact = spacing[2]; // 8pt\\n\\n  const rowDivider = {\\n    borderBottomWidth: hairline,\\n    borderBottomColor: borderColor,\\n    borderBottomStyle: 'solid' as const,\\n  };\\n\\n  return StyleSheet.create({\\n    // ─── Base table wrapper ───────────────────────────────────────────────────\\n    table: {\\n      display: 'flex',\\n      flexDirection: 'column',\\n      width: '100%',\\n      marginBottom: t.spacing.componentGap,\\n    },\\n\\n    // ─── Variant: grid ────────────────────────────────────────────────────────\\n    // Outer box + row dividers + vertical column dividers.\\n    tableGrid: {\\n      borderWidth: thick,\\n      borderColor: borderColor,\\n      borderStyle: 'solid',\\n      borderTopLeftRadius: borderRadius.md,\\n      borderTopRightRadius: borderRadius.md,\\n      borderBottomLeftRadius: borderRadius.md,\\n      borderBottomRightRadius: borderRadius.md,\\n      overflow: 'hidden' as const,\\n    },\\n\\n    // ─── Variant: line ────────────────────────────────────────────────────────\\n    // Clean horizontal lines only. Header bold rule → body hairlines.\\n    // No outer box. A thin bottom border anchors the table.\\n    tableLine: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: minimal ─────────────────────────────────────────────────────\\n    // No outer borders. Subtle hairline row separators. Generous vertical rhythm.\\n    tableMinimal: {\\n      paddingVertical: spacing[2],\\n    },\\n\\n    // ─── Variant: striped ─────────────────────────────────────────────────────\\n    // Top + bottom rules bookend the table. Alternating row fill.\\n    tableStriped: {\\n      borderTopWidth: hairline,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: compact ────────────────────────────────────────────────────\\n    // Dense rows, uppercase headers, bottom rule.\\n    tableCompact: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Variant: bordered ───────────────────────────────────────────────────\\n    // Structural outer box, inner row hairlines.\\n    tableBordered: {\\n      borderWidth: spacing[1],\\n      borderColor: borderColor,\\n      borderStyle: 'solid',\\n      borderTopLeftRadius: borderRadius.sm,\\n      borderTopRightRadius: borderRadius.sm,\\n      borderBottomLeftRadius: borderRadius.sm,\\n      borderBottomRightRadius: borderRadius.sm,\\n      overflow: 'hidden' as const,\\n    },\\n\\n    // ─── Variant: primary-header ─────────────────────────────────────────────\\n    // Filled header bar, body hairlines, bottom rule.\\n    tablePrimaryHeader: {\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n\\n    // ─── Row base ────────────────────────────────────────────────────────────\\n    row: {\\n      flexDirection: 'row',\\n      display: 'flex',\\n    },\\n\\n    // Each row variant applies a bottom hairline separator between rows.\\n    rowGrid: rowDivider,\\n    rowLine: rowDivider,\\n    rowMinimal: rowDivider,\\n    rowStriped: {},\\n    rowCompact: rowDivider,\\n    rowBordered: rowDivider,\\n    rowPrimaryHeader: rowDivider,\\n\\n    // ─── Header row overrides ────────────────────────────────────────────────\\n    // Header rows replace the hairline with a heavier rule for clear hierarchy.\\n    rowHeaderGrid: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderLine: {\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderMinimal: {\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderStriped: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderCompact: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: rule,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderBordered: {\\n      backgroundColor: t.colors.muted,\\n      borderBottomWidth: hairline,\\n      borderBottomColor: borderColor,\\n      borderBottomStyle: 'solid',\\n    },\\n    rowHeaderPrimaryHeader: {\\n      backgroundColor: t.colors.primary,\\n    },\\n\\n    // ─── Footer row overrides ────────────────────────────────────────────────\\n    rowFooter: {\\n      borderTopWidth: rule,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n    },\\n    rowFooterStriped: {\\n      borderTopWidth: rule,\\n      borderTopColor: borderColor,\\n      borderTopStyle: 'solid',\\n      backgroundColor: t.colors.muted,\\n    },\\n\\n    // ─── Zebra stripe ────────────────────────────────────────────────────────\\n    rowStripe: {\\n      backgroundColor: t.colors.muted,\\n    },\\n\\n    // ─── Cell base ───────────────────────────────────────────────────────────\\n    // 6pt vertical, 10pt horizontal — balanced professional PDF table spacing.\\n    cell: {\\n      flex: 1,\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n      justifyContent: 'center',\\n    },\\n    cellFixed: {\\n      flex: 0,\\n    },\\n\\n    // Cell variant padding overrides\\n    cellMinimal: {\\n      paddingVertical: spacing[1] + 1, // 5pt\\n      paddingHorizontal: spacing[2] - 2, // 6pt\\n    },\\n    cellStriped: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n    // spacing[0.5] = 2pt — tests assert paddingVertical === 2\\n    cellCompact: {\\n      paddingVertical: cellPadVCompact,\\n      paddingHorizontal: cellPadHCompact,\\n    },\\n    cellBordered: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n    cellPrimaryHeader: {\\n      paddingVertical: cellPadV,\\n      paddingHorizontal: cellPadH,\\n    },\\n\\n    // Column divider for grid — hairline between cells, not on last cell\\n    cellGridBorder: {\\n      borderRightWidth: hairline,\\n      borderRightColor: borderColor,\\n      borderRightStyle: 'solid',\\n    },\\n    // Column divider for bordered — tests assert borderRightWidth === spacing[1] = 4\\n    cellBorderedBorder: {\\n      borderRightWidth: spacing[1],\\n      borderRightColor: borderColor,\\n      borderRightStyle: 'solid',\\n    },\\n\\n    // ─── Cell text ───────────────────────────────────────────────────────────\\n    //\\n    // lineHeight: 1 is intentional and critical for all cell text styles.\\n    //\\n    // react-pdf adds EXTRA leading space below the text box when lineHeight > 1,\\n    // making rows appear to have more bottom padding than top padding. Since cells\\n    // already use symmetric paddingVertical on their <View> wrapper, text nodes\\n    // must use lineHeight: 1 so the text box is exactly fontSize tall with no\\n    // extra leading that would skew the visual vertical alignment.\\n    cellText: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n    },\\n\\n    // Header text styles — semibold for hierarchy\\n    cellTextHeaderGrid: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    cellTextHeaderLine: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    // Minimal uses muted header text (softer hierarchy)\\n    cellTextHeaderMinimal: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.mutedForeground,\\n      fontWeight: fontWeights.medium,\\n    },\\n    cellTextHeaderStriped: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n    // Compact uses uppercase + small text for dense data headers\\n    cellTextHeaderCompact: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n      textTransform: 'uppercase',\\n      letterSpacing: 0.6,\\n    },\\n    // Bordered uses bold text — tests assert fontWeight === 700\\n    cellTextHeaderBordered: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.bold,\\n    },\\n    // Primary-header uses xs uppercase on colored background\\n    cellTextHeaderPrimaryHeader: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.primaryForeground,\\n      fontWeight: fontWeights.semibold,\\n      textTransform: 'uppercase',\\n      letterSpacing: 0.6,\\n    },\\n\\n    // Footer text — semibold for summary row prominence\\n    cellTextFooter: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: t.typography.body.fontSize,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n      fontWeight: fontWeights.semibold,\\n    },\\n\\n    // Compact data cell — xs font to match dense header\\n    cellTextCompact: {\\n      fontFamily: t.typography.body.fontFamily,\\n      fontSize: typography.xs,\\n      lineHeight: 1,\\n      color: t.colors.foreground,\\n    },\\n  });\\n}\\n","type":"registry:component"},{"path":"components/pdfx/table/pdfx-table.types.ts","content":"\\n/** Table visual style variant. */\\nexport type TableVariant =\\n  | 'line'\\n  | 'grid'\\n  | 'minimal'\\n  | 'striped'\\n  | 'compact'\\n  | 'bordered'\\n  | 'primary-header';\\n\\nexport interface TableProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  /** Visual style variant that controls borders, backgrounds, and spacing. @default 'line' */\\n  variant?: TableVariant;\\n  /** Apply alternating row background colors to body rows. Automatically enabled for the \`striped\` variant. @default false */\\n  zebraStripe?: boolean;\\n  /** Prevent the entire table from splitting across PDF pages. Use for short tables that fit on one page. @default false */\\n  noWrap?: boolean;\\n}\\n\\nexport type TableSectionProps = PDFComponentProps;\\n\\nexport interface TableRowProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  /** Render this row as a header row — applies bold text and variant header background. */\\n  header?: boolean;\\n  /** Render this row as a footer row — applies bold text and a top border. */\\n  footer?: boolean;\\n  /** Apply the zebra stripe background to this row. Set automatically by \`Table\` when \`zebraStripe\` is enabled. */\\n  stripe?: boolean;\\n  /** Visual variant inherited from the parent \`Table\`. Set automatically — do not pass manually. */\\n  variant?: TableVariant;\\n}\\n\\nexport interface TableCellProps {\\n  /** Custom styles to merge with component defaults */\\n  style?: Style;\\n  /** Content to render */\\n  children: React.ReactNode;\\n  /** Render this cell in header text style — bold, variant accent color. */\\n  header?: boolean;\\n  /** Render this cell in footer text style. */\\n  footer?: boolean;\\n  /** Horizontal text alignment within the cell. */\\n  align?: 'left' | 'center' | 'right';\\n  /** Fixed column width in PDF points or CSS-like string. When omitted the cell flex-grows. */\\n  width?: string | number;\\n  /** Visual variant inherited from the parent \`TableRow\`. Set automatically — do not pass manually. */\\n  variant?: TableVariant;\\n  /**\\n   * True when this is the last cell in its row.\\n   * Used internally to omit the right border on the last cell in \`grid\` / \`bordered\` variants.\\n   * @internal Set automatically by \`TableRow\` via \`cloneElement\` — do not pass manually.\\n   */\\n  _last?: boolean;\\n}\\n","type":"registry:component"}]`),We=["@react-pdf/renderer"],Ae=["theme"],Le={$schema:Be,name:Me,type:Ne,title:$e,description:ze,files:He,dependencies:We,registryDependencies:Ae},Ge="https://github.com/akii09/pdfx",Ee="https://discord.gg/MuRtnU5B";function qe(){return e.jsxs("div",{className:"rounded-xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Like what you see? ",e.jsx("span",{className:"font-medium text-foreground",children:"PDFX is open source."})]}),e.jsxs("div",{className:"flex items-center gap-2.5 shrink-0",children:[e.jsxs("a",{href:Ge,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted",children:[e.jsx(ie,{className:"h-3.5 w-3.5 fill-current text-yellow-500"}),"Star on GitHub",e.jsx(ae,{className:"h-3.5 w-3.5 text-muted-foreground"})]}),e.jsxs("a",{href:Ee,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted",children:[e.jsx(me,{className:"h-3.5 w-3.5 text-[#5865F2]"}),"Join Discord"]})]})]})}const c={invoiceNumber:"INV-2026-001",dueDate:"March 17, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"Client Corp.",address:"456 Client Ave, Suite 2",email:"contact@clientcorp.com"},items:[{description:"Web Development",quantity:1,unitPrice:12500},{description:"UI/UX Design",quantity:1,unitPrice:8750},{description:"Consulting",quantity:10,unitPrice:1500}],summary:{subtotal:21250+10*1500,tax:.07*(21250+10*1500),total:21250+10*1500+.07*(21250+10*1500)},paymentTerms:{dueDate:"March 17, 2026",method:"UPI / Card / Bank Transfer",gst:"GSTIN 123456789"},notes:"Thank you for your business!"},Oe="/PDFX-LOGO.png";function Ke({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(Ue,{})})}function Ue(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background}});return e.jsx(S,{title:"PDFx Invoice INV-001",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsx(B,{variant:"logo-left",logo:e.jsx(L,{src:Oe,style:{margin:0}}),title:c.companyName,subtitle:c.subtitle,rightText:c.invoiceNumber,rightSubText:`Due: ${c.dueDate}`,style:{marginBottom:0}}),e.jsxs(b,{noWrap:!0,style:{flexDirection:"row"},children:[e.jsxs(a,{style:{flex:1,paddingRight:15},children:[e.jsx(o,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"From"}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.companyName}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.companyAddress}),e.jsx(o,{noMargin:!0,variant:"xs",children:"hello@pdfx.io"})]}),e.jsxs(a,{style:{flex:1,paddingRight:15},children:[e.jsx(o,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"Bill To"}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.billTo.name}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.billTo.address}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.billTo.email})]}),e.jsxs(a,{style:{flex:1,paddingRight:15},children:[e.jsx(o,{style:{fontSize:9,fontWeight:"bold",marginBottom:2},color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"Payment Terms"}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.paymentTerms.method}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.paymentTerms.gst}),e.jsx(o,{noMargin:!0,variant:"xs",children:c.paymentTerms.dueDate})]})]}),e.jsxs(F,{variant:"grid",zebraStripe:!0,children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Description"}),e.jsx(i,{align:"center",children:"QTY"}),e.jsx(i,{align:"center",children:"Rate"}),e.jsx(i,{align:"right",children:"Total"})]})}),e.jsx(k,{children:c.items.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.quantity}`}),e.jsx(i,{align:"center",children:`$${r.unitPrice}`}),e.jsx(i,{align:"right",children:`$${(r.quantity*r.unitPrice).toFixed(2)}`})]},s))})]}),e.jsx(b,{noWrap:!0,style:{flexDirection:"row",marginTop:16},children:e.jsx(a,{style:{marginLeft:"auto",width:220},children:e.jsx(x,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${c.summary.subtotal.toFixed(2)}`},{key:"Tax",value:`$${c.summary.tax.toFixed(2)}`},{key:"Total",value:`$${c.summary.total.toFixed(2)}`,valueStyle:{fontSize:12,fontWeight:"bold"},keyStyle:{fontSize:12,fontWeight:"bold",color:"primary"}}],divided:!0})})}),e.jsx(R,{leftText:c.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const m={invoiceNumber:"INV-2026-002",invoiceDate:"February 18, 2026",dueDate:"March 20, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"TechStart Solutions",address:"789 Innovation Blvd, Floor 3",email:"billing@techstart.com",phone:"+1 (555) 987-6543"},items:[{description:"API Integration",quantity:1,unitPrice:15e3},{description:"SEO",quantity:2,unitPrice:5500},{description:"Security Audit",quantity:1,unitPrice:7200}],summary:{subtotal:15e3+2*5500+7200,tax:.07*(15e3+2*5500+7200),total:15e3+2*5500+7200+.07*(15e3+2*5500+7200)},paymentTerms:{method:"Wire Transfer / Bank Account",gst:"GSTIN 123456789"},notes:"Payment terms: Net 30 days. Thank you for your business!"};function _e({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(Je,{})})}function Je(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},metaRow:{flexDirection:"row",marginBottom:n.spacing.sectionGap},metaCol:{flex:1,paddingRight:12},metaLabel:{fontSize:8,fontWeight:"bold",color:n.colors.mutedForeground,textTransform:"uppercase",letterSpacing:.5,marginBottom:3},metaValue:{fontSize:9,color:n.colors.foreground},dividerCol:{width:1,backgroundColor:n.colors.border,marginRight:12}});return e.jsx(S,{title:"PDFx Invoice INV-002",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsx(B,{variant:"branded",title:m.companyName,subtitle:`${m.subtitle}  ·  ${m.companyAddress}  ·  hello@pdfx.io`}),e.jsxs(a,{style:t.metaRow,children:[e.jsxs(a,{style:t.metaCol,children:[e.jsx(o,{style:t.metaLabel,noMargin:!0,children:"Invoice Number"}),e.jsx(o,{style:{...t.metaValue,fontWeight:"bold",fontSize:11},noMargin:!0,children:m.invoiceNumber})]}),e.jsxs(a,{style:t.metaCol,children:[e.jsx(o,{style:t.metaLabel,noMargin:!0,children:"Invoice Date"}),e.jsx(o,{style:t.metaValue,noMargin:!0,children:m.invoiceDate})]}),e.jsxs(a,{style:t.metaCol,children:[e.jsx(o,{style:t.metaLabel,noMargin:!0,children:"Due Date"}),e.jsx(o,{style:t.metaValue,noMargin:!0,children:m.dueDate})]}),e.jsx(a,{style:t.dividerCol}),e.jsxs(a,{style:{flex:2},children:[e.jsx(o,{style:t.metaLabel,noMargin:!0,children:"Billed To"}),e.jsx(o,{style:{...t.metaValue,fontWeight:"bold"},noMargin:!0,children:m.billTo.name}),e.jsx(o,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:m.billTo.address}),e.jsx(o,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:m.billTo.email}),e.jsx(o,{style:{...t.metaValue,color:n.colors.mutedForeground},noMargin:!0,children:m.billTo.phone})]})]}),e.jsxs(F,{variant:"primary-header",children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Description"}),e.jsx(i,{align:"center",children:"Qty"}),e.jsx(i,{align:"right",children:"Unit Price"}),e.jsx(i,{align:"right",children:"Amount"})]})}),e.jsx(k,{children:m.items.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.quantity}`}),e.jsx(i,{align:"right",children:`$${r.unitPrice.toLocaleString()}`}),e.jsx(i,{align:"right",children:`$${(r.quantity*r.unitPrice).toFixed(2)}`})]},s))})]}),e.jsxs(b,{noWrap:!0,style:{flexDirection:"row",marginTop:16},children:[e.jsxs(a,{style:{flex:1,paddingRight:20},children:[e.jsx(o,{style:t.metaLabel,noMargin:!0,children:"Payment Method"}),e.jsx(o,{variant:"xs",noMargin:!0,children:m.paymentTerms.method}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:m.paymentTerms.gst})]}),e.jsx(a,{style:{width:220},children:e.jsx(x,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${m.summary.subtotal.toFixed(2)}`},{key:"Tax (7%)",value:`$${m.summary.tax.toFixed(2)}`},{key:"Total Due",value:`$${m.summary.total.toFixed(2)}`,valueStyle:{fontSize:12,fontWeight:"bold"},keyStyle:{fontSize:12,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(R,{leftText:m.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const u={invoiceNumber:"INV-2026-003",invoiceDate:"February 20, 2026",dueDate:"March 22, 2026",companyName:"PDFx Inc.",companyAddress:"Nagpur, IN",billTo:{name:"Enterprise Corp",address:"500 Enterprise Way, Building A",email:"finance@enterprisecorp.io",phone:"+1 (555) 246-8135"},items:[{description:"Annual License Plan",quantity:1,unitPrice:25e3},{description:"Support & Maintenance",quantity:12,unitPrice:1500},{description:"Custom Integration",quantity:1,unitPrice:12e3}],summary:{subtotal:25e3+12*1500+12e3,tax:.07*(25e3+12*1500+12e3),total:25e3+12*1500+12e3+.07*(25e3+12*1500+12e3)},paymentTerms:{method:"ACH Transfer / Check",gst:"GSTIN 123456789"},notes:"Invoice for annual enterprise subscription. Please retain for your records."};function Qe({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(Ye,{})})}function Ye(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},invoiceStamp:{borderWidth:2,borderColor:n.colors.primary,borderStyle:"solid",borderRadius:n.primitives.borderRadius.sm,paddingHorizontal:12,paddingVertical:8,alignSelf:"flex-start"},infoRow:{flexDirection:"row",marginBottom:n.spacing.sectionGap},infoLabel:{fontSize:8,fontWeight:"bold",color:n.colors.primary,textTransform:"uppercase",letterSpacing:.8,marginBottom:4}});return e.jsx(S,{title:"PDFx Invoice INV-003",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsxs(b,{noWrap:!0,style:{flexDirection:"row",alignItems:"flex-start",marginBottom:n.spacing.sectionGap},children:[e.jsx(a,{style:{flex:1},children:e.jsx(B,{variant:"minimal",title:u.companyName,subtitle:`${u.companyAddress}  ·  hello@pdfx.io`,marginBottom:0})}),e.jsxs(a,{style:t.invoiceStamp,children:[e.jsx(o,{style:{fontSize:7,fontWeight:"bold",color:n.colors.primary,textAlign:"right"},noMargin:!0,transform:"uppercase",children:"Invoice"}),e.jsx(o,{style:{fontSize:14,fontWeight:"bold",color:n.colors.foreground,textAlign:"right"},noMargin:!0,children:u.invoiceNumber}),e.jsx(o,{style:{fontSize:8,color:n.colors.mutedForeground,textAlign:"right"},noMargin:!0,children:u.invoiceDate})]})]}),e.jsxs(a,{style:t.infoRow,children:[e.jsxs(a,{style:{flex:1,paddingRight:20},children:[e.jsx(o,{style:t.infoLabel,noMargin:!0,children:"Bill To"}),e.jsx(o,{variant:"sm",noMargin:!0,children:u.billTo.name}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:u.billTo.address}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:u.billTo.email}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:u.billTo.phone})]}),e.jsxs(a,{style:{flex:1},children:[e.jsx(o,{style:t.infoLabel,noMargin:!0,children:"Invoice Details"}),e.jsx(x,{size:"sm",items:[{key:"Due Date",value:u.dueDate},{key:"Payment",value:u.paymentTerms.method},{key:"GST",value:u.paymentTerms.gst}]})]})]}),e.jsxs(F,{variant:"compact",children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Description"}),e.jsx(i,{align:"center",children:"Qty"}),e.jsx(i,{align:"right",children:"Rate"}),e.jsx(i,{align:"right",children:"Total"})]})}),e.jsx(k,{children:u.items.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.quantity}`}),e.jsx(i,{align:"right",children:`$${r.unitPrice.toLocaleString()}`}),e.jsx(i,{align:"right",children:`$${(r.quantity*r.unitPrice).toFixed(2)}`})]},s))})]}),e.jsxs(b,{noWrap:!0,style:{flexDirection:"row",marginTop:20},children:[e.jsx(a,{style:{flex:1}}),e.jsx(a,{style:{width:240},children:e.jsx(x,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${u.summary.subtotal.toFixed(2)}`},{key:"Tax (7%)",value:`$${u.summary.tax.toFixed(2)}`},{key:"Balance Due",value:`$${u.summary.total.toFixed(2)}`,valueStyle:{fontSize:13,fontWeight:"bold",color:n.colors.primary},keyStyle:{fontSize:12,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(R,{leftText:u.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const g={invoiceNumber:"INV-2026-004",invoiceDate:"February 22, 2026",dueDate:"March 24, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"Global Industries Ltd.",address:"100 Corporate Plaza, Tower B",email:"accounts@globalindustries.com",phone:"+1 (555) 888-9999"},items:[{description:"Enterprise Software License",quantity:5,unitPrice:4500},{description:"Implementation Services",quantity:1,unitPrice:18e3},{description:"Training Workshop (per session)",quantity:3,unitPrice:2500},{description:"Annual Support Package",quantity:1,unitPrice:8500}],summary:{subtotal:5*4500+18e3+3*2500+8500,tax:.08*(5*4500+18e3+3*2500+8500),total:(5*4500+18e3+3*2500+8500)*1.08},paymentTerms:{method:"Wire Transfer / Corporate Account"},notes:"Corporate billing – Net 30 terms apply. For inquiries, contact accounts@pdfx.io"},Xe="/PDFX-LOGO.png";function Ze({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(en,{})})}function en(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},infoGrid:{flexDirection:"row",marginBottom:n.spacing.sectionGap,gap:24},infoColumn:{flex:1},infoLabel:{fontSize:9,fontWeight:"bold",color:n.colors.mutedForeground,textTransform:"uppercase",letterSpacing:.6,marginBottom:6},summaryCard:{backgroundColor:n.colors.muted,borderRadius:n.primitives.borderRadius.md,padding:16,marginTop:20},summaryRow:{flexDirection:"row",justifyContent:"flex-end"}});return e.jsx(S,{title:"PDFx Invoice INV-004 – Corporate",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsx(B,{variant:"logo-right",logo:e.jsx(L,{src:Xe,width:56,height:56,style:{margin:0}}),title:g.companyName,subtitle:`${g.subtitle}  ·  ${g.companyAddress}`,style:{marginBottom:n.spacing.sectionGap}}),e.jsxs(a,{style:t.infoGrid,children:[e.jsxs(a,{style:t.infoColumn,children:[e.jsx(o,{style:t.infoLabel,noMargin:!0,children:"Invoice Details"}),e.jsx(x,{size:"sm",items:[{key:"Invoice #",value:g.invoiceNumber},{key:"Issue Date",value:g.invoiceDate},{key:"Due Date",value:g.dueDate},{key:"Payment",value:g.paymentTerms.method}]})]}),e.jsxs(a,{style:t.infoColumn,children:[e.jsx(o,{style:t.infoLabel,noMargin:!0,children:"Bill To"}),e.jsx(o,{variant:"sm",weight:"semibold",noMargin:!0,children:g.billTo.name}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:g.billTo.address}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:g.billTo.email}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:g.billTo.phone})]})]}),e.jsxs(F,{variant:"bordered",children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Description"}),e.jsx(i,{align:"center",children:"Qty"}),e.jsx(i,{align:"right",children:"Unit Price"}),e.jsx(i,{align:"right",children:"Amount"})]})}),e.jsx(k,{children:g.items.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.quantity}`}),e.jsx(i,{align:"right",children:`$${r.unitPrice.toLocaleString()}`}),e.jsx(i,{align:"right",children:`$${(r.quantity*r.unitPrice).toLocaleString()}`})]},s))})]}),e.jsx(a,{style:t.summaryCard,children:e.jsx(a,{style:t.summaryRow,children:e.jsx(a,{style:{width:260},children:e.jsx(x,{size:"md",dividerThickness:1,dividerColor:"border",items:[{key:"Subtotal",value:`$${g.summary.subtotal.toLocaleString()}`},{key:"Tax (8%)",value:`$${g.summary.tax.toFixed(2)}`},{key:"Total Due",value:`$${g.summary.total.toFixed(2)}`,valueStyle:{fontSize:14,fontWeight:"bold",color:n.colors.primary},keyStyle:{fontSize:13,fontWeight:"bold"}}],divided:!0})})})}),e.jsx(R,{leftText:g.notes,rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const p={invoiceNumber:"INV-2026-005",invoiceDate:"February 24, 2026",dueDate:"March 26, 2026",companyName:"PDFx Inc.",subtitle:"Innovative PDF Solutions",companyAddress:"Nagpur, IN",billTo:{name:"Creative Agency Co.",address:"250 Design District, Loft 5",email:"studio@creativeagency.co",phone:"+1 (555) 321-7654"},items:[{description:"Brand Identity Design",quantity:1,unitPrice:8500},{description:"Marketing Collateral Package",quantity:1,unitPrice:4200},{description:"Social Media Assets (per set)",quantity:4,unitPrice:750},{description:"Motion Graphics (30s)",quantity:2,unitPrice:3500}],summary:{subtotal:12700+4*750+2*3500,tax:.065*(12700+4*750+2*3500),total:(12700+4*750+2*3500)*1.065},paymentTerms:{method:"Credit Card / PayPal / Stripe",gst:"GSTIN 456789123"},notes:"Creative work is protected under copyright. Full usage rights transfer upon payment."};function nn({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(tn,{})})}function tn(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},heroSection:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:n.spacing.sectionGap},invoiceBadge:{backgroundColor:n.colors.primary,borderRadius:n.primitives.borderRadius.md,paddingHorizontal:20,paddingVertical:14,alignItems:"center"},badgeLabel:{fontSize:8,fontWeight:"bold",color:n.colors.primaryForeground,textTransform:"uppercase",letterSpacing:1.2,marginBottom:2},badgeNumber:{fontSize:16,fontWeight:"bold",color:n.colors.primaryForeground},accentBlock:{backgroundColor:n.colors.muted,borderLeftWidth:4,borderLeftColor:n.colors.accent,borderLeftStyle:"solid",paddingLeft:14,paddingVertical:10,marginBottom:n.spacing.sectionGap},infoGrid:{flexDirection:"row",gap:32},infoColumn:{flex:1},sectionLabel:{fontSize:8,fontWeight:"bold",color:n.colors.accent,textTransform:"uppercase",letterSpacing:.8,marginBottom:6},summarySection:{flexDirection:"row",marginTop:24},summaryLeft:{flex:1,paddingRight:20},summaryRight:{width:240,backgroundColor:n.colors.muted,borderRadius:n.primitives.borderRadius.sm,padding:14}});return e.jsx(S,{title:"PDFx Invoice INV-005 – Creative",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsxs(a,{style:t.heroSection,children:[e.jsx(a,{style:{flex:1},children:e.jsx(B,{variant:"centered",title:p.companyName,subtitle:`${p.subtitle}  ·  ${p.companyAddress}  ·  hello@pdfx.io`,marginBottom:0})}),e.jsxs(a,{style:t.invoiceBadge,children:[e.jsx(o,{style:t.badgeLabel,noMargin:!0,children:"Invoice"}),e.jsx(o,{style:t.badgeNumber,noMargin:!0,children:p.invoiceNumber})]})]}),e.jsx(a,{style:t.accentBlock,children:e.jsxs(a,{style:t.infoGrid,children:[e.jsxs(a,{style:t.infoColumn,children:[e.jsx(o,{style:t.sectionLabel,noMargin:!0,children:"Billed To"}),e.jsx(o,{variant:"sm",weight:"semibold",noMargin:!0,children:p.billTo.name}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:p.billTo.address}),e.jsxs(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:[p.billTo.email," · ",p.billTo.phone]})]}),e.jsxs(a,{style:t.infoColumn,children:[e.jsx(o,{style:t.sectionLabel,noMargin:!0,children:"Invoice Info"}),e.jsx(x,{size:"sm",items:[{key:"Issue Date",value:p.invoiceDate},{key:"Due Date",value:p.dueDate},{key:"Payment",value:p.paymentTerms.method}]})]})]})}),e.jsxs(F,{variant:"striped",zebraStripe:!0,children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Deliverable"}),e.jsx(i,{align:"center",children:"Qty"}),e.jsx(i,{align:"right",children:"Rate"}),e.jsx(i,{align:"right",children:"Amount"})]})}),e.jsx(k,{children:p.items.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.quantity}`}),e.jsx(i,{align:"right",children:`$${r.unitPrice.toLocaleString()}`}),e.jsx(i,{align:"right",children:`$${(r.quantity*r.unitPrice).toLocaleString()}`})]},s))})]}),e.jsxs(b,{noWrap:!0,style:t.summarySection,children:[e.jsxs(a,{style:t.summaryLeft,children:[e.jsx(o,{style:t.sectionLabel,noMargin:!0,children:"Notes & Terms"}),e.jsx(o,{variant:"xs",color:"mutedForeground",children:p.notes}),e.jsxs(o,{variant:"xs",color:"mutedForeground",style:{marginTop:4},children:["GST: ",p.paymentTerms.gst]})]}),e.jsx(a,{style:t.summaryRight,children:e.jsx(x,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${p.summary.subtotal.toLocaleString()}`},{key:"Tax (6.5%)",value:`$${p.summary.tax.toFixed(2)}`},{key:"Total",value:`$${p.summary.total.toFixed(2)}`,valueStyle:{fontSize:14,fontWeight:"bold",color:n.colors.accent},keyStyle:{fontSize:13,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(R,{variant:"centered",centerText:"Thank you for choosing PDFx Inc. for your creative needs!",sticky:!0,pagePadding:25})]})})}const l={invoiceNumber:"INV-2026-006",invoiceDate:"February 26, 2026",dueDate:"March 28, 2026",companyName:"PDFx Inc.",subtitle:"Professional Consulting Services",companyAddress:"Nagpur, IN · hello@pdfx.io",consultant:{name:"John Smith",title:"Senior Technical Consultant",email:"john.smith@pdfx.io"},client:{name:"Sarah Johnson",company:"Acme Technologies",address:"500 Tech Park, Suite 200",email:"sarah.johnson@acmetech.com"},services:[{description:"Architecture Review & Planning",hours:16,rate:175},{description:"Code Review & Optimization",hours:24,rate:150},{description:"Technical Documentation",hours:12,rate:125},{description:"Team Training & Knowledge Transfer",hours:8,rate:200}],summary:{totalHours:60,subtotal:9500,tax:.05*9500,total:1.05*9500},paymentTerms:{method:"Bank Transfer / Check"},projectRef:"PROJ-2026-ACME-001",notes:"Services rendered for February 2026. All hours verified and approved by client."};function on({theme:n}){return e.jsx(j,{theme:n,children:e.jsx(rn,{})})}function rn(){const n=D(),t=C.create({page:{padding:n.spacing.page.marginTop,paddingBottom:n.spacing.page.marginBottom,backgroundColor:n.colors.background},headerRow:{flexDirection:"row",justifyContent:"space-between",alignItems:"flex-start",marginBottom:n.spacing.sectionGap,paddingBottom:n.spacing.componentGap,borderBottomWidth:2,borderBottomColor:n.colors.primary,borderBottomStyle:"solid"},companyInfo:{flex:1},invoiceInfo:{alignItems:"flex-end"},partiesRow:{flexDirection:"row",gap:40,marginBottom:n.spacing.sectionGap},partyColumn:{flex:1},partyLabel:{fontSize:9,fontWeight:"bold",color:n.colors.primary,textTransform:"uppercase",letterSpacing:.6,marginBottom:6,paddingBottom:4,borderBottomWidth:1,borderBottomColor:n.colors.border,borderBottomStyle:"solid"},projectRef:{backgroundColor:n.colors.muted,paddingHorizontal:10,paddingVertical:6,borderRadius:n.primitives.borderRadius.sm,marginBottom:n.spacing.sectionGap,flexDirection:"row",alignItems:"center",gap:8},summaryRow:{flexDirection:"row",marginTop:20},hoursBox:{flex:1,paddingRight:24},hoursBadge:{backgroundColor:n.colors.primary,color:n.colors.primaryForeground,paddingHorizontal:12,paddingVertical:8,borderRadius:n.primitives.borderRadius.sm,alignSelf:"flex-start"},totalsBox:{width:250},calloutNote:{backgroundColor:n.colors.muted,borderLeftWidth:3,borderLeftColor:n.colors.info,borderLeftStyle:"solid",paddingLeft:12,paddingVertical:8,marginTop:16}});return e.jsx(S,{title:"PDFx Invoice INV-006 – Consultant",children:e.jsxs(P,{size:"A4",style:t.page,children:[e.jsxs(a,{style:t.headerRow,children:[e.jsxs(a,{style:t.companyInfo,children:[e.jsx(o,{variant:"xl",weight:"bold",noMargin:!0,children:l.companyName}),e.jsx(o,{variant:"sm",color:"mutedForeground",noMargin:!0,children:l.subtitle}),e.jsx(o,{variant:"xs",color:"mutedForeground",noMargin:!0,children:l.companyAddress})]}),e.jsxs(a,{style:t.invoiceInfo,children:[e.jsx(o,{variant:"xs",color:"mutedForeground",transform:"uppercase",noMargin:!0,children:"Invoice"}),e.jsx(o,{variant:"lg",weight:"bold",noMargin:!0,children:l.invoiceNumber}),e.jsx(o,{variant:"xs",color:"mutedForeground",noMargin:!0,children:l.invoiceDate}),e.jsxs(o,{variant:"xs",color:"mutedForeground",noMargin:!0,children:["Due: ",l.dueDate]})]})]}),e.jsxs(a,{style:t.projectRef,children:[e.jsx(o,{variant:"xs",weight:"semibold",color:"mutedForeground",noMargin:!0,children:"Project Reference:"}),e.jsx(o,{variant:"xs",weight:"bold",noMargin:!0,children:l.projectRef})]}),e.jsxs(a,{style:t.partiesRow,children:[e.jsxs(a,{style:t.partyColumn,children:[e.jsx(o,{style:t.partyLabel,noMargin:!0,children:"From (Consultant)"}),e.jsx(o,{variant:"sm",weight:"semibold",noMargin:!0,children:l.consultant.name}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:l.consultant.title}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:l.consultant.email})]}),e.jsxs(a,{style:t.partyColumn,children:[e.jsx(o,{style:t.partyLabel,noMargin:!0,children:"Bill To (Client)"}),e.jsx(o,{variant:"sm",weight:"semibold",noMargin:!0,children:l.client.name}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:l.client.company}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:l.client.address}),e.jsx(o,{variant:"xs",noMargin:!0,color:"mutedForeground",children:l.client.email})]})]}),e.jsxs(F,{variant:"line",children:[e.jsx(I,{children:e.jsxs(h,{header:!0,children:[e.jsx(i,{children:"Service Description"}),e.jsx(i,{align:"center",children:"Hours"}),e.jsx(i,{align:"right",children:"Rate ($/hr)"}),e.jsx(i,{align:"right",children:"Amount"})]})}),e.jsx(k,{children:l.services.map((r,s)=>e.jsxs(h,{children:[e.jsx(i,{children:r.description}),e.jsx(i,{align:"center",children:`${r.hours}`}),e.jsx(i,{align:"right",children:`$${r.rate}`}),e.jsx(i,{align:"right",children:`$${(r.hours*r.rate).toLocaleString()}`})]},s))})]}),e.jsxs(b,{noWrap:!0,style:t.summaryRow,children:[e.jsxs(a,{style:t.hoursBox,children:[e.jsx(a,{style:t.hoursBadge,children:e.jsxs(o,{style:{fontSize:9,fontWeight:"bold",color:n.colors.primaryForeground},noMargin:!0,children:["Total Hours: ",l.summary.totalHours]})}),e.jsxs(o,{variant:"xs",color:"mutedForeground",style:{marginTop:8},children:["Payment: ",l.paymentTerms.method]})]}),e.jsx(a,{style:t.totalsBox,children:e.jsx(x,{size:"sm",dividerThickness:1,items:[{key:"Subtotal",value:`$${l.summary.subtotal.toLocaleString()}`},{key:"Tax (5%)",value:`$${l.summary.tax.toFixed(2)}`},{key:"Amount Due",value:`$${l.summary.total.toFixed(2)}`,valueStyle:{fontSize:14,fontWeight:"bold",color:n.colors.primary},keyStyle:{fontSize:13,fontWeight:"bold"}}],divided:!0})})]}),e.jsx(a,{style:t.calloutNote,children:e.jsx(o,{variant:"xs",color:"mutedForeground",children:l.notes})}),e.jsx(R,{leftText:"Professional services invoice – Please retain for records",rightText:"Page 1 of 1",sticky:!0,pagePadding:25})]})})}const T=[Q,Y,X,Ve,Z,Le,ee].flatMap(n=>n.files.map(t=>({path:t.path,content:t.content})));function v(n,t){return n.map(r=>({path:r.path.replace(`templates/pdfx/${t}/`,""),content:r.content}))}function w(n,t){return[...n,...t]}const N=(()=>{const n=v(ue.files,"invoice-classic"),t=v(Ce.files,"invoice-modern"),r=v(ve.files,"invoice-minimal"),s=v(xe.files,"invoice-corporate"),f=v(fe.files,"invoice-creative"),V=v(ye.files,"invoice-consultant");return[{id:"invoice-classic",label:"Classic",badge:"Professional",description:"Logo-left header with three-column billing info, zebra-striped grid table.",layout:"Logo Left · Grid Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text","PdfImage"],codeFiles:n,explorerFiles:w(n,T),invoiceNumber:"INV-2026-001",Component:Ke,downloadFilename:"invoice-classic.pdf"},{id:"invoice-modern",label:"Modern",badge:"Branded",description:"Full-width branded banner, horizontal meta strip, primary-header table.",layout:"Branded Banner · Primary Header Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text"],codeFiles:t,explorerFiles:w(t,T),invoiceNumber:"INV-2026-002",Component:_e,downloadFilename:"invoice-modern.pdf"},{id:"invoice-minimal",label:"Minimal",badge:"Clean",description:"Minimal underline header, inline invoice stamp, compact table layout.",layout:"Minimal · Compact Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text"],codeFiles:r,explorerFiles:w(r,T),invoiceNumber:"INV-2026-003",Component:Qe,downloadFilename:"invoice-minimal.pdf"},{id:"invoice-corporate",label:"Corporate",badge:"Executive",description:"Logo-right header with two-column info layout, bordered table, muted summary card.",layout:"Logo Right · Bordered Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text","PdfImage"],codeFiles:s,explorerFiles:w(s,T),invoiceNumber:"INV-2026-004",Component:Ze,downloadFilename:"invoice-corporate.pdf"},{id:"invoice-creative",label:"Creative",badge:"Bold",description:"Centered header with invoice badge, accent block billing, striped table.",layout:"Centered · Striped Table",components:["PageHeader","Section","Table","KeyValue","PageFooter","Text"],codeFiles:f,explorerFiles:w(f,T),invoiceNumber:"INV-2026-005",Component:nn,downloadFilename:"invoice-creative.pdf"},{id:"invoice-consultant",label:"Consultant",badge:"Hourly",description:"Two-column header, hourly billing with hours/rate columns, line table.",layout:"Two-Column · Line Table",components:["Section","Table","KeyValue","PageFooter","Text"],codeFiles:V,explorerFiles:w(V,T),invoiceNumber:"INV-2026-006",Component:on,downloadFilename:"invoice-consultant.pdf"}]})(),E={professional:{label:"Professional",description:"Serif headings, navy palette, generous margins",swatch:$.colors.primary,accent:$.colors.accent},modern:{label:"Modern",description:"Sans-serif, vibrant purple, tight spacing",swatch:H.colors.primary,accent:H.colors.accent},minimal:{label:"Minimal",description:"Monospace, stark black, maximum whitespace",swatch:z.colors.primary,accent:z.colors.accent}},an={professional:$,modern:H,minimal:z};function ln({template:n,active:t,onClick:r}){return e.jsxs("button",{type:"button",onClick:r,className:`relative text-left rounded-lg border p-3 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${t?"border-primary bg-primary/5 shadow-sm":"border-border bg-card hover:border-primary/40 hover:shadow-sm"}`,children:[e.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[e.jsx("span",{className:`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase ${t?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`,children:n.badge}),e.jsx("span",{className:"text-[10px] font-mono text-muted-foreground/60",children:n.invoiceNumber})]}),e.jsx("h3",{className:`text-sm font-semibold mb-1 ${t?"text-primary":"text-foreground"}`,children:n.label}),e.jsx("p",{className:"text-xs text-muted-foreground leading-relaxed mb-2",children:n.description}),e.jsxs("div",{className:"flex items-center gap-1 text-[10px] text-muted-foreground/60 font-mono",children:[e.jsx(G,{className:"h-3 w-3 shrink-0"}),e.jsx("span",{className:"truncate",children:n.layout})]}),t&&e.jsx("div",{className:"absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-primary"})]})}function sn({preset:n,active:t,onClick:r}){const s=E[n];return e.jsxs("button",{type:"button",onClick:r,title:s.description,className:`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all text-xs ${t?"border-primary bg-primary/5 font-medium":"border-border bg-card hover:border-primary/40 hover:bg-muted/50"}`,children:[e.jsx("span",{className:"shrink-0 h-3 w-3 rounded-full border border-black/10 shadow-sm",style:{backgroundColor:s.swatch}}),e.jsx("span",{className:t?"text-primary":"text-foreground",children:s.label}),t&&e.jsx(oe,{className:"ml-auto h-3 w-3 text-primary"})]})}function dn(){var A;const[n,t]=M.useState("invoice-classic"),[r,s]=M.useState("professional"),[f,V]=M.useState("preview"),y=N.find(d=>d.id===n)??N[0],W=`npx @akii09/pdfx-cli block add ${y.id}`;return se("Invoice Blocks"),e.jsxs("div",{className:"py-6",children:[e.jsxs("nav",{className:"flex items-center gap-1.5 text-xs text-muted-foreground mb-4",children:[e.jsx(ne,{to:"/blocks",className:"hover:text-foreground transition-colors",children:"Blocks"}),e.jsx(O,{className:"h-3 w-3"}),e.jsx("span",{className:"text-foreground font-medium",children:"Invoices"})]}),e.jsxs("div",{className:"flex items-start justify-between gap-4 flex-wrap mb-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight text-foreground mb-1",children:"Invoice Blocks"}),e.jsxs("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["Ready-to-use PDF invoice layouts built with"," ",e.jsx("code",{className:"text-xs bg-muted px-1.5 py-0.5 rounded font-mono",children:"@pdfx/components"}),"."]})]}),e.jsxs("div",{className:"shrink-0 flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-2 border border-border text-xs font-mono text-muted-foreground",children:[e.jsx(K,{className:"h-3.5 w-3.5 text-primary shrink-0"}),e.jsx("span",{children:W}),e.jsx(te,{value:W,className:"ml-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded p-1 transition-colors",onCopy:d=>U("block_install_copied",{block:y.id,cmd:d})})]})]}),e.jsx("div",{className:"grid grid-cols-3 gap-2.5 mb-3",children:N.map(d=>e.jsx(ln,{template:d,active:n===d.id,onClick:()=>t(d.id)},d.id))}),e.jsxs("div",{className:"flex items-center justify-between gap-3 flex-wrap mb-3",children:[e.jsxs("div",{className:"flex items-center gap-1 bg-muted/60 rounded-lg p-0.5 border border-border",children:[e.jsxs("button",{type:"button",onClick:()=>V("preview"),className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${f==="preview"?"bg-background text-foreground shadow-sm border border-border":"text-muted-foreground hover:text-foreground"}`,children:[e.jsx(_,{className:"h-3.5 w-3.5"}),"Preview"]}),e.jsxs("button",{type:"button",onClick:()=>V("code"),className:`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${f==="code"?"bg-background text-foreground shadow-sm border border-border":"text-muted-foreground hover:text-foreground"}`,children:[e.jsx(de,{className:"h-3.5 w-3.5"}),"Code"]})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-medium text-muted-foreground uppercase tracking-wider mr-1",children:"Theme"}),Object.keys(E).map(d=>e.jsx(sn,{preset:d,active:r===d,onClick:()=>s(d)},d))]})]}),e.jsx("div",{className:"rounded-xl border border-border overflow-hidden shadow-sm mb-3",children:f==="preview"?e.jsx(q,{title:`${y.label} — ${y.invoiceNumber}`,downloadFilename:y.downloadFilename,height:"h-[78vh]",children:e.jsx(y.Component,{theme:an[r]})}):e.jsx(J,{files:y.explorerFiles,initialPath:(A=y.codeFiles[0])==null?void 0:A.path,className:"rounded-none border-0"})}),e.jsx(qe,{}),e.jsxs("div",{className:"flex flex-wrap gap-3 mt-3",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(G,{className:"h-3.5 w-3.5 text-primary"}),e.jsx("span",{className:"text-xs font-semibold text-foreground",children:"Components"}),e.jsxs("span",{className:"ml-auto text-[10px] font-mono text-muted-foreground",children:[y.components.length," used"]})]}),e.jsx("div",{className:"flex flex-wrap gap-1.5",children:y.components.map(d=>e.jsx("code",{className:"text-[11px] font-mono bg-muted/60 text-muted-foreground rounded px-1.5 py-0.5",children:d},d))})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card px-4 py-3 flex-1 min-w-[200px]",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(le,{className:"h-3.5 w-3.5 text-primary"}),e.jsx("span",{className:"text-xs font-semibold text-foreground",children:"Block files"}),e.jsxs("span",{className:"ml-auto text-[10px] font-mono text-muted-foreground",children:[y.codeFiles.length," files"]})]}),e.jsx("div",{className:"flex flex-col gap-1",children:y.codeFiles.map(d=>e.jsx("span",{className:"text-[11px] font-mono text-muted-foreground bg-muted/50 rounded px-2 py-0.5 truncate",children:d.path},d.path))}),e.jsxs("p",{className:"text-[10px] text-muted-foreground/60 mt-2",children:["Installs to ",e.jsxs("code",{className:"font-mono",children:["./src/blocks/pdfx/",y.id,"/"]})]})]})]})]})}function Dn(){return e.jsx(dn,{})}export{Dn as default};
