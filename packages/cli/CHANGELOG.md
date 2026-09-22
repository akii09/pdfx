# pdfx-cli

## 0.7.2

### Patch Changes

- [#197](https://github.com/akii09/pdfx/pull/197) [`7d96df8`](https://github.com/akii09/pdfx/commit/7d96df8e33a78b0b5be342242b9cd09319764abd) Thanks [@akii09](https://github.com/akii09)! - Validate the registry URL before any request, so `add` and `block add` no longer fail
  with an opaque `NetworkError: Could not reach http://REG` when the configured registry
  is a placeholder or malformed value.

  `registry` in pdfx.json must now be an HTTP(S) base URL with no credentials, query
  string, or fragment, and trailing slashes are normalized away so request URLs cannot
  double up. Invalid values are rejected up front with guidance naming the field and the
  default registry.

  The same validation now applies to the `--registry` override on `add`, which
  previously bypassed it entirely and reached the network untouched.

  When a well-formed registry is genuinely unreachable, the network error explains how to
  check the configured value and distinguishes a timeout from an unresolvable host.

## 0.7.1

### Patch Changes

- [#198](https://github.com/akii09/pdfx/pull/198) [`3fa3287`](https://github.com/akii09/pdfx/commit/3fa3287cf0cd636945ae55037c2d1417d76a48d3) Thanks [@akii09](https://github.com/akii09)! - Fix `theme switch`, `theme init`, and `init` failing with a raw `EISDIR` when the
  configured theme destination is a directory — including a directory whose name ends
  in `.ts` or `.tsx`.

  Both the theme file and its sibling `pdfx-theme-context.tsx` are now checked before
  either is written, so a collision on the context file can no longer leave a
  half-updated theme behind. Rejected destinations name the conflicting path and explain
  how to correct it; existing directories are never deleted and no filename is silently
  appended.

  Dangling symlinks and destinations sitting under a non-directory parent are rejected
  for the same reason — both previously read as "missing" and surfaced later as a raw
  `ENOENT` or `ENOTDIR`, after the theme file had already been replaced.

- [#201](https://github.com/akii09/pdfx/pull/201) [`af386a7`](https://github.com/akii09/pdfx/commit/af386a78f370bad70fd429a3a5e2068e77531c57) Thanks [@akii09](https://github.com/akii09)! - Make `theme validate` actionable when a theme file has no supported named `theme`
  export. The error replaces "No exported `theme` object found." with the file it
  inspected, the required `export const theme = { ... }` form, and an explicit note that
  default exports, differently named exports, and separate `export { theme }`
  declarations are not supported. Static-parsing failures explain why dynamic
  expressions cannot be evaluated.

  Theme paths are reported as configured in `pdfx.json` rather than resolved, so an
  absolute configured path no longer puts the user's home directory into an error
  message that is sent to exception telemetry.

  Validation still uses TypeScript AST parsing and never executes the theme module.

## 0.7.0

### Minor Changes

- [`7624271`](https://github.com/akii09/pdfx/commit/7624271095322e80d4462765b45d04250ebcf605) Thanks [@akii09](https://github.com/akii09)! - Add shadcn CLI support alongside the existing pdfx-cli install path.

  - `pdfx-cli init` now offers to register the `@pdfx` namespace in an existing
    shadcn `components.json`. It asks before writing, never touches the file
    unprompted, preserves the file's own indentation, and uses whichever registry
    URL the project configured rather than a hardcoded one. Pass
    `--register-shadcn` or `--no-register-shadcn` to answer non-interactively;
    `--yes` declines by default.
  - New `pdfx-cli/theme` subpath export exposing `generateThemeFile` and
    `generateThemeContextFile`.
  - The generated theme file now exports the `PdfxTheme` interface. Blocks import
    this type, so installing a block into a project initialized with an earlier
    version fails to type-check. Existing users should either re-run
    `pdfx-cli init` or add `export` to the `interface PdfxTheme` line in
    `src/lib/pdfx-theme.ts`.
  - The generated theme context places its `eslint-disable` directive after the
    imports so the directive survives a shadcn install, which strips a file's
    leading comment block.
  - MCP tools and the skills file document the shadcn install path.

## 0.6.2

### Patch Changes

- [#174](https://github.com/akii09/pdfx/pull/174) [`eb437f2`](https://github.com/akii09/pdfx/commit/eb437f2bbe2c50b5f70587f9600d1e61903d425b) Thanks [@akii09](https://github.com/akii09)! - Fix EPIPE crashes when CLI output is piped to a command that exits early or an MCP
  client disconnects, which accounted for 88% of all reported CLI errors. Registry
  misses now suggest similar names — including across blocks and components, so
  `pdfx add invoice` points at the `invoice-*` blocks. PostHog flush timeouts are no
  longer reported as CLI failures.

## 0.6.1

### Patch Changes

- [#114](https://github.com/akii09/pdfx/pull/114) [`4df9181`](https://github.com/akii09/pdfx/commit/4df9181a58ca3f8a9bbdc4a3ba442eae222badba) Thanks [@akii09](https://github.com/akii09)! - Add PostHog analytics to track CLI command usage and errors

## 0.6.0

### Minor Changes

- [#112](https://github.com/akii09/pdfx/pull/112) [`ee7dee3`](https://github.com/akii09/pdfx/commit/ee7dee35986e2dc9d977f8f438a664caaa5e6130) Thanks [@akii09](https://github.com/akii09)! - Fix `DataTable`/`Table` fixed-width columns and `PdfList` overlapping rows on wrapped text.

  **DataTable / Table — fixed-width columns collapsing to zero (#110)**

  Setting a `width` prop on a `TableCell` or `DataTable` column had no effect — the column always rendered at zero width. Root cause: `flex: 0` in the `cellFixed` style is shorthand for `flexGrow:0 + flexShrink:0 + flexBasis:0`. The `flexBasis:0` overrode the explicit `width` in Yoga layout. Fixed by replacing `flex: 0` with the individual `flexGrow: 0` / `flexShrink: 0` properties so `width` is respected.

  All accepted formats now work: numbers (pt), percentage strings (`"25%"`), and pixel strings (`"50px"`).

  **PdfList — overlapping rows when item text wraps to multiple lines (#103)**

  `PdfList` with any variant could render overlapping rows when item text wrapped to 2+ lines. Root cause: `flex: 1` on `Text` nodes sets `flexBasis:0`, causing Yoga to under-estimate multi-line text height — the next row was laid out too high. Fixed by moving `flex: 1` off `Text` and onto a wrapping `View` (`itemTextWrap`) across all variants: `bullet`, `numbered`, `checklist`, `icon`, and `multi-level`.

  **Existing installs:** re-run `pdfx add table`, `pdfx add data-table`, and `pdfx add list` to pick up these fixes.

## 0.5.0

### Minor Changes

- [#96](https://github.com/akii09/pdfx/pull/96) [`f3db877`](https://github.com/akii09/pdfx/commit/f3db877775e5758afad63600632548a83e899724) Thanks [@akii09](https://github.com/akii09)! - feat: harden theme builder and expand theme preset support

- [#96](https://github.com/akii09/pdfx/pull/96) [`f3db877`](https://github.com/akii09/pdfx/commit/f3db877775e5758afad63600632548a83e899724) Thanks [@akii09](https://github.com/akii09)! - Improve the theming workflow in `pdfx-cli`.

  - harden generated theme files by safely escaping string values in the emitted TypeScript
  - expose the expanded built-in preset set through shared theme preset support in `pdfx theme switch`
  - align the CLI release with the newer Theme Builder and shared theme model

## 0.4.3

### Patch Changes

- [#91](https://github.com/akii09/pdfx/pull/91) [`2f0c547`](https://github.com/akii09/pdfx/commit/2f0c5478974085534e43b1e8d538aeb6af8e58c5) Thanks [@akii09](https://github.com/akii09)! - fix: MCP config fails to work with opencode (#88)

- [#91](https://github.com/akii09/pdfx/pull/91) [`2f0c547`](https://github.com/akii09/pdfx/commit/2f0c5478974085534e43b1e8d538aeb6af8e58c5) Thanks [@akii09](https://github.com/akii09)! - fix: improve MCP and skills integration; refactor graph component into a segregated structure.

## 0.4.2

### Patch Changes

- [#89](https://github.com/akii09/pdfx/pull/89) [`77c1ce1`](https://github.com/akii09/pdfx/commit/77c1ce1916a4c553f2a44fb7808bee8c7f93326f) Thanks [@akii09](https://github.com/akii09)! - fix: Theme spacing issue

- [#89](https://github.com/akii09/pdfx/pull/89) [`77c1ce1`](https://github.com/akii09/pdfx/commit/77c1ce1916a4c553f2a44fb7808bee8c7f93326f) Thanks [@akii09](https://github.com/akii09)! - fix: table components styling issue fixed

## 0.4.1

### Patch Changes

- [#86](https://github.com/akii09/pdfx/pull/86) [`8f53028`](https://github.com/akii09/pdfx/commit/8f530284db0bacf52aa13499124a5f667c7c7c4b) Thanks [@akii09](https://github.com/akii09)! - Add preflight validation to mcp and skills commands; add NPM README

## 0.4.0

### Minor Changes

- [#83](https://github.com/akii09/pdfx/pull/83) [`7895058`](https://github.com/akii09/pdfx/commit/7895058b2592be4b5dbe2070e5c73ce163f46b18) Thanks [@akii09](https://github.com/akii09)! - Officially migrated the CLI package to pdfx-cli. Updated all registry interactions to use the new streamlined namespace. Existing commands will still function via the deprecated alias.

## 0.2.1

### Patch Changes

- [#80](https://github.com/akii09/pdfx/pull/80) [`13e89dd`](https://github.com/akii09/pdfx/commit/13e89dd8ea9bb17c5628d847b106d72a91d63c3b) Thanks [@akii09](https://github.com/akii09)! - fix: - list and qr-code component style issues fixed

## 0.2.0

### Minor Changes

- [#71](https://github.com/akii09/pdfx/pull/71) [`61e6c54`](https://github.com/akii09/pdfx/commit/61e6c54d107051e5e20a22a52a363566fffef71c) Thanks [@akii09](https://github.com/akii09)! - feat: improve CLI component install reliability with dependency resolution

## 0.1.8

### Patch Changes

- [#66](https://github.com/akii09/pdfx/pull/66) [`bef608b`](https://github.com/akii09/pdfx/commit/bef608b95b23e9798914abac53238e155baca8b6) Thanks [@akii09](https://github.com/akii09)! - fix: already exist component fallback fixed

## 0.1.7

### Patch Changes

- [#61](https://github.com/akii09/pdfx/pull/61) [`bc8d2e0`](https://github.com/akii09/pdfx/commit/bc8d2e05a7bc3522b06bf70b1baec341d361388b) Thanks [@akii09](https://github.com/akii09)! - feat: 17 components converted into single file component

## 0.1.6

### Patch Changes

- [#55](https://github.com/akii09/pdfx/pull/55) [`7fe0d2b`](https://github.com/akii09/pdfx/commit/7fe0d2bb2181f6a35eb7e861094e444acfc35d07) Thanks [@akii09](https://github.com/akii09)! - CLI issue - reverted Templates and Added Blocks

## 0.1.5

### Patch Changes

- [#53](https://github.com/akii09/pdfx/pull/53) [`00fd8a7`](https://github.com/akii09/pdfx/commit/00fd8a7580b801b573556981153d7ed05dac7444) Thanks [@akii09](https://github.com/akii09)! - Fixed CLI issues and added Blocks and Templates

## 0.1.4

### Patch Changes

- [#38](https://github.com/akii09/pdfx/pull/38) [`a1befa2`](https://github.com/akii09/pdfx/commit/a1befa266dafc30fca8eda077a3e2e3bc2144429) Thanks [@akii09](https://github.com/akii09)! - fix: resolve all alpha test issues

## 0.1.3

### Patch Changes

- [#36](https://github.com/akii09/pdfx/pull/36) [`8b1a84e`](https://github.com/akii09/pdfx/commit/8b1a84e4742ff0ad12d3e2a755b4c42c4f4b1c3d) Thanks [@akii09](https://github.com/akii09)! - fix: @react-pdf/renderer validations added

## 0.1.2

### Patch Changes

- fix: move @pdfx/shared to devDependencies

## 0.1.1

### Patch Changes

- CLI Share issues

## 0.1.0

### Patch Changes

- Initial lpha release of pdfx-cli
