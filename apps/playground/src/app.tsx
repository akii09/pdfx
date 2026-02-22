import { minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import {
  Badge,
  Divider,
  Heading,
  KeyValue,
  PageBreak,
  PageFooter,
  PageHeader,
  PdfCard,
  PdfForm,
  PdfList,
  PdfSignatureBlock,
  Section,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@pdfx/ui';
import { Document, Text as PDFText, PDFViewer, Page, StyleSheet, View } from '@react-pdf/renderer';

// ─── Theme Showcase Page ──────────────────────────────────────────────────────

/** Renders a theme showcase page using the given theme's tokens directly. */
function ThemeShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
    colorRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: theme.spacing.paragraphGap,
      flexWrap: 'wrap',
    },
    colorSwatch: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    colorLabel: {
      fontSize: theme.primitives.typography.xs,
      fontFamily: theme.typography.body.fontFamily,
      color: theme.colors.mutedForeground,
      marginTop: 2,
    },
    mutedText: {
      fontSize: theme.typography.body.fontSize,
      fontFamily: theme.typography.body.fontFamily,
      color: theme.colors.mutedForeground,
      lineHeight: theme.typography.body.lineHeight,
      marginBottom: theme.spacing.paragraphGap,
    },
  });

  return (
    <Page size={theme.page.size} style={s.page}>
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <PageHeader
        title={`${theme.name} Theme`}
        subtitle="PDFx Component Library"
        rightText="Preview"
        variant="simple"
      />

      {/* ── Typography Scale ─────────────────────────────────────────── */}
      <Heading level={2}>Typography Scale</Heading>
      <Heading level={1} noMargin>
        Heading Level 1
      </Heading>
      <Heading level={2} noMargin>
        Heading Level 2
      </Heading>
      <Heading level={3} noMargin>
        Heading Level 3
      </Heading>
      <Heading level={4} noMargin>
        Heading Level 4
      </Heading>
      <Heading level={5} noMargin>
        Heading Level 5
      </Heading>
      <Heading level={6} noMargin>
        Heading Level 6
      </Heading>

      <Divider spacing="sm" />

      <Text>
        Body text using the theme's body font family, size, and line height. The spacing between
        paragraphs is controlled by the paragraphGap token.
      </Text>
      <PDFText style={s.mutedText}>
        Muted text for secondary information, using mutedForeground color.
      </PDFText>

      <Divider spacing="sm" />

      {/* ── Badge Component ───────────────────────────────────────────── */}
      <Heading level={2}>Badges</Heading>
      <Stack direction="horizontal" gap="sm">
        <Badge label="Default" variant="default" />
        <Badge label="Primary" variant="primary" />
        <Badge label="Paid" variant="success" />
        <Badge label="Pending" variant="warning" />
        <Badge label="Overdue" variant="destructive" />
        <Badge label="Info" variant="info" />
        <Badge label="Outline" variant="outline" />
      </Stack>

      <Divider spacing="sm" />

      {/* ── KeyValue Component ────────────────────────────────────────── */}
      <Heading level={2}>Key-Value Display</Heading>
      <KeyValue
        items={[
          { key: 'Document', value: 'Annual Report 2026' },
          { key: 'Author', value: 'Acme Corporation' },
          { key: 'Date', value: 'February 2026' },
          { key: 'Status', value: 'Published', valueColor: 'success' },
          { key: 'Confidentiality', value: 'Internal Only', valueColor: 'warning' },
        ]}
        direction="horizontal"
        divided
      />

      <Divider spacing="sm" />

      {/* ── Color Palette ─────────────────────────────────────────────── */}
      <Heading level={2}>Color Palette</Heading>
      <View style={s.colorRow}>
        {(
          [
            'primary',
            'foreground',
            'accent',
            'muted',
            'destructive',
            'success',
            'warning',
            'info',
            'border',
          ] as const
        ).map((key) => (
          <View key={key}>
            <View style={[s.colorSwatch, { backgroundColor: theme.colors[key] }]} />
            <PDFText style={s.colorLabel}>{key}</PDFText>
          </View>
        ))}
      </View>

      <Divider spacing="sm" />

      {/* ── Section Variants ─────────────────────────────────────────── */}
      <Heading level={2}>Section Variants</Heading>
      <Section variant="callout" spacing="sm">
        <Text noMargin>Callout: Use for important notices or highlighted text.</Text>
      </Section>
      <Section variant="highlight" spacing="sm">
        <Text noMargin>Highlight: Use for tips, warnings, or secondary info.</Text>
      </Section>
      <Section variant="card" spacing="sm" padding="sm">
        <Text noMargin>Card: Use for grouped content with a border and padding.</Text>
      </Section>

      {/* ── Theme Details ─────────────────────────────────────────────── */}
      <Divider spacing="sm" />
      <Heading level={2}>Theme Details</Heading>
      <Text>{`Heading font: ${theme.typography.heading.fontFamily} | Body font: ${theme.typography.body.fontFamily}`}</Text>
      <Text>{`Page: ${theme.page.size} ${theme.page.orientation} | Top margin: ${theme.spacing.page.marginTop}pt`}</Text>
      <Text>{`Section gap: ${theme.spacing.sectionGap}pt | Paragraph gap: ${theme.spacing.paragraphGap}pt | Component gap: ${theme.spacing.componentGap}pt`}</Text>

      {/* ── Page Footer ───────────────────────────────────────────────── */}
      <PageFooter
        leftText="© 2026 PDFx Component Library"
        centerText="For evaluation purposes only"
        rightText="Page 1"
      />
    </Page>
  );
}

