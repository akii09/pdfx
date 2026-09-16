# pdfx-cli

> The official CLI tool for [PDFx](https://getpdfx.dev), professional pre-built PDF React components.

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

## shadcn CLI

PDFx also publishes a shadcn-compatible registry. pdfx-cli URLs stay unchanged.

Requires an existing `components.json` (`npx shadcn@latest init` first). Leave `{name}` as a placeholder — the CLI substitutes the item name.

```bash
npx shadcn@latest registry add @pdfx=https://getpdfx.dev/r/shadcn/{name}.json
npx shadcn@latest add @pdfx/badge @pdfx/table
```

Components land in `src/components/pdfx/`, blocks in `src/blocks/pdfx/<name>/`. These targets are fixed — shadcn writes them verbatim rather than following your `components.json` aliases, and a project with no `src/` directory gets one. `@pdfx/theme` installs the `professional` preset; use `npx pdfx-cli theme switch` to change it, and avoid `shadcn add --overwrite` once you have edited `src/lib/pdfx-theme.ts`.

Always use the `@pdfx/` namespace. When `components.json` already exists, `npx pdfx-cli init` offers to register it for you — it prompts first and uses the registry URL you configured. Pass `--register-shadcn` or `--no-register-shadcn` to answer non-interactively.

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
[getpdfx.dev/docs/server-side](https://getpdfx.dev/docs/server-side).

## Documentation

Full documentation, real-time PDF previews, and block gallery available at [getpdfx.dev](https://getpdfx.dev).

## License

MIT 
