import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all heading styles derived from the active theme.
 * Returns a StyleSheet covering h1–h6 levels, weight, tracking, transform, and margin overrides.
 * @param t - The resolved PdfxTheme instance.
 */
export function createHeadingStyles(t: PdfxTheme) {
  const { heading } = t.typography;
  const { foreground } = t.colors;
  const { spacing, fontWeights, letterSpacing } = t.primitives;
  // Semantic spacing tokens — adapt across Minimal / Modern / Professional themes
  const { sectionGap, componentGap, paragraphGap } = t.spacing;

  const baseStyle = {
    fontFamily: heading.fontFamily,
    fontWeight: fontWeights.bold,
    lineHeight: heading.lineHeight,
    color: foreground,
  };

  return StyleSheet.create({
    h1: {
      ...baseStyle,
      fontSize: heading.fontSize.h1,
      marginTop: spacing[0],
      marginBottom: paragraphGap,
    },
    h2: {
      ...baseStyle,
      fontSize: heading.fontSize.h2,
      marginTop: sectionGap,
      marginBottom: paragraphGap,
    },
    h3: {
      ...baseStyle,
      fontSize: heading.fontSize.h3,
      marginTop: componentGap,
      marginBottom: paragraphGap,
    },
    h4: {
      ...baseStyle,
      fontSize: heading.fontSize.h4,
      marginTop: paragraphGap,
      marginBottom: paragraphGap,
    },
    h5: {
      ...baseStyle,
      fontSize: heading.fontSize.h5,
      marginTop: paragraphGap,
      marginBottom: spacing[1],
    },
    h6: {
      ...baseStyle,
      fontSize: heading.fontSize.h6,
      marginTop: paragraphGap,
      marginBottom: spacing[1],
    },
    weightNormal: { fontWeight: fontWeights.regular },
    weightMedium: { fontWeight: fontWeights.medium },
    weightSemibold: { fontWeight: fontWeights.semibold },
    weightBold: { fontWeight: fontWeights.bold },
    uppercase: { textTransform: 'uppercase', letterSpacing: letterSpacing.wider * 10 },
    lowercase: { textTransform: 'lowercase' },
    capitalize: { textTransform: 'capitalize' },
    trackingTighter: { letterSpacing: letterSpacing.tight * 15 },
    trackingTight: { letterSpacing: letterSpacing.tight * 10 },
    trackingNormal: { letterSpacing: letterSpacing.normal },
    trackingWide: { letterSpacing: letterSpacing.wide * 10 },
    trackingWider: { letterSpacing: letterSpacing.wider * 10 },
    noMargin: { marginTop: 0, marginBottom: 0 },
  });
}