// ─── Component Showcase Page ──────────────────────────────────────────────────

/** Renders a dedicated page showcasing PageHeader variants and other components. */
function ComponentShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Page size={theme.page.size} style={s.page}>
      <Heading level={1}>Component Showcase</Heading>
      <Text color="mutedForeground">
        Demonstrating PageHeader, PageFooter, KeyValue, and Badge components with all variants.
      </Text>

      <Divider spacing="sm" />

      <PageBreak />
      {/* ── PageHeader Variants ───────────────────────────────────────── */}
      <Heading level={2}>PageHeader — simple</Heading>
      <PageHeader
        title="Q1 Financial Report"
        subtitle="Acme Corporation · Finance Department"
        rightText="March 2026"
        rightSubText="Confidential"
        variant="simple"
      />

      <Heading level={2}>PageHeader — centered</Heading>
      <PageHeader
        title="Certificate of Excellence"
        subtitle="Awarded to outstanding contributors"
        variant="centered"
      />

      <Heading level={2}>PageHeader — minimal</Heading>
      <PageHeader
        title="Project Scope Document"
        subtitle="Engineering Team"
        rightText="v2.1.0"
        variant="minimal"
      />

      <Heading level={2}>PageHeader — branded</Heading>
      <PageHeader title="INVOICE" subtitle="INV-2026-0042" variant="branded" />

      <Divider spacing="sm" />

      {/* ── Badge Sizes ───────────────────────────────────────────────── */}
      <Heading level={2}>Badge Sizes</Heading>
      <Stack direction="horizontal" gap="sm">
        <Badge label="Small" size="sm" variant="primary" />
        <Badge label="Medium" size="md" variant="primary" />
        <Badge label="Large" size="lg" variant="primary" />
      </Stack>
      <Stack direction="horizontal" gap="sm">
        <Badge label="Paid" size="md" variant="success" />
        <Badge label="Pending" size="md" variant="warning" />
        <Badge label="Overdue" size="md" variant="destructive" />
        <Badge label="Draft" size="md" variant="default" />
        <Badge label="Review" size="md" variant="info" />
        <Badge label="New" size="md" variant="outline" />
      </Stack>

      <Divider spacing="sm" />

      {/* ── KeyValue Layouts ──────────────────────────────────────────── */}
      <Heading level={2}>KeyValue — horizontal (divided)</Heading>
      <KeyValue
        items={[
          { key: 'Invoice #', value: 'INV-2026-0042' },
          { key: 'Issue Date', value: '15 February 2026' },
          { key: 'Due Date', value: '15 March 2026' },
          { key: 'Total Amount', value: '$12,500.00', valueColor: 'accent' },
          { key: 'Status', value: 'Paid', valueColor: 'success' },
        ]}
        direction="horizontal"
        divided
        boldValue
      />

      <Heading level={2}>KeyValue — vertical</Heading>
      <Stack direction="horizontal" gap="md">
        <KeyValue
          items={[
            { key: 'Client', value: 'Jane Smith' },
            { key: 'Project', value: 'Website Redesign' },
          ]}
          direction="vertical"
          style={{ flex: 1 }}
        />
        <KeyValue
          items={[
            { key: 'Start Date', value: 'Jan 1, 2026' },
            { key: 'End Date', value: 'Mar 31, 2026' },
          ]}
          direction="vertical"
          style={{ flex: 1 }}
        />
      </Stack>

      {/* ── PageFooter Variants ───────────────────────────────────────── */}
      <Divider spacing="sm" />
      <Heading level={2}>PageFooter Variants</Heading>

      <PageFooter
        leftText="simple: © 2026 Acme Corp. All rights reserved."
        rightText="Page 2 of 5"
        variant="simple"
        marginTop={8}
      />
      <PageFooter
        leftText="centered: Confidential — Not for external distribution"
        variant="centered"
        marginTop={8}
      />
      <PageFooter
        leftText="branded: PDFx Component Library"
        rightText="v1.0.0"
        variant="branded"
        marginTop={8}
      />
      <PageFooter
        leftText="minimal: Acme Corp."
        centerText="CONFIDENTIAL"
        rightText="Page 2"
        variant="minimal"
        marginTop={8}
      />
    </Page>
  );
}

