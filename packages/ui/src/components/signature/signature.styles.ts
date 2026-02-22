import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all signature block styles derived from the active theme.
 * Returns a StyleSheet covering single, double, and inline signature layouts.
 * @param t - The resolved PdfxTheme instance.
 */
export function createSignatureStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;
  return StyleSheet.create({
    container: {
      marginTop: t.spacing.sectionGap,
      marginBottom: t.spacing.componentGap,
    },
    block: { flex: 1, minWidth: 140 },
    label: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
      marginBottom: spacing[1],
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
      minHeight: spacing[6],
      marginBottom: spacing[1],
    },
    name: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    titleText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
    },
    dateText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.mutedForeground,
      marginTop: 1,
    },
    doubleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing[8],
    },
    inlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[3],
      flexWrap: 'wrap',
    },
    inlineLabel: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
    },
    inlineLine: {
      borderBottomWidth: 1,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
      minWidth: 120,
      height: spacing[5],
      paddingHorizontal: spacing[2],
    },
    inlineName: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
    },
  });
}
