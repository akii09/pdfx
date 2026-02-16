import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import { theme } from './lib/pdfx-theme';

/**
 * Props for the Text component.
 *
 * @example
 * ```tsx
 * <Text>Hello, world!</Text>
 * ```
 */
export interface TextProps extends PDFComponentProps {}

/** Creates text styles from theme tokens. Zero hardcoded values. */
function createTextStyles(t: PdfxTheme) {
  return StyleSheet.create({
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      marginBottom: t.spacing.paragraphGap,
    },
  });
}

const styles = createTextStyles(theme);

/**
 * PDF text component for body paragraphs.
 * Uses theme tokens for font family, size, line height, color, and spacing.
 *
 * @example
 * ```tsx
 * <Text>A paragraph of body text in your PDF document.</Text>
 * <Text style={{ fontSize: 14, color: 'gray' }}>Custom styled text.</Text>
 * ```
 */
export function Text({ children, style }: TextProps) {
  return <PDFText style={style ? [styles.text, style] : styles.text}>{children}</PDFText>;
}
