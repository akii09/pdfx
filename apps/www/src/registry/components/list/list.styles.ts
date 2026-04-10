import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all list styles derived from the active theme.
 * @param t - The resolved PdfxTheme instance.
 */
export function createListStyles(t: PdfxTheme) {
  const { borderRadius, spacing, fontWeights, typography } = t.primitives;

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
    itemRowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemRowGapXs: { marginBottom: spacing[1] },
    itemRowGapSm: { marginBottom: spacing[2] },
    itemRowGapMd: { marginBottom: spacing[3] },
    markerBulletWrap: {
      width: spacing[4],
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: spacing[1],
    },
    markerBulletDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: t.colors.primary,
    },
    markerBulletSubWrap: {
      width: spacing[4],
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: spacing[1],
    },
    markerBulletSubDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.mutedForeground,
      backgroundColor: 'transparent',
    },
    markerNumberBadge: {
      width: spacing[5],
      height: spacing[5],
      borderRadius: spacing[5],
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing[2],
    },
    markerNumberText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    checkBox: {
      width: spacing[4],
      height: spacing[4],
      borderWidth: 1.5,
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: 3,
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
      width: spacing[5],
      height: spacing[5],
      borderRadius: borderRadius.md,
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing[2],
    },
    iconMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 9,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    itemText: {
      // No flex here — Text nodes with flex shorthand get flexBasis:0, which causes
      // Yoga to under-measure multi-line text height → overlapping rows.
      // flex:1 must live on the wrapping View, not on the Text itself.
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    itemTextSub: {
      // Same: no flex — see itemText comment.
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize - 0.5,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
    },
    itemTextWrap: {
      // Companion to itemText / itemTextSub. Apply this to the View that wraps
      // the Text so flex expansion happens at the View level, not the Text level.
      flex: 1,
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
      width: 3,
      borderRadius: borderRadius.sm,
      backgroundColor: t.colors.primary,
      marginRight: spacing[3],
      minHeight: spacing[4],
    },
    descriptiveContent: {
      flex: 1,
    },
    childrenContainer: {
      marginLeft: spacing[5],
      marginTop: spacing[1],
      display: 'flex',
      flexDirection: 'column',
    },
  });
}