// ─── Table Variants Showcase Page ─────────────────────────────────────────────

/** Renders a page showcasing all 7 table variants. */
function TableShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  const tableRows = (
    <>
      <TableHeader>
        <TableRow header>
          <TableCell>Item</TableCell>
          <TableCell align="center">Qty</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Total</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Design</TableCell>
          <TableCell align="center">1</TableCell>
          <TableCell align="right">$150</TableCell>
          <TableCell align="right">$150</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Development</TableCell>
          <TableCell align="center">1</TableCell>
          <TableCell align="right">$2,500</TableCell>
          <TableCell align="right">$2,500</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Testing</TableCell>
          <TableCell align="center">1</TableCell>
          <TableCell align="right">$800</TableCell>
          <TableCell align="right">$800</TableCell>
        </TableRow>
      </TableBody>
    </>
  );

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader title="Table Variants" subtitle="PDFx Component Library" variant="simple" />

      <Heading level={2}>Line (default)</Heading>
      <Table variant="line">{tableRows}</Table>

      <Heading level={2}>Grid</Heading>
      <Table variant="grid">{tableRows}</Table>

      <Heading level={2}>Minimal</Heading>
      <Table variant="minimal">{tableRows}</Table>

      <Heading level={2}>Striped</Heading>
      <Table variant="striped" zebraStripe>
        {tableRows}
      </Table>

      <Heading level={2}>Compact</Heading>
      <Table variant="compact">{tableRows}</Table>

      <Heading level={2}>Bordered</Heading>
      <Table variant="bordered">{tableRows}</Table>

      <Heading level={2}>Primary-Header</Heading>
      <Table variant="primary-header">{tableRows}</Table>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Table Variants" />
    </Page>
  );
}

// ─── List Variants Showcase Page ──────────────────────────────────────────────

/** Renders a page showcasing all 6 PdfList variants. */
function ListShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  const simpleItems = [
    { text: 'First item in the list' },
    { text: 'Second item in the list' },
    { text: 'Third item in the list' },
  ];

  const checkItems = [
    { text: 'Design system alignment', checked: true },
    { text: 'Component implementation', checked: true },
    { text: 'Write unit tests', checked: true },
    { text: 'Update documentation', checked: false },
  ];

  const nestedItems = [
    {
      text: 'Frontend',
      children: [{ text: 'React components' }, { text: 'PDF renderer' }],
    },
    {
      text: 'Backend',
      children: [{ text: 'REST API' }, { text: 'Database' }],
    },
  ];

  const descriptiveItems = [
    { text: 'PdfList', description: 'Bullet, numbered, checklist, icon, multi-level, descriptive' },
    { text: 'PdfCard', description: 'Default, bordered, and muted variants with padding control' },
    { text: 'PdfForm', description: 'Fillable form with underline, box, outlined, ghost variants' },
    { text: 'PdfSignatureBlock', description: 'Single, double, and inline signature variants' },
  ];

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader title="List Variants" subtitle="PDFx Component Library" variant="simple" />

      <Stack direction="horizontal" gap="md">
        <View style={{ flex: 1 }}>
          <Heading level={2}>Bullet</Heading>
          <PdfList items={simpleItems} variant="bullet" />

          <Heading level={2}>Numbered</Heading>
          <PdfList items={simpleItems} variant="numbered" />

          <Heading level={2}>Checklist</Heading>
          <PdfList items={checkItems} variant="checklist" />
        </View>
        <View style={{ flex: 1 }}>
          <Heading level={2}>Icon</Heading>
          <PdfList items={simpleItems} variant="icon" />

          <Heading level={2}>Multi-Level</Heading>
          <PdfList items={nestedItems} variant="multi-level" />
        </View>
      </Stack>

      <Heading level={2}>Descriptive</Heading>
      <PdfList items={descriptiveItems} variant="descriptive" />

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="List Variants" />
    </Page>
  );
}

