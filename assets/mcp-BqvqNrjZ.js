import{j as e}from"./vendor-react-pdf-Bm5uTGBL.js";import{r as l,m as k}from"./vendor-router-CswRncel.js";import{C as p}from"./code-block-BnRzBIz9.js";import{c as x,P as u,k as g,C as f,j as N,g as b}from"./index-BN52pILT.js";import{C as c}from"./check-RrXugvPx.js";import{u as C}from"./use-document-title-OpN4jE9d.js";import{T as P}from"./terminal-CWynrgnC.js";import"./copy-button-CA67yP0E.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],D=x("chevron-up",T);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]],I=x("file-code",S);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],v=x("info",A),m=[{name:"list_components",desc:"Lists all 24 PDF components with metadata"},{name:"get_component",desc:"Returns full source code + deps for a component"},{name:"list_blocks",desc:"Lists all 10 pre-built document blocks"},{name:"get_block",desc:"Returns the complete source code for a block"},{name:"search_registry",desc:"Fuzzy search by name, type, or description"},{name:"get_theme",desc:"Returns all design tokens for a theme"},{name:"get_installation",desc:"Framework-specific step-by-step setup guide"},{name:"get_add_command",desc:"Returns the correct CLI add command for items"},{name:"get_audit_checklist",desc:"Post-setup verification checklist"}],F=[{id:"mcp-overview",title:"Overview",level:2},{id:"mcp-setup",title:"Setup",level:2},{id:"mcp-manual",title:"Manual Config",level:2},{id:"mcp-tools",title:"Tools",level:2}],M=[{id:"skills-overview",title:"Overview",level:2},{id:"skills-setup",title:"Setup",level:2},{id:"skills-file",title:"Skills File",level:2},{id:"skills-with-mcp",title:"Use With MCP",level:2}],h=`# PDFx — AI Context Guide
# Version: 1.0 | Updated: 2026 | License: MIT
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

