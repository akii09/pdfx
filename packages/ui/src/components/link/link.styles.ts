import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all link styles derived from the active theme.
 * Returns a StyleSheet covering variant colors, font properties, and underline overrides.
 * @param t - The resolved PdfxTheme instance.
 */
export function createLinkStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  const baseStyle = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    marginBottom: t.spacing.paragraphGap,
  };

  return StyleSheet.create({
    default: {
      ...baseStyle,
      color: t.colors.accent,
      fontWeight: fontWeights.medium,
      textDecoration: 'underline',
    },
    muted: {
      ...baseStyle,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.regular,
      textDecoration: 'underline',
    },
    primary: {
      ...baseStyle,
      color: t.colors.primary,
      fontWeight: fontWeights.semibold,
      textDecoration: 'underline',
    },
    underlineAlways: { textDecoration: 'underline' },
    underlineNone: { textDecoration: 'none' },
  });
}
