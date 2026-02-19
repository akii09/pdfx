# PDFX — Developer Suggestions & Roadmap

This document captures concrete feature requests and improvements from the perspective of a developer using PDFX to build PDF-generating applications. Items are grouped by theme and roughly ordered by perceived impact.

---

## 1. Missing Components (High Value)

These are the components most commonly needed for professional documents that PDFX does not yet include.

### 1.1 Form Input Components
PDF forms are used in contracts, applications, and surveys. Developers need:

| Component | Description |
|-----------|-------------|
| `PdfTextField` | Single-line text field with label, placeholder line, and optional value |
| `PdfTextArea` | Multi-line text area with border or lines |
| `PdfCheckbox` | Checkbox with label, checked/unchecked state, and optional group layout |
| `PdfRadioGroup` | Set of mutually exclusive options with labels |
| `PdfSelect` | Drop-down field (static display for print) |
| `PdfFieldGroup` | Wrapper to group related fields with a section label |

These are essential for invoice PDFs with billing address blocks, employment contracts, medical intake forms, and event registration forms.

### 1.2 Branding / Identity Components

| Component | Description |
|-----------|-------------|
| `PdfLogoBlock` | Logo image + company name + tagline block, flexible alignment |
| `PdfWatermark` | Diagonal or centered background watermark text ("CONFIDENTIAL", "DRAFT") |
| `PdfStamp` | Circular or rectangular approval/rejection stamp overlay |

### 1.3 Layout & Navigation

| Component | Description |
|-----------|-------------|
| `PdfPageNumber` | Auto page numbering with "Page X of Y" format, rendered via `<Text render>` |
| `PdfPageShell` | Full-page layout wrapper that positions header, footer, and body content automatically |
| `PdfTwoColumn` | Side-by-side column layout helper (avoids manual flexbox setup) |
| `PdfSidebar` | Narrow left or right sidebar column — common in resumes, reports |

### 1.4 Data Visualization

| Component | Description |
|-----------|-------------|
| `PdfProgressBar` | Horizontal bar showing a percentage (skills, completion, KPIs) |
| `PdfRating` | Star or dot rating display (e.g. employee evaluations, skill ratings) |
| `PdfTimeline` | Vertical event timeline — common in resumes, project histories |
| `PdfBarChart` | Simple horizontal or vertical bar chart (SVG-based) |

---

## 2. Core API Improvements

### 2.1 Page Number Support
`@react-pdf/renderer` supports dynamic page numbering via `<Text render={({ pageNumber, totalPages }) => ...} />`. PDFX should provide a ready-to-use `PdfPageNumber` component that wraps this pattern cleanly, avoiding the need for users to understand the render prop API.

**Proposed API:**
```tsx
<PdfPageNumber format="Page {page} of {total}" align="center" />
```

### 2.2 `PageFooter` / `PageHeader` Auto-positioning
Currently, headers and footers are placed manually inside `<Page>`. react-pdf supports `fixed` positioning for elements that repeat on every page. A `fixed` prop on `PageHeader` and `PageFooter` would eliminate the need to add them to each `<Page>` manually.

**Proposed API:**
```tsx
<PageHeader title="Invoice" fixed />   // renders on every page automatically
<PageFooter leftText="© 2026" fixed />
```

### 2.3 Conditional Rendering Utilities
A common pattern is showing content only on the first page or only on the last page. A `<PdfConditional>` helper wrapping the render-prop API would reduce boilerplate.

### 2.4 Image Component
PDFX currently has no `PdfImage` wrapper. Developers must use `@react-pdf/renderer`'s `<Image>` directly with no theming or convenience props. A wrapper with `fit`, `rounded`, `border`, `caption` props would add real value.

**Proposed API:**
```tsx
<PdfImage src="https://..." width={200} rounded caption="Figure 1: Architecture" />
```

---

## 3. Developer Experience

### 3.1 CLI Improvements
- `pdfx list` — show all available components with one-line descriptions
- `pdfx add --all` — add all components at once (useful for new projects)
- `pdfx upgrade` — re-fetch the latest version of an already-added component from the registry
- `pdfx theme list` — list available theme presets
- `pdfx preview <file>` — open a local PDF preview for a document file (stretch goal)

### 3.2 TypeScript Types Improvements
- Export a `ThemeColors` type that maps all theme color token names — useful for typed `color` and `background` props
- Export a `SpacingScale` type for typed spacing values
- Consider a stricter `resolveColor<K extends ThemeColorKey>(...)` overload for IDE autocomplete

