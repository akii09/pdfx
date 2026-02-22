import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all divider styles derived from the active theme.
 * Returns a StyleSheet covering line style, thickness, spacing, and labeled divider layout.
 * @param t - The resolved PdfxTheme instance.
 */
export function createDividerStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  return StyleSheet.create({
    base: {
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
    },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: t.spacing.paragraphGap },
    spacingMd: { marginVertical: t.spacing.componentGap },
    spacingLg: { marginVertical: t.spacing.sectionGap },
    solid: { borderBottomStyle: 'solid' },
    dashed: { borderBottomStyle: 'dashed' },
    dotted: { borderBottomStyle: 'dotted' },
    thin: { borderBottomWidth: spacing[0.5] },
    medium: { borderBottomWidth: spacing[1] },
    thick: { borderBottomWidth: spacing[2] },
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelLine: {
      flex: 1,
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
    },
    labelText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      paddingHorizontal: spacing[3],
      textTransform: 'uppercase',
      letterSpacing: t.primitives.letterSpacing.wider * 10,
    },
    alignLeft: { alignSelf: 'flex-start' },
    alignCenter: { alignSelf: 'center' },
    alignRight: { alignSelf: 'flex-end' },
  });
}
