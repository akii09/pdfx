import { Link as PDFLink } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createLinkStyles } from './link.styles';
import type { LinkProps } from './link.types';

export function Link({
  href,
  align,
  color,
  variant = 'default',
  underline,
  children,
  style,
}: LinkProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createLinkStyles(theme), [theme]);
  const variantMap = {
    default: styles.default,
    muted: styles.muted,
    primary: styles.primary,
  };
  const underlineMap = {
    always: styles.underlineAlways,
    none: styles.underlineNone,
  };
  const variantStyle = variantMap[variant];
  const styleArray: Style[] = [variantStyle];

  if (underline && underline in underlineMap) {
    styleArray.push(underlineMap[underline]);
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

  return (
    <PDFLink src={href} style={styleArray}>
      {children}
    </PDFLink>
  );
}
