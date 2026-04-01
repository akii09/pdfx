import type { PdfxTheme } from '@pdfx/shared';
import { themePresets, themeSchema } from '@pdfx/shared';
import type { PresetName } from './theme-code-generator';

interface SerializedThemePayload {
  theme: PdfxTheme;
  basePreset?: PresetName;
}

/**
 * Encodes a PdfxTheme (and optional base preset) to a URL-safe base64 string for link sharing.
 */
export function serializeTheme(theme: PdfxTheme, basePreset?: PresetName): string {
  const payload: SerializedThemePayload = { theme, basePreset };
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

/**
 * Decodes a base64 string back to a PdfxTheme and optional base preset.
 * Returns null if the string is invalid or the shape doesn't match.
 */
export function deserializeTheme(
  encoded: string
): { theme: PdfxTheme; basePreset: PresetName | undefined } | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json) as unknown;

    // Support new { theme, basePreset } payload format
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'theme' in parsed &&
      typeof (parsed as Record<string, unknown>).theme === 'object'
    ) {
      const payload = parsed as { theme: unknown; basePreset?: string };
      const result = themeSchema.safeParse(payload.theme);
      if (!result.success) return null;
      const presetNames = Object.keys(themePresets);
      const basePreset =
        typeof payload.basePreset === 'string' && presetNames.includes(payload.basePreset)
          ? (payload.basePreset as PresetName)
          : undefined;
      return { theme: result.data as unknown as PdfxTheme, basePreset };
    }

    // Legacy: direct theme object (backward-compatible)
    const result = themeSchema.safeParse(parsed);
    if (!result.success) return null;
    const theme = result.data as unknown as PdfxTheme;
    return { theme, basePreset: inferClosestPreset(theme) };
  } catch {
    return null;
  }
}

/**
 * Reads the theme from the URL hash (#theme=<encoded>).
 * Returns null if no theme hash is present or it's invalid.
 */
export function readThemeFromHash(): {
  theme: PdfxTheme;
  basePreset: PresetName | undefined;
} | null {
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
export function writeThemeToHash(theme: PdfxTheme, basePreset?: PresetName): void {
  if (typeof window === 'undefined') return;
  const encoded = serializeTheme(theme, basePreset);
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

/**
 * Infers the closest preset by comparing color tokens.
 * Returns the preset whose colors have the fewest differences, or 'professional' as fallback.
 */
function inferClosestPreset(theme: PdfxTheme): PresetName {
  const presetEntries = Object.entries(themePresets) as [PresetName, PdfxTheme][];
  let bestPreset: PresetName = 'professional';
  let bestScore = Number.MAX_SAFE_INTEGER;

  for (const [name, preset] of presetEntries) {
    let diff = 0;
    for (const key of Object.keys(preset.colors) as (keyof PdfxTheme['colors'])[]) {
      if (theme.colors[key] !== preset.colors[key]) diff++;
    }
    if (theme.typography.body.fontFamily !== preset.typography.body.fontFamily) diff++;
    if (theme.typography.heading.fontFamily !== preset.typography.heading.fontFamily) diff++;
    if (theme.page.size !== preset.page.size) diff++;

    if (diff < bestScore) {
      bestScore = diff;
      bestPreset = name;
    }
    if (diff === 0) break;
  }

  return bestPreset;
}
