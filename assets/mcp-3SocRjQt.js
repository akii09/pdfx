import{j as e}from"./vendor-react-pdf-D5yotT0u.js";import{r as s,m as T}from"./vendor-router-CswRncel.js";import{C as p}from"./code-block-DgotPMTm.js";import{c as f,l as u,S as h,C as x,k as j,g as b}from"./index-qneBZpLb.js";import{C as c}from"./check-CBXfw9Qd.js";import{u as C}from"./use-document-title-OpN4jE9d.js";import{T as P}from"./terminal-D8TC-TBa.js";import"./copy-button-DIlTeL3V.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],D=f("chevron-up",N);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]],I=f("file-code",S);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],v=f("info",A),m=[{name:"list_components",desc:"Lists all 24 PDF components with metadata"},{name:"get_component",desc:"Returns full source code + deps for a component"},{name:"list_blocks",desc:"Lists all 10 pre-built document blocks"},{name:"get_block",desc:"Returns the complete source code for a block"},{name:"search_registry",desc:"Fuzzy search by name, type, or description"},{name:"get_theme",desc:"Returns all design tokens for a theme"},{name:"get_installation",desc:"Framework-specific step-by-step setup guide"},{name:"get_add_command",desc:"Returns the correct CLI add command for items"},{name:"get_audit_checklist",desc:"Post-setup verification checklist"}],F=[{id:"mcp-overview",title:"Overview",level:2},{id:"mcp-setup",title:"Setup",level:2},{id:"mcp-manual",title:"Manual Config",level:2},{id:"mcp-tools",title:"Tools",level:2}],R=[{id:"skills-overview",title:"Overview",level:2},{id:"skills-setup",title:"Setup",level:2},{id:"skills-file",title:"Skills File",level:2},{id:"skills-with-mcp",title:"Use With MCP",level:2}],g=`# PDFx — AI Context Guide
# Version: 1.1 | Updated: 2026 | License: MIT
# Or run: npx pdfx-cli@latest skills init  (handles editor-specific paths & frontmatter)

## What is PDFx?

PDFx is an open-source, shadcn/ui-style PDF component library for React. It is built on
@react-pdf/renderer and provides 24 type-safe components, 10 pre-built document blocks,
3 themes, and a CLI. Components are copied into your project (not installed as npm imports
that expose a public API).

Key facts:
- Package: pdfx-cli (the CLI that installs components)
- Registry: https://pdfx.akashpise.dev/r/
- Runtime: Works in browser AND Node.js (Next.js App Router, Express, etc.)
- React version: 16.8+ (hooks required)
- Peer dep: @react-pdf/renderer ^3.x

---

## Installation (one-time project setup)