\`\`\`bash
# 1. Initialize PDFx — creates src/lib/pdfx-theme.ts and installs @pdfx/shared
npx pdfx-cli@latest init

# 2. Add components you need
npx pdfx-cli@latest add heading text table

# 3. Add a pre-built block
npx pdfx-cli@latest add invoice-modern --type block
\`\`\`

The init command adds a theme file at src/lib/pdfx-theme.ts. All components read from this file.

---

## How components work

PDFx components are React components that render @react-pdf/renderer primitives (View, Text,
Page, Document, etc.). They CANNOT render HTML or DOM elements — they only work inside a
<Document> from @react-pdf/renderer.

Usage pattern:
\`\`\`tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading';
import { Text } from '@/components/pdfx/text';
import { Table } from '@/components/pdfx/table';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <Heading level={1}>Invoice #001</Heading>
        <Text>Thank you for your business.</Text>
        <Table
          headers={['Item', 'Qty', 'Price']}
          rows={[['Design work', '1', '$4,800']]}
        />
      </Page>
    </Document>
  );
}
\`\`\`

Rendering to PDF:
\`\`\`tsx
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
\`\`\`

---

## All 24 Components — Props Reference

CRITICAL: These are the EXACT props. Do not invent additional props.

### Heading
\`\`\`tsx
import { Heading } from '@/components/pdfx/heading';
<Heading
  level={1}           // 1 | 2 | 3 | 4 | 5 | 6 — default: 1
  align="left"        // 'left' | 'center' | 'right' — default: 'left'
  weight="bold"       // 'normal' | 'bold' — default: 'bold'
  tracking="normal"   // 'tight' | 'normal' | 'wide' — default: 'normal'
  color="#000"        // string — default: theme.colors.foreground
  gutterBottom        // boolean — adds bottom margin
>
  My Heading
</Heading>
\`\`\`

### Text
\`\`\`tsx
import { Text } from '@/components/pdfx/text';
<Text
  size="md"           // 'xs' | 'sm' | 'md' | 'lg' | 'xl' — default: 'md'
  weight="normal"     // 'normal' | 'medium' | 'semibold' | 'bold' — default: 'normal'
  color="#000"        // string
  align="left"        // 'left' | 'center' | 'right' | 'justify'
  italic              // boolean
  muted               // boolean — applies theme.colors.mutedForeground
  gutterBottom        // boolean
>
  Paragraph text here.
</Text>
\`\`\`

### Link
\`\`\`tsx
import { Link } from '@/components/pdfx/link';
<Link
  href="https://example.com"  // string — required
  size="md"                   // same as Text size
  color="#0000ff"             // default: theme.colors.accent
>
  Click here
</Link>
\`\`\`

### Divider
\`\`\`tsx
import { Divider } from '@/components/pdfx/divider';
<Divider
  thickness={1}       // number in pt — default: 1
  color="#e4e4e7"     // string — default: theme.colors.border
  spacing="md"        // 'sm' | 'md' | 'lg' — vertical margin
  style="solid"       // 'solid' | 'dashed' | 'dotted'
/>
\`\`\`

### PageBreak
\`\`\`tsx
import { PageBreak } from '@/components/pdfx/page-break';
<PageBreak /> // No props. Forces a new page.
\`\`\`

### Stack
\`\`\`tsx
import { Stack } from '@/components/pdfx/stack';
<Stack
  direction="column"   // 'row' | 'column' — default: 'column'
  gap={8}             // number in pt — default: 0
  align="flex-start"  // flexbox align-items
  justify="flex-start"// flexbox justify-content
  wrap                // boolean — flex-wrap
>
  {children}
</Stack>
\`\`\`

### Section
\`\`\`tsx
import { Section } from '@/components/pdfx/section';
<Section
  title="Section Title"   // string — optional
  titleLevel={2}          // 1–6 — default: 2
  padding={16}            // number | {top,right,bottom,left} — default: 0
  bordered                // boolean — adds border around section
  background="#f9f9f9"    // string — background color
>
  {children}
</Section>
\`\`\`

### Table
\`\`\`tsx
import { Table } from '@/components/pdfx/table';
<Table
  headers={['Column A', 'Column B', 'Column C']}   // string[] — required
  rows={[['R1C1', 'R1C2', 'R1C3'], ['R2C1', 'R2C2', 'R2C3']]} // string[][] — required
  striped            // boolean — alternating row colors
  bordered           // boolean — cell borders
  compact            // boolean — smaller padding
  headerBg="#18181b" // string — header background
  headerColor="#fff" // string — header text color
  columnWidths={[2, 1, 1]} // number[] — flex ratios
  caption="Table 1" // string — caption below table
/>
\`\`\`

### DataTable
\`\`\`tsx
import { DataTable } from '@/components/pdfx/data-table';
// More powerful table — uses column definitions
<DataTable
  columns={[
    { key: 'name', header: 'Name', width: 2 },
    { key: 'amount', header: 'Amount', width: 1, align: 'right' },
  ]}
  data={[{ name: 'Item A', amount: '$100' }]}
  striped
  bordered
  compact
/>
\`\`\`

### List
\`\`\`tsx
import { List } from '@/components/pdfx/list';
<List
  items={['First item', 'Second item', 'Third item']}  // string[] — required
  ordered           // boolean — numbered list (default: bulleted)
  bullet="•"        // string — custom bullet character
  indent={16}       // number — left indent in pt
  spacing="sm"      // 'sm' | 'md' | 'lg' — gap between items
/>
\`\`\`

### Card
\`\`\`tsx
import { Card } from '@/components/pdfx/card';
<Card
  padding={16}       // number — default: 16
  bordered           // boolean — default: true
  shadow             // boolean
  background="#fff"  // string
  borderColor="#e4e4e7" // string
  borderRadius={4}   // number in pt
>
  {children}
</Card>
\`\`\`

### Form (read-only form fields for PDFs)
\`\`\`tsx
import { Form } from '@/components/pdfx/form';
<Form
  fields={[
    { label: 'Full Name', value: 'John Doe' },
    { label: 'Email', value: 'john@example.com' },
    { label: 'Notes', value: 'Some notes here', multiline: true },
  ]}
  columns={2}      // 1 | 2 — default: 1
  bordered         // boolean
/>
\`\`\`

### Signature
\`\`\`tsx
import { Signature } from '@/components/pdfx/signature';
<Signature
  name="Sarah Chen"           // string — printed name below line
  title="Engineering Lead"    // string — title/role below name
  date="2024-12-12"          // string — formatted date
  lineWidth={120}             // number — signature line width in pt
  showDate                    // boolean — default: true
/>
\`\`\`

### PageHeader
\`\`\`tsx
import { PageHeader } from '@/components/pdfx/page-header';
<PageHeader
  title="Document Title"
  subtitle="Subtitle or tagline"
  logo={{ src: 'https://...', width: 60, height: 30 }}
  rightContent={<Text>Custom right element</Text>}
  bordered        // boolean — adds bottom border
/>
\`\`\`

### PageFooter
\`\`\`tsx
import { PageFooter } from '@/components/pdfx/page-footer';
<PageFooter
  left="© 2024 Acme Corp"
  center="Confidential"
  right={<PageNumber />}
  bordered         // boolean — top border
/>
\`\`\`

### Badge
\`\`\`tsx
import { Badge } from '@/components/pdfx/badge';
<Badge
  variant="default"  // 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size="md"          // 'sm' | 'md' | 'lg'
>
  PAID
</Badge>
\`\`\`

### KeyValue
\`\`\`tsx
import { KeyValue } from '@/components/pdfx/key-value';
<KeyValue
  items={[
    { label: 'Invoice #', value: 'INV-001' },
    { label: 'Due Date', value: 'Jan 31, 2025' },
  ]}
  columns={2}         // 1 | 2 | 3 — default: 1
  labelWidth={80}     // number in pt
  colon               // boolean — adds colon after label
/>
\`\`\`

### KeepTogether
\`\`\`tsx
import { KeepTogether } from '@/components/pdfx/keep-together';
// Prevents page breaks inside its children
<KeepTogether>
  <Heading level={3}>Section that must not split</Heading>
  <Table headers={[...]} rows={[...]} />
</KeepTogether>
\`\`\`

### PdfImage
\`\`\`tsx
import { PdfImage } from '@/components/pdfx/pdf-image';
<PdfImage
  src="https://example.com/image.png"  // string | base64 — required
  width={200}         // number in pt
  height={150}        // number in pt — optional (maintains aspect ratio if omitted)
  alt="Description"   // string — for accessibility
  objectFit="cover"   // 'cover' | 'contain' | 'fill'
  borderRadius={4}    // number
/>
\`\`\`

### Graph
\`\`\`tsx
import { Graph } from '@/components/pdfx/graph';
<Graph
  type="bar"          // 'bar' | 'line' | 'pie' | 'donut'
  data={[
    { label: 'Q1', value: 4200 },
    { label: 'Q2', value: 6100 },
  ]}
  width={400}         // number in pt
  height={200}        // number in pt
  title="Revenue"     // string — optional
  showValues          // boolean — show value labels
  showLegend          // boolean
  colors={['#18181b', '#71717a']}  // string[] — bar/slice colors
/>
\`\`\`

### PageNumber
\`\`\`tsx
import { PageNumber } from '@/components/pdfx/page-number';
<PageNumber
  format="Page {current} of {total}"  // string template — default shown
  size="sm"
  align="right"
/>
\`\`\`

### Watermark
\`\`\`tsx
import { Watermark } from '@/components/pdfx/watermark';
<Watermark
  text="CONFIDENTIAL"   // string — required
  opacity={0.08}        // number 0–1 — default: 0.08
  angle={-35}           // number in degrees — default: -35
  fontSize={72}         // number — default: 72
  color="#000000"        // string
/>
\`\`\`

### QRCode
\`\`\`tsx
import { QRCode } from '@/components/pdfx/qrcode';
<QRCode
  value="https://example.com"  // string — required
  size={80}                    // number in pt — default: 80
  errorCorrectionLevel="M"    // 'L' | 'M' | 'Q' | 'H'
/>
\`\`\`

### Alert
\`\`\`tsx
import { Alert } from '@/components/pdfx/alert';
<Alert
  variant="info"      // 'info' | 'success' | 'warning' | 'error'
  title="Note"        // string — optional bold title
>
  This is an informational note.
</Alert>
\`\`\`

---

## Pre-built Blocks

Blocks are complete document templates. Add them with:
\`\`\`bash
npx pdfx-cli@latest add <block-name> --type block
\`\`\`

### Invoice Blocks
- invoice-modern — Clean two-column layout with totals table
- invoice-minimal — Stripped-down, typography-focused
- invoice-corporate — Header with logo area, full itemization
- invoice-creative — Accent colors, bold layout

### Report Blocks
- report-executive — KPI cards + summary table, 2-page
- report-annual — Multi-section with charts and appendix
- report-financial — P&L / balance sheet focus
- report-marketing — Campaign metrics with graphs
- report-technical — Code-friendly, monospace sections

### Contract Block
- contract-standard — Signature page, numbered clauses, party info

Blocks are added as full React components in your project. Customize all content props.

---

## Theming

### The theme file

After \`npx pdfx-cli@latest init\`, a file is created at src/lib/pdfx-theme.ts.
Every PDFx component reads from this file — change a token once, all components update.

\`\`\`typescript
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
\`\`\`

### Theme presets
\`\`\`bash
npx pdfx-cli@latest theme init              # scaffold blank theme
npx pdfx-cli@latest theme switch modern     # switch preset: professional | modern | minimal
npx pdfx-cli@latest theme validate          # validate your theme file
\`\`\`

### Runtime theme switching
\`\`\`tsx
import { PdfxThemeProvider } from '@/lib/pdfx-theme-context';
import { darkTheme } from '@/lib/pdfx-theme';

<PdfxThemeProvider theme={darkTheme}>
  <MyDocument />
</PdfxThemeProvider>
\`\`\`

---

## CLI Reference

\`\`\`bash
# Setup
npx pdfx-cli@latest init                          # Initialize PDFx in project
npx pdfx-cli@latest add <component>               # Add a component
npx pdfx-cli@latest add <comp1> <comp2>           # Add multiple
npx pdfx-cli@latest add <block> --type block      # Add a block

# Theme
npx pdfx-cli@latest theme init                    # Create theme file
npx pdfx-cli@latest theme switch professional     # Switch preset
npx pdfx-cli@latest theme validate                # Validate theme

# MCP
npx pdfx-cli@latest mcp                           # Start MCP server
npx pdfx-cli@latest mcp init                      # Configure editor MCP (interactive)
npx pdfx-cli@latest mcp init --client claude      # Claude Code (.mcp.json)
npx pdfx-cli@latest mcp init --client cursor      # Cursor (.cursor/mcp.json)
npx pdfx-cli@latest mcp init --client vscode      # VS Code (.vscode/mcp.json)
npx pdfx-cli@latest mcp init --client windsurf    # Windsurf (mcp_config.json)
npx pdfx-cli@latest mcp init --client opencode    # opencode (opencode.json)
npx pdfx-cli@latest mcp init --client antigravity # Antigravity (.antigravity/mcp.json)

# Skills file (AI context document)
npx pdfx-cli@latest skills init                      # Write skills file (interactive)
npx pdfx-cli@latest skills init --platform claude    # CLAUDE.md
npx pdfx-cli@latest skills init --platform cursor    # .cursor/rules/pdfx.mdc
npx pdfx-cli@latest skills init --platform vscode    # .github/copilot-instructions.md
npx pdfx-cli@latest skills init --platform windsurf  # .windsurf/rules/pdfx.md
npx pdfx-cli@latest skills init --platform opencode  # AGENTS.md
npx pdfx-cli@latest skills init --platform antigravity # .antigravity/context.md
\`\`\`

---

## Common patterns

### Full invoice from scratch
\`\`\`tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from '@/components/pdfx/heading';
import { KeyValue } from '@/components/pdfx/key-value';
import { Table } from '@/components/pdfx/table';
import { Divider } from '@/components/pdfx/divider';
import { Badge } from '@/components/pdfx/badge';
import { PageFooter } from '@/components/pdfx/page-footer';

export function InvoiceDoc() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 48, fontFamily: 'Helvetica' }}>
        <Heading level={1}>Invoice #INV-001</Heading>
        <KeyValue
          items={[{ label: 'Date', value: 'Jan 1, 2025' }, { label: 'Due', value: 'Jan 31, 2025' }]}
          columns={2}
        />
        <Divider spacing="md" />
        <Table
          headers={['Description', 'Qty', 'Total']}
          rows={[['Design System', '1', '$4,800'], ['Development', '2', '$9,600']]}
          striped bordered
          columnWidths={[3, 1, 1]}
        />
        <Badge variant="success">PAID</Badge>
        <PageFooter left="Acme Corp" right="Page 1 of 1" bordered />
      </Page>
    </Document>
  );
}
\`\`\`

### Preventing page splits
\`\`\`tsx
// Wrap anything that must stay together across page boundaries
<KeepTogether>
  <Heading level={3}>Q3 Summary</Heading>
  <Table headers={['Metric', 'Value']} rows={data} />
</KeepTogether>
\`\`\`

### Server-side generation (Next.js)
\`\`\`typescript
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
      'Content-Disposition': \`inline; filename="invoice-\${id}.pdf"\`,
    },
  });
}
\`\`\`

---

## Anti-patterns to avoid

- DO NOT use HTML elements inside PDFx components (no <div>, <p>, <span>)
- DO NOT import from @react-pdf/renderer inside PDFx component files — they already wrap it
- DO NOT use CSS classes or Tailwind inside PDF components — use style props or theme tokens
- DO NOT use window, document, or browser APIs in server-rendered PDF routes
- DO NOT install components with npm — always use the CLI: npx pdfx-cli add <name>

---

## MCP Server (for AI editors)

The PDFx MCP server gives AI editors live access to the registry:
\`\`\`bash
npx pdfx-cli@latest mcp init   # interactive setup for your editor
\`\`\`
Tools exposed: list_components, get_component, list_blocks, get_block, search_registry,
get_theme, get_installation, get_add_command, get_audit_checklist

---
# End of PDFx AI Context Guide
`,L=`{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`;function R(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("section",{id:"mcp-overview",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center",children:e.jsx(u,{className:"h-4 w-4 text-violet-500"})}),e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"PDFx MCP Server"})]}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:"Gives your AI editor live, structured access to every PDFx component, block, and theme. No hallucinated props. No stale docs."})]}),e.jsxs("section",{id:"mcp-setup",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Setup"}),e.jsxs("div",{className:"rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5",children:[e.jsx(v,{className:"h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Works with any MCP-capable AI tool — Claude Code, Cursor, VS Code, Windsurf, opencode, Antigravity, and more. The interactive prompt detects your editor, or pass"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"--client <name>"})," ","to go straight to config."]})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"1 — Run the setup command"}),e.jsx(p,{code:"npx pdfx-cli@latest mcp init",lang:"bash"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1",children:"2 — Restart your editor, then verify"}),e.jsxs("div",{className:"rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2",children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:["Ask your AI: ",e.jsx("span",{className:"italic",children:'"list all pdfx components using MCP"'})," — if the server is connected, you will get an accurate component list back."]})]})]})]})]}),e.jsxs("section",{id:"mcp-manual",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Manual Config"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Prefer editing config files yourself? Add the pdfx entry to your editor's MCP config file. The command is always the same — only the JSON wrapper key differs per editor."}),e.jsx(p,{code:L,lang:"json",filename:"mcp-config.json"}),e.jsxs("p",{className:"mt-3 text-xs text-muted-foreground leading-relaxed",children:["VS Code uses"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"servers"'})," +"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"type": "stdio"'}),". opencode uses"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"mcp"'})," +"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:'"type": "local"'})," ","with a unified command array. Run"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"mcp init --client <name>"})," ","to get the exact JSON for your editor."]})]}),e.jsxs("section",{id:"mcp-tools",children:[e.jsx("h2",{className:"text-lg font-semibold mb-2",children:"Tools"}),e.jsxs("p",{className:"text-sm text-muted-foreground mb-4",children:[m.length," tools registered with the server. Your AI can call any of these once connected."]}),e.jsx("div",{className:"rounded-xl border border-border/60 overflow-hidden",children:m.map((o,i)=>e.jsxs("div",{className:`flex items-start gap-3 px-4 py-3 ${i!==m.length-1?"border-b border-border/40":""}`,children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-green-500/80 mt-1.5 shrink-0"}),e.jsxs("div",{children:[e.jsx("code",{className:"text-[12px] font-mono font-medium text-foreground",children:o.name}),e.jsx("p",{className:"text-xs text-muted-foreground mt-0.5",children:o.desc})]})]},o.name))})]})]})}function _(o){const[i,r]=l.useState(!1),t=l.useRef(null);function s(){navigator.clipboard.writeText(o).then(()=>{r(!0),t.current&&clearTimeout(t.current),t.current=setTimeout(()=>r(!1),2200)})}return l.useEffect(()=>()=>{t.current&&clearTimeout(t.current)},[]),{copied:i,copy:s}}function B(){const[o,i]=l.useState(!1),{copied:r,copy:t}=_(h);return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("section",{id:"skills-overview",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center",children:e.jsx(g,{className:"h-4 w-4 text-amber-500"})}),e.jsx("h1",{className:"text-2xl font-bold tracking-tight",children:"PDFx Skills File"})]}),e.jsx("p",{className:"text-muted-foreground leading-relaxed",children:"A structured AI context document that gives any AI editor accurate, comprehensive knowledge of PDFx — every component, prop, block, theme, and CLI command. Drop it into your editor's context file and your AI generates correct PDFx code without guessing."})]}),e.jsxs("section",{id:"skills-setup",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Setup"}),e.jsxs("div",{className:"rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-start gap-2.5 mb-5",children:[e.jsx(v,{className:"h-3.5 w-3.5 text-blue-500/80 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Works with any AI editor — Claude Code (CLAUDE.md), Cursor (.cursor/rules/pdfx.mdc), VS Code (copilot-instructions.md), Windsurf (.windsurf/rules/pdfx.md), opencode and Qoder (AGENTS.md), and more. The interactive prompt handles editor-specific paths and frontmatter automatically, or pass"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"--platform <name>"})," ","to skip it."]})]}),e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"1 — Run the setup command"}),e.jsx(p,{code:"npx pdfx-cli@latest skills init",lang:"bash"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2",children:"Or add manually"}),e.jsxs("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["Copy the skills file content below and place it in your editor's context file. Cursor and Windsurf require a YAML frontmatter block at the top — run"," ",e.jsx("code",{className:"font-mono bg-muted px-1 py-0.5 rounded text-[11px]",children:"skills init --platform cursor"})," ","(or windsurf) to get the exact file with frontmatter already applied."]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1",children:"2 — Verify"}),e.jsxs("div",{className:"rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-start gap-2",children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5"}),e.jsxs("p",{className:"text-xs text-muted-foreground",children:["Ask your AI: ",e.jsx("span",{className:"italic",children:'"what PDFx components are available?"'})," — it should list all 24 components with accurate prop information."]})]})]})]})]}),e.jsxs("section",{id:"skills-file",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("h2",{className:"text-lg font-semibold",children:"The Skills File"}),e.jsx("button",{type:"button",onClick:t,className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted text-foreground transition-colors",children:r?e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"h-3.5 w-3.5 text-green-500"})," Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx(f,{className:"h-3.5 w-3.5"})," Copy all"]})})]}),e.jsx("p",{className:"text-xs text-muted-foreground mb-3",children:"~600 lines · Markdown · 24 components, 10 blocks, CLI reference, patterns, anti-patterns"}),e.jsxs("button",{type:"button",onClick:()=>i(s=>!s),className:"w-full flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors mb-2",children:[e.jsx("span",{children:o?"Hide file content":"Show file content"}),o?e.jsx(D,{className:"h-4 w-4 text-muted-foreground"}):e.jsx(N,{className:"h-4 w-4 text-muted-foreground"})]}),o&&e.jsxs("div",{className:"rounded-xl border border-border/60 bg-zinc-950 overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-red-500/70"}),e.jsx("span",{className:"h-2 w-2 rounded-full bg-yellow-500/70"}),e.jsx("span",{className:"h-2 w-2 rounded-full bg-green-500/70"})]}),e.jsx("span",{className:"text-[10px] font-mono text-zinc-600",children:"CLAUDE.md / AGENTS.md / pdfx.mdc…"}),e.jsx("button",{type:"button",onClick:t,className:"flex items-center gap-1 px-2 py-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-white/10 transition-colors text-[11px] font-mono",children:r?e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"h-3 w-3 text-emerald-400"})," copied"]}):e.jsxs(e.Fragment,{children:[e.jsx(f,{className:"h-3 w-3"})," copy"]})})]}),e.jsx("pre",{className:"px-4 py-4 font-mono text-[11.5px] leading-relaxed text-zinc-400 overflow-x-auto max-h-[560px] overflow-y-auto",style:{scrollbarWidth:"thin",scrollbarColor:"rgb(63 63 70) transparent"},children:h})]})]}),e.jsxs("section",{id:"skills-with-mcp",children:[e.jsx("h2",{className:"text-lg font-semibold mb-3",children:"Use With MCP for Best Results"}),e.jsxs("div",{className:"rounded-xl border border-border/60 bg-muted/20 px-5 py-4",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"font-semibold text-foreground mb-1 flex items-center gap-2",children:[e.jsx(I,{className:"h-4 w-4"})," Skills file"]}),e.jsxs("ul",{className:"space-y-1 text-xs",children:[e.jsx("li",{children:"• Always-on context — no AI call needed"}),e.jsx("li",{children:"• Works offline"}),e.jsx("li",{children:"• Best for: prop reference, patterns"})]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"font-semibold text-foreground mb-1 flex items-center gap-2",children:[e.jsx(u,{className:"h-4 w-4"})," MCP server"]}),e.jsxs("ul",{className:"space-y-1 text-xs",children:[e.jsx("li",{children:"• Live data — always up to date"}),e.jsx("li",{children:"• Full component source on demand"}),e.jsx("li",{children:"• Best for: fetching actual code"})]})]})]}),e.jsx("p",{className:"mt-4 text-xs text-muted-foreground border-t border-border/60 pt-3",children:"Skills file = the AI knows the shape. MCP = the AI gets the exact code. Together = no hallucinations."})]})]})]})}function H({items:o}){const[i,r]=l.useState("");return l.useEffect(()=>{const t=o.map(a=>document.getElementById(a.id)).filter(Boolean),s=new IntersectionObserver(a=>{for(const n of a)if(n.isIntersecting){r(n.target.id);break}},{rootMargin:"-20% 0px -70% 0px"});for(const a of t)s.observe(a);return()=>s.disconnect()},[o]),e.jsxs("nav",{className:"sticky top-20 hidden xl:block w-48 shrink-0",children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4",children:"On this page"}),e.jsx("ul",{className:"space-y-2 relative border-l border-border/50 ml-1 pl-4",children:o.map(t=>{const s=i===t.id;return e.jsxs("li",{className:"relative",children:[s&&e.jsx(b.div,{layoutId:"activeToCInfo",className:"absolute -left-[17px] top-1.5 w-[2px] h-3.5 bg-foreground rounded-full",transition:{type:"spring",stiffness:300,damping:30}}),e.jsx("a",{href:`#${t.id}`,onClick:a=>{var n;a.preventDefault(),(n=document.getElementById(t.id))==null||n.scrollIntoView({behavior:"smooth"})},className:`block text-[13px] transition-colors leading-snug ${s?"text-foreground font-medium":"text-muted-foreground hover:text-foreground"}`,style:{paddingLeft:t.level===3?"0.75rem":"0"},children:t.title})]},t.id)})})]})}function G(){C("MCP & Skills");const[o,i]=k(),r=o.get("tab")??"mcp";function t(n){i({tab:n}),window.scrollTo({top:0,behavior:"smooth"})}const s=r==="mcp"?F:M,a=[{id:"mcp",label:"MCP Server",icon:u,desc:"Dynamic tool execution"},{id:"skills",label:"Skills File",icon:g,desc:"Static instruction set"}];return e.jsxs("div",{className:"flex gap-8 relative overflow-hidden",children:[e.jsxs("div",{className:"flex-1 min-w-0 py-12 max-w-3xl",children:[e.jsxs("div",{className:"mb-12",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("div",{className:"p-2 rounded-xl bg-muted border border-border",children:e.jsx(P,{className:"w-5 h-5 text-foreground"})}),e.jsx("span",{className:"text-sm font-bold uppercase tracking-widest text-foreground",children:"AI Integration"})]}),e.jsx("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground",children:"MCP & Skills"}),e.jsx("p",{className:"text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium",children:"Supercharge your AI editor with fluent context about PDFx. Choose the dynamic power of our MCP Server or the simplicity of our Skills file."})]}),e.jsx("div",{className:"flex flex-col sm:flex-row gap-3 mb-12",children:a.map(({id:n,label:y,icon:j,desc:w})=>{const d=r===n;return e.jsxs("button",{type:"button",onClick:()=>t(n),className:`relative flex-1 group flex flex-col items-start p-4 rounded-2xl transition-all duration-300 border text-left
                  ${d?"border-border bg-muted/30 shadow-sm":"border-border/50 bg-transparent hover:border-border hover:bg-muted/10"}`,children:[d&&e.jsx(b.div,{layoutId:"activeTabBadge",className:"absolute inset-0 rounded-2xl border-2 border-foreground/10 bg-muted/50",transition:{type:"spring",stiffness:300,damping:30}}),e.jsxs("div",{className:"relative z-10 flex items-center gap-3 w-full",children:[e.jsx("div",{className:`p-2 rounded-lg transition-colors duration-300 ${d?"bg-background text-foreground shadow-sm border border-border":"bg-muted/50 text-muted-foreground group-hover:text-foreground"}`,children:e.jsx(j,{className:"h-5 w-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:`font-semibold text-base transition-colors duration-300 ${d?"text-foreground":"text-muted-foreground group-hover:text-foreground"}`,children:y}),e.jsx("p",{className:`text-xs mt-0.5 transition-colors duration-300 ${d?"text-muted-foreground":"text-muted-foreground/70"}`,children:w})]})]})]},n)})}),e.jsx("div",{className:"relative",children:e.jsx("div",{children:r==="mcp"?e.jsx(R,{}):e.jsx(B,{})},r)})]}),e.jsx("div",{className:"pt-12",children:e.jsx(H,{items:s})})]})}export{G as default};
