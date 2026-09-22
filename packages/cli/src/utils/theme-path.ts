import fs from 'node:fs';
import path from 'node:path';
import { ValidationError } from '@pdfx/shared';

/**
 * Auto-normalises a user-provided theme path so that bare paths are
 * always stored with an explicit `./` prefix.
 *
 * Examples:
 *   "src/lib/pdfx-theme.ts"  →  "./src/lib/pdfx-theme.ts"
 *   "./src/lib/pdfx-theme.ts"  →  "./src/lib/pdfx-theme.ts"  (unchanged)
 *   "../lib/pdfx-theme.ts"   →  "../lib/pdfx-theme.ts"       (unchanged)
 *   "/abs/path.ts"           →  "/abs/path.ts"               (unchanged; validate will reject it)
 */
export function normalizeThemePath(value: string): string {
  const trimmed = value.trim();
  if (trimmed && !path.isAbsolute(trimmed) && !trimmed.startsWith('.')) {
    return `./${trimmed}`;
  }
  return trimmed;
}

/** Hint shared by every destination rejection so users know where to look. */
const DESTINATION_HINT =
  'Check "theme" in pdfx.json: the theme and its sibling pdfx-theme-context.tsx must be files. Choose a different theme directory or move the conflicting entry before retrying.';

type EntryKind = 'missing' | 'file' | 'directory' | 'dangling-symlink' | 'other';

/**
 * Classifies a filesystem entry without following a broken link.
 *
 * `fs.statSync` follows symlinks and reports a dangling link as missing, which would let the
 * caller write through it and fail halfway. `lstat` first keeps that case distinguishable.
 */
function inspectEntry(entryPath: string): EntryKind {
  const link = fs.lstatSync(entryPath, { throwIfNoEntry: false });
  if (!link) return 'missing';

  if (link.isSymbolicLink()) {
    const target = fs.statSync(entryPath, { throwIfNoEntry: false });
    if (!target) return 'dangling-symlink';
    if (target.isFile()) return 'file';
    if (target.isDirectory()) return 'directory';
    return 'other';
  }

  if (link.isFile()) return 'file';
  if (link.isDirectory()) return 'directory';
  return 'other';
}

/**
 * Walks the ancestors of `filePath` from the filesystem root down, rejecting the first entry that
 * cannot hold the destination. Walking downwards stops at the first missing segment, which
 * `writeFile` creates with `mkdir -p`, so a blocked ancestor is reported instead of surfacing a
 * raw ENOTDIR/EEXIST during the write.
 */
function assertWritableParents(filePath: string): void {
  const dirPath = path.dirname(filePath);
  const { root } = path.parse(dirPath);
  let current = root;

  for (const segment of dirPath.slice(root.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const kind = inspectEntry(current);
    if (kind === 'missing') return;
    if (kind === 'directory') continue;

    const reason =
      kind === 'dangling-symlink' ? 'is a symlink to a missing target' : 'is not a directory';
    throw new ValidationError(
      `Cannot write "${filePath}": parent path "${current}" ${reason}.`,
      DESTINATION_HINT
    );
  }
}

/** Rejects a destination that exists but cannot be overwritten as a regular file. */
function assertWritableFile(filePath: string): void {
  assertWritableParents(filePath);

  const kind = inspectEntry(filePath);
  if (kind === 'missing' || kind === 'file') return;

  const reason =
    kind === 'directory'
      ? 'is a directory'
      : kind === 'dangling-symlink'
        ? 'is a symlink to a missing target'
        : 'is not a regular file';
  throw new ValidationError(`Cannot write "${filePath}": path ${reason}.`, DESTINATION_HINT);
}

/**
 * Resolves both theme destinations and checks existing entries before either file is written.
 * Missing files are allowed; directories, dangling symlinks, and blocked parents are rejected so a
 * failing context write can never leave a half-updated theme behind.
 */
export function resolveThemeFilePaths(value: string): { themePath: string; contextPath: string } {
  const themePath = path.resolve(process.cwd(), value);
  const contextPath = path.join(path.dirname(themePath), 'pdfx-theme-context.tsx');

  for (const filePath of [themePath, contextPath]) {
    assertWritableFile(filePath);
  }

  return { themePath, contextPath };
}

/**
 * Validates a user-provided theme path string.
 * Returns `true` when valid, or an error message string when invalid.
 *
 * Runs against the **raw** (pre-format) input so that the prompts `validate`
 * callback can catch malformed patterns before `format` normalises them.
 *
 * Rules enforced:
 * - Non-empty after trim
 * - Not an absolute path
 * - If it starts with `.`, it must start with `./` or `../`
 *   (catches accidental `.src/...` edits)
 * - Must end with `.ts` or `.tsx`
 */
export function validateThemePath(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return 'Theme path is required';
  if (path.isAbsolute(trimmed)) {
    return 'Please use a relative path (e.g., ./src/lib/pdfx-theme.ts)';
  }
  if (trimmed.startsWith('.') && !trimmed.startsWith('./') && !trimmed.startsWith('../')) {
    return 'Path must start with ./ or ../ (e.g., ./src/lib/pdfx-theme.ts)';
  }
  if (!trimmed.endsWith('.ts') && !trimmed.endsWith('.tsx')) {
    return 'Theme file must have a .ts or .tsx extension';
  }
  return true;
}
