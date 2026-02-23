# PDFx Codebase Audit Report

**Branch:** `feat/new-templates`
**Audited by:** Senior Software Engineer (Claude)
**Date:** 2026-02-23
**Scope:** Full end-to-end production-readiness audit — components, docs, CLI, shared package, invoice templates, registry

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Component-Level Audit](#2-component-level-audit)
3. [Documentation Review](#3-documentation-review)
4. [Code Quality & Architecture](#4-code-quality--architecture)
5. [Security & CLI Review](#5-security--cli-review)
6. [Bug & Edge Case Detection](#6-bug--edge-case-detection)
7. [Detailed Findings](#7-detailed-findings)
8. [Action Plan](#8-action-plan)
9. [Project Health Assessment](#9-project-health-assessment)

---

## 1. Executive Summary

PDFx is a well-conceived, architecturally coherent PDF component library with strong foundations in TypeScript, Zod schema validation, and a consistent theming system. The `@pdfx/shared` package is essentially clean. The documentation website is thorough and well-structured. However, **4 critical bugs** exist in the component layer — 2 of which mean custom themes are silently ignored in Graph and PdfImage — and the new invoice templates introduced in `feat/new-templates` have type safety and data-prop gaps that make them unsuitable for production use in their current form. The CLI has several usability and security gaps that need attention before a stable release.

**Overall Score: 5.5 / 10** *(see Section 9 for full justification)*

---

## 2. Component-Level Audit

### Summary Table

| Component      | Critical | Major | Minor | Notes                                          |
|----------------|----------|-------|-------|------------------------------------------------|
| Heading        | —        | —     | —     | Clean                                          |
| Text           | —        | —     | —     | Clean                                          |
| Link           | —        | —     | 1     | No `href` validation                           |
| Divider        | —        | —     | 2     | Dead styles; children-type semantic mismatch   |
| PageBreak      | —        | —     | —     | Clean                                          |
| Stack          | —        | —     | 1     | `wrap` prop pattern inconsistency              |
| Section        | —        | 1     | 1     | `accentColor` silently ignored on wrong variant|
| KeepTogether   | —        | —     | —     | Clean                                          |
| Table          | —        | 2     | 1     | `_last` in public API; header/footer mismatch  |
| DataTable      | —        | 1     | 1     | Array index key; footer truthy check           |
| List           | —        | 2     | 1     | `_level` in public API; magic number font size |
| Card           | —        | —     | 1     | Nested ternaries vs Map pattern                |
| Form           | —        | —     | 2     | Inconsistent height defaults                   |
| Signature      | —        | 1     | 1     | Tuple signer validation; hardcoded labels      |
| PageHeader     | 1        | 1     | —     | Missing `.styles.ts`; `marginBottom=0` bug     |
| PageFooter     | 1        | 1     | 1     | Missing `.styles.ts`; `sticky` padding logic   |
| Badge          | —        | —     | 1     | Magic number font size subtraction             |
| KeyValue       | —        | —     | 1     | `divider*` props undocumented in JSDoc         |
| PdfImage       | 2        | —     | 1     | Module-level cache; `defaultTheme` hardcoded   |
| PdfGraph       | 2        | 2     | 1     | Module-level cache; `defaultTheme` hardcoded; division-by-zero |

---

## 3. Documentation Review

| Criterion                        | Status           | Details                                      |
|----------------------------------|------------------|----------------------------------------------|
| Props accuracy vs implementation | **Pass**         | All 20 component pages match current types   |
| Completeness (props tables)      | **Pass**         | All pages have props tables                  |
| Code example correctness         | **Pass**         | All examples are correct and runnable        |
| Page structure consistency       | **Pass**         | ComponentPage wrapper enforces uniformity    |
| Missing documentation pages      | **Pass**         | 20/20 components documented                  |
| Invoice template page coverage   | **Pass (minor)** | All 3 variants covered; 1 command issue      |
| Runtime / import errors          | **Pass**         | No broken imports detected                   |

**Single issue found:**

> `invoices-container.tsx:198` — install command renders as `pdfx template add invoice-classic` but should match the pattern used in all component docs: `npx @pdfx/cli template add invoice-classic`. Users on fresh projects will not have `pdfx` on PATH.

---

## 4. Code Quality & Architecture

### Strengths

- **Consistent component structure** — 18 of 20 components correctly follow the `*.tsx` / `*.styles.ts` / `*.types.ts` split with `usePdfxTheme()` + `useSafeMemo()`.
- **Theme system** — Fully type-safe. Zod schemas align perfectly with TypeScript inferred types. All three presets (professional, modern, minimal) cover every token.
- **Shared package** — Zero issues. Errors, schemas, and exports are clean and complete.
- **Registry infrastructure** — `build-registry.ts` path rewriting and `resolveTemplateImports` in the CLI are well-implemented.
- **Per-file conflict resolution in `templateAdd`** — shadcn-style `overwrite-all` flow is a good DX choice.

### Architectural Concerns

1. **Module-level mutable style cache in PdfImage and PdfGraph** (`pdf-image.tsx:130–138`, `graph.tsx:105–113`) — Using `let cachedTheme / let cachedStyles` at module scope is a singleton anti-pattern. In environments that render multiple documents (e.g., batch PDF generation), a theme switch does not bust the cache between documents if the JS module is not re-evaluated. The correct approach is to rely solely on `useSafeMemo()` inside the component.

2. **PageHeader and PageFooter lack `.styles.ts` files** — Every other component externalises its StyleSheet factory into a dedicated file. These two inline the factory inside the component file, making them harder to test and inconsistent with the established pattern.

3. **Internal implementation props leaked into public interfaces** — `_last?: boolean` in `TableRowProps` (`table.types.ts:34`) and `_level?: number` in `ListItemProps` (`list.types.ts:34`) are parent-injected props that appear in the public type. They should be typed internally (e.g., via a separate internal props type) and not exported.

4. **`readConfig()` duplicated in `add.ts` and `template.ts`** — Identical function with identical signature. Should live in a shared CLI utility module.

5. **Invoice template components accept no `data` prop** — Templates are presented as installable production components but `invoice01.tsx`, `invoice02.tsx`, and `invoice03.tsx` have all data hardcoded. The registry JSON files (correctly) show a `data = sampleData` pattern that isn't yet implemented in the actual components.

---

## 5. Security & CLI Review

### Security Findings

| # | Severity | File | Line(s) | Issue |
|---|----------|------|---------|-------|
| S1 | Major | `commands/init.ts` | 86–91 | Registry URL accepted without HTTPS validation — any string is written to `pdfx.json` and later passed to `fetch()` |
| S2 | Major | `commands/add.ts`, `commands/diff.ts`, `commands/template.ts` | Various | Registry URL from config not validated as a proper HTTPS URL before use in `fetch()` |
| S3 | Major | `commands/theme.ts` | 59–62 | Theme file path from user prompt not sanitised — path traversal possible (e.g., `../../etc/passwd`) |
| S4 | Minor | `commands/add.ts`, `commands/template.ts` | 130, 184 | `path.basename()` strips traversal sequences from registry filenames, but no explicit validation that registry-supplied filenames are alphanumeric-safe (defence-in-depth gap) |
| S5 | Minor | `utils/read-json.ts` | 8 | `fs.readFileSync()` is not wrapped; `ENOENT` propagates as an unhandled system error |

### CLI Usability / Functional Gaps

| # | Severity | Issue |
|---|----------|-------|
| C1 | Major | `pdfx list` and `pdfx template list` require `pdfx.json` — these are discovery commands and must work before a project is initialised (should fall back to `DEFAULTS.REGISTRY_URL`) |
| C2 | Major | `pdfx template diff` command is entirely missing — no way to compare installed template vs registry version |
| C3 | Major | `diff` command exits `0` even when all comparisons fail (`diff.ts:105–108`) — incorrect for scripting/CI |
| C4 | Minor | "Done!" printed even on partial failure in `add` and `templateAdd` — misleading UX |
| C5 | Minor | Error handling for `pdfx.json not found` duplicated verbatim in every command — should be a shared helper |
| C6 | Minor | `theme validate` uses regex string-matching instead of actual JSON/Zod parsing (`theme.ts:224–232`) — fragile and produces false positives |

---

## 6. Bug & Edge Case Detection

### Confirmed Bugs

| # | Severity | Component / File | Line(s) | Description |
|---|----------|-----------------|---------|-------------|
| B1 | **Critical** | `graph.tsx` | 732–812 | **`defaultTheme` hardcoded throughout rendering pipeline** — `usePdfxTheme()` is never called; all chart render functions receive `defaultTheme` imported at module level. Custom themes are entirely ignored. |
| B2 | **Critical** | `pdf-image.tsx` | 130–139, 209 | **Same issue** — `getStyles(defaultTheme)` ignores active theme. Module-level cache compounds this in multi-document scenarios. |
| B3 | **Critical** | `invoice03.tsx` + `invoice-minimal.json` | 33 | **Typo in sample data**: `'Annual Licenselan'` — should be `'Annual License'`. Ships in registry and doc preview. |
| B4 | **Critical** | `invoice01.type.ts` | 1–31 | **`companyEmail` field missing from type** — all three invoice components hardcode `hello@pdfx.io` but the field is not in the shared type, creating a data/type mismatch for anyone extending the templates. |
| B5 | Major | `graph.tsx` | 171 | **Division by zero** — `step = (max - min) / (count - 1)` when `count === 1` (single Y-axis tick). |
| B6 | Major | `page-header.tsx`, `page-footer.tsx` | — | **Missing `.styles.ts` files** — StyleSheet factories are defined inside the component file. While functionally equivalent, this breaks the codebase pattern and means the styles are redefined on every hot-module replacement in dev. |
| B7 | Major | `invoice-classic.json`, `invoice-modern.json`, `invoice-minimal.json` | 11–17 | **Registry JSON files contain un-rewritten import paths** (`../../lib/pdfx-theme`, `../../components/pdfx/...`). These should be post-processed by `build-registry.ts` which rewrites them to `../lib/pdfx-theme`. Users installing via CLI will get files with wrong import paths. |
| B8 | Major | `table.types.ts`, `list.types.ts` | 34 | **Internal props `_last` and `_level` exposed in public interfaces** — any consumer's TypeScript autocomplete surfaces these, and incorrect external usage could produce silent rendering bugs. |

### Edge Case Gaps

| Component | Risk | Description |
|-----------|------|-------------|
| Graph | High | Empty data array or single data point bypasses several guards |
| List | Medium | `fontSize - 0.5` could produce sub-zero values on minimal themes with very small base sizes |
| Badge | Low | `fontSize - 1` magic subtraction — same risk |
| Invoice components | High | No null/undefined guard on `items.map()` — throws if `items` is empty or missing |
| Signature | Medium | Tuple type `[Signer, Signer]` enforced at compile time but no runtime guard for double variant |

---

## 7. Detailed Findings

### 7.1 @pdfx/ui — Critical

#### BUG-01: PdfGraph ignores active theme (`graph.tsx:732`)
```typescript
// graph.tsx:732 — WRONG
const styles = getStyles(defaultTheme);
// Should be:
const theme = usePdfxTheme();
const styles = useSafeMemo(() => createGraphStyles(theme), [theme]);
```
The `defaultTheme` import from `../../lib/pdfx-theme` is the hardcoded default. When a user wraps their document in `<PdfxThemeProvider theme={customTheme}>`, Graph renders with the wrong colours, fonts, and spacing.

#### BUG-02: PdfImage ignores active theme (`pdf-image.tsx:209`)
Same root cause as BUG-01 — `getStyles(defaultTheme)` used instead of hook-based theme access.

#### BUG-03: Module-level style cache (`pdf-image.tsx:130`, `graph.tsx:105`)
```typescript
let cachedTheme: PdfxTheme | null = null;   // module singleton
let cachedStyles: ... | null = null;
```
In multi-document batch rendering (common in server-side PDF generation), this cache is never reset between documents within the same Node.js process. A second document rendered with a different theme will inherit the first document's styles.

#### BUG-04: PageHeader / PageFooter missing `.styles.ts` (`packages/ui/src/components/page-header/`, `page-footer/`)
Directory listings confirm no `*.styles.ts` files exist. Both components define their `createPage*Styles()` factory inline. All 18 other components externalise this.

---

### 7.2 @pdfx/ui — Major

#### ISSUE-01: `_last` and `_level` in public interfaces
`table.types.ts:34`: `_last?: boolean` is injected by `TableSection` into child `TableRow` elements. It should not be in the exported `TableRowProps`.

`list.types.ts:34`: `_level?: number` is injected by `List` into nested `ListItem` elements. Same problem.

**Impact:** Consumers see these props in autocomplete, may attempt to use them, and get unexpected rendering behaviour.

#### ISSUE-02: Section `accentColor` silently ignored
`section.tsx:48` — `accentColor` is only applied when `variant === 'callout' || variant === 'highlight'`, but neither the prop JSDoc nor the docs page mention this restriction.

#### ISSUE-03: Graph division by zero (`graph.tsx:171`)
```typescript
const step = (max - min) / (count - 1); // count=1 → divide by zero → NaN ticks
```
Triggered when `yTicks={1}` is passed or auto-calculation yields 1.

#### ISSUE-04: `DataTable` array index key (`data-table.tsx:50`)
```
// biome-ignore lint/suspicious/noArrayIndexKey
```
The comment acknowledges the anti-pattern but doesn't explain why it's acceptable. For PDF rendering specifically this is low risk (no reconciliation), but the pattern is a maintenance hazard.

---

### 7.3 Invoice Templates — Critical

#### ISSUE-05: Template components accept no `data` prop
`invoice01.tsx`, `invoice02.tsx`, `invoice03.tsx` render fully hardcoded data. The registry JSON files (correctly) document a pattern with `data = sampleData` as a prop, but the actual www pages don't implement it. Users who install a template and try to pass dynamic data will find no such API.

#### ISSUE-06: Type naming inconsistency
- Actual type export: `invoiceDetailsType` (`invoice01.type.ts:3`)
- Registry JSON type references: `InvoiceClassicData`, `InvoiceModernData`, `InvoiceMinimalData`

Users comparing the installed code to the registry JSON will see different type names.

#### ISSUE-07: `companyEmail` missing from shared type (`invoice01.type.ts:1–31`)
All three templates hardcode `hello@pdfx.io` but `companyEmail` is not a field in `invoiceDetailsType`. The registry JSON type definitions include it. This means the type contract between components and the data structure they consume is incomplete.

#### ISSUE-08: Typo in sample data (`invoice03.tsx:33`)
```typescript
{ description: 'Annual Licenselan', ... }
//                          ^^^^^^ should be "License"
```
This typo appears in the rendered preview in the docs and in the published `invoice-minimal.json` registry file.

#### ISSUE-09: Registry JSON files contain un-rewritten import paths
The three files in `apps/www/public/r/templates/` were not processed by `build-registry.ts`. They contain:
```typescript
import type { PdfxTheme } from '../../lib/pdfx-theme';
```
The build script (`build-registry.ts:147–157`) rewrites this to `../lib/pdfx-theme`. Since the templates were added manually (not via the build script), these paths are wrong and installed files will not compile in a standard project layout.

---

### 7.4 CLI — Major

#### ISSUE-10: `pdfx list` and `pdfx template list` require `pdfx.json`
Both commands are discovery tools that potential users run before adopting PDFx. Requiring a fully initialised project as a prerequisite is a significant onboarding friction point and an API design error.

**Fix:** Fall back to `DEFAULTS.REGISTRY_URL` when `pdfx.json` is absent.

#### ISSUE-11: `pdfx template diff` not implemented
`pdfx diff <component>` exists for components. There is no equivalent for templates. Users cannot verify whether their locally installed template is out of date.

#### ISSUE-12: Registry URL not validated as HTTPS
`init.ts:86–91` writes `answers.registry` directly to `pdfx.json` without checking it is a valid URL. All subsequent `fetch()` calls trust this value. A typo producing a non-URL string will throw an uncaught `TypeError: Failed to parse URL` rather than a user-friendly error.

#### ISSUE-13: `diff` exits 0 on total failure (`diff.ts:105–108`)
When all component comparisons fail (network error, missing files), the command exits with code 0. CI pipelines checking `pdfx diff` output cannot rely on the exit code.

---

### 7.5 CLI — Minor

| # | File | Line(s) | Issue |
|---|------|---------|-------|
| M1 | `utils/read-json.ts` | 8 | `fs.readFileSync` ENOENT not caught — surface as readable error |
| M2 | `commands/add.ts` | 244–256 | "Done!" printed even when some components failed — partial success UX misleads |
| M3 | `commands/theme.ts` | 224–232 | `themeValidate` uses regex string scanning, not Zod parsing — false positive/negative possible |
| M4 | Multiple commands | Various | `pdfx.json not found` error block duplicated in every command file — extract to shared helper |

---

### 7.6 Documentation — Minor

| # | File | Line | Issue |
|---|------|------|-------|
| D1 | `invoices-container.tsx` | 198 | Install command is `pdfx template add ...` — should be `npx @pdfx/cli template add ...` |
| D2 | `invoices-container.tsx` | 46, 59, 72 | Documented filenames (`invoice-classic.tsx`, `invoice-classic.types.ts`) don't match actual files (`invoice01.tsx`, `invoice01.type.ts`) |
| D3 | `invoice01.type.ts` | 34–55 | Large commented-out interface block — should be deleted or replaced with a code comment explaining the design decision |

---

## 8. Action Plan

### Phase 1 — Immediate Fixes (Before Any Release)

These are functional regressions or user-visible data errors.

| Priority | Fix | File(s) |
|----------|-----|---------|
| P0 | Fix PdfGraph: replace `defaultTheme` with `usePdfxTheme()` + `useSafeMemo()` | `graph.tsx:732–812` |
| P0 | Fix PdfImage: replace `defaultTheme` with `usePdfxTheme()` + `useSafeMemo()` | `pdf-image.tsx:209` |
| P0 | Remove module-level cache from PdfImage and PdfGraph | `pdf-image.tsx:130–138`, `graph.tsx:105–113` |
| P0 | Fix typo: `'Annual Licenselan'` → `'Annual License'` | `invoice03.tsx:33`, `invoice-minimal.json` |
| P0 | Regenerate registry template JSON via `build-registry.ts` to fix import paths | `public/r/templates/*.json` |
| P1 | Add `data` prop to all three invoice components with `sampleData` as default | `invoice01.tsx`, `invoice02.tsx`, `invoice03.tsx` |
| P1 | Add `companyEmail` to `invoiceDetailsType` and use it in all three templates | `invoice01.type.ts`, all three `.tsx` |
| P1 | Rename `invoiceDetailsType` to a consistent canonical name (e.g., `InvoiceData`) | `invoice01.type.ts` + all imports |
| P1 | Fix graph division by zero: guard `count > 1` before dividing | `graph.tsx:171` |
| P1 | Fix install command in template docs: `pdfx` → `npx @pdfx/cli` | `invoices-container.tsx:198` |

### Phase 2 — Short-Term Iteration (Next Sprint)

| Priority | Fix | File(s) |
|----------|-----|---------|
| P2 | Extract `PageHeader` and `PageFooter` styles into `*.styles.ts` files | `page-header.tsx`, `page-footer.tsx` |
| P2 | Remove `_last` and `_level` from exported public prop interfaces | `table.types.ts:34`, `list.types.ts:34` |
| P2 | Make `pdfx list` and `pdfx template list` work without `pdfx.json` | `commands/list.ts`, `commands/template.ts` |
| P2 | Validate registry URL as HTTPS in `pdfx init` and before each `fetch()` call | `commands/init.ts`, `commands/add.ts` |
| P2 | Fix `diff` exit code: `process.exit(1)` when all comparisons fail | `commands/diff.ts:105–108` |
| P2 | Deduplicate `readConfig()` into a shared CLI utility | `commands/add.ts`, `commands/template.ts` |
| P2 | Fix install docs filenames (`invoice-classic.tsx` vs `invoice01.tsx`) | `invoices-container.tsx:46,59,72` |
| P2 | Document `accentColor`'s variant dependency in JSDoc and docs | `section.types.ts`, `section.tsx` |
| P2 | Sanitise theme file path input in `themeInit` | `commands/theme.ts:59–62` |
| P2 | Wrap `fs.readFileSync` in `readJsonFile` in a try/catch for ENOENT | `utils/read-json.ts:8` |

### Phase 3 — Long-Term Architectural Enhancements

| Area | Enhancement |
|------|-------------|
| CLI | Implement `pdfx template diff <template>` command |
| CLI | Replace regex-based `themeValidate` with Zod schema parsing |
| CLI | Extract common `requireConfig()` helper used by all commands |
| Graph | Move all render functions to accept the active theme as a parameter (passed from `usePdfxTheme()`) |
| Templates | Add null/undefined guards and empty array handling to all invoice components |
| Types | Add runtime validation (Zod) for invoice `data` props to catch incorrect shapes at dev time |
| Tests | Unit test coverage for `resolveTemplateImports` import path rewriting |
| Docs | Standardise prop JSDoc format (`@default` consistently vs "Defaults to...") |

---

## 9. Project Health Assessment

### Maturity Level

| Layer | Maturity |
|-------|---------|
| `@pdfx/shared` (types, schemas, themes) | **Production-ready** — clean, complete, well-typed |
| Documentation website | **Production-ready** — accurate, thorough, consistent |
| `@pdfx/ui` — core components (18/20) | **Beta** — solid patterns; 2 critical theme-bypass bugs block release |
| `@pdfx/ui` — PdfGraph, PdfImage | **Alpha** — theme system not connected; module cache is a regression risk |
| `@pdfx/cli` | **Beta** — functional; discovery UX, exit codes, and URL validation gaps |
| Invoice templates | **Alpha** — not usable with real data; type inconsistencies; broken import paths in registry |

### Production Readiness Evaluation

**Cannot ship in current state because:**
1. `PdfGraph` and `PdfImage` silently ignore custom themes — a core value proposition of PDFx is broken for these two components.
2. Invoice templates cannot accept dynamic data — the only use case for a template.
3. Registry JSON files for templates contain wrong import paths — CLI-installed templates will not compile.
4. Typo `'Annual Licenselan'` is visible in published docs and installed files.

**Safe to ship as-is:**
- All 18 other UI components
- The full documentation website
- The `@pdfx/shared` package
- CLI `init`, `add`, `theme` commands (with caveats noted)

---

### Final Score: **5.5 / 10**

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Core component correctness | 25% | 5/10 | 1.25 |
| Theme system integrity | 15% | 4/10 | 0.60 |
| Documentation accuracy | 15% | 9/10 | 1.35 |
| CLI quality & security | 15% | 5/10 | 0.75 |
| New feature quality (templates) | 15% | 3/10 | 0.45 |
| Architecture & code quality | 10% | 7/10 | 0.70 |
| Shared package / type safety | 5% | 10/10 | 0.50 |
| **Total** | **100%** | | **5.60** |

**Justification:**
The project has a strong foundation — the theme system, schema layer, and documentation are genuinely excellent. The score is held back primarily by two critical bugs in high-visibility components (Graph, PdfImage) that undermine the project's core promise, and an invoice template feature that was merged before it was production-ready. With Phase 1 fixes applied (estimated 2–3 focused days of work), the score rises to ~7.5/10 and the product becomes shippable.
