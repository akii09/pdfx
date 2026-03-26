# Contributing to PDFx

PDFx is a copy-paste PDF component library built on react-pdf. Before anything else, read the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Before You Start

For anything beyond a typo fix, open an issue first. It takes 2 minutes and saves you from building something that won't be merged. Describe what you want to change and why if it fits the project direction, we'll say so and you can proceed.

---

## Setup

You need a **fork**. You don't have push access to this repo, so all PRs must come from your own fork.

**Requirements:** Node.js 24+, pnpm 10+

```bash
# 1. Fork on GitHub (click the Fork button on github.com/akii09/pdfx)

# 2. Clone your fork
git clone https://github.com/<your-username>/pdfx.git
cd pdfx

# 3. Add upstream so you can sync later
git remote add upstream https://github.com/akii09/pdfx.git

# 4. Install and build
pnpm install
pnpm build
pnpm dev
```

**Keeping your fork in sync** -  always do this before starting new work:

```bash
git fetch upstream
git rebase upstream/main
```

### Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start docs site + CLI watch mode |
| `pnpm dev:www` | Docs site only at localhost:3000 |
| `pnpm build` | Build all packages |
| `pnpm build:registry` | Rebuild the component registry JSON |
| `pnpm test` | Run all tests |
| `pnpm lint` | Biome lint + format check |
| `pnpm typecheck` | TypeScript strict check |
| `pnpm format` | Auto-format with Biome |

Run this before opening a PR:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

---

## Project Structure

```
apps/
  www/                        # Docs site + component registry
    src/
      registry/
        components/           # 24 PDF components (alert, badge, table, ...)
        blocks/               # Pre-built PDF templates (invoices, reports)
        index.json            # Registry manifest consumed by the CLI
      constants/              # Usage code + props tables for each docs page
      pages/components/       # Individual component docs pages

packages/
  shared/                     # Shared types, theme system, theme presets
  cli/                        # `pdfx add <component>` CLI tool
```

### How the registry works

The docs site (`apps/www`) serves component source files as JSON. When someone runs `pdfx add badge`, the CLI fetches the badge entry from `registry/index.json`, resolves the file list, and copies the source directly into their project. No runtime dependency on PDFx, the files are theirs once installed.

---

## Monorepo Packages

### `packages/shared`

Shared TypeScript types, the theme interface, primitives, and the three built-in theme presets: `professional`, `modern`, `minimal`. All components consume `PdfxTheme` from here, no component imports its own colors directly.

### `packages/cli`

The `pdfx` CLI. Handles `pdfx init`, `pdfx add <component>`, and `pdfx list`. Fetches from the live registry by default; can target a local registry with `--registry`.

### `apps/www`

The docs site and the registry server. Built with Vite + React. The registry build step (`pnpm build:registry`) reads `src/registry/components/` and writes `src/registry/index.json`.

---

## Adding a Component

Each component lives in its own folder under `apps/www/src/registry/components/<name>/`.

### Files

```
components/my-widget/
  my-widget.types.ts      # TypeScript interfaces
  my-widget.styles.ts     # StyleSheet factory function
  my-widget.tsx           # Component
  my-widget.test.tsx      # Smoke tests
  index.ts                # Barrel export
```

### 1. Types

```ts
// my-widget.types.ts
import type { PDFComponentProps } from '@pdfx/shared';

export type MyWidgetVariant = 'default' | 'primary';

/**
 * Short description of what this component renders.
 * Props - `label` | `variant` | `style`
 * @see {@link MyWidgetProps}
 */
export interface MyWidgetProps extends Omit<PDFComponentProps, 'children'> {
  label: string;
  /**
   * @default 'default'
   */
  variant?: MyWidgetVariant;
}
```

### 2. Styles

```ts
// my-widget.styles.ts
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createMyWidgetStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;

  return StyleSheet.create({
    container: {
      padding: spacing[3],
      borderRadius: t.primitives.borderRadius.md,
    },
    variantDefault: { backgroundColor: t.colors.muted },
    variantPrimary: { backgroundColor: t.colors.primary },
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
    },
  });
}
```

