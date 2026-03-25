import { minimalTheme, modernTheme, professionalTheme } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import {
  Badge,
  DataTable,
  Divider,
  GRAPH_SAFE_WIDTHS,
  Heading,
  KeyValue,
  Link,
  PageBreak,
  PageFooter,
  PageHeader,
  PdfAlert,
  PdfCard,
  PdfForm,
  PdfGraph,
  PdfImage,
  PdfList,
  PdfPageNumber,
  PdfQRCode,
  PdfSignatureBlock,
  PdfWatermark,
  Section,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from '@pdfx/ui';
import type { GraphDataPoint, GraphSeries } from '@pdfx/ui';
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

      <Heading level={2}>PageHeader — logo-left</Heading>
      <PageHeader
        title="Acme Corporation"
        subtitle="Annual Report 2026"
        rightText="Confidential"
        rightSubText="Internal Use Only"
        variant="logo-left"
      />

      <Heading level={2}>PageHeader — logo-right</Heading>
      <PageHeader
        title="Technical Specification"
        subtitle="Platform Infrastructure Team"
        variant="logo-right"
      />

      <Heading level={2}>PageHeader — two-column</Heading>
      <PageHeader
        title="Acme Corporation"
        subtitle="Design & Engineering Services"
        address="123 Business Park, Suite 400"
        phone="+1 (555) 000-1234"
        email="hello@acme.example"
        variant="two-column"
      />

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
      <PageFooter
        leftText="Acme Corporation"
        rightText="Page 3 of 5"
        address="123 Business Park, Suite 400"
        phone="+1 (555) 000-1234"
        email="hello@acme.example"
        variant="three-column"
        marginTop={8}
      />
      <PageFooter
        leftText="Acme Corporation"
        rightText="Page 4 of 5"
        address="123 Business Park, Suite 400, San Francisco CA 94103"
        phone="+1 (555) 000-1234"
        email="hello@acme.example"
        website="www.acme.example"
        variant="detailed"
        marginTop={8}
      />
    </Page>
  );
}

// ─── Alert Showcase Page ──────────────────────────────────────────────────────

/** Renders a page showcasing all PdfAlert variants and prop combinations. */
function AlertShowcasePage({ theme }: { theme: PdfxTheme }) {
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
      <PageHeader title="Alert Component" subtitle="PDFx Component Library" variant="simple" />

      {/* ── All four semantic variants ─────────────────────────────────── */}
      <Heading level={2}>Semantic Variants</Heading>

      <PdfAlert variant="info" title="Information">
        This is an informational message. Use it to provide guidance or supplementary context.
      </PdfAlert>

      <PdfAlert variant="success" title="Success">
        The operation completed successfully. Your changes have been saved.
      </PdfAlert>

      <PdfAlert variant="warning" title="Warning">
        Proceed with caution. This action may have unintended side-effects.
      </PdfAlert>

      <PdfAlert variant="error" title="Error">
        Something went wrong. Please review the details and try again.
      </PdfAlert>

      <Divider spacing="sm" />

      {/* ── Title only ────────────────────────────────────────────────── */}
      <Heading level={2}>Title Only (no body text)</Heading>
      <PdfAlert variant="info" title="Heads up — no description needed here." />
      <PdfAlert variant="success" title="All systems operational." />

      <Divider spacing="sm" />

      {/* ── Body only ─────────────────────────────────────────────────── */}
      <Heading level={2}>Body Only (no title)</Heading>
      <PdfAlert variant="warning">
        This document contains draft content and should not be distributed externally.
      </PdfAlert>
      <PdfAlert variant="error">
        Unable to load data. The requested resource could not be found.
      </PdfAlert>

      <Divider spacing="sm" />

      {/* ── showIcon = false ──────────────────────────────────────────── */}
      <Heading level={2}>Icon Hidden (showIcon=false)</Heading>
      <PdfAlert variant="info" title="No Icon" showIcon={false}>
        The icon is hidden but the left border still indicates the variant.
      </PdfAlert>
      <PdfAlert variant="success" title="Clean Layout" showIcon={false}>
        Useful when you want a minimal design without the SVG icon.
      </PdfAlert>

      <Divider spacing="sm" />

      {/* ── showBorder = false ────────────────────────────────────────── */}
      <Heading level={2}>Border Hidden (showBorder=false)</Heading>
      <PdfAlert variant="warning" title="No Left Border" showBorder={false}>
        Both the icon and the muted background remain; only the accent border is removed.
      </PdfAlert>
      <PdfAlert variant="error" title="Borderless Error" showBorder={false}>
        Combine with showIcon=false for a fully plain alert box.
      </PdfAlert>

      <Divider spacing="sm" />

      {/* ── Both hidden ───────────────────────────────────────────────── */}
      <Heading level={2}>Icon + Border Hidden</Heading>
      <PdfAlert variant="info" title="Minimal Alert" showIcon={false} showBorder={false}>
        Only the muted background and text remain — the variant controls nothing visual here.
      </PdfAlert>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Alert Component" />
    </Page>
  );
}

