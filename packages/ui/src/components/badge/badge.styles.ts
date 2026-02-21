import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all badge styles derived from the active theme.
 * Returns a StyleSheet covering container, text, variant, and size styles.
 * @param t - The resolved PdfxTheme instance.
 */
export function createBadgeStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;

  const base = {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };

  const textBase = {
    fontFamily: t.typography.body.fontFamily,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  };

  return StyleSheet.create({
    // ── Container variants ──────────────────────────────────────────────
    containerBase: base,
    variantDefault: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.border,
      borderStyle: 'solid',
    },
    variantPrimary: {
      backgroundColor: c.primary,
      borderWidth: spacing[0.5],
    },
    variantSuccess: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.success,
      borderStyle: 'solid',
    },
    variantWarning: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.warning,
      borderStyle: 'solid',
    },
    variantDestructive: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.destructive,
      borderStyle: 'solid',
    },
    variantInfo: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.info,
      borderStyle: 'solid',
    },
    variantOutline: {
      backgroundColor: c.background,
      borderWidth: spacing[0.5],
      borderColor: c.border,
      borderStyle: 'solid',
    },

    // ── Size variants ───────────────────────────────────────────────────
    sizeSm: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[0.5],
    },
    sizeMd: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
    },
    sizeLg: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[2],
    },

    // ── Text variants ───────────────────────────────────────────────────
    textBase,
    textDefault: { ...textBase, color: c.mutedForeground },
    textPrimary: { ...textBase, color: c.primaryForeground },
    textSuccess: { ...textBase, color: c.success },
    textWarning: { ...textBase, color: c.warning },
    textDestructive: { ...textBase, color: c.destructive },
    textInfo: { ...textBase, color: c.info },
    textOutline: { ...textBase, color: c.foreground },

    // ── Text sizes ──────────────────────────────────────────────────────
    textSm: { fontSize: t.primitives.typography.xs - 1 }, // ~9pt
    textMd: { fontSize: t.primitives.typography.xs }, // 10pt
    textLg: { fontSize: t.primitives.typography.sm }, // 12pt
  });
}
