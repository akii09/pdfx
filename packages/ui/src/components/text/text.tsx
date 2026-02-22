import { Text as PDFText } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createTextStyles } from './text.styles';
import type { TextProps } from './text.types';

export function Text({
  variant,
  align,
  color,
  weight,
  italic,
  decoration,
  transform,
  noMargin,
  children,
  style,
}: TextProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createTextStyles(theme), [theme]);
  const weightMap = {
    normal: styles.weightNormal,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
    bold: styles.weightBold,
  };
  const decorationMap = {
    underline: styles.underline,
    'line-through': styles.lineThrough,
    none: styles.decorationNone,
  };
  const transformMap = {
    uppercase: styles.uppercase,
    lowercase: styles.lowercase,
    capitalize: styles.capitalize,
  };
  const baseStyle = variant ? styles[variant] : styles.text;
  const styleArray: Style[] = [baseStyle];

  if (weight && weight in weightMap) {
    styleArray.push(weightMap[weight]);
  }

  if (italic) {
    styleArray.push(styles.italic);
  }

  if (decoration && decoration in decorationMap) {
    styleArray.push(decorationMap[decoration]);
  }

  if (transform && transform in transformMap) {
    styleArray.push(transformMap[transform]);
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

  return <PDFText style={styleArray}>{children}</PDFText>;
}
