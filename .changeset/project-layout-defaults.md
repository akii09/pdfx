---
'pdfx-cli': minor
---

`init` now proposes install paths that match how the project is laid out, instead of
always assuming a `src/` directory.

A project with `src/` keeps the existing `./src/components/pdfx`, `./src/blocks/pdfx`
and `./src/lib/pdfx-theme.ts` defaults. A project without one — a Next.js App Router
app being the reported case — is offered `./components/pdfx`, `./blocks/pdfx` and
`./lib/pdfx-theme.ts`, so PDFx no longer creates a `src/` tree the project does not use
and there are no longer three prompts to correct by hand.

The signal is the presence of `src/`, not the framework: a project without `src/` should
not have one created for it whatever built it, and a Next.js project that does use `src/`
already wants the `src/` defaults.

Prompts remain editable and only their pre-filled values change. `--yes` follows the same
detection, so a non-interactive init in a project without `src/` now writes root-level
paths; pass explicit values or keep a `src/` directory to get the previous behavior.
