# PDFx Architecture

PDFx follows the same model as [shadcn/ui](https://ui.shadcn.com/): the website that documents the components **is** the registry that serves them. There is no separate component package published to npm.

## Package Layout

```
packages/shared/      — types, Zod schemas, theme presets
                        imported by both packages/cli and apps/www

packages/cli/         — pdfx CLI (pdfx add, pdfx block add, pdfx theme …)
                        fetches component JSON from HTTPS registry
                        never imports @pdfx/ui or any www source

apps/www/             — documentation site + component registry
  src/
    registry/
      ui/             — component source (the copy-paste target)
      lib/            — theme context + resolve-color helper
      blocks/         — block template source
      index.json      — registry manifest (name, type, files, deps)
    lib/
      build-registry.ts   — transforms registry/ui/ → public/r/*.json
  public/
    r/                — HTTP-served JSON consumed by the CLI
```

## Data Flow

```
apps/www/src/registry/ui/<name>/<name>.tsx   (source of truth)
         │
         └─ build-registry.ts (pnpm build:registry)
               │  transforms: strips @pdfx/shared imports, inlines helpers
               ▼
         public/r/<name>.json                (served over HTTPS)
               │
               └─ pdfx add <name>            (CLI fetches JSON, writes files)
                     ▼
         user-project/src/components/pdfx/<name>/  (component lives here)
```

## Key Design Rules

1. **No runtime dependency** — `pdfx add` writes files into the user's project. The user owns the code.
2. **Theme system lives with the user** — `pdfx theme init` writes `pdfx-theme.ts` locally. All components read from it at compile-time via `usePdfxTheme()`.
3. **`packages/shared` is the only cross-package contract** — it contains the Zod schemas that validate registry JSON, the TypeScript types shared between www and cli, and the theme presets.
4. **`@pdfx/ui` is a dev-time alias only** — `apps/www` uses `@pdfx/ui → src/registry/ui` as a TypeScript path alias so block source files can import components without long relative paths. This alias is stripped by `build-registry.ts` before the JSON is served.

## Testing

| Layer | Location | Pattern |
|---|---|---|
| Components | `apps/www/src/registry/ui/**/*.test.tsx` | 2 smoke tests per component (plain function call) |
| Registry transforms | `apps/www/src/lib/__tests__/build-registry.test.ts` | Pure function unit tests |
| CLI commands | `packages/cli/src/commands/*.test.ts` | Unit + integration (temp dirs, stubbed fetch) |
| CLI utilities | `packages/cli/src/utils/*.test.ts` | Unit tests |

Run all tests: `pnpm test`
