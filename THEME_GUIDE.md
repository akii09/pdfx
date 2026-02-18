# PDFX Theme & Component Guide

> A practical rulebook for customizing themes, adding components, and building templates in PDFX.
> This guide is for library contributors and users who want to create custom themes or extend the system.

---

## Table of Contents

1. [How the Theme System Works](#1-how-the-theme-system-works)
2. [Creating a Custom Theme](#2-creating-a-custom-theme)
3. [Switching the Active Theme](#3-switching-the-active-theme)
4. [Theme Token Reference](#4-theme-token-reference)
5. [Color Token Rules](#5-color-token-rules)
6. [Typography Token Rules](#6-typography-token-rules)
7. [Spacing Token Rules](#7-spacing-token-rules)
8. [Adding a New Component](#8-adding-a-new-component)
9. [Component Style Patterns](#9-component-style-patterns)
10. [Adding a New Template](#10-adding-a-new-template)
11. [Do / Don't](#11-do--dont)

---

## 1. How the Theme System Works

PDFX uses a **plain TypeScript object** as the theme — NOT React Context.

> **Why?** `@react-pdf/renderer` renders to PDF in a Node-like environment.
> React hooks (`useContext`, `useState`) do not work inside PDF components.
> The theme is imported directly by each component as a module-level constant.

```
pdfx-theme.ts          → imports the active theme preset
     ↓
Component (e.g. Badge) → imports theme from pdfx-theme
     ↓
createXStyles(theme)   → creates StyleSheet.create({...}) with theme values
     ↓
Style arrays           → applied to @react-pdf/renderer View/Text elements
```

**One theme is active per build.** To switch themes, change the import in `packages/ui/src/lib/pdfx-theme.ts`.

---

## 2. Creating a Custom Theme

### Step 1 — Create a theme file

Create a new file in `packages/shared/src/themes/`:

```ts
// packages/shared/src/themes/corporate.ts
import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Corporate theme.
 *
 * Character: Deep navy blue headings, clean Helvetica body, formal document feel.
 * Ideal for business reports and corporate presentations.
 */
export const corporateTheme: PdfxTheme = {
  name: 'corporate',

  // Always start with defaultPrimitives — only override what you need
  primitives: defaultPrimitives,

  colors: {
    foreground: '#1a1a2e',        // Deep navy for body text
    background: '#ffffff',        // White page background
    muted: '#f0f0f5',             // Light blue-grey for table headers
    mutedForeground: '#6b6b8a',   // Muted text for captions
    primary: '#1a1a2e',           // Navy primary color
    primaryForeground: '#ffffff', // White text on primary backgrounds
    border: '#d8d8e8',            // Subtle blue-grey borders
    accent: '#0055b3',            // Corporate blue for links and highlights
    destructive: '#c0392b',       // Red for errors/overdue
    success: '#1a7a4a',           // Dark green for paid/approved
    warning: '#c47a1d',           // Amber for pending
    info: '#0077cc',              // Blue for informational
  },

  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,       // Points (not pixels)
      lineHeight: 1.55,
    },
    heading: {
      fontFamily: 'Helvetica-Bold',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 30, h2: 22, h3: 18,
        h4: 15, h5: 13, h6: 11,
      },
    },
  },

  spacing: {
    page: {
      marginTop: 56,     // pt (1pt = 1/72 inch)
      marginRight: 48,
      marginBottom: 56,
      marginLeft: 48,
    },
    sectionGap: 28,      // Space between major document sections
    paragraphGap: 10,    // Space between paragraphs
    componentGap: 14,    // Space between a text block and a component (table, etc.)
  },

  page: {
    size: 'A4',          // 'A4' | 'LETTER' | 'LEGAL'
    orientation: 'portrait', // 'portrait' | 'landscape'
  },
};
```

### Step 2 — Register it in the theme index

```ts
// packages/shared/src/themes/index.ts
export { corporateTheme } from './corporate.js';

export const themePresets = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  corporate: corporateTheme,   // ← add here
} as const;

export type ThemePresetName = keyof typeof themePresets;
// → 'professional' | 'modern' | 'minimal' | 'corporate'
```

### Step 3 — Export it from the shared package

```ts
// packages/shared/src/index.ts — already handled by themes/index.ts re-export
// No change needed if themes/index.ts is already exported.
```

---

## 3. Switching the Active Theme

The **active theme** is set in one place:

```ts
// packages/ui/src/lib/pdfx-theme.ts
import { corporateTheme } from '@pdfx/shared';

// Change this import to switch the active theme for ALL components
export const theme = corporateTheme;
```

**All components** (`Badge`, `Heading`, `Table`, etc.) automatically pick up the new theme on the next build/restart.

### Playground usage (per-theme render)

In `apps/playground`, you can render multiple themes side by side by passing the theme
directly to a `ThemeShowcasePage` component:

```tsx
import { corporateTheme } from '@pdfx/shared';

<ThemeShowcasePage theme={corporateTheme} />
```

> Note: playground components use the theme directly from props, not from `pdfx-theme.ts`.

---

## 4. Theme Token Reference

```
PdfxTheme
├── name: string                       ← Unique identifier (e.g. 'corporate')
├── primitives: PrimitiveTokens        ← Raw design scales (shared base)
│   ├── typography: TypographyScale    ← xs, sm, base, lg, xl, 2xl, 3xl (in pt)
│   ├── spacing: SpacingScale          ← 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 (in pt)
│   ├── fontWeights: FontWeights       ← regular(400), medium(500), semibold(600), bold(700)
│   ├── lineHeights: LineHeights       ← tight(1.2), normal(1.4), relaxed(1.6)
│   ├── borderRadius: BorderRadiusScale← none(0), sm(2), md(4), lg(8), full(9999) (in pt)
│   └── letterSpacing: LetterSpacingScale← tight, normal, wide, wider
├── colors: ColorTokens                ← 12 semantic color tokens
├── typography: TypographyTokens       ← body + heading font decisions
├── spacing: SpacingTokens             ← page margins + section/paragraph/component gaps
└── page: PageTokens                   ← size + orientation defaults
```

### Color Tokens (`colors.*`)

| Token              | Purpose                                            |
|--------------------|---------------------------------------------------|
| `foreground`       | Primary text and content                          |
| `background`       | Page / card background                            |
| `muted`            | Secondary backgrounds (table headers, code)       |
| `mutedForeground`  | Captions, footnotes, secondary text               |
| `primary`          | Brand color — headings, buttons, key emphasis     |
| `primaryForeground`| Text on primary-colored backgrounds               |
| `border`           | All borders, dividers, table lines                |
| `accent`           | Links, chart series, call-to-action               |
| `destructive`      | Errors, overdue, delete actions                   |
| `success`          | Paid, approved, completed states                  |
| `warning`          | Pending, caution states                           |
| `info`             | Informational badges and hints                    |

---

## 5. Color Token Rules

**✅ DO:**
- Always use semantic tokens: `colors.primary`, `colors.border`, etc.
- Use `resolveColor(value, colors)` in components — accepts both token keys AND raw hex/rgb
- Verify WCAG AA contrast (≥ 4.5:1) for body text against `background`
- Use `colors.success` for "Paid", `colors.destructive` for "Overdue"

**❌ DON'T:**
- Hardcode hex values inside components: `color: '#3b82f6'`
- Use warning/info colors for large text blocks (poor readability)
- Use oklch or CSS variables — `@react-pdf/renderer` only supports hex, `rgb()`, `hsl()`
- Mix semantic roles (e.g. using `destructive` for general "highlight")

---

## 6. Typography Token Rules

**✅ DO:**
- Use `theme.typography.body.fontFamily` for all body/caption/label text
- Use `theme.typography.heading.fontFamily` for all headings
- Use `theme.primitives.typography.*` for size overrides (xs, sm, base, lg, etc.)
- Use `theme.primitives.fontWeights.*` for weights (never raw numbers like `700`)

**❌ DON'T:**
- Hardcode font families: `fontFamily: 'Helvetica'`
- Use system fonts not available in `@react-pdf/renderer` (only: Helvetica, Times-Roman, Courier + Bold/Italic variants)
- Use `px` for font sizes — PDFs use `pt` (points). 11pt ≈ 14.7px

### Available built-in fonts

```
Helvetica        Helvetica-Bold       Helvetica-Oblique    Helvetica-BoldOblique
Times-Roman      Times-Bold           Times-Italic         Times-BoldItalic
Courier          Courier-Bold         Courier-Oblique      Courier-BoldOblique
```

> For custom fonts: use `Font.register()` from `@react-pdf/renderer` before rendering.

---

## 7. Spacing Token Rules

**All spacing values are in PDF points (pt).** 1pt = 1/72 inch.

**Common reference values:**

| Value      | pt   | mm    | Approx use                        |
|------------|------|-------|-----------------------------------|
| `spacing[1]`  | 4pt  | 1.4mm | Tight internal padding           |
| `spacing[2]`  | 8pt  | 2.8mm | Small gap                        |
| `spacing[3]`  | 12pt | 4.2mm | Component internal padding sm    |
| `spacing[4]`  | 16pt | 5.6mm | Standard padding / small margin  |
| `spacing[6]`  | 24pt | 8.5mm | Standard section gap (small)     |
| `spacing[8]`  | 32pt | 11.3mm | Large gap between sections      |
| `spacing[10]` | 40pt | 14.1mm | Standard page margin (modern)   |
| `spacing[12]` | 48pt | 16.9mm | Wide page margin                |
| `spacing[16]` | 64pt | 22.6mm | Very wide margin                |

**✅ DO:**
- Use `spacing.sectionGap` between major document sections
- Use `spacing.componentGap` between a text block and the next component (table, etc.)
- Use `spacing.paragraphGap` as `marginBottom` on Text components
- Keep page margins ≥ `36pt` (A4/Letter standard minimum)

**❌ DON'T:**
- Hardcode `marginVertical: 24` — use `spacing[6]` instead
- Use `px` units in @react-pdf/renderer styles — pt only
- Use `sectionGap` between small inline elements — use `componentGap`

---

## 8. Adding a New Component

Follow this exact folder structure and pattern for every new component:

```
packages/ui/src/components/
└── my-component/
    ├── my-component.tsx        ← Component implementation
    ├── my-component.test.tsx   ← Vitest tests (required)
    └── index.ts                ← Barrel export
```

### Component template

```tsx
// packages/ui/src/components/my-component/my-component.tsx
import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

// 1. Export all variant/size types
export type MyComponentVariant = 'default' | 'outlined';

// 2. Define props interface — extend PDFComponentProps for style prop support
export interface MyComponentProps extends PDFComponentProps {
  variant?: MyComponentVariant;
  color?: string; // Always use resolveColor() for color props
}

// 3. createStyles function — receives theme, returns StyleSheet.create({})
//    NEVER use theme directly inside JSX — only use the returned styles object
function createMyComponentStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
    },
    variantDefault: {
      backgroundColor: t.colors.muted,
    },
    variantOutlined: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
  });
}

// 4. Create styles at module level from the imported theme
const styles = createMyComponentStyles(theme);

// 5. Create lookup maps for variants/sizes
const variantMap: Record<MyComponentVariant, Style> = {
  default: styles.variantDefault,
  outlined: styles.variantOutlined,
};

// 6. Export the component with destructured props + defaults
export function MyComponent({
  variant = 'default',
  color,
  children,
  style, // Always accept and apply last
}: MyComponentProps) {
  const styleArray: Style[] = [styles.base, variantMap[variant]];

  // 7. Resolve color props with resolveColor()
  if (color) {
    styleArray.push({ color: resolveColor(color, theme.colors) });
  }

  // 8. Always apply custom style last (user overrides everything)
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray}>{children}</View>;
}
```

### Barrel export (`index.ts`)

```ts
export { MyComponent } from './my-component';
export type { MyComponentProps, MyComponentVariant } from './my-component';
```

### Register in `packages/ui/src/index.ts`

```ts
export {
  MyComponent,
  type MyComponentProps,
  type MyComponentVariant,
} from './components/my-component';
```

### Required test coverage

Every component needs a test file. Test these at minimum:

```ts
// my-component.test.tsx
import { describe, expect, it } from 'vitest';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const result = MyComponent({ children: 'Test' });
    expect(result).toBeDefined();
  });
  it('applies default variant', () => { /* ... */ });
  it('applies color with theme token', () => { /* ... */ });
  it('applies color with raw CSS color', () => { /* ... */ });
  it('applies style override last', () => { /* ... */ });
});
```

---

## 9. Component Style Patterns

### ✅ Style array pattern (always use this)

```tsx
// CORRECT — style array lets each layer override the previous
const styleArray: Style[] = [
  styles.base,          // 1. Base defaults
  styles.variantX,      // 2. Variant styles
  { color: '#...' },    // 3. Dynamic computed styles
  style,                // 4. User-supplied style (always last)
];
return <View style={styleArray} />;
```

### ✅ Color prop pattern (always use resolveColor)

```tsx
// Accepts BOTH theme tokens ('primary', 'border') AND raw CSS colors ('#ff0000')
if (color) {
  styleArray.push({ color: resolveColor(color, theme.colors) });
}
```

### ❌ Never do these

```tsx
// WRONG — hardcoded values bypass the theme
<View style={{ color: '#3b82f6', padding: 16 }} />

// WRONG — inline theme access (hard to test, breaks StyleSheet optimization)
<View style={{ color: theme.colors.primary }} />

// WRONG — using React Context or hooks (not supported in @react-pdf/renderer)
const ctx = useContext(ThemeContext);
```

### ✅ Conditional style pattern

```tsx
// Prefer explicit if-checks over ternaries for readability
if (border) {
  styleArray.push(styles.border);
}
if (noMargin) {
  styleArray.push(styles.noMargin);
}
```

---

## 10. Adding a New Template

Templates live in `apps/playground/src/` or can be documented in `apps/www/src/pages/`.

A template is a complete multi-component layout for a specific document type (invoice, report, resume, etc.).

### Template pattern

```tsx
// apps/playground/src/templates/InvoiceTemplate.tsx
import { Page, View, Document } from '@react-pdf/renderer';
import {
  Badge, Heading, KeyValue, PageHeader, PageFooter,
  Table, TableHeader, TableBody, TableRow, TableCell,
  Divider, Text, Stack
} from '@pdfx/ui';
import { theme } from '@pdfx/ui/lib/pdfx-theme'; // import active theme

export function InvoiceTemplate() {
  return (
    <Document>
      <Page
        size={theme.page.size}
        style={{
          paddingTop: theme.spacing.page.marginTop,
          paddingRight: theme.spacing.page.marginRight,
          paddingBottom: theme.spacing.page.marginBottom,
          paddingLeft: theme.spacing.page.marginLeft,
          backgroundColor: theme.colors.background,
        }}
      >
        <PageHeader title="INVOICE" subtitle="Acme Corporation" rightText="INV-0042" />

        <KeyValue
          items={[
            { key: 'Bill To', value: 'Jane Smith' },
            { key: 'Due Date', value: '2026-03-01' },
            { key: 'Status', value: 'Paid', valueColor: 'success' },
          ]}
          direction="horizontal"
          divided
        />

        <Divider spacing="sm" />

        {/* Line items table */}
        <Table variant="grid">
          ...
        </Table>

        <PageFooter
          leftText="© 2026 Acme Corp. All rights reserved."
          rightText="Page 1 of 1"
        />
      </Page>
    </Document>
  );
}
```

### Template rules

1. **One template = one document type.** Don't mix invoice and report in one file.
2. **Use `theme.spacing.page.*` for page padding.** Never hardcode page margins.
3. **Always include `PageHeader` and `PageFooter`.** Every professional document has them.
4. **Use `KeyValue` for metadata.** Don't build custom key/value rows inline.
5. **Use `Badge` for status indicators.** Use semantic variants: `success`, `warning`, `destructive`.
6. **Use `Divider` between sections.** Don't use `marginVertical` hacks.
7. **Default page size from theme.** `size={theme.page.size}` — don't hardcode 'A4'.

---

## 11. Do / Don't

### Colors

| ✅ Do | ❌ Don't |
|-------|----------|
| `colors.primary` | `'#18181b'` |
| `colors.success` for "Paid" | `'green'` for "Paid" |
| `resolveColor('accent', colors)` | Direct hex in component |
| Verify 4.5:1 contrast for body text | Low-contrast muted text on muted bg |

### Spacing

| ✅ Do | ❌ Don't |
|-------|----------|
| `spacing[4]` (16pt) | `16` hardcoded |
| `sectionGap` between sections | `sectionGap` between list items |
| `componentGap` between text + component | Custom magic numbers |
| Page margins ≥ 36pt | `marginTop: 0` on page |

### Typography

| ✅ Do | ❌ Don't |
|-------|----------|
| `theme.typography.body.fontFamily` | `'Helvetica'` |
| `primitives.typography.xs` (10pt) | `fontSize: 8` |
| `primitives.fontWeights.bold` | `fontWeight: 700` |

### Components

| ✅ Do | ❌ Don't |
|-------|----------|
| `style` prop applied last | Override styles before base |
| `createXStyles(theme)` at module level | Create styles inside render function |
| Export all types from `index.ts` | Export only the component |
| Write tests for all variants | Skip tests for "obvious" code |

### Architecture

| ✅ Do | ❌ Don't |
|-------|----------|
| Import theme at module level | Use React.useContext() |
| Plain `PdfxTheme` object | React Context / Provider |
| `StyleSheet.create({...})` | Inline style objects |
| Style arrays `[base, variant, override]` | Single merged style object |
