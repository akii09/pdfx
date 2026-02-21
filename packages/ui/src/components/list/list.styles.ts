import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all list styles derived from the active theme.
 * Returns a StyleSheet covering container, item row, gap variations, markers,
 * checklist/icon boxes, text styles, and nested children layout.
 * @param t - The resolved PdfxTheme instance.
 */
export function createListStyles(t: PdfxTheme) {
  const { spacing, fontWeights, typography } = t.primitives;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    itemRowGapXs: { marginBottom: spacing[1] },
    itemRowGapSm: { marginBottom: spacing[2] },
    itemRowGapMd: { marginBottom: spacing[3] },
    markerBullet: {
      width: spacing[3],
      marginTop: 2,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.primary,
    },
    markerBulletSub: {
      width: spacing[3],
      marginTop: 2,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.mutedForeground,
    },
    markerNumber: {
      width: spacing[4],
      marginTop: 0,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      color: t.colors.primary,
      fontWeight: fontWeights.semibold,
    },
    checkBox: {
      width: spacing[4],
      height: spacing[4],
      borderWidth: 1,
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: 2,
      marginTop: 1,
      marginRight: spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: t.colors.background,
    },
    checkBoxChecked: {
      backgroundColor: t.colors.success,
      borderColor: t.colors.success,
    },
    checkMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 8,
      color: t.colors.background,
      fontWeight: fontWeights.bold,
    },
    iconBox: {
      width: spacing[4],
      height: spacing[4],
      borderRadius: 2,
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
      marginRight: spacing[2],
    },
    iconMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 8,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    itemText: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    itemTextBold: {
      fontWeight: fontWeights.semibold,
    },
    descriptiveTitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    descriptiveDesc: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      marginTop: 1,
    },
    descriptiveAccent: {
      width: spacing[1],
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      marginRight: spacing[3],
    },
    descriptiveContent: {
      flex: 1,
    },
    childrenContainer: {
      marginLeft: spacing[4],
      marginTop: spacing[1],
    },
  });
}