\\\`\\\`\\\`bash
# 1. Initialize PDFx — creates src/lib/pdfx-theme.ts and installs @pdfx/shared
npx pdfx-cli@latest init

# 2. Add components you need
npx pdfx-cli@latest add heading text table

# 3. Add a pre-built block
npx pdfx-cli@latest block add invoice-modern
\\\`\\\`\\\`

The init command adds a theme file at src/lib/pdfx-theme.ts. All components read from this file.

---

## How components work

PDFx components are React components that render @react-pdf/renderer primitives (View, Text,
Page, Document, etc.). They CANNOT render HTML or DOM elements — they only work inside a
<Document> from @react-pdf/renderer.

Usage pattern:
\\\`\\\`\\\`tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { Text } from '@/components/pdfx/text/pdfx-text';
import { Table } from '@/components/pdfx/table/pdfx-table';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Invoice #001</Heading>
        <Text>Thank you for your business.</Text>
        <Table variant="grid" zebraStripe>
          <TableHeader>
            <TableRow><TableCell header>Item</TableCell><TableCell header>Price</TableCell></TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Design</TableCell><TableCell>$4,800</TableCell></TableRow>
          </TableBody>
        </Table>
      </Page>
    </Document>
  );
}
\\\`\\\`\\\`

Rendering to PDF:
\\\`\\\`\\\`tsx
// Browser: live preview
import { PDFViewer } from '@react-pdf/renderer';
<PDFViewer><MyDocument /></PDFViewer>

// Browser: download button
import { PDFDownloadLink } from '@react-pdf/renderer';
<PDFDownloadLink document={<MyDocument />} fileName="output.pdf">Download</PDFDownloadLink>

// Server (Next.js App Router):
import { renderToBuffer } from '@react-pdf/renderer';
export async function GET() {
  const buf = await renderToBuffer(<MyDocument />);
  return new Response(buf, { headers: { 'Content-Type': 'application/pdf' } });
}
\\\`\\\`\\\`

---

## All 24 Components — Props Reference

CRITICAL: These are the EXACT props. Do not invent additional props.

### Heading
\\\`\\\`\\\`tsx
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
<Heading
  level={1}           // 1 | 2 | 3 | 4 | 5 | 6 — default: 1
  align="left"        // 'left' | 'center' | 'right'
  weight="bold"       // 'normal' | 'medium' | 'semibold' | 'bold' — default: 'bold'
  tracking="normal"   // 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' — default: 'normal'
  color="#000"        // string — default: theme foreground. Supports theme color keys.
  transform="uppercase" // 'uppercase' | 'lowercase' | 'capitalize'
  noMargin            // boolean — removes top/bottom margin
  keepWithNext        // boolean — default: true, prevents orphaned heading
  style={...}         // Style override
>
  My Heading
</Heading>
\\\`\\\`\\\`

### Text
\\\`\\\`\\\`tsx
import { Text } from '@/components/pdfx/text/pdfx-text';
<Text
  variant="base"      // 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' — default: 'base'
  weight="normal"     // 'normal' | 'medium' | 'semibold' | 'bold' — default: 'normal'
  color="#000"        // string — supports theme color keys
  align="left"        // 'left' | 'center' | 'right' | 'justify'
  italic              // boolean
  decoration="none"   // 'underline' | 'line-through' | 'none'
  transform="uppercase" // 'uppercase' | 'lowercase' | 'capitalize'
  noMargin            // boolean — removes bottom margin
  style={...}         // Style override
>
  Paragraph text here.
</Text>
\\\`\\\`\\\`

### Link
\\\`\\\`\\\`tsx
import { Link } from '@/components/pdfx/link/pdfx-link';
<Link
  href="https://example.com"  // string — required
  variant="default"           // 'default' | 'muted' | 'primary' — default: 'default'
  underline="always"          // 'always' | 'none' — default: 'always'
  align="left"                // 'left' | 'center' | 'right'
  color="#0000ff"             // string — overrides variant color
  style={...}                 // Style override
>
  Click here
</Link>
\\\`\\\`\\\`

### Divider
\\\`\\\`\\\`tsx
import { Divider } from '@/components/pdfx/divider/pdfx-divider';
<Divider
  spacing="md"        // 'none' | 'sm' | 'md' | 'lg' — default: 'md'
  variant="solid"     // 'solid' | 'dashed' | 'dotted' — default: 'solid'
  thickness="thin"    // 'thin' | 'medium' | 'thick' — default: 'thin'
  color="#e4e4e7"     // string — default: theme border color
  label="or"          // string — text centered in divider line
  width="80%"         // string | number — constrain width
/>
\\\`\\\`\\\`

### PageBreak
\\\`\\\`\\\`tsx
import { PageBreak } from '@/components/pdfx/page-break/pdfx-page-break';
<PageBreak /> // No props. Forces a new page.
\\\`\\\`\\\`

### Stack
\\\`\\\`\\\`tsx
import { Stack } from '@/components/pdfx/stack/pdfx-stack';
<Stack
  direction="vertical"  // 'vertical' | 'horizontal' — default: 'vertical'
  gap="md"              // 'none' | 'sm' | 'md' | 'lg' | 'xl' — default: 'md'
  align="start"         // 'start' | 'center' | 'end' | 'stretch'
  justify="start"       // 'start' | 'center' | 'end' | 'between' | 'around'
  wrap                  // boolean — flex-wrap
  noWrap                // boolean — prevent page split
>
  {children}
</Stack>
\\\`\\\`\\\`

### Section
\\\`\\\`\\\`tsx
import { Section } from '@/components/pdfx/section/pdfx-section';
<Section
  spacing="md"         // 'none' | 'sm' | 'md' | 'lg' | 'xl' — default: 'md'
  padding="md"         // 'none' | 'sm' | 'md' | 'lg' — optional
  variant="default"    // 'default' | 'callout' | 'highlight' | 'card'
  border               // boolean — adds border (default variant only)
  background="#f9f9f9" // string — background color
  accentColor="#2563eb" // string — left border color for callout/highlight
  noWrap               // boolean — prevent page split
  style={...}          // Style override
>
  {children}
</Section>
\\\`\\\`\\\`

### Table (composable API)
\\\`\\\`\\\`tsx
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableCell } from '@/components/pdfx/table/pdfx-table';
<Table
  variant="line"       // 'line' | 'grid' | 'minimal' | 'striped' | 'compact' | 'bordered' | 'primary-header'
  zebraStripe          // boolean — alternating row background
  noWrap               // boolean — prevent page split
>
  <TableHeader>
    <TableRow>
      <TableCell header>Column A</TableCell>
      <TableCell header>Column B</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>R1C1</TableCell>
      <TableCell align="right" width={80}>R1C2</TableCell>
    </TableRow>
  </TableBody>
</Table>
\\\`\\\`\\\`

### DataTable (declarative API)
\\\`\\\`\\\`tsx
import { DataTable } from '@/components/pdfx/data-table/pdfx-data-table';
<DataTable
  columns={[
    { key: 'name', header: 'Name', width: 2 },
    { key: 'amount', header: 'Amount', width: 1, align: 'right' },
  ]}
  data={[{ name: 'Item A', amount: '$100' }]}
  variant="grid"       // 'line' | 'grid' | 'minimal' | 'striped' | 'compact' | 'bordered' | 'primary-header'
  stripe               // boolean — alternating row background
  size="default"       // 'default' | 'compact'
  footer={{ amount: '$100' }}  // partial record for footer row
  noWrap               // boolean — prevent page split
/>
\\\`\\\`\\\`
DataTable render prop: \\\`render\\\` and \\\`renderFooter\\\` must return @react-pdf/renderer elements
(Text, View, Image) — NOT HTML elements. TypeScript accepts ReactNode but DOM elements crash.

### PdfList
\\\`\\\`\\\`tsx
import { PdfList } from '@/components/pdfx/list/pdfx-list';
<PdfList
  items={[
    { text: 'First item' },
    { text: 'Second item', description: 'Details here' },
    { text: 'Checked item', checked: true },
    { text: 'Parent', children: [{ text: 'Nested' }] },
  ]}
  variant="bullet"     // 'bullet' | 'numbered' | 'checklist' | 'icon' | 'multi-level' | 'descriptive'
  gap="sm"             // 'xs' | 'sm' | 'md' — default: 'sm'
  noWrap               // boolean — prevent page split
/>
\\\`\\\`\\\`

### PdfCard
\\\`\\\`\\\`tsx
import { PdfCard } from '@/components/pdfx/card/pdfx-card';
<PdfCard
  title="Card Title"   // string — rendered with border-bottom
  variant="default"    // 'default' | 'bordered' | 'muted'
  padding="md"         // 'sm' | 'md' | 'lg' — default: 'md'
  wrap={false}         // boolean — default: false (prevents page split)
  style={...}          // Style override
>
  {children}
</PdfCard>
\\\`\\\`\\\`

### PdfForm (read-only fillable form for PDFs)
\\\`\\\`\\\`tsx
import { PdfForm } from '@/components/pdfx/form/pdfx-form';
<PdfForm
  title="Application Form"
  subtitle="Please fill in all fields"
  groups={[
    {
      title: 'Personal Information',
      layout: 'two-column',     // 'single' | 'two-column' | 'three-column'
      fields: [
        { label: 'Full Name', hint: 'As on ID', height: 24 },
        { label: 'Email' },
      ],
    },
    {
      title: 'Notes',
      fields: [{ label: 'Additional Info', height: 60 }],
    },
  ]}
  variant="underline"           // 'underline' | 'box' | 'outlined' | 'ghost'
  labelPosition="above"         // 'above' | 'left' — default: 'above'
  noWrap                        // boolean
/>
\\\`\\\`\\\`

### PdfSignatureBlock
\\\`\\\`\\\`tsx
import { PdfSignatureBlock } from '@/components/pdfx/signature/pdfx-signature';
// Single signature
<PdfSignatureBlock
  variant="single"       // 'single' | 'double' | 'inline' — default: 'single'
  label="Signature"      // string — label above line
  name="Sarah Chen"      // string — printed name below line
  title="Engineering Lead" // string — title/role below name
  date="2024-12-12"      // string — formatted date
/>
// Double signature
<PdfSignatureBlock
  variant="double"
  signers={[
    { label: 'Authorized by', name: 'John', title: 'CEO', date: '2024-12-12' },
    { label: 'Approved by', name: 'Jane', title: 'CFO', date: '2024-12-12' },
  ]}
/>
\\\`\\\`\\\`

### PageHeader
\\\`\\\`\\\`tsx
import { PageHeader } from '@/components/pdfx/page-header/pdfx-page-header';
<PageHeader
  title="Document Title"         // string — required
  subtitle="Subtitle"            // string
  rightText="INV-001"            // string — right-aligned text
  rightSubText="Due: Jan 31"     // string — right sub-text
  variant="simple"               // 'simple' | 'centered' | 'minimal' | 'branded' | 'logo-left' | 'logo-right' | 'two-column'
  logo={<PdfImage src="..." />}  // ReactNode — for logo-left/logo-right
  background="#18181b"            // string — background color (branded)
  titleColor="#fff"               // string — title text color
  address="123 Main St"          // string — for two-column variant
  phone="+1-555-0100"            // string
  email="hello@acme.com"         // string
  fixed                          // boolean — repeat on every page
/>
\\\`\\\`\\\`

### PageFooter
\\\`\\\`\\\`tsx
import { PageFooter } from '@/components/pdfx/page-footer/pdfx-page-footer';
<PageFooter
  leftText="© 2024 Acme Corp"   // string
  centerText="Confidential"      // string
  rightText="Page 1 of 1"        // string
  variant="simple"               // 'simple' | 'centered' | 'branded' | 'minimal' | 'three-column' | 'detailed'
  background="#18181b"            // string
  textColor="#fff"                // string
  address="123 Main St"          // string — for three-column/detailed
  phone="+1-555-0100"            // string
  email="hello@acme.com"         // string
  website="https://acme.com"     // string
  fixed                          // boolean — repeat on every page
  sticky                         // boolean — absolute position at page bottom
  pagePadding={40}               // number — offset for sticky positioning
/>
\\\`\\\`\\\`

### Badge
\\\`\\\`\\\`tsx
import { Badge } from '@/components/pdfx/badge/pdfx-badge';
// Use label prop OR children (string only — not a React node)
<Badge
  label="PAID"       // string — preferred API
  variant="success"  // 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'outline'
  size="md"          // 'sm' | 'md' | 'lg'
  background="#000"  // string — override background
  color="#fff"       // string — override text color
/>
// OR
<Badge variant="success">PAID</Badge>
\\\`\\\`\\\`

### KeyValue
\\\`\\\`\\\`tsx
import { KeyValue } from '@/components/pdfx/key-value/pdfx-key-value';
<KeyValue
  items={[
    { key: 'Invoice #', value: 'INV-001' },
    { key: 'Due Date', value: 'Jan 31, 2025', valueColor: 'destructive' },
  ]}
  direction="horizontal"  // 'horizontal' | 'vertical' — default: 'horizontal'
  divided                  // boolean — dividers between rows
  size="md"                // 'sm' | 'md' | 'lg' — default: 'md'
  labelFlex={1}            // number — flex ratio for label column
  labelColor="#666"        // string
  valueColor="#000"        // string
  boldValue                // boolean — bold all values
  noWrap                   // boolean
/>
\\\`\\\`\\\`

### KeepTogether
\\\`\\\`\\\`tsx
import { KeepTogether } from '@/components/pdfx/keep-together/pdfx-keep-together';
// Prevents page breaks inside its children
<KeepTogether>
  <Heading level={3}>Section that must not split</Heading>
  <Table variant="grid">...</Table>
</KeepTogether>
\\\`\\\`\\\`

### PdfImage
\\\`\\\`\\\`tsx
import { PdfImage } from '@/components/pdfx/pdf-image/pdfx-pdf-image';
<PdfImage
  src="https://example.com/image.png"  // string | { uri, method?, headers?, body? } — required
  variant="default"     // 'default' | 'full-width' | 'thumbnail' | 'avatar' | 'cover' | 'bordered' | 'rounded'
  width={200}           // number | string in pt
  height={150}          // number | string — auto from aspect ratio if omitted
  fit="contain"         // 'cover' | 'contain' | 'fill' | 'none' — default varies by variant
  position="50% 50%"   // string — object-position
  caption="Figure 1"   // string — centered below image
  aspectRatio={16/9}    // number — compute height from width
  borderRadius={4}      // number
  noWrap                // boolean — default: true
/>
\\\`\\\`\\\`

### PdfGraph
\\\`\\\`\\\`tsx
import { PdfGraph } from '@/components/pdfx/graph/pdfx-graph';
<PdfGraph
  variant="bar"         // 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut'
  data={[
    { label: 'Q1', value: 4200 },
    { label: 'Q2', value: 6100 },
  ]}
  title="Revenue"       // string
  subtitle="FY2024"     // string
  xLabel="Quarter"      // string — x-axis label
  yLabel="Revenue ($)"  // string — y-axis label
  width={420}           // number — default: 420 (or auto with fullWidth)
  height={260}          // number — default: 260
  fullWidth             // boolean — auto-calculates width from page margins
  containerPadding={12} // number — for fullWidth: outer container padding
  wrapperPadding={12}   // number — for fullWidth: wrapper padding
  colors={['#18181b', '#71717a']}  // string[] — color palette
  showValues            // boolean — show numeric labels on bars/points
  showGrid              // boolean — default: true
  legend="bottom"       // 'bottom' | 'right' | 'none' — default: 'bottom'
  centerLabel="$1.2M"  // string — for donut: text in center hole
  showDots              // boolean — default: true (line/area only)
  smooth                // boolean — bezier curves (line/area only)
  yTicks={5}            // number — Y-axis tick count
  noWrap                // boolean — default: true
/>
\\\`\\\`\\\`
Multi-series data: \\\`data={[{ name: 'Series A', data: [...] }, { name: 'Series B', data: [...] }]}\\\`
Graph width utilities: \\\`getGraphWidth(theme, opts?)\\\`, \\\`GRAPH_SAFE_WIDTHS\\\`, \\\`A4_WIDTH\\\` are exported.

### PdfPageNumber
\\\`\\\`\\\`tsx
import { PdfPageNumber } from '@/components/pdfx/page-number/pdfx-page-number';
<PdfPageNumber
  format="Page {page} of {total}"  // string — use {page} and {total} placeholders
  align="center"       // 'left' | 'center' | 'right' — default: 'center'
  size="sm"            // 'xs' | 'sm' | 'md' — default: 'sm'
  fixed                // boolean — repeats on every page
  muted                // boolean — default: true, uses mutedForeground color
/>
\\\`\\\`\\\`

### PdfWatermark
\\\`\\\`\\\`tsx
import { PdfWatermark } from '@/components/pdfx/watermark/pdfx-watermark';
<PdfWatermark
  text="CONFIDENTIAL"   // string — required
  opacity={0.15}        // number 0–1 — default: 0.15
  fontSize={60}         // number — default: 60
  color="mutedForeground" // string — default: 'mutedForeground' (theme key or hex)
  angle={-45}           // number in degrees — default: -45
  position="center"     // 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  fixed                 // boolean — default: true (repeats on every page)
/>
\\\`\\\`\\\`

### PdfQRCode
\\\`\\\`\\\`tsx
import { PdfQRCode } from '@/components/pdfx/qrcode/pdfx-qrcode';
<PdfQRCode
  value="https://example.com"  // string — required
  size={100}                    // number — default: 100
  color="#000000"               // string — default: '#000000'
  backgroundColor="#ffffff"     // string — default: '#ffffff'
  errorLevel="M"               // 'L' | 'M' | 'Q' | 'H' — default: 'M'
  margin={2}                    // number — quiet zone modules — default: 2
  caption="Scan me"             // string — text below QR code
/>
\\\`\\\`\\\`

### PdfAlert
\\\`\\\`\\\`tsx
import { PdfAlert } from '@/components/pdfx/alert/pdfx-alert';
<PdfAlert
  variant="info"       // 'info' | 'success' | 'warning' | 'error' — default: 'info'
  title="Note"         // string — optional bold title
  showIcon             // boolean — default: true
  showBorder           // boolean — default: true (left border)
>
  This is an informational note.
</PdfAlert>
\\\`\\\`\\\`

---

## Pre-built Blocks

Blocks are complete document templates. Add them with:
\\\`\\\`\\\`bash
npx pdfx-cli@latest block add <block-name>
\\\`\\\`\\\`

### Invoice Blocks
- invoice-classic — Professional with logo-left header and zebra-striped grid table
- invoice-minimal — Clean stripped-down, typography-focused layout
- invoice-modern — Full-width banner header, horizontal meta strip
- invoice-corporate — Formal layout with purchase order fields and signatures
- invoice-creative — Accent colors, bold layout
- invoice-consultant — Hourly rate breakdown, project summary

### Report Blocks
- report-financial — KPI cards, trend chart, delivery table
- report-marketing — Channel performance, acquisition trendline
- report-operations — SLA health, throughput trends, risk tracking
- report-security — Vulnerability trend tracking, remediation table

Blocks are added as full React components in your project. Customize all content props.

---

## Theming

### The theme file

After \\\`npx pdfx-cli@latest init\\\`, a file is created at src/lib/pdfx-theme.ts.
Every PDFx component reads from this file — change a token once, all components update.

\\\`\\\`\\\`typescript
export const theme: PdfxTheme = {
  name: 'my-brand',
  colors: {
    primary: '#2563eb',
    accent: '#7c3aed',
    foreground: '#1a1a1a',
    background: '#ffffff',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    primaryForeground: '#ffffff',
    border: '#e4e4e7',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    info: '#0ea5e9',
  },
  typography: {
    heading: { fontFamily: 'Helvetica-Bold', fontWeight: 700, lineHeight: 1.2,
      fontSize: { h1: 36, h2: 28, h3: 22, h4: 18, h5: 15, h6: 12 } },
    body: { fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.5 },
  },
  // primitives, spacing, page — all required (scaffolded by init)
};
\\\`\\\`\\\`

### Theme presets
\\\`\\\`\\\`bash
npx pdfx-cli@latest theme init              # scaffold blank theme
npx pdfx-cli@latest theme switch modern     # switch preset: professional | modern | minimal
npx pdfx-cli@latest theme validate          # validate your theme file
\\\`\\\`\\\`

---

## Component Naming Convention

PDFx uses a \\\`Pdf\\\` prefix when the component name collides with an existing widely-used React
or @react-pdf/renderer export:

Prefixed (10): PdfAlert, PdfCard, PdfForm, PdfGraph, PdfImage, PdfList, PdfPageNumber, PdfQRCode, PdfSignatureBlock, PdfWatermark
Unprefixed (14): Badge, DataTable, Divider, Heading, KeepTogether, KeyValue, Link, PageBreak, PageFooter, PageHeader, Section, Stack, Table, Text

When importing, always use the exact name shown in each component section above.

---

## CLI Reference

\\\`\\\`\\\`bash
# Setup
npx pdfx-cli@latest init                          # Initialize PDFx in project
npx pdfx-cli@latest add <component>               # Add a component
npx pdfx-cli@latest add <comp1> <comp2>           # Add multiple
npx pdfx-cli@latest block add <block>             # Add a block

# Theme
npx pdfx-cli@latest theme init                    # Create theme file
npx pdfx-cli@latest theme switch professional     # Switch preset
npx pdfx-cli@latest theme validate                # Validate theme

# MCP (AI editor integration)
npx pdfx-cli@latest mcp                           # Start MCP server
npx pdfx-cli@latest mcp init                      # Configure editor (interactive)
npx pdfx-cli@latest mcp init --client claude      # Claude Code  (.mcp.json)
npx pdfx-cli@latest mcp init --client cursor      # Cursor        (.cursor/mcp.json)
npx pdfx-cli@latest mcp init --client vscode      # VS Code       (.vscode/mcp.json)
npx pdfx-cli@latest mcp init --client windsurf    # Windsurf      (mcp_config.json)
npx pdfx-cli@latest mcp init --client qoder       # Qoder         (.qoder/mcp.json)
npx pdfx-cli@latest mcp init --client opencode    # opencode      (opencode.json)
npx pdfx-cli@latest mcp init --client antigravity # Antigravity   (.antigravity/mcp.json)

# Skills file (AI context document)
npx pdfx-cli@latest skills init                      # Write skills file (interactive)
npx pdfx-cli@latest skills init --platform claude    # CLAUDE.md
npx pdfx-cli@latest skills init --platform cursor    # .cursor/rules/pdfx.mdc
npx pdfx-cli@latest skills init --platform vscode    # .github/copilot-instructions.md
npx pdfx-cli@latest skills init --platform windsurf  # .windsurf/rules/pdfx.md
npx pdfx-cli@latest skills init --platform opencode  # AGENTS.md
npx pdfx-cli@latest skills init --platform antigravity # .antigravity/context.md
\\\`\\\`\\\`

---

## Common patterns

### Full invoice from scratch
\\\`\\\`\\\`tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading/pdfx-heading';
import { KeyValue } from '@/components/pdfx/key-value/pdfx-key-value';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/pdfx/table/pdfx-table';
import { Divider } from '@/components/pdfx/divider/pdfx-divider';
import { Badge } from '@/components/pdfx/badge/pdfx-badge';
import { PageFooter } from '@/components/pdfx/page-footer/pdfx-page-footer';

export function InvoiceDoc() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 48, fontFamily: 'Helvetica' }}>
        <Heading level={1}>Invoice #INV-001</Heading>
        <KeyValue
          items={[
            { key: 'Date', value: 'Jan 1, 2025' },
            { key: 'Due', value: 'Jan 31, 2025' },
          ]}
          direction="horizontal"
        />
        <Divider spacing="md" />
        <Table variant="grid" zebraStripe>
          <TableHeader>
            <TableRow>
              <TableCell header width="60%">Description</TableCell>
              <TableCell header align="center">Qty</TableCell>
              <TableCell header align="right">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Design System</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="right">$4,800</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Badge label="PAID" variant="success" />
        <PageFooter leftText="Acme Corp" rightText="Page 1 of 1" />
      </Page>
    </Document>
  );
}
\\\`\\\`\\\`

### Preventing page splits
\\\`\\\`\\\`tsx
// Wrap anything that must stay together across page boundaries
<KeepTogether>
  <Heading level={3}>Q3 Summary</Heading>
  <DataTable columns={columns} data={data} variant="grid" />
</KeepTogether>
\\\`\\\`\\\`

### Server-side generation (Next.js)
\\\`\\\`\\\`typescript
// app/api/invoice/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { InvoiceDoc } from '@/components/pdf/invoice';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = await fetchInvoice(id);
  const buf = await renderToBuffer(<InvoiceDoc data={data} />);
  return new Response(buf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': \\\\\\\`inline; filename="invoice-\\\\\\\${id}.pdf"\\\\\\\`,
    },
  });
}
\\\`\\\`\\\`

---

## react-pdf layout constraints (CRITICAL)

@react-pdf/renderer enforces strict separation between layout containers and text:

- **View** is a layout container (like a div). It can contain other Views and Text nodes.
- **Text** is a text container. It can contain strings or nested Text nodes.
- **NEVER mix View and inline text in a flex row.** This causes irrecoverable layout failures.

\\\`\\\`\\\`tsx
// ✗ WRONG — mixing View and text siblings in a flex row
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: 100 }}>...</View>
  Some text here   {/* ← this text sibling crashes the layout */}
</View>

// ✓ CORRECT — wrap all text siblings in <Text>
<View style={{ flexDirection: 'row' }}>
  <View style={{ width: 100 }}>...</View>
  <Text>Some text here</Text>
</View>
\\\`\\\`\\\`

---

## Anti-patterns to avoid

- DO NOT use HTML elements inside PDFx components (no <div>, <p>, <span>)
- DO NOT import from @react-pdf/renderer inside PDFx component files — they already wrap it
- DO NOT use CSS classes or Tailwind inside PDF components — use style props or theme tokens
- DO NOT use window, document, or browser APIs in server-rendered PDF routes
- DO NOT install components with npm — always use the CLI: npx pdfx-cli@latest add <name>
- DO NOT place raw text siblings next to View elements in a flex row (react-pdf constraint)
- DO NOT pass React nodes (JSX) as Badge children — only plain strings are supported
- DO NOT return HTML elements from DataTable render/renderFooter — PDF elements only

---

## MCP Server (for AI editors)

The PDFx MCP server gives AI editors live access to the entire registry:
\\\`\\\`\\\`bash
npx pdfx-cli@latest mcp init   # interactive setup for your editor
\\\`\\\`\\\`
Supported: Claude Code, Cursor, VS Code, Windsurf, Qoder, opencode, Antigravity

Tools: list_components, get_component, list_blocks, get_block, search_registry,
       get_theme, get_installation, get_add_command, get_audit_checklist

---
# End of PDFx AI Context Guide
`,M=`{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`;function B(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("section",{id:"mcp-overview",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center",children:e.jsx(u,{className:"h-4 w-4 text-violet-500"})}),e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"PDFx MCP Server"})]}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:"Gives your AI editor live, structured access to every PDFx component, block, and theme. No hallucinated props. No stale docs."})]}),e.jsxs("section",{id:"mcp-setup",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Setup"}),e.jsxs("div",{className:"rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5",children:[e.jsx(v,{className:"h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Works with any MCP-capable AI tool — Claude Code, Cursor, VS Code, Windsurf, opencode, Antigravity, and more. The interactive prompt detects your editor, or pass"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"--client <name>"})," ","to go straight to config."]})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"1 — Run the setup command"}),e.jsx(p,{code:"npx pdfx-cli@latest mcp init",lang:"bash"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1",children:"2 — Restart your editor, then verify"}),e.jsxs("div",{className:"rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2",children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:["Ask your AI: ",e.jsx("span",{className:"italic",children:'"list all pdfx components using MCP"'})," — if the server is connected, you will get an accurate component list back."]})]})]})]})]}),e.jsxs("section",{id:"mcp-manual",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Manual Config"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Prefer editing config files yourself? Add the pdfx entry to your editor's MCP config file. The command is always the same — only the JSON wrapper key differs per editor."}),e.jsx(p,{code:M,lang:"json",filename:"mcp-config.json"}),e.jsxs("p",{className:"mt-3 text-xs text-muted-foreground leading-relaxed",children:["VS Code uses"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"servers"'})," +"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"type": "stdio"'}),". opencode uses"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"mcp"'})," +"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"type": "local"'})," ","with a unified command array. Run"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"mcp init --client <name>"})," ","to get the exact JSON for your editor."]})]}),e.jsxs("section",{id:"mcp-tools",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Tools"}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:[m.length," tools registered with the server. Your AI can call any of these once connected."]}),e.jsx("div",{className:"rounded-xl border border-border/60 overflow-hidden",children:m.map((r,i)=>e.jsxs("div",{className:`flex items-start gap-3 px-4 py-3 ${i!==m.length-1?"border-b border-border/40":""}`,children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-green-500/80 mt-1.5 shrink-0"}),e.jsxs("div",{children:[e.jsx("code",{className:"text-[12px] font-mono font-medium text-foreground",children:r.name}),e.jsx("p",{className:"text-xs text-muted-foreground mt-0.5",children:r.desc})]})]},r.name))})]})]})}function L(r){const[i,o]=s.useState(!1),t=s.useRef(null);function a(){navigator.clipboard.writeText(r).then(()=>{o(!0),t.current&&clearTimeout(t.current),t.current=setTimeout(()=>o(!1),2200)})}return s.useEffect(()=>()=>{t.current&&clearTimeout(t.current)},[]),{copied:i,copy:a}}function H(){const[r,i]=s.useState(!1),{copied:o,copy:t}=L(g);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("section",{id:"skills-overview",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center",children:e.jsx(h,{className:"h-4 w-4 text-amber-500"})}),e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"PDFx Skills File"})]}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:"A structured AI context document that gives any AI editor accurate, comprehensive knowledge of PDFx — every component, prop, block, theme, and CLI command. Drop it into your editor's context file and your AI generates correct PDFx code without guessing."})]}),e.jsxs("section",{id:"skills-setup",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Setup"}),e.jsxs("div",{className:"rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5",children:[e.jsx(v,{className:"h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Works with any AI editor — Claude Code (CLAUDE.md), Cursor (.cursor/rules/pdfx.mdc), VS Code (copilot-instructions.md), Windsurf (.windsurf/rules/pdfx.md), opencode and Qoder (AGENTS.md), and more. The interactive prompt handles editor-specific paths and frontmatter automatically, or pass"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"--platform <name>"})," ","to skip it."]})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"1 — Run the setup command"}),e.jsx(p,{code:"npx pdfx-cli@latest skills init",lang:"bash"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"Or add manually"}),e.jsxs("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["Copy the skills file content below and place it in your editor's context file. Cursor and Windsurf require a YAML frontmatter block at the top — run"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"skills init --platform cursor"})," ","(or windsurf) to get the exact file with frontmatter already applied."]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1",children:"2 — Verify"}),e.jsxs("div",{className:"rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2",children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:["Ask your AI: ",e.jsx("span",{className:"italic",children:'"what PDFx components are available?"'})," — it should list all 24 components with accurate prop information."]})]})]})]})]}),e.jsxs("section",{id:"skills-file",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("h2",{className:"text-lg font-semibold",children:"The Skills File"}),e.jsx("button",{type:"button",onClick:t,className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted text-foreground transition-colors",children:o?e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500"})," Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(x,{className:"h-3.5 w-3.5"})," Copy all"]})})]}),e.jsx("p",{className:"text-xs text-muted-foreground mb-3",children:"~600 lines · Markdown · 24 components, 10 blocks, CLI reference, patterns, anti-patterns"}),e.jsxs("button",{type:"button",onClick:()=>i(a=>!a),className:"w-full flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors mb-2",children:[e.jsx("span",{children:r?"Hide file content":"Show file content"}),r?e.jsx(D,{className:"h-4 w-4 text-muted-foreground"}):e.jsx(j,{className:"h-4 w-4 text-muted-foreground"})]}),r&&e.jsxs("div",{className:"rounded-xl border border-border/60 bg-zinc-950 overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-red-500/70"}),e.jsx("span",{className:"h-2 w-2 rounded-full bg-yellow-500/70"}),e.jsx("span",{className:"h-2 w-2 rounded-full bg-green-500/70"})]}),e.jsx("span",{className:"text-[10px] font-mono text-zinc-600",children:"CLAUDE.md / AGENTS.md / pdfx.mdc…"}),e.jsx("button",{type:"button",onClick:t,className:"flex items-center gap-1 px-2 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors text-[11px] font-mono",children:o?e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"h-3 w-3 text-emerald-400"})," copied"]}):e.jsxs(e.Fragment,{children:[e.jsx(x,{className:"h-3 w-3"})," copy"]})})]}),e.jsx("pre",{className:"px-4 py-4 font-mono text-[11.5px] leading-relaxed text-zinc-400 overflow-x-auto max-h-[560px] overflow-y-auto",style:{scrollbarWidth:"thin",scrollbarColor:"rgb(63 63 70) transparent"},children:g})]})]}),e.jsxs("section",{id:"skills-with-mcp",children:[e.jsx("h2",{className:"text-lg font-semibold mb-3",children:"Use With MCP for Best Results"}),e.jsxs("div",{className:"rounded-xl border border-border/60 bg-muted/20 px-5 py-4",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"font-semibold text-foreground mb-1 flex items-center gap-2",children:[e.jsx(I,{className:"h-4 w-4"})," Skills file"]}),e.jsxs("ul",{className:"space-y-1 text-xs",children:[e.jsx("li",{children:"• Always-on context — no AI call needed"}),e.jsx("li",{children:"• Works offline"}),e.jsx("li",{children:"• Best for: prop reference, patterns"})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"font-semibold text-foreground mb-1 flex items-center gap-2",children:[e.jsx(u,{className:"h-4 w-4"})," MCP server"]}),e.jsxs("ul",{className:"space-y-1 text-xs",children:[e.jsx("li",{children:"• Live data — always up to date"}),e.jsx("li",{children:"• Full component source on demand"}),e.jsx("li",{children:"• Best for: fetching actual code"})]})]})]}),e.jsx("p",{className:"mt-4 text-xs text-muted-foreground border-t border-border/60 pt-3",children:"Skills file = the AI knows the shape. MCP = the AI gets the exact code. Together = no hallucinations."})]})]})]})}function O({items:r}){const[i,o]=s.useState("");return s.useEffect(()=>{const t=r.map(l=>document.getElementById(l.id)).filter(Boolean),a=new IntersectionObserver(l=>{for(const n of l)if(n.isIntersecting){o(n.target.id);break}},{rootMargin:"-20% 0px -70% 0px"});for(const l of t)a.observe(l);return()=>a.disconnect()},[r]),e.jsxs("nav",{className:"sticky top-20 hidden xl:block w-48 shrink-0",children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4",children:"On this page"}),e.jsx("ul",{className:"space-y-2 relative border-l border-border/50 ml-1 pl-4",children:r.map(t=>{const a=i===t.id;return e.jsxs("li",{className:"relative",children:[a&&e.jsx(b.div,{layoutId:"activeToCInfo",className:"absolute -left-[17px] top-1.5 w-[2px] h-3.5 bg-foreground rounded-full",transition:{type:"spring",stiffness:300,damping:30}}),e.jsx("a",{href:`#${t.id}`,onClick:l=>{var n;l.preventDefault(),(n=document.getElementById(t.id))==null||n.scrollIntoView({behavior:"smooth"})},className:`block text-[13px] transition-colors leading-snug ${a?"text-foreground font-medium":"text-muted-foreground hover:text-foreground"}`,style:{paddingLeft:t.level===3?"0.75rem":"0"},children:t.title})]},t.id)})})]})}function $(){C("MCP & Skills");const[r,i]=T(),o=r.get("tab")??"mcp";function t(n){i({tab:n}),window.scrollTo({top:0,behavior:"smooth"})}const a=o==="mcp"?F:R,l=[{id:"mcp",label:"MCP Server",icon:u,desc:"Dynamic tool execution"},{id:"skills",label:"Skills File",icon:h,desc:"Static instruction set"}];return e.jsxs("div",{className:"flex gap-8 relative overflow-hidden",children:[e.jsxs("div",{className:"flex-1 min-w-0 py-12 max-w-3xl",children:[e.jsxs("div",{className:"mb-12",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("div",{className:"p-2 rounded-xl bg-muted border border-border",children:e.jsx(P,{className:"w-5 h-5 text-foreground"})}),e.jsx("span",{className:"text-sm font-bold uppercase tracking-widest text-foreground",children:"AI Integration"})]}),e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground",children:"MCP & Skills"}),e.jsx("p",{className:"text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium",children:"Supercharge your AI editor with fluent context about PDFx. Choose the dynamic power of our MCP Server or the simplicity of our Skills file."})]}),e.jsx("div",{className:"flex flex-col sm:flex-row gap-3 mb-12",children:l.map(({id:n,label:y,icon:w,desc:k})=>{const d=o===n;return e.jsxs("button",{type:"button",onClick:()=>t(n),className:`relative flex-1 group flex flex-col items-start p-4 rounded-2xl transition-all duration-300 border text-left
                  ${d?"border-border bg-muted/30 shadow-sm":"border-border/50 bg-transparent hover:border-border hover:bg-muted/10"}`,children:[d&&e.jsx(b.div,{layoutId:"activeTabBadge",className:"absolute inset-0 rounded-2xl border-2 border-foreground/10 bg-muted/50",transition:{type:"spring",stiffness:300,damping:30}}),e.jsxs("div",{className:"relative z-10 flex items-center gap-3 w-full",children:[e.jsx("div",{className:`p-2 rounded-lg transition-colors duration-300 ${d?"bg-background text-foreground shadow-sm border border-border":"bg-muted/50 text-muted-foreground group-hover:text-foreground"}`,children:e.jsx(w,{className:"h-5 w-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:`font-semibold text-base transition-colors duration-300 ${d?"text-foreground":"text-muted-foreground group-hover:text-foreground"}`,children:y}),e.jsx("p",{className:`text-xs mt-0.5 transition-colors duration-300 ${d?"text-muted-foreground":"text-muted-foreground/70"}`,children:k})]})]})]},n)})}),e.jsx("div",{className:"relative",children:e.jsx("div",{children:o==="mcp"?e.jsx(B,{}):e.jsx(H,{})},o)})]}),e.jsx("div",{className:"pt-12",children:e.jsx(O,{items:a})})]})}export{$ as default};
