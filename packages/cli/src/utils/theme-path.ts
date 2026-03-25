import path from 'node:path';

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