### 3. Component

```tsx
// my-widget.tsx
import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color';
import { createMyWidgetStyles } from './my-widget.styles';
import type { MyWidgetProps } from './my-widget.types';

export function MyWidget({ label, variant = 'default', style }: MyWidgetProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createMyWidgetStyles(theme), [theme]);

  const containerStyles: Style[] = [
    styles.container,
    variant === 'primary' ? styles.variantPrimary : styles.variantDefault,
  ];
  if (style) containerStyles.push(...[style].flat());

  return (
    <View style={containerStyles}>
      <PDFText style={styles.text}>{label}</PDFText>
    </View>
  );
}
```

### 4. Smoke tests

```tsx
// my-widget.test.tsx
import { describe, expect, it } from 'vitest';
import { MyWidget } from './my-widget';

describe('MyWidget', () => {
  it('renders without throwing', () => {
    expect(() => MyWidget({ label: 'Hello' })).not.toThrow();
  });

  it('accepts variant prop', () => {
    expect(() => MyWidget({ label: 'Hello', variant: 'primary' })).not.toThrow();
  });
});
```

### 5. Barrel export

```ts
// index.ts
export { MyWidget } from './my-widget';
export type { MyWidgetProps, MyWidgetVariant } from './my-widget.types';
```

### 6. Register the component

Add to `apps/www/src/registry/components/index.ts`:

```ts
export { MyWidget } from './my-widget/index';
export type { MyWidgetProps, MyWidgetVariant } from './my-widget/index';
```

Add to `apps/www/src/registry/index.json` under `items`:

```json
{
  "name": "my-widget",
  "type": "registry:ui",
  "title": "MyWidget",
  "description": "Short description.",
  "files": [
    { "path": "components/my-widget/my-widget.tsx", "type": "registry:component" },
    { "path": "components/my-widget/my-widget.styles.ts", "type": "registry:component" },
    { "path": "components/my-widget/my-widget.types.ts", "type": "registry:component" }
  ],
  "dependencies": [],
  "registryDependencies": []
}
```

### 7. Docs page

Create `apps/www/src/constants/my-widget.constant.ts` with `myWidgetUsageCode` and `myWidgetProps`, then register it in `apps/www/src/constants/index.ts`.

Create `apps/www/src/pages/components/my-widget.tsx` using `ComponentPage` + `PDFPreview`.

Add the lazy route in `apps/www/src/app/App.tsx` and add the component entry in `apps/www/src/pages/components/index.tsx`.

### 8. Verify

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm dev:www
```

Check localhost:3000/components/my-widget - preview renders, `pdfx add my-widget` installs cleanly.

---

## Adding a Theme Preset

1. Create the theme file in `packages/shared/src/themes/` (e.g. `academic.ts`) implementing `PdfxTheme`
2. Export it from `packages/shared/src/themes/index.ts`
3. Add it to `themePresets` and `ThemePresetName` in `packages/shared/src/themes/index.ts`
4. Document it in `apps/www/src/pages/components/getting-started/theming.tsx`

---

## Component Rules

- All styles come from the theme - no hardcoded colors or pixel values
- Use `resolveColor(value, theme.colors)` for any color prop
- Memoize the StyleSheet: `useSafeMemo(() => createXStyles(theme), [theme])`
- Compose style arrays as `[base, variant, dynamic, override]`
- Extend `PDFComponentProps` from `@pdfx/shared`
- Every component needs smoke tests

---

## Pull Requests

Branch off `main` in your fork:

```bash
git checkout -b feat/my-widget
```

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`, `test:`.

Keep PRs focused - one component, one fix, one thing. Large mixed PRs are hard to review and slow to merge.

Open as a **Draft PR** if you want early feedback before it's ready.

Run the full check before marking it ready:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Then open the PR against `akii09/pdfx:main` from your fork branch.

---

## Bugs and Ideas

Open an [issue](https://github.com/akii09/pdfx/issues) or start a [discussion](https://github.com/akii09/pdfx/discussions). For bugs, include a minimal reproduction.
