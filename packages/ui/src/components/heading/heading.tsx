import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type HeadingTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';

export interface HeadingProps extends PDFComponentProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  color?: string;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  weight?: HeadingWeight;
  tracking?: HeadingTracking;
  noMargin?: boolean;
}

function createHeadingStyles(t: PdfxTheme) {
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

const styles = createHeadingStyles(theme);

const weightMap = {
  normal: styles.weightNormal,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
} as const;

const trackingMap = {
  tighter: styles.trackingTighter,
  tight: styles.trackingTight,
  normal: styles.trackingNormal,
  wide: styles.trackingWide,
  wider: styles.trackingWider,
} as const;

export function Heading({
  level = 1,
  align,
  color,
  transform,
  weight,
  tracking,
  noMargin,
  children,
  style,
}: HeadingProps) {
  const headingStyle = styles[`h${level}` as keyof typeof styles];
  const styleArray: Style[] = [headingStyle as Style];

  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }

  if (tracking && tracking in trackingMap) {
    styleArray.push(trackingMap[tracking]);
  }

  if (transform) {
    if (transform === 'uppercase') {
      styleArray.push(styles.uppercase);
    } else if (transform === 'lowercase') {
      styleArray.push(styles.lowercase);
    } else if (transform === 'capitalize') {
      styleArray.push(styles.capitalize);
    }
  }

  if (noMargin) {
    styleArray.push(styles.noMargin);
  }

  const semanticStyle = {} as Style;
  if (align) semanticStyle.textAlign = align;
  if (color) semanticStyle.color = resolveColor(color, theme.colors);
  if (Object.keys(semanticStyle).length > 0) {
    styleArray.push(semanticStyle);
  }

  if (style) {
    styleArray.push(style);
  }

  return <Text style={styleArray}>{children}</Text>;
}
