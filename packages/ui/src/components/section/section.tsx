import { View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createSectionStyles } from './section.styles';
import type { SectionProps, SectionVariant } from './section.types';

export function Section({
  spacing = 'md',
  padding,
  background,
  border,
  variant = 'default',
  accentColor,
  noWrap = false,
  children,
  style,
}: SectionProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createSectionStyles(theme), [theme]);
  const spacingMap = {
    none: styles.spacingNone,
    sm: styles.spacingSm,
    md: styles.spacingMd,
    lg: styles.spacingLg,
    xl: styles.spacingXl,
  };
  const paddingMap = {
    none: styles.paddingNone,
    sm: styles.paddingSm,
    md: styles.paddingMd,
    lg: styles.paddingLg,
  };
  const variantMap: Record<SectionVariant, Style | null> = {
    default: null,
    callout: styles.callout,
    highlight: styles.highlight,
    card: styles.card,
  };
  const spacingStyle = spacingMap[spacing];
  const styleArray: Style[] = [styles.base, spacingStyle];

  const variantStyle = variantMap[variant];
  if (variantStyle) {
    styleArray.push(variantStyle);
  }

  if (accentColor && (variant === 'callout' || variant === 'highlight')) {
    styleArray.push({
      borderLeftColor: resolveColor(accentColor, theme.colors),
    });
  }

  if (padding && padding in paddingMap) {
    styleArray.push(paddingMap[padding]);
  }

  if (border && variant === 'default') {
    styleArray.push(styles.border);
  }

  if (background) {
    styleArray.push({ backgroundColor: resolveColor(background, theme.colors) });
  }

  if (style) {
    styleArray.push(style);
  }

  const inner = <View style={styleArray}>{children}</View>;
  return noWrap ? <View wrap={false}>{inner}</View> : inner;
}
