export type EditorId =
  | 'claude'
  | 'cursor'
  | 'vscode'
  | 'windsurf'
  | 'qoder'
  | 'opencode'
  | 'antigravity'
  | 'other';

export const EDITORS = [
  {
    id: 'claude' as EditorId,
    label: 'Claude Code',
    dot: 'bg-orange-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client claude',
    configFile: '.mcp.json',
    configFileNote: 'project root — commit this so your whole team gets the server automatically.',
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    cliAlt: 'claude mcp add pdfx -- npx -y pdfx-cli@latest mcp',
    verifyStep: 'Run: claude mcp list — pdfx should appear.',
  },
  {
    id: 'cursor' as EditorId,
    label: 'Cursor',
    dot: 'bg-blue-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client cursor',
    configFile: '.cursor/mcp.json',
    configFileNote: 'project root.',
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Restart Cursor → Settings → MCP → pdfx should show a green dot.',
  },
  {
    id: 'vscode' as EditorId,
    label: 'VS Code',
    dot: 'bg-sky-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client vscode',
    configFile: '.vscode/mcp.json',
    configFileNote: 'project root. Note: VS Code uses "servers" not "mcpServers".',
    configJson: `{
  "servers": {
    "pdfx": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Requires GitHub Copilot. Open Copilot Chat → Tools icon → pdfx listed.',
  },
  {
    id: 'windsurf' as EditorId,
    label: 'Windsurf',
    dot: 'bg-teal-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client windsurf',
    configFile: 'mcp_config.json',
    configFileNote: 'project root, or globally at ~/.codeium/windsurf/mcp_config.json.',
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Open Cascade → hammer icon → pdfx should appear in the tools list.',
  },
  {
    id: 'qoder' as EditorId,
    label: 'Qoder',
    dot: 'bg-violet-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client qoder',
    configFile: '.qoder/mcp.json',
    configFileNote: 'project root.',
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Restart Qoder and check the MCP panel for pdfx.',
  },
  {
    // opencode uses "mcp" key + "type":"local" + a single unified command array.
    // Project-level: opencode.json in project root (or git root).
    // Global: ~/.config/opencode/opencode.json
    // Docs: https://opencode.ai/docs/mcp-servers/
    id: 'opencode' as EditorId,
    label: 'opencode',
    dot: 'bg-emerald-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client opencode',
    configFile: 'opencode.json',
    configFileNote:
      'Project root (or git root). For global access copy to ~/.config/opencode/opencode.json.',
    configJson: `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "pdfx": {
      "type": "local",
      "command": ["npx", "-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Run: opencode mcp list — pdfx should appear.',
  },
  {
    // Antigravity (google) — follows standard MCP stdio convention.
    // Verify config path at https://antigravity.google/docs/mcp once publicly available.
    id: 'antigravity' as EditorId,
    label: 'Antigravity',
    dot: 'bg-rose-400',
    initCmd: 'npx pdfx-cli@latest mcp init --client antigravity',
    configFile: '.antigravity/mcp.json',
    configFileNote: 'Project root. Verify the exact path against your Antigravity version.',
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Open Antigravity → MCP panel → pdfx should appear in the tools list.',
  },
  {
    id: 'other' as EditorId,
    label: 'Any MCP client',
    dot: 'bg-zinc-500',
    initCmd: 'npx pdfx-cli@latest mcp init --client other',
    configFile: 'pdfx-mcp.json',
    configFileNote: "Project root. Copy the pdfx entry into your editor's native MCP config file.",
    configJson: `{
  "mcpServers": {
    "pdfx": {
      "command": "npx",
      "args": ["-y", "pdfx-cli@latest", "mcp"]
    }
  }
}`,
    verifyStep: 'Ask your AI: "list all pdfx components using the MCP server".',
  },
];

export const MCP_TOOLS = [
  { name: 'list_components', desc: 'Lists all 24 PDF components with metadata' },
  { name: 'get_component', desc: 'Returns full source code + deps for a component' },
  { name: 'list_blocks', desc: 'Lists all 10 pre-built document blocks' },
  { name: 'get_block', desc: 'Returns the complete source code for a block' },
  { name: 'search_registry', desc: 'Fuzzy search by name, type, or description' },
  { name: 'get_theme', desc: 'Returns all design tokens for a theme' },
  { name: 'get_installation', desc: 'Framework-specific step-by-step setup guide' },
  { name: 'get_add_command', desc: 'Returns the correct CLI add command for items' },
  { name: 'get_audit_checklist', desc: 'Post-setup verification checklist' },
];

export const MCP_FAQ = [
  {
    q: 'Why MCP instead of just reading the docs?',
    a: 'Docs are written for humans. MCP gives your AI editor live, structured access to every PDFx component, block, and theme — no hallucinated props, no stale examples, no guessed API surface. The AI fetches exactly what it needs, when it needs it.',
  },
  {
    q: 'Does it cost anything to run?',
    a: 'Zero. The MCP server is open-source (MIT), runs 100% locally on your machine, and fetches from the public PDFx registry. No account, no API key, no subscription — ever.',
  },
  {
    q: 'Does the AI get access to my PDF files or code?',
    a: 'No. The MCP server only exposes PDFx registry data — components, blocks, themes, and installation guides. It has no access to your filesystem, your PDFs, or anything else on your machine.',
  },
  {
    q: 'What happens when PDFx releases new components?',
    a: 'They show up automatically. The server always fetches live data from the registry — no reinstall, no rebuild, just ask your AI about the new component.',
  },
  {
    q: "What's the difference between MCP and a plugin?",
    a: 'Plugins are editor-specific and require separate installs for each tool. MCP is a universal standard — one server works across Claude Code, Cursor, VS Code, Windsurf, opencode, Antigravity, and any other MCP-compatible client.',
  },
];

export const MCP_TOC = [
  { id: 'mcp-overview', title: 'Overview', level: 2 },
  { id: 'mcp-setup', title: 'Setup', level: 2 },
  { id: 'mcp-manual', title: 'Manual Config', level: 2 },
  { id: 'mcp-tools', title: 'Tools', level: 2 },
];

export const SKILLS_TOC = [
  { id: 'skills-overview', title: 'Overview', level: 2 },
  { id: 'skills-setup', title: 'Setup', level: 2 },
  { id: 'skills-file', title: 'Skills File', level: 2 },
  { id: 'skills-with-mcp', title: 'Use With MCP', level: 2 },
];

export const SKILL_TARGETS = [
  {
    id: 'claude',
    label: 'Claude Code',
    file: 'CLAUDE.md',
    color: 'bg-orange-400',
    cmd: '--platform claude',
    note: 'Claude Code reads CLAUDE.md automatically as project context.',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    file: '.cursor/rules/pdfx.mdc',
    color: 'bg-blue-400',
    cmd: '--platform cursor',
    note: 'Cursor 3.x uses .cursor/rules/*.mdc with YAML frontmatter. The CLI adds alwaysApply: true so the rule loads automatically.',
    hasFrontmatter: true,
  },
  {
    id: 'vscode',
    label: 'VS Code',
    file: '.github/copilot-instructions.md',
    color: 'bg-sky-400',
    cmd: '--platform vscode',
    note: 'GitHub Copilot reads this file when custom instructions are enabled.',
  },
  {
    id: 'windsurf',
    label: 'Windsurf',
    file: '.windsurf/rules/pdfx.md',
    color: 'bg-teal-400',
    cmd: '--platform windsurf',
    note: 'Windsurf reads .windsurfrules automatically as project context.',
  },
  {
    id: 'qoder',
    label: 'Qoder',
    file: 'AGENTS.md',
    color: 'bg-violet-400',
    cmd: '--platform qoder',
    note: 'Qoder reads .qoder/rules.md as project AI context.',
  },
  {
    id: 'opencode',
    label: 'opencode',
    file: 'AGENTS.md',
    color: 'bg-emerald-400',
    cmd: '--platform opencode',
    note: 'opencode reads AGENTS.md from the project root as context.',
  },
  {
    id: 'antigravity',
    label: 'Antigravity',
    file: '.antigravity/context.md',
    color: 'bg-rose-400',
    cmd: '--platform antigravity',
    note: 'Verify the exact path against your Antigravity version.',
  },
  {
    id: 'generic',
    label: 'Any AI tool',
    file: 'pdfx-context.md',
    color: 'bg-zinc-400',
    cmd: '--platform other',
    note: "Reference this file from your editor's rules or context setting.",
  },
];

export const PDFX_SKILLS_CONTENT = `# PDFx — AI Context Guide
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
`;
