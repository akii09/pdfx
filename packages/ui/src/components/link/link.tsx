import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Link as PDFLink, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type LinkVariant = 'default' | 'muted' | 'primary';
export type LinkUnderline = 'always' | 'none';

export interface LinkProps extends PDFComponentProps {
  /** The URL the link navigates to when clicked. */
  href: string;
  /** Horizontal text alignment. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Text color — accepts a theme token ('primary', 'muted') or any hex/rgb value. Overrides `variant` color. */
  color?: string;
  /** Color preset for the link. @default 'default' */
  variant?: LinkVariant;
  /** When to show the underline decoration. @default 'always' */
  underline?: LinkUnderline;
}

function createLinkStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  const base = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    marginBottom: t.spacing.paragraphGap,
  };
  return StyleSheet.create({
    default: {
      ...base,
      color: t.colors.accent,
      fontWeight: fontWeights.medium,
      textDecoration: 'underline',
    },
    muted: {
      ...base,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.regular,
      textDecoration: 'underline',
    },
    primary: {
      ...base,
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
  const variantMap = { default: styles.default, muted: styles.muted, primary: styles.primary };
  const underlineMap = { always: styles.underlineAlways, none: styles.underlineNone };
  const styleArray: Style[] = [variantMap[variant]];
  if (underline && underline in underlineMap) styleArray.push(underlineMap[underline]);
  const semantic = {} as Style;
  if (align) semantic.textAlign = align;
  if (color) semantic.color = resolveColor(color, theme.colors);
  if (Object.keys(semantic).length > 0) styleArray.push(semantic);
  if (style) styleArray.push(...[style].flat());
  return (
    <PDFLink src={href} style={styleArray}>
      {children}
    </PDFLink>
  );
}
