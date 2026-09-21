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

/**
 * Resolves both theme destinations and checks existing entries before either file is written.
 * Missing files are allowed; stat follows symlinks so links to directories are rejected too.
 */
export function resolveThemeFilePaths(value: string): { themePath: string; contextPath: string } {
  const themePath = path.resolve(process.cwd(), value);
  const contextPath = path.join(path.dirname(themePath), 'pdfx-theme-context.tsx');

  for (const filePath of [themePath, contextPath]) {
    const stats = fs.statSync(filePath, { throwIfNoEntry: false });
    if (stats && !stats.isFile()) {
      const reason = stats.isDirectory() ? 'is a directory' : 'is not a regular file';
      throw new ValidationError(
        `Cannot write "${filePath}": path ${reason}.`,
        'Check "theme" in pdfx.json: the theme and its sibling pdfx-theme-context.tsx must be files. Choose a different theme directory or move the conflicting entry before retrying.'
      );
    }
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
