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

## Documentation

Full documentation, real-time PDF previews, and block gallery available at [pdfx.akashpise.dev](https://pdfx.akashpise.dev).

## License

MIT 
