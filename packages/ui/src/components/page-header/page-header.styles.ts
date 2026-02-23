import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createPageHeaderStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;
  const { heading, body } = t.typography;

  return StyleSheet.create({
    // ── Simple variant ──────────────────────────────────────────────────
    simpleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    simpleLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    simpleRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },

    // ── Centered variant ────────────────────────────────────────────────
    centeredContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },

    // ── Minimal variant ─────────────────────────────────────────────────
    minimalContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: spacing[1],
      borderBottomColor: c.primary,
      borderBottomStyle: 'solid',
      paddingBottom: spacing[3],
    },
    minimalLeft: {
      flex: 1,
    },
    minimalRight: {
      alignItems: 'flex-end',
    },

    // ── Branded variant ─────────────────────────────────────────────────
    brandedContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: c.primary,
      padding: spacing[6],
      borderRadius: borderRadius.sm,
    },

    // ── Typography ──────────────────────────────────────────────────────
    title: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h3,
      fontWeight: fontWeights.bold,
      color: c.foreground,
      lineHeight: heading.lineHeight,
      marginBottom: 0,
    },
    titleCentered: {
      textAlign: 'center',
    },
    titleBranded: {
      color: c.primaryForeground,
    },
    titleMinimal: {
      fontSize: heading.fontSize.h3,
      fontWeight: fontWeights.bold,
    },

    subtitle: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.mutedForeground,
      marginTop: spacing[1],
      lineHeight: body.lineHeight,
    },
    subtitleCentered: {
      textAlign: 'center',
    },
    subtitleBranded: {
      color: c.primaryForeground,
      marginTop: spacing[1],
    },

    rightText: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.foreground,
      fontWeight: fontWeights.medium,
      textAlign: 'right',
    },
    rightSubText: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      textAlign: 'right',
      marginTop: spacing[1],
    },

    // ── Logo-left variant ───────────────────────────────────────────────
    logoLeftContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      marginRight: spacing[2],
      width: 42,
      height: 42,
    },
    logoContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },

    // ── Logo-right variant ──────────────────────────────────────────────
    logoRightContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    logoRightContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    logoRightLogoContainer: {
      marginLeft: spacing[4],
      width: 48,
      height: 48,
    },

    // ── Two-column variant ──────────────────────────────────────────────
    twoColumnContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingBottom: spacing[4],
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    twoColumnLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    twoColumnRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    contactInfo: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      textAlign: 'right',
      marginTop: spacing[0.5],
    },
  });
}
