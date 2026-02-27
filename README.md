# PDFx

![Alpha](https://img.shields.io/badge/status-alpha-orange?style=flat-square)
![npm](https://img.shields.io/npm/v/@akii09/pdfx-cli?style=flat-square&label=cli)
![Downloads](https://img.shields.io/npm/dm/@akii09/pdfx-cli?style=flat-square)

**Beautiful PDF components for React. Copy-paste. No lock-in.**

Built on [@react-pdf/renderer](https://react-pdf.org/) and inspired by [shadcn/ui](https://ui.shadcn.com/) — PDFx gives you pre-built, themeable document components and a CLI to add them directly into your codebase.

---

## Features

- **Copy-paste components** — Components live in your project. No PDFx runtime dependency.
- **Theme system** — Control typography, spacing, colors, and page settings from a single config.
- **CLI** — `pdfx init`, `pdfx add`, `pdfx theme switch` for instant setup.
- **TypeScript** — Full type safety with Zod validation throughout.

## Prerequisites

- Node.js ≥ 24.0.0
- A React project with `@react-pdf/renderer` installed

## Quick Start

```bash
# Initialize PDFx in your project
npx @akii09/pdfx-cli@alpha init

# Add components
pdfx add heading text table

# Use them
```

```tsx
import { Document, Page } from '@react-pdf/renderer';
import { Heading, Text } from './components/pdfx';

export default () => (
  <Document>
    <Page>
      <Heading level={1}>Hello PDFx</Heading>
      <Text>Beautiful PDFs with minimal effort.</Text>
    </Page>
  </Document>
);
```

## CLI

| Command | Description |
|---------|-------------|
| `pdfx init` | Initialize PDFx in your project |
| `pdfx add <components...>` | Add components from the registry |
| `pdfx add <components...> --force` | Overwrite existing components |
| `pdfx list` | List all available components |
| `pdfx diff <components...>` | Compare local vs registry version |
| `pdfx theme init` | Set up the theme file |
| `pdfx theme switch <preset>` | Switch theme preset |
| `pdfx theme validate` | Validate your theme file |
| `pdfx template add <templates...>` | Add a template (e.g. `invoice-classic`) |
| `pdfx template list` | List available templates |

## Theme Presets

| Preset | Best for |
|--------|----------|
| `professional` | Business documents, reports, formal content |
| `modern` | Tech-forward docs, vibrant colors |
| `minimal` | Clean documentation, simple layouts |

## Available Components

Run `pdfx list` to see all components with install status. Current highlights:

`heading` `text` `table` `data-table` `badge` `card` `list` `form` `key-value` `signature` `page-header` `page-footer` `pdf-image` `graph` `divider` `stack` `section` and more.

## Project Structure

```
pdfx/
├── apps/
│   ├── www/          # Documentation site
│   └── playground/   # Component playground
├── packages/
│   ├── ui/           # PDF components
│   ├── shared/       # Types, schemas, theme system
│   └── cli/          # pdfx CLI
└── turbo.json
```

## Contributing

Contributions are welcome — bug fixes, new components, docs improvements, or ideas.

See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## License

MIT © [Akii](https://github.com/akii09)