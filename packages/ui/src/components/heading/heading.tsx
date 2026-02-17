import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, Text } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Font weight options for Heading. */
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/** Letter spacing / tracking options for Heading. */
export type HeadingTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';

/**
 * Props for the Heading component.
 *
 * @example
 * ```tsx
 * <Heading level={2}>Chapter Title</Heading>
 * <Heading align="center" color="primary">Section Header</Heading>
 * <Heading level={3} weight="medium">Lighter Heading</Heading>
 * <Heading level={4} tracking="tight" noMargin>Compact Heading</Heading>
 * <Heading level={1} color="primary" tracking="tighter">Hero Title</Heading>
 * ```
 */
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

/** Creates heading styles from theme tokens. Zero hardcoded values. */
function createHeadingStyles(t: PdfxTheme) {
  const { heading } = t.typography;
  const { foreground } = t.colors;
  const { spacing, fontWeights, letterSpacing } = t.primitives;

  // Base style properties shared across all heading levels
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
    // Weight modifiers
    weightNormal: { fontWeight: fontWeights.regular },
    weightMedium: { fontWeight: fontWeights.medium },
    weightSemibold: { fontWeight: fontWeights.semibold },
    weightBold: { fontWeight: fontWeights.bold },
    // Transform with letter spacing for uppercase
    uppercase: { textTransform: 'uppercase', letterSpacing: letterSpacing.wider * 10 },
    lowercase: { textTransform: 'lowercase' },
    capitalize: { textTransform: 'capitalize' },
    // Tracking (letter spacing)
    trackingTighter: { letterSpacing: letterSpacing.tight * 15 },
    trackingTight: { letterSpacing: letterSpacing.tight * 10 },
    trackingNormal: { letterSpacing: letterSpacing.normal },
    trackingWide: { letterSpacing: letterSpacing.wide * 10 },
    trackingWider: { letterSpacing: letterSpacing.wider * 10 },
    // No margin
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

/**
 * PDF heading component that renders h1-h6 equivalents.
 * Uses theme tokens for all typography, color, and spacing values.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2} tracking="tight">Tight Display Heading</Heading>
 * <Heading level={3} align="center" color="primary">Section</Heading>
 * <Heading level={4} weight="medium">Lighter Subheading</Heading>
 * <Heading level={5} noMargin>No-margin heading in Stack</Heading>
 * <Heading level={6} transform="uppercase" tracking="wider">Label</Heading>
 * <Heading style={{ color: 'navy' }}>Custom style overrides</Heading>
 * ```
 */
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

  // Apply weight modifier
  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }

  // Apply tracking (letter spacing)
  if (tracking && tracking in trackingMap) {
    styleArray.push(trackingMap[tracking]);
  }

  // Apply transform styles
  if (transform) {
    if (transform === 'uppercase') {
      styleArray.push(styles.uppercase);
    } else if (transform === 'lowercase') {
      styleArray.push(styles.lowercase);
    } else if (transform === 'capitalize') {
      styleArray.push(styles.capitalize);
    }
  }

  // Remove margins if requested
  if (noMargin) {
    styleArray.push(styles.noMargin);
  }

  // Apply semantic overrides
  const semanticStyle = {} as Style;
  if (align) semanticStyle.textAlign = align;
  if (color) semanticStyle.color = resolveColor(color, theme.colors);
  if (Object.keys(semanticStyle).length > 0) {
    styleArray.push(semanticStyle);
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <Text style={styleArray}>{children}</Text>;
}
