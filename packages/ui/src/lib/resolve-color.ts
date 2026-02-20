import type { ColorTokens } from '@pdfx/shared';

/** Theme color token keys that can be used for the color prop */
export const THEME_COLOR_KEYS = [
  'foreground',
  'background',
  'muted',
  'mutedForeground',
  'primary',
  'primaryForeground',
  'border',
  'accent',
  'destructive',
  'success',
  'warning',
  'info',
] as const satisfies (keyof ColorTokens)[];

/** Resolves a color value: theme token key → hex, or raw CSS color as-is. */
export function resolveColor(value: string, colors: ColorTokens): string {
  const key = value as (typeof THEME_COLOR_KEYS)[number];
  return THEME_COLOR_KEYS.includes(key) ? colors[key] : value;
}
