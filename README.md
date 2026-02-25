# PDFx

![Alpha](https://img.shields.io/badge/status-alpha-orange?style=flat-square) ![License](https://img.shields.io/github/license/akii09/pdfx?style=flat-square)

**Stop manually styling PDFs. Copy-paste beautiful document templates for React.**

A professional React PDF component library built on [@react-pdf/renderer](https://react-pdf.org/). PDFx provides pre-built, themeable components and a CLI to add them to your project—inspired by [shadcn/ui](https://ui.shadcn.com/).

> [!WARNING]
> **PDFx is currently in alpha.** The API, component structure, and theme system are actively evolving. Breaking changes may occur between releases. Not recommended for production use yet — but we'd love your feedback and contributions!

## Features

- **Copy-paste components** — Add components directly to your codebase; no runtime dependency on PDFx
- **Theme system** — Typography, spacing, colors, and page settings via a single theme config
- **Theme presets** — Professional, Modern, and Minimal presets out of the box
- **CLI** — `pdfx add`, `pdfx init`, `pdfx theme switch` for fast setup
- **TypeScript** — Full type safety with Zod validation

## Prerequisites

- **Node.js** ≥ 24.0.0
- **pnpm** ≥ 10.0.0

## Installation

```bash
# Install the CLI globally
pnpm add -g @akii09/pdfx-cli

# Or use npx
npx @akii09/pdfx-cli init
```

## Quick Start

1. **Initialize PDFx** in your React + @react-pdf/renderer project:

   ```bash
   pdfx init
   ```

2. **Add components** from the registry:

   ```bash
   pdfx add text heading
   ```

3. **Use components** in your PDF document:

   ```tsx
   import { Document, Page } from '@react-pdf/renderer';
   import { Text, Heading } from './components/pdfx';

   export default () => (
     <Document>
       <Page>
         <Heading level={1}>Hello PDFx</Heading>
         <Text>Beautiful PDFs with minimal effort.</Text>
       </Page>
     </Document>
   );
   ```

## CLI Commands

| Command | Description |
|---------|-------------|
| `pdfx init` | Initialize PDFx in your project |
| `pdfx add <components...>` | Add components (e.g. `pdfx add text heading`) |
| `pdfx add <components...> --force` | Overwrite existing files |
| `pdfx list` | List available components from registry |
| `pdfx diff <components...>` | Compare local components with registry |
| `pdfx theme init` | Initialize or replace the theme file |
| `pdfx theme switch <preset>` | Switch theme (professional, modern, minimal) |
| `pdfx theme validate` | Validate your theme file |
| `pdfx template add <templates...>` | Add templates (e.g. `pdfx template add invoice-classic`) |
| `pdfx template list` | List available templates from registry |

## Theme Presets

| Preset | Use case |
|--------|----------|
| **Professional** | Business documents, reports, formal content |
| **Modern** | Tech-forward docs, vibrant colors |
| **Minimal** | Clean documentation, literary manuscripts |

## Project Structure (Monorepo)

```
pdfx/
├── apps/
│   ├── www/          # Documentation site
│   └── playground/   # Component playground
├── packages/
│   ├── ui/           # PDF components (Text, Heading, etc.)
│   ├── shared/       # Types, schemas, theme system
│   └── cli/          # pdfx CLI
├── configs/          # Shared configs
└── turbo.json        # Turborepo config
```

## Development

```bash
# Install dependencies
pnpm install

# Run all apps in dev mode
pnpm dev

# Run docs site only
pnpm dev:www

# Run playground only
pnpm dev:playground

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint & format
pnpm lint
pnpm format
```

## Contributing

We welcome contributions from everyone. Whether you're fixing a bug, adding a component, improving docs, or suggesting an idea—your help makes PDFx better for everyone.

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for a detailed guide on how to get started.

## Security

If you discover a security vulnerability, please **do not** open a public issue. Instead, see our **[Security Policy](./SECURITY.md)** for responsible disclosure instructions.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## License

MIT © [Akii](https://github.com/akii09)
