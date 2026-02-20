# Contributing to PDFX

Thank you for your interest in contributing to PDFX. This guide will help you get started.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behavior to **akashpise588@gmail.com**.

## How to Contribute

### Reporting Bugs

- Use the [GitHub Issues](https://github.com/akii09/pdfx/issues) template
- Include steps to reproduce, expected vs actual behavior, and your environment (Node, pnpm, OS)

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the use case and why it would help

### Pull Requests

1. **Fork** the repo and clone it
2. **Install** dependencies: `pnpm install`
3. **Create a branch**: `git checkout -b feat/your-feature` or `fix/your-fix`
4. **Make changes** — follow the project's code style (Biome for lint/format)
5. **Test**: `pnpm test` and `pnpm typecheck`
6. **Commit** with clear messages (e.g. `feat: add Table component`)
7. **Push** and open a PR against `main`

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code. All releases come from here. |
| `feat/<name>` | New features (e.g. `feat/table-component`) |
| `fix/<name>` | Bug fixes (e.g. `fix/heading-margin`) |
| `docs/<name>` | Documentation-only changes |
| `chore/<name>` | Maintenance, dependencies, tooling |
| `ci/<name>` | CI/CD changes |
| `refactor/<name>` | Code refactoring |
| `test/<name>` | Test-only changes |
| `release/<name>` | Release preparation |

- **Never commit directly to `main`**. All changes must come in via a PR.
- Branch names should be lowercase and hyphen-separated.
- Keep branches short-lived — open a PR as soon as the work is ready for review.
- The `main` branch is protected: **1 approval required**, CI must pass, and conversations must be resolved before merging.

> **Repository admins**: See [`.github/BRANCH_PROTECTION.md`](./.github/BRANCH_PROTECTION.md) for a step-by-step guide to setting up branch protection rulesets and the importable JSON files.

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/pdfx.git
cd pdfx

# Install dependencies (pnpm required)
pnpm install

# Run dev servers
pnpm dev          # All apps
pnpm dev:www      # Docs site only
pnpm dev:playground  # Playground only
```

## Project Conventions

- **Linting & Formatting**: Biome (`pnpm lint`, `pnpm format`)
- **TypeScript**: Strict mode, no `any`
- **Components**: Add tests in `*.test.tsx` alongside the component
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `docs:`)

## Adding a New Component

1. Create the component in `packages/ui/src/` (e.g. `table.tsx`)
2. Export it from `packages/ui/src/index.ts`
3. Add a test file `table.test.tsx`
4. Add the component to the registry in `apps/www` so it appears in `pdfx list` and can be added via CLI

## Adding a New Theme Preset

1. Create the theme in `packages/shared/src/themes/` (e.g. `academic.ts`)
2. Export it from `packages/shared/src/themes/index.ts`
3. Add it to `themePresets` and `ThemePresetName`
4. Update the CLI `theme switch` command to support the new preset

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

## Questions?

Open a [Discussion](https://github.com/akii09/pdfx/discussions) or comment on an existing issue.