// ─── Graph Showcase Page ──────────────────────────────────────────────────────

/** Renders a page showcasing all PdfGraph variants with representative data. */
function GraphShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  const monthly: GraphDataPoint[] = [
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 68 },
    { label: 'Mar', value: 55 },
    { label: 'Apr', value: 89 },
    { label: 'May', value: 73 },
    { label: 'Jun', value: 96 },
  ];

  const quarterly: GraphDataPoint[] = [
    { label: 'Q1', value: 28500 },
    { label: 'Q2', value: 34200 },
    { label: 'Q3', value: 41800 },
    { label: 'Q4', value: 38600 },
  ];

  const multiSeries: GraphSeries[] = [
    { name: 'Revenue', data: monthly },
    {
      name: 'Expenses',
      data: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 45 },
        { label: 'Mar', value: 38 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 52 },
        { label: 'Jun', value: 70 },
      ],
    },
  ];

  const pieData: GraphDataPoint[] = [
    { label: 'Design', value: 35 },
    { label: 'Development', value: 45 },
    { label: 'Testing', value: 12 },
    { label: 'Overhead', value: 8 },
  ];

  const gw = GRAPH_SAFE_WIDTHS.default;

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader title="Graph Component" subtitle="PDFx Component Library" variant="simple" />

      {/* ── Bar chart ─────────────────────────────────────────────────── */}
      <Heading level={2}>Bar Chart</Heading>
      <PdfGraph
        variant="bar"
        data={monthly}
        title="Monthly Performance"
        subtitle="Units sold Jan–Jun 2026"
        xLabel="Month"
        yLabel="Units"
        width={gw}
        height={200}
        showValues
        showGrid
        legend="bottom"
      />

      <Divider spacing="sm" />

      {/* ── Horizontal-bar chart ──────────────────────────────────────── */}
      <Heading level={2}>Horizontal Bar Chart</Heading>
      <PdfGraph
        variant="horizontal-bar"
        data={quarterly}
        title="Quarterly Revenue"
        subtitle="USD · Full Year 2026"
        width={gw}
        height={180}
        showValues
        legend="none"
      />

      <Divider spacing="sm" />

      {/* ── Line chart ────────────────────────────────────────────────── */}
      <Heading level={2}>Line Chart (smooth)</Heading>
      <PdfGraph
        variant="line"
        data={multiSeries}
        title="Revenue vs Expenses"
        subtitle="Multi-series · Jan–Jun 2026"
        width={gw}
        height={200}
        smooth
        showDots
        legend="bottom"
      />

      <Divider spacing="sm" />

      {/* ── Area chart ────────────────────────────────────────────────── */}
      <Heading level={2}>Area Chart</Heading>
      <PdfGraph
        variant="area"
        data={monthly}
        title="Monthly Trend"
        subtitle="Filled area · Jan–Jun 2026"
        width={gw}
        height={200}
        showDots={false}
        legend="none"
      />

      <Divider spacing="sm" />

      {/* ── Pie + Donut side by side ───────────────────────────────────── */}
      <Heading level={2}>Pie &amp; Donut Charts</Heading>
      <Stack direction="horizontal" gap="md">
        <View style={{ flex: 1 }}>
          <PdfGraph
            variant="pie"
            data={pieData}
            title="Project Allocation"
            width={200}
            height={200}
            legend="bottom"
          />
        </View>
        <View style={{ flex: 1 }}>
          <PdfGraph
            variant="donut"
            data={pieData}
            title="Project Allocation"
            centerLabel="100%"
            width={200}
            height={200}
            legend="bottom"
          />
        </View>
      </Stack>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Graph Component" />
    </Page>
  );
}

