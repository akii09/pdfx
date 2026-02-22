import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all card styles derived from the active theme.
 * Returns a StyleSheet covering card variant, padding, title, and body styles.
 * @param t - The resolved PdfxTheme instance.
 */
export function createCardStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const borderColor = t.colors.border;

  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderRadius: borderRadius.sm,
      backgroundColor: t.colors.background,
      marginBottom: t.spacing.componentGap,
    },
    cardBordered: {
      borderWidth: 2,
    },
    cardMuted: {
      backgroundColor: t.colors.muted,
    },
    paddingSm: {
      padding: spacing[2],
    },
    paddingMd: {
      padding: spacing[3],
    },
    paddingLg: {
      padding: spacing[4],
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing[2],
      paddingBottom: spacing[1] + 2,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    body: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
  });
}
