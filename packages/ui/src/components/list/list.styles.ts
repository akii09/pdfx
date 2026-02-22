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
    // ── Bullet markers ────────────────────────────────────────────────
    markerBulletWrap: {
      width: spacing[4],
      paddingTop: 4,
      alignItems: 'center',
    },
    markerBulletDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: t.colors.primary,
    },
    markerBulletSubWrap: {
      width: spacing[4],
      paddingTop: 5,
      alignItems: 'center',
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
    // ── Numbered marker ───────────────────────────────────────────────
    markerNumberBadge: {
      width: spacing[5],
      height: spacing[5],
      borderRadius: spacing[5],
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
      marginRight: spacing[2],
    },
    markerNumberText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    // ── Checklist ─────────────────────────────────────────────────────
    checkBox: {
      width: spacing[4],
      height: spacing[4],
      borderWidth: 1.5,
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: 3,
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
    // ── Icon box ──────────────────────────────────────────────────────
    iconBox: {
      width: spacing[5],
      height: spacing[5],
      borderRadius: 4,
      backgroundColor: t.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
      marginRight: spacing[2],
    },
    iconMark: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: 9,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.bold,
    },
    // ── Text styles ───────────────────────────────────────────────────
    itemText: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    itemTextSub: {
      flex: 1,
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize - 0.5,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
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
      borderRadius: 2,
      backgroundColor: t.colors.primary,
      marginRight: spacing[3],
      minHeight: 16,
    },
    descriptiveContent: {
      flex: 1,
    },
    childrenContainer: {
      marginLeft: spacing[5],
      marginTop: spacing[1],
    },
  });
}
