# Contributing to PDFx

Thank you for your interest in contributing to PDFx. This guide covers everything you need to get started, including the full step-by-step process for adding new components.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Adding a New Component](#adding-a-new-component)
- [Adding a New Theme Preset](#adding-a-new-theme-preset)
- [Project Conventions](#project-conventions)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behavior via [GitHub Discussions](https://github.com/akii09/pdfx/discussions).

---

## Development Setup

```bash
# Prerequisites: Node 24+ (dev), pnpm 10+
# Note: The CLI validates consumers against Node 20+, but development requires Node 24+.
# Clone your fork
git clone https://github.com/YOUR_USERNAME/pdfx.git
cd pdfx

# Install all dependencies (pnpm workspaces)
pnpm install

# Build all packages first (required before running apps)
pnpm build

# Run dev servers
pnpm dev              # All apps in parallel
pnpm dev:www          # Docs site only  (http://localhost:5173)
```

### Quality checks (run before submitting a PR)

```bash
pnpm lint        # Biome lint + format check
pnpm typecheck   # TypeScript strict check across all packages
pnpm test        # Vitest unit tests
pnpm build       # Full monorepo build
```

---

## How to Contribute

### Reporting Bugs

- Open a [GitHub Issue](https://github.com/akii09/pdfx/issues) using the Bug Report template
- Include: steps to reproduce, expected vs. actual behavior, your environment (Node, pnpm, OS)

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the use case and why it would benefit other developers

### Pull Requests

1. **Fork** the repo and clone it
2. **Install** dependencies: `pnpm install`
3. **Create a branch**: `git checkout -b feat/your-feature` or `fix/your-fix`
4. **Make changes** following the project conventions below
5. **Test**: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
6. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat: add Badge component`)
7. **Push** and open a PR against `main`

---

## Adding a New Component

This is a complete walkthrough for adding a new PDF component (e.g. `MyWidget`) to the registry.

### Overview of Files to Create/Modify

| File | Action |
|------|--------|
| `apps/www/src/registry/ui/my-widget/my-widget.tsx` | Create — component source |
| `apps/www/src/registry/ui/my-widget/my-widget.styles.ts` | Create — StyleSheet factory |
| `apps/www/src/registry/ui/my-widget/my-widget.types.ts` | Create — TypeScript interfaces |
| `apps/www/src/registry/ui/my-widget/my-widget.test.tsx` | Create — smoke tests |
| `apps/www/src/registry/ui/my-widget/index.ts` | Create — barrel re-export |
| `apps/www/src/registry/ui/index.ts` | Edit — re-export the component |
| `apps/www/src/registry/index.json` | Edit — register the component |
| `apps/www/src/constants/my-widget.constant.ts` | Create — usage code + props table |
| `apps/www/src/constants/index.ts` | Edit — re-export constants |
| `apps/www/src/pages/components/my-widget.tsx` | Create — documentation page |
| `apps/www/src/app/App.tsx` | Edit — add route |
| `apps/www/src/pages/components/index.tsx` | Edit — add to component list |

---

### Step 1: Create the Component

Create `apps/www/src/registry/ui/my-widget/my-widget.types.ts`:

```ts
import type { PDFComponentProps } from '@pdfx/shared';

export type MyWidgetVariant = 'default' | 'primary';

export interface MyWidgetProps extends Omit<PDFComponentProps, 'children'> {
  /** The content to display */
  label: string;
  /** Visual variant */
  variant?: MyWidgetVariant;
  /** Custom background color. Use a theme token or CSS color. */
  background?: string;
}
```

Create `apps/www/src/registry/ui/my-widget/my-widget.styles.ts`:

```ts
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createMyWidgetStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  const c = t.colors;

  return StyleSheet.create({
    container: {
      padding: spacing[3],
      borderRadius: t.primitives.borderRadius.md,
    },
    variantDefault: { backgroundColor: c.muted },
    variantPrimary: { backgroundColor: c.primary },
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: c.foreground,
    },
  });
}
```

Create `apps/www/src/registry/ui/my-widget/my-widget.tsx`:

```tsx
import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color';
import { createMyWidgetStyles } from './my-widget.styles';
import type { MyWidgetProps } from './my-widget.types';

export function MyWidget({
  label,
  variant = 'default',
  background,
  style,
}: MyWidgetProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createMyWidgetStyles(theme), [theme]);

  const containerStyles: Style[] = [
    styles.container,
    variant === 'primary' ? styles.variantPrimary : styles.variantDefault,
  ];

  if (background) {
    containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
  }

  if (style) containerStyles.push(style);

  return (
    <View style={containerStyles}>
      <PDFText style={styles.text}>{label}</PDFText>
    </View>
  );
}
```

Create `apps/www/src/registry/ui/my-widget/index.ts`:

```ts
export { MyWidget } from './my-widget';
export type { MyWidgetProps, MyWidgetVariant } from './my-widget.types';
```

**Key patterns to follow:**

- Derive all styles from `t` (the theme) inside the styles factory — zero hardcoded pixel values
- Use `resolveColor(value, theme.colors)` to resolve theme token names **and** pass raw CSS colors through unchanged
- Call `usePdfxTheme()` and memoize styles with `useSafeMemo(() => createXStyles(theme), [theme])`
- Compose style arrays: `[base, variant, dynamic, override]` — style override always last
- Extend `PDFComponentProps` from `@pdfx/shared`; use `Omit<PDFComponentProps, 'children'>` for leaf nodes

---

### Step 2: Write Smoke Tests

Create `apps/www/src/registry/ui/my-widget/my-widget.test.tsx`:

```tsx
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

Two assertions per component is the target. TypeScript handles prop validation statically; the smoke test catches import/runtime breakage.

---

### Step 3: Export from the Registry

Edit `apps/www/src/registry/ui/index.ts` and add:

```ts
export { MyWidget } from './my-widget/index';
export type { MyWidgetProps, MyWidgetVariant } from './my-widget/index';
```

Keep exports alphabetically ordered.

Edit `apps/www/src/registry/index.json` and add an entry to `items`:

```json
{
  "name": "my-widget",
  "type": "registry:ui",
  "title": "MyWidget",
  "description": "Short description.",
  "files": [
    { "path": "ui/my-widget/my-widget.tsx", "type": "registry:component" },
    { "path": "ui/my-widget/my-widget.styles.ts", "type": "registry:component" },
    { "path": "ui/my-widget/my-widget.types.ts", "type": "registry:component" }
  ],
  "dependencies": [],
  "registryDependencies": []
}
```

---

### Step 4: Create the Constants File

Create `apps/www/src/constants/my-widget.constant.ts`:

```ts
export const myWidgetUsageCode = `import { Document, Page } from '@react-pdf/renderer';
import { MyWidget } from '@/components/pdfx/pdfx-my-widget';

export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <MyWidget label="Hello World" />
        <MyWidget label="Primary Style" variant="primary" />
      </Page>
    </Document>
  );
}`;

export const myWidgetProps = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'The text content to display inside the widget.',
  },
  {
    name: 'variant',
    type: "'default' | 'primary'",
    defaultValue: "'default'",
    description: 'Visual style variant.',
  },
  {
    name: 'background',
    type: 'string',
    description: 'Custom background color. Use a theme token (e.g. "muted") or any CSS color.',
  },
  {
    name: 'style',
    type: 'Style',
    description: 'Custom @react-pdf/renderer styles applied to the container.',
  },
];
```

