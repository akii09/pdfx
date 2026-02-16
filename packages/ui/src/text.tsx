import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';

export interface TextProps {
  children: string | React.ReactNode;
  style?: Style;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 8,
  },
});

export function Text({ children, style }: TextProps) {
  return <PDFText style={style ? [styles.text, style] : styles.text}>{children}</PDFText>;
}
