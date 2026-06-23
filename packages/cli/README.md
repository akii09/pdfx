# pdfx-cli

> The official CLI tool for [PDFx](https://pdfx.akashpise.dev), professional pre-built PDF React components.

Create beautiful, dynamic, and perfectly typed PDFs in React using standard Tailwind-like utility classes and strict property interfaces. PDFx provides a library of copy-pasteable blocks (Invoices, Reports, Receipts) that you fully own and customize inside your project.

Built on top of [@react-pdf/renderer](https://react-pdf.org/).

## Installation

Initialize the PDFx configuration and setup in your project:

```bash
npx pdfx-cli@latest init
```

## Adding Components

Add specific PDFx components directly into your local codebase. You own the code!

```bash
npx pdfx-cli@latest add badge
npx pdfx-cli@latest add table form qrcode
```

## Available Components
- `alert`
- `badge`
- `card`
- `data-table`
- `divider`
- `form`
- `heading`
- `keep-together`
- `key-value`
- `link`
- `list`
- `page-break`
- `page-footer`
- `page-header`
- `page-number`
- `pdf-image`
- `qrcode`
- `section`
- `signature`
- `stack`
- `table`
- `text`
- `watermark`

## Pre-Composed Blocks
Start with full, gorgeous templates.

```bash
npx pdfx-cli@latest block add invoice-modern
npx pdfx-cli@latest block add report-financial
```

## MCP & AI Agents

PDFx comes with first-class AI Agent integration via MCP (Model Context Protocol). Connect your AI IDE or Agent directly to the PDFx registry to instantly gain fluent context about PDFx component structures.

```bash
npx pdfx-cli@latest mcp init --client cursor
```

## Server-side / Node.js

PDFx components run in Node.js just as well as in the browser, so you can generate and save a
PDF to a file on the server. `@react-pdf/renderer` exposes `renderToFile`, `renderToBuffer`, and
`renderToStream` for this:

```tsx
import { renderToFile } from '@react-pdf/renderer';
import { Document, Page } from '@react-pdf/renderer';
import { Heading } from './src/components/pdfx/heading/pdfx-heading';
import { Text } from './src/components/pdfx/text/pdfx-text';

const doc = (
  <Document>
    <Page size="A4" style={{ padding: 40 }}>
      <Heading level={1}>Monthly Report</Heading>
      <Text>Generated server-side with PDFx.</Text>
    </Page>
  </Document>
);

// Write straight to disk:
await renderToFile(doc, './output.pdf');

// …or get a Buffer to return from an API route / attach to an email:
// const buffer = await renderToBuffer(doc);
```

See the full guide (Express, Next.js API routes, fonts) at
[pdfx.akashpise.dev/docs/server-side](https://pdfx.akashpise.dev/docs/server-side).

## Documentation

Full documentation, real-time PDF previews, and block gallery available at [pdfx.akashpise.dev](https://pdfx.akashpise.dev).

## License

MIT 
