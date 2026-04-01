# PDFx — Development Guide

## What is PDFx?

PDFx is a copy-paste component library for building PDF documents in React, modeled after
shadcn/ui. Components are **not installed as npm dependencies** — the CLI fetches source files
from the registry and copies them into the user's project.

## Architecture

```
apps/www           → Documentation site + registry server (Next.js)
packages/cli       → CLI / MCP server (pdfx-cli on npm)
packages/shared    → Cross-package types & schemas (Zod)
```

The registry lives at `apps/www/public/r/`. Each component is a JSON file built by
`pnpm build:registry` from source in `apps/www/src/registry/components/`.

## Component File Structure

Every component follows a **segregated file pattern**:

```
apps/www/src/registry/components/<name>/
  <name>.tsx        — Component implementation (the main export)
  <name>.styles.ts  — StyleSheet factory function
  <name>.types.ts   — TypeScript interfaces and type aliases
  <name>.test.tsx   — Vitest unit tests
  index.ts          — Barrel re-exports
```

> **Note:** The `graph` component is the only exception — it currently uses a single-file
> pattern at 893 lines. It is pending refactoring to match this structure.

## Component Naming Convention

PDFx uses a `Pdf` prefix when the component name would collide with widely-used exports from
React, HTML, or @react-pdf/renderer:

| Category | Components |
|---|---|
| **Prefixed** (`Pdf*`) | PdfAlert, PdfCard, PdfForm, PdfGraph, PdfImage, PdfList, PdfPageNumber, PdfQRCode, PdfSignatureBlock, PdfWatermark |
| **Unprefixed** | Badge, DataTable, Divider, Heading, KeepTogether, KeyValue, Link, PageBreak, PageFooter, PageHeader, Section, Stack, Table, Text |

### Rules for new components

1. **Use `Pdf` prefix** if the name collides with an HTML element, a React built-in, or a
   @react-pdf/renderer primitive (e.g. `Image` → `PdfImage`, `Text` exists in renderer →
   our `Text` is fine because it's the _same concept_).
2. **Skip the prefix** if the name is unique to PDFx's domain (e.g. `KeyValue`, `DataTable`).
3. **Never rename existing components** — that would be a breaking change for installed users.
4. Document the naming decision in the component's JSDoc.

## Registry Transform

The `transformForRegistry` function in `apps/www/src/lib/build-registry.ts` processes
component source before writing to `public/r/*.json`:

- Strips `@pdfx/shared` imports and inlines `PDFComponentProps`
- Injects `import type React from 'react'` when `React.*` types are used
- Rewrites workspace-relative paths to user-project paths
- Inlines `PdfxTheme` as `ReturnType<typeof usePdfxTheme>`
- Inlines `resolveColor` utility

**Always run `pnpm build:registry`** after modifying components or registry metadata.

## Testing

- Framework: Vitest
- Run all: `pnpm test`
- Run one: `cd apps/www && pnpm vitest run src/registry/components/<name>/`
- Tests must verify the component renders without throwing and accepts key props.

## Common Commands

```bash
pnpm dev:www            # Start docs site locally
pnpm build:registry     # Rebuild all registry JSON files
pnpm test               # Run full test suite
pnpm typecheck          # TypeScript type checking
pnpm lint               # Biome lint
pnpm format             # Biome format
```

## Anti-patterns

- **No runtime dependencies** in components — they must be self-contained after install.
- **No `eslint-disable` comments** — fix the root cause instead.
- **No `export const` for non-component values** in main component files — utilities go in
  `<name>.utils.ts` to avoid confusing MCP export inference.
