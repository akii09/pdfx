import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates compact-mode cell and text styles for the DataTable component.
 * Used when `size="compact"` to render denser rows with smaller font sizes.
 * @param t - The resolved PdfxTheme instance.
 */
export function createCompactStyles(t: PdfxTheme) {
  const { spacing, fontWeights, lineHeights } = t.primitives;
  return StyleSheet.create({
    cell: {
      paddingVertical: spacing[0.5],
      paddingHorizontal: spacing[2],
    },
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
    },
    headerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    footerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
  });
}

/**
 * Converts an arbitrary cell value to a display string.
 * Returns an empty string for null/undefined values.
 * @param value - The raw cell value to format.
 */
export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  return String(value);
}
