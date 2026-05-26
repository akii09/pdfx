# PDFx — Development Guide

> **Repository status:** PDFx is an **open-source** project. Treat every change as a
> contribution that will be reviewed by humans before it lands. Optimize for clarity,
> safety, and minimal diff size.

---

## Agent Operating Rules (READ FIRST)

These rules are **strict** and override any default Claude behavior. Violating them
breaks contributor trust on a public repo, so follow them exactly.

### 1. Never commit, push, or publish on the user's behalf

- **Do not run** `git commit`, `git commit --amend`, `git push`, `git push --force`,
  `git tag`, `git rebase` against shared branches, or `git merge` into `main`.
- **Do not run** `npm publish`, `pnpm publish`, `pnpm changeset publish`, `pnpm release`,
  or any registry-publishing command.
- **Do not run** `gh pr create`, `gh pr merge`, `gh release create`, or any `gh`
  command that mutates the GitHub repo. Read-only `gh` calls (`gh pr view`,
  `gh issue list`, `gh run view`) are fine.
- **Do not** create or delete branches without the user explicitly asking.
- **Do not** modify `.git/`, `.github/workflows/`, `package.json` `version` fields,
  `CHANGELOG.md`, or release configuration unless the user explicitly requests it.

When work is ready, **stop and hand off** with a short summary of what changed and
which command the user should run (e.g. "Ready to commit — `git add … && git commit
-m '…'` when you're happy with it"). The user pushes the button, not the agent.

### 2. Stay inside the requested scope

- Fix only what was asked. No drive-by refactors, renames, formatting sweeps, or
  dependency bumps unless explicitly requested.
- If you spot an unrelated issue, mention it in your summary — do not silently fix it.
- Prefer the smallest possible diff. A bug fix should not also reorganize the file.

### 3. Never break the public surface area

- Components in `apps/www/src/registry/components/` are **copied into user projects**
  via the CLI. Renaming a component, removing a prop, or changing default behavior is
  a **breaking change** for every user who has already installed it.
- If a breaking change seems necessary, **stop and ask** — document the migration path
  before touching code.
- Do not rename exported types, hooks, or utilities in `packages/shared` or
  `packages/cli` without explicit approval.

### 4. Registry and build hygiene

- After editing anything under `apps/www/src/registry/`, run `pnpm build:registry` and
  verify the generated JSON in `apps/www/public/r/` looks correct.
- After editing a component, run its tests:
  `cd apps/www && pnpm vitest run src/registry/components/<name>/`.
- Before declaring work done, run `pnpm typecheck` and `pnpm lint` at the repo root.
- Never hand-edit files under `apps/www/public/r/` — they are generated.

### 5. Dependencies

- Do not add new runtime dependencies to components — they must remain self-contained
  after copy-paste install.
- Do not add dev dependencies without asking. If a dep is genuinely needed, propose it
  and wait for confirmation.
- Do not regenerate `pnpm-lock.yaml` from scratch. If you must update it, use the
  narrowest `pnpm install` invocation that does the job.

### 6. Secrets, telemetry, and external calls

- Never log, print, or commit secrets, tokens, env values, or anything from `.env*`.
- PostHog / analytics keys live in environment config — never hard-code them.
- Do not add new outbound network calls (analytics, error reporting, fetch-on-load)
  to components or the CLI without explicit approval.

### 7. Communication

- If a request is ambiguous, ask one focused clarifying question instead of guessing.
- When reporting work, be honest about what is verified vs. what is assumed. If you
  did not run the tests, say so.
- Reference files with clickable paths (e.g. [build-registry.ts](apps/www/src/lib/build-registry.ts))
  so the user can jump straight to the source.

---

## What is PDFx?

PDFx is a copy-paste component library for building PDF documents in React, modeled after
shadcn/ui. Components are **not installed as npm dependencies** — the CLI fetches source files
from the registry and copies them into the user's project.

## Architecture

```
apps/www           → Documentation site + registry server (Next.js)
packages/cli       → CLI / MCP server (pdfx-cli on npm)
packages/shared    → Cross-package types & schemas (Zod)
```

The registry lives at `apps/www/public/r/`. Each component is a JSON file built by
`pnpm build:registry` from source in `apps/www/src/registry/components/`.

## Component File Structure

Every component follows a **segregated file pattern**:

```
apps/www/src/registry/components/<name>/
  <name>.tsx        — Component implementation (the main export)
  <name>.styles.ts  — StyleSheet factory function
  <name>.types.ts   — TypeScript interfaces and type aliases
  <name>.test.tsx   — Vitest unit tests
  index.ts          — Barrel re-exports
```

> **Note:** The `graph` component is the only exception — it currently uses a single-file
> pattern at 893 lines. It is pending refactoring to match this structure.

## Component Naming Convention

PDFx uses a `Pdf` prefix when the component name would collide with widely-used exports from
React, HTML, or @react-pdf/renderer:

| Category | Components |
|---|---|
| **Prefixed** (`Pdf*`) | PdfAlert, PdfCard, PdfForm, PdfGraph, PdfImage, PdfList, PdfPageNumber, PdfQRCode, PdfSignatureBlock, PdfWatermark |
| **Unprefixed** | Badge, DataTable, Divider, Heading, KeepTogether, KeyValue, Link, PageBreak, PageFooter, PageHeader, Section, Stack, Table, Text |

### Rules for new components

1. **Use `Pdf` prefix** if the name collides with an HTML element, a React built-in, or a
   @react-pdf/renderer primitive (e.g. `Image` → `PdfImage`, `Text` exists in renderer →
   our `Text` is fine because it's the _same concept_).
2. **Skip the prefix** if the name is unique to PDFx's domain (e.g. `KeyValue`, `DataTable`).
3. **Never rename existing components** — that would be a breaking change for installed users.
4. Document the naming decision in the component's JSDoc.

## Registry Transform

The `transformForRegistry` function in `apps/www/src/lib/build-registry.ts` processes
component source before writing to `public/r/*.json`:

- Strips `@pdfx/shared` imports and inlines `PDFComponentProps`
- Injects `import type React from 'react'` when `React.*` types are used
- Rewrites workspace-relative paths to user-project paths
- Inlines `PdfxTheme` as `ReturnType<typeof usePdfxTheme>`
- Inlines `resolveColor` utility

**Always run `pnpm build:registry`** after modifying components or registry metadata.

## Testing

- Framework: Vitest
- Run all: `pnpm test`
- Run one: `cd apps/www && pnpm vitest run src/registry/components/<name>/`
- Tests must verify the component renders without throwing and accepts key props.

## Common Commands

```bash
pnpm dev:www            # Start docs site locally
pnpm build:registry     # Rebuild all registry JSON files
pnpm test               # Run full test suite
pnpm typecheck          # TypeScript type checking
pnpm lint               # Biome lint
pnpm format             # Biome format
```

## Anti-patterns

- **No runtime dependencies** in components — they must be self-contained after install.
- **No `eslint-disable` comments** — fix the root cause instead.
- **No `export const` for non-component values** in main component files — utilities go in
  `<name>.utils.ts` to avoid confusing MCP export inference.
- **No `any`** — if a type is hard to express, add a focused comment explaining why and use
  `unknown` with a narrowing guard instead.
- **No console.log in shipped code** — strip debug logs before handing off.
- **No silent catches** — `try { … } catch {}` hides real bugs. Either handle the error or
  let it bubble.

---

## Bug-fix Workflow

When the user reports an issue or links to one, follow this loop:

1. **Reproduce first.** Read the failing component, run its existing test, and confirm
   the bug exists before changing code. If you cannot reproduce, ask for a minimal repro
   instead of guessing.
2. **Locate the root cause.** Use `Explore` / grep across the registry, `packages/shared`,
   and `packages/cli` — many bugs surface in a component but originate in shared types,
   the registry transform ([build-registry.ts](apps/www/src/lib/build-registry.ts)), or
   theming.
3. **Write or extend a test** that fails because of the bug, then make it pass. Tests live
   beside the component as `<name>.test.tsx`.
4. **Rebuild the registry** with `pnpm build:registry` if the fix touches a registry
   component, and skim the resulting JSON diff to confirm only the intended files changed.
5. **Verify gates:** `pnpm test`, `pnpm typecheck`, `pnpm lint`. Report each as
   pass/fail in your summary.
6. **Hand off.** Summarize the root cause, the fix, and the test in 3–5 lines. Suggest
   the commit message and stop. **Do not commit.** (See Rule 1.)

### Issue-triage heuristics

- "Component renders wrong in PDF" → check the component's `<name>.styles.ts` and any
  `usePdfxTheme` color resolution.
- "TypeScript error after install" → likely the registry transform is missing an import
  injection or path rewrite. See [build-registry.ts](apps/www/src/lib/build-registry.ts)
  and the existing memory note about React import injection.
- "CLI install fails" → check `packages/cli` registry-fetching logic and the JSON shape
  in `apps/www/public/r/`.
- "Works in dev, breaks after install" → the transform output diverges from source.
  Diff `apps/www/src/registry/components/<name>/<name>.tsx` against
  `apps/www/public/r/<name>.json` to find the gap.

---

## Helpful Skills

Invoke these via the `Skill` tool when they fit the task. Prefer them over re-deriving the
same workflow each time.

| Skill | Use it for |
|---|---|
| `verify` | After a fix, actually run the affected component / docs site and confirm the bug is gone — not just that tests pass. |
| `run` | Launch the docs site (`pnpm dev:www`) to visually inspect a component or reproduce a UI-level bug. |
| `code-review` | Pre-handoff self-review of a non-trivial change before the user sees it. Catches dead code, missed edge cases, and inconsistent patterns. |
| `review` | When the user pastes a PR URL and asks for a review. |
| `security-review` | When the change touches the CLI's file-writing logic, the registry fetch path, env handling, or anything that runs on contributor machines. |
| `web-perf` | If a docs-site page is slow or a registry component is suspected of regressing render performance. |
| `Explore` agent | Broad codebase search ("where is the theme resolved?", "which components use `resolveColor`?") — faster and cheaper than manual greps. |
| `Plan` agent | For multi-file refactors or bug fixes that touch the registry transform + a component + tests — design the change before editing. |
| `claude-code-guide` agent | When a contributor asks how to use Claude Code itself with this repo. |

### When *not* to reach for a skill

- A one-line typo fix doesn't need `code-review` or `verify`.
- Don't run `security-review` on docs-only or styling-only changes.
- Don't spawn the `Plan` agent for changes that touch a single file.

---

## Handoff Checklist

Before telling the user a task is done, confirm:

- [ ] Scope matches the request — no unrelated edits.
- [ ] `pnpm test` passes (or the specific component test, if scoped).
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build:registry` was re-run if a registry component changed.
- [ ] No secrets, debug logs, or commented-out code left behind.
- [ ] No commit / push / publish was performed.
- [ ] Summary tells the user exactly what changed and what to run next.
