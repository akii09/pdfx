---
'pdfx-cli': minor
---

Add shadcn CLI support alongside the existing pdfx-cli install path.

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
