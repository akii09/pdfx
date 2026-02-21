import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all section styles derived from the active theme.
 * Returns a StyleSheet covering spacing scale, padding scale, border, and
 * variant styles (callout, highlight, card).
 * @param t - The resolved PdfxTheme instance.
 */
export function createSectionStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: {
      display: 'flex',
      flexDirection: 'column',
    },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: spacing[4] },
    spacingMd: { marginVertical: t.spacing.sectionGap },
    spacingLg: { marginVertical: spacing[8] },
    spacingXl: { marginVertical: spacing[12] },
    paddingNone: { padding: spacing[0] },
    paddingSm: { padding: spacing[3] },
    paddingMd: { padding: spacing[4] },
    paddingLg: { padding: spacing[6] },
    border: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
    callout: {
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      paddingLeft: spacing[4],
      paddingVertical: spacing[2],
    },
    highlight: {
      backgroundColor: t.colors.muted,
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      padding: spacing[4],
    },
    card: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
      padding: spacing[4],
    },
  });
}
