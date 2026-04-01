# Changelog

This repository uses [Changesets](https://github.com/changesets/changesets) for versioning and release notes.

## Where To Look

- CLI package history: [packages/cli/CHANGELOG.md](./packages/cli/CHANGELOG.md)
- GitHub Releases: [github.com/akii09/pdfx/releases](https://github.com/akii09/pdfx/releases)
- User-facing release notes: [pdfx.akashpise.dev/releases](https://pdfx.akashpise.dev/releases)

## Release Model

- `pdfx-cli` is the main published package and has the authoritative package changelog.
- docs-site and registry updates ship alongside repository releases but are not published as separate npm packages.
- Changesets generate version bumps and package changelog entries during release PRs.

## Maintainer Notes

- Add a changeset for any user-facing CLI change.
- Prefer concise, user-focused release notes over implementation-only summaries.
- Use GitHub Releases for announcement-style notes and the package changelog for version-by-version detail.
