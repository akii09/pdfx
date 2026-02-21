import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Link as PDFLink, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type LinkVariant = 'default' | 'muted' | 'primary';

export type LinkUnderline = 'always' | 'none';

export interface LinkProps extends PDFComponentProps {
  /** URL or anchor ID (prefix with # for internal links). Maps to @react-pdf Link src. */
  href: string;
  /** Text alignment. Maps to textAlign. */
  align?: 'left' | 'center' | 'right';
  /** Text color. Use theme token (e.g. 'primary', 'accent') or any CSS color. Defaults to accent. */
  color?: string;
  /** Link visual variant. */
  variant?: LinkVariant;
  /** Underline style. always = underlined, none = no underline. */
  underline?: LinkUnderline;
}

function createLinkStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  const baseStyle = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    marginBottom: t.spacing.paragraphGap,
  };

  return StyleSheet.create({
    default: {
      ...baseStyle,
      color: t.colors.accent,
      fontWeight: fontWeights.medium,
      textDecoration: 'underline',
    },
    muted: {
      ...baseStyle,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.regular,
      textDecoration: 'underline',
    },
    primary: {
      ...baseStyle,
      color: t.colors.primary,
      fontWeight: fontWeights.semibold,
      textDecoration: 'underline',
    },
    underlineAlways: { textDecoration: 'underline' },
    underlineNone: { textDecoration: 'none' },
  });
}

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