// ─── Card & Form & Signature Showcase Page ────────────────────────────────────

/** Renders a page showcasing PdfCard, PdfForm, and PdfSignatureBlock. */
function CardFormSignaturePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader
        title="Card · Form · Signature"
        subtitle="PDFx Component Library"
        variant="simple"
      />

      {/* ── Card Variants ─────────────────────────────────────────────── */}
      <Heading level={2}>Card Variants</Heading>
      <Stack direction="horizontal" gap="md">
        <PdfCard title="Default Card" variant="default" style={{ flex: 1 }}>
          <Text noMargin>Standard card with 1px border.</Text>
        </PdfCard>
        <PdfCard title="Bordered Card" variant="bordered" style={{ flex: 1 }}>
          <Text noMargin>Emphasized 2px border.</Text>
        </PdfCard>
        <PdfCard title="Muted Card" variant="muted" style={{ flex: 1 }}>
          <Text noMargin>Muted background fill.</Text>
        </PdfCard>
      </Stack>

      <Divider spacing="sm" />

      {/* ── Fillable Form ─────────────────────────────────────────────── */}
      <Heading level={2}>Fillable Form (underline variant)</Heading>
      <PdfForm
        title="Service Request"
        subtitle="Please fill in all fields clearly in block capitals."
        variant="underline"
        groups={[
          {
            title: 'Client Details',
            fields: [
              { label: 'Full Name', hint: 'First and last name' },
              { label: 'Company' },
              { label: 'Email Address' },
            ],
          },
          {
            title: 'Project Details',
            layout: 'two-column',
            fields: [
              { label: 'Project Name' },
              { label: 'Budget' },
              { label: 'Start Date', hint: 'DD/MM/YYYY' },
              { label: 'End Date', hint: 'DD/MM/YYYY' },
            ],
          },
          {
            title: 'Notes',
            fields: [{ label: 'Additional Notes', height: 48 }],
          },
        ]}
      />

      <Divider spacing="sm" />

      {/* ── Signature Block Variants ──────────────────────────────────── */}
      <Heading level={2}>Signature — Single</Heading>
      <PdfSignatureBlock
        variant="single"
        label="Authorized By"
        name="John Doe"
        title="CEO, Acme Corp"
        date="15 February 2026"
      />

      <Heading level={2}>Signature — Double</Heading>
      <PdfSignatureBlock
        variant="double"
        signers={[
          { label: 'Authorized By', name: 'John Doe', title: 'CEO' },
          { label: 'Approved By', name: 'Jane Smith', title: 'CFO' },
        ]}
      />

      <Heading level={2}>Signature — Inline</Heading>
      <PdfSignatureBlock
        variant="inline"
        label="Signed by"
        name="John Doe"
        date="15 February 2026"
      />

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Card · Form · Signature" />
    </Page>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
        <Document>
          {/* Theme showcase — one page per preset */}
          <ThemeShowcasePage theme={professionalTheme} />
          <ThemeShowcasePage theme={modernTheme} />
          <ThemeShowcasePage theme={minimalTheme} />

          {/* Component showcase — PageHeader, PageFooter, KeyValue, Badge */}
          <ComponentShowcasePage theme={professionalTheme} />

          {/* Table — all 7 variants */}
          <TableShowcasePage theme={professionalTheme} />

          {/* List — all 6 variants */}
          <ListShowcasePage theme={professionalTheme} />

          {/* Card, Form, Signature */}
          <CardFormSignaturePage theme={professionalTheme} />
        </Document>
      </PDFViewer>
    </div>
  );
}