Then register in `apps/www/src/constants/index.ts`:

```ts
export * from './my-widget.constant.js';
```

---

### Step 5: Create the Documentation Page

Create `apps/www/src/pages/components/my-widget.tsx`:

```tsx
import { myWidgetProps, myWidgetUsageCode } from '@/constants';
// @pdfx/ui is a tsconfig path alias that resolves to apps/www/src/registry/ui/
// Components live in the registry, not a separate package.
import { MyWidget } from '@pdfx/ui';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { ComponentPage } from '../../components/component-page';
import { PDFPreview } from '../../components/pdf-preview';
import { useDocumentTitle } from '../../hooks/use-document-title';

type MyWidgetVariant = 'default' | 'primary';

const styles = StyleSheet.create({
  page: { padding: 40 },
});

const renderPreviewDocument = (variant: MyWidgetVariant) => (
  <Document title="PDFx MyWidget Preview">
    <Page size="A4" style={styles.page}>
      <MyWidget label="Example Widget" variant={variant} />
    </Page>
  </Document>
);

const variantOptions = [
  { value: 'default' as MyWidgetVariant, label: 'Default' },
  { value: 'primary' as MyWidgetVariant, label: 'Primary' },
];

export default function MyWidgetComponentPage() {
  useDocumentTitle('MyWidget Component');

  return (
    <ComponentPage
      title="MyWidget"
      description="Short description of what this component does and when to use it."
      installCommand="npx @akii09/pdfx-cli add my-widget"
      componentName="my-widget"
      preview={
        <PDFPreview
          title="Preview"
          downloadFilename="my-widget-preview.pdf"
          variants={{
            options: variantOptions,
            defaultValue: 'default' as MyWidgetVariant,
            label: 'Variant',
          }}
        >
          {/* biome-ignore lint/suspicious/noExplicitAny: Generic type workaround for React JSX components */}
          {renderPreviewDocument as any}
        </PDFPreview>
      }
      usageCode={myWidgetUsageCode}
      usageFilename="src/components/pdfx/pdfx-my-widget.tsx"
      props={myWidgetProps}
    />
  );
}
```

