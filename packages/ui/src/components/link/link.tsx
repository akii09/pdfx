import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Link as PDFLink, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Link visual variant. */
export type LinkVariant = 'default' | 'muted' | 'primary';

/** Underline style for Link. */
export type LinkUnderline = 'always' | 'none';

/**
 * Props for the Link component.
 *
 * @example
 * ```tsx
 * <Link href="https://example.com">Visit our site</Link>
 * <Link href="#section-1" variant="primary">Jump to section</Link>
 * <Link href="https://docs.example.com" underline="none">Docs</Link>
 * ```
 */
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

/** Creates link styles from theme tokens. Zero hardcoded values. */
function createLinkStyles(t: PdfxTheme) {
  const { fontWeights } = t.primitives;
  const baseStyle = {
    fontFamily: t.typography.body.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    marginBottom: t.spacing.paragraphGap,
  };

  return StyleSheet.create({
    // Variants
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
    // Underline modifiers
    underlineAlways: { textDecoration: 'underline' },
    underlineNone: { textDecoration: 'none' },
  });
}

const styles = createLinkStyles(theme);

const variantMap = {
  default: styles.default,
  muted: styles.muted,
  primary: styles.primary,
} as const;

const underlineMap = {
  always: styles.underlineAlways,
  none: styles.underlineNone,
} as const;

/**
 * PDF link component for hyperlinks.
 * Uses theme tokens for typography and color. Renders as clickable link in PDF viewers.
 *
 * @example
 * ```tsx
 * <Link href="https://pdfx.akashpise.dev">Documentation</Link>
 * <Link href="#chapter-2" variant="primary">Chapter 2</Link>
 * <Link href="https://github.com" variant="muted" underline="none">GitHub</Link>
 * ```
 */
export function Link({
  href,
  align,
  color,
  variant = 'default',
  underline,
  children,
  style,
}: LinkProps) {
  const variantStyle = variantMap[variant];
  const styleArray: Style[] = [variantStyle];

  // Apply underline modifier (overrides variant default)
  if (underline && underline in underlineMap) {
    styleArray.push(underlineMap[underline]);
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

  return (
    <PDFLink src={href} style={styleArray}>
      {children}
    </PDFLink>
  );
}
