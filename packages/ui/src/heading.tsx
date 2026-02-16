import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, Text } from '@react-pdf/renderer';
import { theme } from './lib/pdfx-theme';

/**
 * Props for the Heading component.
 *
 * @example
 * ```tsx
 * <Heading level={2}>Chapter Title</Heading>
 * ```
 */
export interface HeadingProps extends PDFComponentProps {
  /** Heading level (1-6). Corresponds to h1-h6 sizing. Defaults to 1. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/** Creates heading styles from theme tokens. Zero hardcoded values. */
function createHeadingStyles(t: PdfxTheme) {
  const { heading } = t.typography;
  const { foreground } = t.colors;

  return StyleSheet.create({
    h1: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h1,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.componentGap,
    },
    h2: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h2,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.componentGap,
    },
    h3: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h3,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.componentGap,
    },
    h4: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h4,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
    },
    h5: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h5,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
    },
    h6: {
      fontFamily: heading.fontFamily,
      fontSize: heading.fontSize.h6,
      fontWeight: heading.fontWeight as unknown as 'bold',
      lineHeight: heading.lineHeight,
      color: foreground,
      marginBottom: t.spacing.paragraphGap,
    },
  });
}

const styles = createHeadingStyles(theme);

/**
 * PDF heading component that renders h1-h6 equivalents.
 * Uses theme tokens for all typography, color, and spacing values.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={3} style={{ color: 'navy' }}>Subsection</Heading>
 * ```
 */
export function Heading({ level = 1, children, style }: HeadingProps) {
  const headingStyle = styles[`h${level}` as keyof typeof styles];

  return <Text style={style ? [headingStyle, style] : headingStyle}>{children}</Text>;
}
