# PDFx Architecture

PDFx follows the same model as shadcn/ui: the website that documents the components **is** the registry that serves them. There is no separate component package published to npm.

## Package Layout

```
packages/shared/        types, Zod schemas, theme presets
                        imported by both packages/cli and apps/www

packages/cli/           pdfx CLI (pdfx add, pdfx block add, pdfx theme ...)
                        fetches component JSON from the HTTPS registry
                        never imports from apps/www directly

apps/www/               docs site + registry server (Vite + React)
  src/
    registry/
      components/       component source — the copy-paste target
      blocks/           block template source
      index.json        registry manifest (name, type, files, deps)
    lib/
      build-registry.ts transforms registry/components/ into public/r/*.json
      shadcn-registry.ts emits the parallel shadcn catalog at public/r/shadcn/
  public/
    r/                  HTTP-served JSON consumed by pdfx-cli
      shadcn/           shadcn CLI catalog + items (@pdfx namespace)
```

## Data Flow

```
apps/www/src/registry/components/<name>/<name>.tsx   (source of truth)
         |
         └── build-registry.ts  (pnpm build:registry)
               |  strips @pdfx/shared imports, inlines shared helpers
               v
         public/r/<name>.json                (pdfx-cli)
         public/r/shadcn/<name>.json         (shadcn CLI, namespaced @pdfx)
               |
               ├── pdfx add <name>
               └── npx shadcn add @pdfx/<name>
                     v
         user-project/src/components/pdfx/<name>/   (same file tree from either CLI)
```

## Key Design Decisions

**No runtime dependency.** `pdfx add` writes files into the user's project. They own the code from that point. Updating a component means running `pdfx add` again with `--force`, not bumping a package version.

**Theme system lives with the user.** `pdfx theme init` writes `pdfx-theme.ts` locally. All components read from it at runtime via `usePdfxTheme()`. The theme is just a typed object — no magic, no context provider the user can't see.

**`packages/shared` is the only cross-package contract.** It holds the Zod schemas that validate registry JSON, the TypeScript types shared between www and cli, and the three built-in theme presets (`professional`, `modern`, `minimal`).

**`@pdfx/components` is a dev-time path alias only.** `apps/www` uses `@pdfx/components → src/registry/components` as a TypeScript path alias so block source files can import components without long relative paths. `build-registry.ts` strips this alias before the JSON is served to the CLI.

## Component File Structure

Each component is a self-contained folder:

```
components/<name>/
  <name>.types.ts     exported TypeScript interfaces
  <name>.styles.ts    StyleSheet factory function
  <name>.tsx          component implementation
  <name>.test.tsx     smoke tests
  index.ts            barrel export
```

All three non-test files are listed in `index.json` and copied to the user's project together. This keeps types and styles colocated with the component they belong to.

## Testing

| Layer | Location | Pattern |
|-------|----------|---------|
| Components | `apps/www/src/registry/components/**/*.test.tsx` | 2 smoke tests per component |
| Registry transforms | `apps/www/src/lib/__tests__/build-registry.test.ts` | Pure function unit tests |
| shadcn registry | `apps/www/src/lib/__tests__/shadcn-registry.test.ts` | Dual-registry contract tests |
| CLI commands | `packages/cli/src/commands/*.test.ts` | Unit + integration with temp dirs |
| CLI utilities | `packages/cli/src/utils/*.test.ts` | Unit tests |

Run all tests: `pnpm test`
