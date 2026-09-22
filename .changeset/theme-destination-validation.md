---
'pdfx-cli': patch
---

Fix `theme switch`, `theme init`, and `init` failing with a raw `EISDIR` when the
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
