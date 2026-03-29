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
`;
