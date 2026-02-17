import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type HeadingTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';

export interface HeadingProps extends PDFComponentProps {
  /** Heading level (1-6). Corresponds to h1-h6 sizing. Defaults to 1. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Text alignment. Maps to textAlign. */
  align?: 'left' | 'center' | 'right';
  /** Text color. Use theme token (e.g. 'primary', 'muted') or any CSS color. */
  color?: string;
  /** Text transform. Common for section headers. */
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  /** Font weight override. Defaults to theme heading weight. */
  weight?: HeadingWeight;
  /** Letter spacing / tracking. 'tight' is ideal for large display headings. */
  tracking?: HeadingTracking;
  /** Remove all margins (top and bottom). Useful inside Stack or tight layouts. */
  noMargin?: boolean;
}

function createHeadingStyles(t: PdfxTheme) {
  const { heading } = t.typography;
  const { foreground } = t.colors;
  const { spacing, fontWeights, letterSpacing } = t.primitives;

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
      marginBottom: spacing[4],
    },
    h2: {
      ...baseStyle,
      fontSize: heading.fontSize.h2,
      marginTop: spacing[6],
      marginBottom: spacing[3],
    },
    h3: {
      ...baseStyle,
      fontSize: heading.fontSize.h3,
      marginTop: spacing[4],
      marginBottom: spacing[2],
    },
    h4: {
      ...baseStyle,
      fontSize: heading.fontSize.h4,
      marginTop: spacing[3],
      marginBottom: spacing[2],
    },
    h5: {
      ...baseStyle,
      fontSize: heading.fontSize.h5,
      marginTop: spacing[2],
      marginBottom: spacing[1],
    },
    h6: {
      ...baseStyle,
      fontSize: heading.fontSize.h6,
      marginTop: spacing[2],
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