// ─── DataTable Showcase Page ──────────────────────────────────────────────────

/** Renders a page showcasing DataTable with all relevant prop combinations. */
function DataTableShowcasePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  type InvoiceRow = { item: string; qty: number; rate: string; total: string };

  const invoiceData: InvoiceRow[] = [
    { item: 'UI/UX Design', qty: 1, rate: '$150', total: '$1,500.00' },
    { item: 'Frontend Development', qty: 1, rate: '$200', total: '$4,000.00' },
    { item: 'Backend API', qty: 1, rate: '$200', total: '$3,200.00' },
    { item: 'QA Testing', qty: 1, rate: '$120', total: '$960.00' },
    { item: 'Project Management', qty: 1, rate: '$130', total: '$840.00' },
  ];

  const invoiceColumns = [
    { key: 'item' as const, header: 'Description' },
    { key: 'qty' as const, header: 'Qty', align: 'center' as const, width: 44 },
    { key: 'rate' as const, header: 'Rate', align: 'right' as const, width: 60 },
    { key: 'total' as const, header: 'Total', align: 'right' as const, width: 90 },
  ];

  const invoiceFooter = { item: 'Total', total: '$10,500.00' };

  type SalesRow = { region: string; q1: string; q2: string; q3: string; q4: string };

  const salesData: SalesRow[] = [
    { region: 'North America', q1: '$124k', q2: '$138k', q3: '$155k', q4: '$172k' },
    { region: 'Europe', q1: '$89k', q2: '$94k', q3: '$101k', q4: '$118k' },
    { region: 'Asia Pacific', q1: '$67k', q2: '$78k', q3: '$92k', q4: '$109k' },
    { region: 'Latin America', q1: '$34k', q2: '$39k', q3: '$44k', q4: '$51k' },
  ];

  const salesColumns = [
    { key: 'region' as const, header: 'Region' },
    { key: 'q1' as const, header: 'Q1', align: 'right' as const },
    { key: 'q2' as const, header: 'Q2', align: 'right' as const },
    { key: 'q3' as const, header: 'Q3', align: 'right' as const },
    { key: 'q4' as const, header: 'Q4', align: 'right' as const },
  ];

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader title="DataTable Component" subtitle="PDFx Component Library" variant="simple" />

      {/* ── Default (line) with footer ─────────────────────────────────── */}
      <Heading level={2}>Default variant with footer</Heading>
      <DataTable
        columns={invoiceColumns}
        data={invoiceData}
        footer={invoiceFooter}
        variant="line"
      />

      <Divider spacing="sm" />

      {/* ── Striped with zebra ────────────────────────────────────────── */}
      <Heading level={2}>Striped variant (stripe=true)</Heading>
      <DataTable columns={salesColumns} data={salesData} variant="striped" stripe />

      <Divider spacing="sm" />

      {/* ── Grid variant ─────────────────────────────────────────────── */}
      <Heading level={2}>Grid variant</Heading>
      <DataTable columns={salesColumns} data={salesData} variant="grid" />

      <Divider spacing="sm" />

      {/* ── Bordered variant ─────────────────────────────────────────── */}
      <Heading level={2}>Bordered variant</Heading>
      <DataTable columns={invoiceColumns} data={invoiceData} variant="bordered" />

      <Divider spacing="sm" />

      {/* ── Compact size ─────────────────────────────────────────────── */}
      <Heading level={2}>Compact size (size="compact")</Heading>
      <DataTable
        columns={invoiceColumns}
        data={invoiceData}
        footer={invoiceFooter}
        variant="line"
        size="compact"
        noWrap
      />

      <Divider spacing="sm" />

      {/* ── Primary-header variant ───────────────────────────────────── */}
      <Heading level={2}>Primary-Header variant</Heading>
      <DataTable columns={salesColumns} data={salesData} variant="primary-header" />

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="DataTable Component" />
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

      {/* ── Form label-left variant ────────────────────────────────────── */}
      <Heading level={2}>Fillable Form — label left · box variant</Heading>
      <PdfForm
        variant="box"
        labelPosition="left"
        groups={[
          {
            fields: [{ label: 'Full Name' }, { label: 'Email' }, { label: 'Phone' }],
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

// ─── Watermark & QRCode Showcase Page ─────────────────────────────────────────

/** Renders a page showcasing PdfWatermark positions and PdfQRCode variants. */
function WatermarkQRCodePage({ theme }: { theme: PdfxTheme }) {
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
      <PdfWatermark text="CONFIDENTIAL" position="center" opacity={0.08} />

      <PageHeader title="Watermark & QR Code" subtitle="PDFx Component Library" variant="simple" />

      {/* ── Watermark description ──────────────────────────────────────── */}
      <Heading level={2}>Watermark (center — see background)</Heading>
      <Text>
        The watermark above is positioned at center with 8% opacity. Corner positions use the active
        theme's page margins as insets, so they adapt when the theme changes.
      </Text>

      <Divider spacing="sm" />

      {/* ── QRCode variants ───────────────────────────────────────────── */}
      <Heading level={2}>QR Code — sizes and backgrounds</Heading>
      <Stack direction="horizontal" gap="lg" align="start">
        <View>
          <Text noMargin variant="xs" color="mutedForeground">
            80pt · default bg
          </Text>
          <PdfQRCode value="https://pdfx.dev" size={80} />
        </View>
        <View>
          <Text noMargin variant="xs" color="mutedForeground">
            100pt · transparent bg
          </Text>
          <PdfQRCode value="https://pdfx.dev" size={100} backgroundColor="transparent" />
        </View>
        <View>
          <Text noMargin variant="xs" color="mutedForeground">
            120pt · muted bg · with caption
          </Text>
          <PdfQRCode
            value="https://pdfx.dev"
            size={120}
            backgroundColor="muted"
            caption="pdfx.dev"
          />
        </View>
      </Stack>

      <Divider spacing="sm" />

      {/* ── QRCode error levels ───────────────────────────────────────── */}
      <Heading level={2}>QR Code — error correction levels</Heading>
      <Stack direction="horizontal" gap="lg" align="start">
        {(['L', 'M', 'Q', 'H'] as const).map((level) => (
          <View key={level}>
            <Text noMargin variant="xs" color="mutedForeground">{`Level ${level}`}</Text>
            <PdfQRCode value="https://pdfx.dev" size={80} errorLevel={level} />
          </View>
        ))}
      </Stack>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Watermark & QR Code" />
    </Page>
  );
}

// ─── Typography Showcase Page ─────────────────────────────────────────────────

/** Renders a page showcasing Heading, Text, and Link with all variants. */
function TypographyShowcasePage({ theme }: { theme: PdfxTheme }) {
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
      <PageHeader title="Typography" subtitle="PDFx Component Library" variant="simple" />

      {/* ── Heading weights ────────────────────────────────────────────── */}
      <Heading level={2}>Heading — weights</Heading>
      <Stack direction="horizontal" gap="lg">
        <Heading level={3} weight="normal" noMargin>
          Normal
        </Heading>
        <Heading level={3} weight="medium" noMargin>
          Medium
        </Heading>
        <Heading level={3} weight="semibold" noMargin>
          Semibold
        </Heading>
        <Heading level={3} weight="bold" noMargin>
          Bold
        </Heading>
      </Stack>

      <Divider spacing="sm" />

      {/* ── Heading tracking ──────────────────────────────────────────── */}
      <Heading level={2}>Heading — letter spacing (tracking)</Heading>
      <Heading level={4} tracking="tighter" noMargin>
        Tighter tracking
      </Heading>
      <Heading level={4} tracking="tight" noMargin>
        Tight tracking
      </Heading>
      <Heading level={4} tracking="normal" noMargin>
        Normal tracking
      </Heading>
      <Heading level={4} tracking="wide" noMargin>
        Wide tracking
      </Heading>
      <Heading level={4} tracking="wider" noMargin>
        Wider tracking
      </Heading>

      <Divider spacing="sm" />

      {/* ── Text variants ─────────────────────────────────────────────── */}
      <Heading level={2}>Text — size variants</Heading>
      <Text variant="xs" noMargin>
        xs — Extra small text for captions and footnotes
      </Text>
      <Text variant="sm" noMargin>
        sm — Small text for secondary content
      </Text>
      <Text variant="base" noMargin>
        base — Base body text (default)
      </Text>
      <Text variant="lg" noMargin>
        lg — Large text for emphasis
      </Text>
      <Text variant="xl" noMargin>
        xl — Extra large for lead paragraphs
      </Text>

      <Divider spacing="sm" />

      {/* ── Text decorations & styles ──────────────────────────────────── */}
      <Heading level={2}>Text — weight, italic, decoration</Heading>
      <Stack direction="horizontal" gap="md">
        <Text noMargin weight="normal">
          Normal
        </Text>
        <Text noMargin weight="medium">
          Medium
        </Text>
        <Text noMargin weight="semibold">
          Semibold
        </Text>
        <Text noMargin weight="bold">
          Bold
        </Text>
        <Text noMargin italic>
          Italic
        </Text>
        <Text noMargin decoration="underline">
          Underline
        </Text>
        <Text noMargin decoration="line-through">
          Strikethrough
        </Text>
      </Stack>

      <Divider spacing="sm" />

      {/* ── Link variants ─────────────────────────────────────────────── */}
      <Heading level={2}>Link — variants and underline</Heading>
      <Stack direction="horizontal" gap="md">
        <Link href="https://pdfx.dev" variant="default">
          default link
        </Link>
        <Link href="https://pdfx.dev" variant="primary">
          primary link
        </Link>
        <Link href="https://pdfx.dev" variant="muted">
          muted link
        </Link>
        <Link href="https://pdfx.dev" underline="none">
          no underline
        </Link>
      </Stack>

      <Divider spacing="sm" />

      {/* ── PageNumber ────────────────────────────────────────────────── */}
      <Heading level={2}>PageNumber — align and size presets</Heading>
      <Text color="mutedForeground" noMargin>
        Left aligned, xs:
      </Text>
      <PdfPageNumber align="left" size="xs" fixed={false} />
      <Text color="mutedForeground" noMargin>
        Center aligned, sm (default):
      </Text>
      <PdfPageNumber align="center" size="sm" fixed={false} />
      <Text color="mutedForeground" noMargin>
        Right aligned, md · muted color:
      </Text>
      <PdfPageNumber align="right" size="md" fixed={false} muted />
      <Text color="mutedForeground" noMargin>
        Custom format:
      </Text>
      <PdfPageNumber format="Page {page} of {total}" align="center" fixed={false} />

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Typography" />
    </Page>
  );
}

// ─── Stack · Section · Divider Showcase Page ──────────────────────────────────

/** Renders a page showcasing Stack layout, Section variants, and Divider variants. */
function StackSectionDividerPage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
    box: {
      backgroundColor: theme.colors.muted,
      borderRadius: 4,
      padding: 8,
      flex: 1,
    },
  });

  const boxItem = (label: string) => (
    <View style={s.box}>
      <Text noMargin align="center" variant="xs">
        {label}
      </Text>
    </View>
  );

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader
        title="Stack · Section · Divider"
        subtitle="PDFx Component Library"
        variant="simple"
      />

      {/* ── Stack horizontal gap ───────────────────────────────────────── */}
      <Heading level={2}>Stack — horizontal gaps</Heading>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <View key={gap} style={{ marginBottom: 6 }}>
          <Text noMargin variant="xs" color="mutedForeground">{`gap="${gap}"`}</Text>
          <Stack direction="horizontal" gap={gap}>
            {boxItem('A')}
            {boxItem('B')}
            {boxItem('C')}
          </Stack>
        </View>
      ))}

      <Divider spacing="sm" />

      {/* ── Stack alignment ────────────────────────────────────────────── */}
      <Heading level={2}>Stack — horizontal align (cross-axis)</Heading>
      <Stack direction="horizontal" gap="md">
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            align="start"
          </Text>
          <Stack direction="horizontal" gap="sm" align="start">
            <View style={[s.box, { height: 32 }]}>
              <Text noMargin variant="xs">
                tall
              </Text>
            </View>
            <View style={s.box}>
              <Text noMargin variant="xs">
                short
              </Text>
            </View>
          </Stack>
        </View>
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            align="center"
          </Text>
          <Stack direction="horizontal" gap="sm" align="center">
            <View style={[s.box, { height: 32 }]}>
              <Text noMargin variant="xs">
                tall
              </Text>
            </View>
            <View style={s.box}>
              <Text noMargin variant="xs">
                short
              </Text>
            </View>
          </Stack>
        </View>
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            align="end"
          </Text>
          <Stack direction="horizontal" gap="sm" align="end">
            <View style={[s.box, { height: 32 }]}>
              <Text noMargin variant="xs">
                tall
              </Text>
            </View>
            <View style={s.box}>
              <Text noMargin variant="xs">
                short
              </Text>
            </View>
          </Stack>
        </View>
      </Stack>

      <Divider spacing="sm" />

      {/* ── Divider variants ───────────────────────────────────────────── */}
      <Heading level={2}>Divider — line styles and thickness</Heading>
      <Text noMargin variant="xs" color="mutedForeground">
        solid / thin (default)
      </Text>
      <Divider variant="solid" thickness="thin" spacing="sm" />
      <Text noMargin variant="xs" color="mutedForeground">
        dashed / medium
      </Text>
      <Divider variant="dashed" thickness="medium" spacing="sm" />
      <Text noMargin variant="xs" color="mutedForeground">
        dotted / thick
      </Text>
      <Divider variant="dotted" thickness="thick" spacing="sm" />
      <Text noMargin variant="xs" color="mutedForeground">
        solid with label
      </Text>
      <Divider label="Section Break" spacing="sm" />
      <Text noMargin variant="xs" color="mutedForeground">
        colored (primary)
      </Text>
      <Divider color="primary" thickness="medium" spacing="sm" />

      <Divider spacing="sm" />

      {/* ── Section variants ───────────────────────────────────────────── */}
      <Heading level={2}>Section — variants</Heading>
      <Section variant="callout" spacing="sm">
        <Text noMargin>callout — left primary accent bar, no background</Text>
      </Section>
      <Section variant="highlight" spacing="sm">
        <Text noMargin>highlight — muted background + left accent bar</Text>
      </Section>
      <Section variant="card" spacing="sm">
        <Text noMargin>card — full border with padding and rounded corners</Text>
      </Section>
      <Section variant="default" border spacing="sm" padding="sm">
        <Text noMargin>default + border=true + padding="sm"</Text>
      </Section>
      <Section variant="callout" accentColor="destructive" spacing="sm">
        <Text noMargin>callout with accentColor="destructive"</Text>
      </Section>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Stack · Section · Divider" />
    </Page>
  );
}

