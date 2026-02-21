import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all form section styles derived from the active theme.
 * Returns a StyleSheet covering section layout, title, column grid, row, label, and value styles.
 * @param t - The resolved PdfxTheme instance.
 */
export function createFormStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;
  return StyleSheet.create({
    section: {
      marginBottom: t.spacing.componentGap,
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.heading.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing[2],
    },
    columnsRow: {
      flexDirection: 'row',
      gap: spacing[4],
    },
    column: {
      flex: 1,
    },
    formRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: spacing[1] + 2,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    label: {
      width: 80,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    value: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
  });
}
