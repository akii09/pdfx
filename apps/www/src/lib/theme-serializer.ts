import type { PdfxTheme } from '@pdfx/shared';

/**
 * Encodes a PdfxTheme to a URL-safe base64 string for link sharing.
 */
export function serializeTheme(theme: PdfxTheme): string {
  return btoa(encodeURIComponent(JSON.stringify(theme)));
}

/**
 * Decodes a base64 string back to a PdfxTheme.
 * Returns null if the string is invalid or the shape doesn't match.
 */
export function deserializeTheme(encoded: string): PdfxTheme | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json) as unknown;
    if (!isValidTheme(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Reads the theme from the URL hash (#theme=<encoded>).
 * Returns null if no theme hash is present or it's invalid.
 */
export function readThemeFromHash(): PdfxTheme | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const encoded = params.get('theme');
  if (!encoded) return null;
  return deserializeTheme(encoded);
}

/**
 * Writes the theme into the URL hash without triggering navigation.
 */
export function writeThemeToHash(theme: PdfxTheme): void {
  if (typeof window === 'undefined') return;
  const encoded = serializeTheme(theme);
  const url = new URL(window.location.href);
  url.hash = `theme=${encoded}`;
  window.history.replaceState(null, '', url.toString());
}

/**
 * Clears the theme from the URL hash.
 */
export function clearThemeHash(): void {
  if (typeof window === 'undefined') return;
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

function isValidTheme(value: unknown): value is PdfxTheme {
  if (typeof value !== 'object' || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.name === 'string' &&
    typeof t.colors === 'object' &&
    typeof t.typography === 'object' &&
    typeof t.spacing === 'object' &&
    typeof t.page === 'object' &&
    typeof t.primitives === 'object'
  );
}
