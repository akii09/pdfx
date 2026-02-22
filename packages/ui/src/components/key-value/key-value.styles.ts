import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all key-value styles derived from the active theme.
 * Returns a StyleSheet covering horizontal/vertical row layouts, dividers,
 * and key/value text styles across the three size scales.
 * @param t - The resolved PdfxTheme instance.
 */
export function createKeyValueStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },

    // ── Row layouts ─────────────────────────────────────────────────────
    rowHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: spacing[1],
    },
    rowVertical: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: t.spacing.paragraphGap,
    },

    // ── Divider line between rows ────────────────────────────────────────
    divider: {
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },

    // ── Key (label) ─────────────────────────────────────────────────────
    keySm: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    keyMd: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    keyLg: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.base,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },

    // ── Value ───────────────────────────────────────────────────────────
    valueSm: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },
    valueMd: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },
    valueLg: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.base,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },

    valueBold: { fontWeight: fontWeights.bold },
  });
}
