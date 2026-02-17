import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Typography scale keys from theme primitives. Maps to fontSize. */
export type TextVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/** Font weight options for Text. */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Props for the Text component.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * <Text variant="xs" color="muted">Caption</Text>
 * <Text variant="lg" weight="semibold">Important text</Text>
 * <Text italic>Emphasized text</Text>
 * ```
 */
export interface TextProps extends PDFComponentProps {
  /** Typography scale variant. Maps to primitives.typography. Default (undefined) uses typography.body. */
  variant?: TextVariant;
  /** Text alignment. Maps to textAlign. */
  align?: 'left' | 'center' | 'right';
  /** Text color. Use theme token (e.g. 'primary', 'muted') or any CSS color. */
  color?: string;
  /** Font weight override. */
  weight?: TextWeight;
  /** Render text in italic style. */
  italic?: boolean;
}

/** Creates text styles from theme tokens. Zero hardcoded values. */
function createTextStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  const base = {
    fontFamily: t.typography.body.fontFamily,
    lineHeight: t.typography.body.lineHeight,
    color: t.colors.foreground,
    marginBottom: t.spacing.paragraphGap,
    marginTop: 0,
  };
  return StyleSheet.create({
    text: { ...base, fontSize: t.typography.body.fontSize },
    xs: { ...base, fontSize: t.primitives.typography.xs },
    sm: { ...base, fontSize: t.primitives.typography.sm },
    base: { ...base, fontSize: t.primitives.typography.base },
    lg: { ...base, fontSize: t.primitives.typography.lg },
    xl: { ...base, fontSize: t.primitives.typography.xl },
    '2xl': { ...base, fontSize: t.primitives.typography['2xl'] },
    '3xl': { ...base, fontSize: t.primitives.typography['3xl'] },
    // Weight modifiers
    weightNormal: { fontWeight: fontWeights.regular },
    weightMedium: { fontWeight: fontWeights.medium },
    weightSemibold: { fontWeight: fontWeights.semibold },
    weightBold: { fontWeight: fontWeights.bold },
    // Style modifiers
    italic: { fontStyle: 'italic' },
  });
}

const styles = createTextStyles(theme);

const weightMap = {
  normal: styles.weightNormal,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
} as const;

/**
 * PDF text component for body paragraphs.
 * Uses theme tokens for font family, size, line height, color, and spacing.
 *
 * @example
 * ```tsx
 * <Text>A paragraph of body text in your PDF document.</Text>
 * <Text align="center" color="muted">Caption text</Text>
 * <Text weight="semibold">Bold text</Text>
 * <Text italic color="primary">Emphasized and colored</Text>
 * <Text style={{ fontSize: 14, color: 'gray' }}>Custom styled text.</Text>
 * ```
 */
export function Text({ variant, align, color, weight, italic, children, style }: TextProps) {
  const baseStyle = variant ? styles[variant] : styles.text;
  const styleArray: Style[] = [baseStyle];

  // Apply weight modifier
  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }

  // Apply italic style
  if (italic) {
    styleArray.push(styles.italic);
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

  return <PDFText style={styleArray}>{children}</PDFText>;
}
