# Contributing to PDFX

Thank you for your interest in contributing to PDFX. This guide will help you get started.

## Code of Conduct

Be respectful and constructive. We aim for a welcoming environment for everyone.

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

## Questions?

Open a [Discussion](https://github.com/akii09/pdfx/discussions) or comment on an existing issue.