**Notes on `ComponentPage` props:**

| Prop | Description |
|------|-------------|
| `title` | Component display name |
| `description` | One-line description for the page header |
| `installCommand` | CLI install command shown as code |
| `componentName` | Kebab-case name, used to build registry URL |
| `preview` | `<PDFPreview>` element (with optional `variants` for dropdown) |
| `usageCode` | Raw usage code string from constants file |
| `usageFilename` | Shown in the code block header |
| `props` | Array of `{ name, type, required?, defaultValue?, description }` |
| `additionalInfo` | Optional JSX for extra guide sections below the props table |

---

### Step 6: Register the Route

Edit `apps/www/src/app/App.tsx`:

```tsx
// 1. Add lazy import at the top with other lazy imports
const MyWidgetPage = lazy(() => import('../pages/components/my-widget'));

// 2. Add Route inside <Route path="components">
<Route
  path="my-widget"
  element={
    <Suspense fallback={<PageLoader />}>
      <MyWidgetPage />
    </Suspense>
  }
/>
```

---

### Step 7: Add to the Components Index

Edit `apps/www/src/pages/components/index.tsx`:

```tsx
// 1. Import an icon from lucide-react
import { Puzzle } from 'lucide-react';

// 2. Add entry to the components array
{
  name: 'MyWidget',
  description: 'Short description shown on the components listing card.',
  href: '/components/my-widget',
  icon: Puzzle,
  install: 'npx @akii09/pdfx-cli add my-widget',
},
```

---

### Step 8: Verify

```bash
# Run full quality suite
pnpm lint && pnpm typecheck && pnpm test && pnpm build

# Start the docs site and navigate to /components/my-widget
pnpm dev:www
```

Check that:
- The component appears in the `/components` listing
- The doc page renders with a working PDF preview and variant dropdown
- The props table is complete and accurate
- All tests pass

---

## Adding a New Theme Preset

1. Create the theme in `packages/shared/src/themes/` (e.g. `academic.ts`)
   - Copy an existing preset (e.g. `professional.ts`) as a starting point
   - Adjust `colors`, `typography`, `spacing`, and `primitives` as needed
2. Export from `packages/shared/src/themes/index.ts`
3. Add to `ThemePresetName` union type and `themePresets` map in `packages/shared/src/index.ts`
4. Update `apps/www/src/pages/components/getting-started/theming.tsx` to document the new preset

---

## Project Conventions

### Code Style

- **Linting & Formatting**: Biome (`pnpm lint`, `pnpm format`)
- **TypeScript**: Strict mode — avoid `any` casts (use `as const satisfies` where appropriate)
- **Imports**: No default exports from component/library files; default exports only for page-level components (Next.js/React Router convention)

### Component Patterns

- All styles derived from theme tokens — **no hardcoded pixel values**
- `resolveColor(value, theme.colors)` for all color props — supports both token names and raw CSS
- Style arrays composed as `[base, variant, dynamic, override]`
- `usePdfxTheme()` + `useSafeMemo(() => createXStyles(theme), [theme])` inside the component — memoized per theme instance, safe for unit tests
- Extend `PDFComponentProps` from `@pdfx/shared`

### Naming

- Component files: `kebab-case.tsx` (e.g. `page-header.tsx`)
- Exported symbols: `PascalCase` (e.g. `PageHeader`, `PageHeaderProps`, `PageHeaderVariant`)
- Constants files: `kebab-case.constant.ts`

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: add MyWidget component`
- `fix: correct border radius in Card bordered variant`
- `docs: add KeyValue component page`
- `refactor: extract shared style caching utility`
- `test: add logo-right variant tests for PageHeader`

---

## Release Process

PDFX uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

1. After merging your PR, add a changeset if your change affects a published package:
   ```bash
   pnpm changeset
   ```
2. Follow the prompts to select the affected packages and bump type (`patch`, `minor`, `major`).
3. Commit the generated changeset file with your PR.
4. When changes are merged to `main`, the **Release** workflow will open a "Version Packages" PR automatically.
5. Merging that PR triggers a publish to npm.

> **Note**: Only maintainers can merge the version PR and trigger a publish.

## Git Workflows

For common git operations like **cherry-picking commits**, rebasing, and resolving conflicts, see the **[Git Workflows Guide](./.github/GIT_WORKFLOWS.md)**.

## Questions?

Open a [Discussion](https://github.com/akii09/pdfx/discussions) or comment on an existing issue.