// ─── Image & KeyValue Showcase Page ───────────────────────────────────────────

/** Renders a page showcasing PdfImage variants and KeyValue configurations. */
function ImageKeyValuePage({ theme }: { theme: PdfxTheme }) {
  const s = StyleSheet.create({
    page: {
      paddingTop: theme.spacing.page.marginTop,
      paddingRight: theme.spacing.page.marginRight,
      paddingBottom: theme.spacing.page.marginBottom,
      paddingLeft: theme.spacing.page.marginLeft,
      backgroundColor: theme.colors.background,
    },
  });

  // Stable 1×1 PNG data URI (single beige pixel) used as a safe placeholder
  const placeholderSrc =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

  return (
    <Page size={theme.page.size} style={s.page}>
      <PageHeader title="Image & KeyValue" subtitle="PDFx Component Library" variant="simple" />

      {/* ── PdfImage variants ──────────────────────────────────────────── */}
      <Heading level={2}>PdfImage — size presets</Heading>
      <Stack direction="horizontal" gap="md" align="start">
        <View>
          <Text noMargin variant="xs" color="mutedForeground">
            thumbnail (80×80)
          </Text>
          <PdfImage src={placeholderSrc} variant="thumbnail" />
        </View>
        <View>
          <Text noMargin variant="xs" color="mutedForeground">
            avatar (48×48 · circle)
          </Text>
          <PdfImage src={placeholderSrc} variant="avatar" />
        </View>
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            rounded (200pt · 8pt radius)
          </Text>
          <PdfImage src={placeholderSrc} variant="rounded" height={60} />
        </View>
      </Stack>

      <Divider spacing="sm" />

      {/* ── PdfImage with caption ─────────────────────────────────────── */}
      <Heading level={2}>PdfImage — bordered + caption</Heading>
      <PdfImage
        src={placeholderSrc}
        variant="bordered"
        height={80}
        caption="Figure 1 — Placeholder image with caption"
      />

      <Divider spacing="sm" />

      {/* ── KeyValue sizes ────────────────────────────────────────────── */}
      <Heading level={2}>KeyValue — size presets</Heading>
      <Stack direction="horizontal" gap="lg">
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            size="sm"
          </Text>
          <KeyValue
            items={[
              { key: 'Invoice', value: 'INV-001' },
              { key: 'Amount', value: '$1,200' },
            ]}
            size="sm"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            size="md" (default)
          </Text>
          <KeyValue
            items={[
              { key: 'Invoice', value: 'INV-001' },
              { key: 'Amount', value: '$1,200' },
            ]}
            size="md"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text noMargin variant="xs" color="mutedForeground">
            size="lg"
          </Text>
          <KeyValue
            items={[
              { key: 'Invoice', value: 'INV-001' },
              { key: 'Amount', value: '$1,200' },
            ]}
            size="lg"
          />
        </View>
      </Stack>

      <Divider spacing="sm" />

      {/* ── KeyValue vertical + boldValue ─────────────────────────────── */}
      <Heading level={2}>KeyValue — vertical direction + boldValue</Heading>
      <Stack direction="horizontal" gap="md">
        <KeyValue
          items={[
            { key: 'Client', value: 'Acme Corp' },
            { key: 'Contact', value: 'Jane Smith' },
          ]}
          direction="vertical"
          boldValue
          style={{ flex: 1 }}
        />
        <KeyValue
          items={[
            { key: 'Start Date', value: '01 Jan 2026' },
            { key: 'End Date', value: '31 Mar 2026' },
          ]}
          direction="vertical"
          divided
          style={{ flex: 1 }}
        />
      </Stack>

      <PageFooter leftText="© 2026 PDFx Component Library" rightText="Image & KeyValue" />
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

          {/* Component showcase — PageHeader (all 7 variants), PageFooter (all 6 variants), KeyValue, Badge */}
          <ComponentShowcasePage theme={professionalTheme} />

          {/* Alert — all 4 variants × all prop combinations */}
          <AlertShowcasePage theme={professionalTheme} />

          {/* Graph — all 6 chart variants */}
          <GraphShowcasePage theme={professionalTheme} />

          {/* DataTable — multiple variants and sizes */}
          <DataTableShowcasePage theme={professionalTheme} />

          {/* Table — all 7 variants */}
          <TableShowcasePage theme={professionalTheme} />

          {/* List — all 6 variants */}
          <ListShowcasePage theme={professionalTheme} />

          {/* Card, Form, Signature */}
          <CardFormSignaturePage theme={professionalTheme} />

          {/* Watermark & QR Code */}
          <WatermarkQRCodePage theme={professionalTheme} />

          {/* Typography — Heading, Text, Link, PageNumber */}
          <TypographyShowcasePage theme={professionalTheme} />

          {/* Stack · Section · Divider */}
          <StackSectionDividerPage theme={professionalTheme} />

          {/* Image & KeyValue */}
          <ImageKeyValuePage theme={professionalTheme} />
        </Document>
      </PDFViewer>
    </div>
  );
}
