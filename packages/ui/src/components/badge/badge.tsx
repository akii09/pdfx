import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createBadgeStyles } from './badge.styles';
import type { BadgeProps, BadgeSize, BadgeVariant } from './badge.types';

export function Badge({
  label,
  variant = 'default',
  size = 'md',
  background,
  color,
  style,
}: BadgeProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createBadgeStyles(theme), [theme]);
  const containerVariantMap: Record<BadgeVariant, Style> = {
    default: styles.variantDefault,
    primary: styles.variantPrimary,
    success: styles.variantSuccess,
    warning: styles.variantWarning,
    destructive: styles.variantDestructive,
    info: styles.variantInfo,
    outline: styles.variantOutline,
  };
  const textVariantMap: Record<BadgeVariant, Style> = {
    default: styles.textDefault,
    primary: styles.textPrimary,
    success: styles.textSuccess,
    warning: styles.textWarning,
    destructive: styles.textDestructive,
    info: styles.textInfo,
    outline: styles.textOutline,
  };
  const containerSizeMap: Record<BadgeSize, Style> = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  };
  const textSizeMap: Record<BadgeSize, Style> = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
  };
  const containerStyles: Style[] = [
    styles.containerBase,
    containerVariantMap[variant],
    containerSizeMap[size],
  ];

  if (background) {
    containerStyles.push({ backgroundColor: resolveColor(background, theme.colors) });
  }

  if (style) {
    containerStyles.push(style);
  }

  const textStyles: Style[] = [textVariantMap[variant], textSizeMap[size]];

  if (color) {
    textStyles.push({ color: resolveColor(color, theme.colors) });
  }

  return (
    <View style={containerStyles}>
      <PDFText style={textStyles}>{label}</PDFText>
    </View>
  );
}