### 3.3 VS Code Snippets
A `pdfx.code-snippets` file (or a VS Code extension) with snippets for:
- `pdfx-doc` — boilerplate `<Document><Page>...</Page></Document>` scaffold
- `pdfx-invoice` — full invoice template
- `pdfx-table` — `<Table>` with header/body/footer scaffold

### 3.4 Storybook / Visual Regression Testing
Adding Storybook (web-based PDF preview) or a visual snapshot system would catch regressions when themes or component styles change. Each component could have stories that render at multiple variants and sizes.

---

## 4. Theming Improvements

### 4.1 Runtime Theme Switching
Currently, switching themes requires changing the `import` in `pdfx-theme.ts` at build time. A React Context approach (wrapping `<Document>`) that passes the theme down to components would allow:
- Different themes per document in the same app
- Dynamic theme selection without rebuilding

**Note:** This requires careful implementation because `@react-pdf/renderer` components cannot use React hooks during render. The recommended approach is to pass the theme as a prop to each component family rather than using context.

### 4.2 Partial Theme Overrides
Allow developers to override individual tokens without writing a full theme preset:

```ts
import { professionalTheme } from '@pdfx/shared';
export const theme = {
  ...professionalTheme,
  colors: {
    ...professionalTheme.colors,
    primary: '#7c3aed', // Override just the primary color
  },
};
```

This already works today but is not documented clearly.

### 4.3 Dark Mode / Inverted Themes
A `dark` variant of each preset (inverted backgrounds) for cover pages or highlighted sections.

### 4.4 More Theme Presets
Currently there are 3 presets (professional, modern, minimal). Additional presets would widen appeal:
- `academic` — serif fonts, classic spacing, footnote-style typography
- `brand` — configurable primary brand colors, marketing-focused
- `compact` — dense spacing for data-heavy reports

---

## 5. Documentation Improvements

### 5.1 Template Gallery
A gallery of ready-to-use document templates (invoice, resume, report, contract) that developers can copy and start from. Each template demonstrates multiple components working together.

### 5.2 Figma Kit
A Figma component library matching PDFX components, so designers can mock up PDF documents that map 1:1 to what the code produces.

### 5.3 Live Code Editor
An in-browser code editor on the docs site (using Monaco) where developers can experiment with components in real time before installing.

### 5.4 Migration Guide
If any breaking API changes are made, a versioned migration guide explaining what changed and how to update.

---

## 6. Quality & Testing

### 6.1 Visual Snapshot Tests
Add `@react-pdf/testing` or a similar tool to render PDFs to PNG and compare against snapshots. This would catch visual regressions in component styles when theme tokens or layout logic changes.

### 6.2 Cross-Theme Tests
Run existing unit tests against all three theme presets, not just the default `professionalTheme`. Color and spacing tokens vary between themes and edge cases (e.g. very dark primary colors) may cause contrast issues.

### 6.3 Accessibility Annotations
PDF accessibility (PDF/UA standard) requires structural tagging. `@react-pdf/renderer` has basic support via `aria-label` and document structure. PDFX components could expose `aria-*` props and set sensible defaults for screen-reader accessibility.

---

## 7. Ecosystem

### 7.1 Next.js Integration Guide
Document the recommended approach for using PDFX in a Next.js API route (server-side PDF generation) vs. client-side rendering. Include caveats about font loading in server contexts.

### 7.2 React Native Compatibility Note
Clarify whether PDFX components work in React Native (they do not — `@react-pdf/renderer` is web-only). Add a clear note in the README to avoid confusion.

### 7.3 Server-Side Rendering (Node.js)
`@react-pdf/renderer` supports `renderToBuffer()` for server-side PDF generation. PDFX components work in this context. A guide and example showing how to generate and stream PDFs from a Node.js server (Express, Next.js Route Handlers) would be very useful.

### 7.4 Plugin System
A mechanism for third-party component packs (e.g. `@pdfx/charts`, `@pdfx/forms`) that follow the same theming and API conventions as the core library.

---

## Priority Summary

| Priority | Item |
|----------|------|
| P0 | `PdfPageNumber` component (very commonly needed) |
| P0 | `fixed` prop for PageHeader/PageFooter (repeat on every page) |
| P1 | Form input components (PdfTextField, PdfCheckbox) |
| P1 | `PdfImage` wrapper component |
| P1 | `PdfWatermark` / `PdfStamp` |
| P2 | CLI `pdfx upgrade` command |
| P2 | More theme presets (academic, brand) |
| P2 | Template gallery |
| P3 | Visual snapshot tests |
| P3 | Runtime theme switching |
| P3 | Figma kit |
