import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

/** Visual style variant for the badge. */
export interface BadgeProps extends Omit<PDFComponentProps, 'children'> {
  /** Text content of the badge. */
  label: string;
  /** Color scheme of the badge. @default 'default' */
  variant?: BadgeVariant;
  /** Badge size — controls font size and padding. @default 'md' */
  size?: BadgeSize;
  /** Custom background color — accepts a theme token or any hex/rgb value. Overrides `variant` background. */
  background?: string;
  /** Custom text color — accepts a theme token or any hex/rgb value. Overrides `variant` text color. */
  color?: string;
}

function createBadgeStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;
  const textBase = {
    fontFamily: t.typography.body.fontFamily,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  };
  const bv = (borderColor: string, bgColor: string = c.muted) => ({
    backgroundColor: bgColor,
    borderWidth: spacing[0.5],
    borderColor,
    borderStyle: 'solid' as const,
  });
  const sheet = StyleSheet.create({
    containerBase: {
      borderRadius: borderRadius.full,
      alignSelf: 'flex-start' as const,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    variantDefault: bv(c.border),
    variantPrimary: bv(c.primary, c.primary),
    variantSuccess: bv(c.success),
    variantWarning: bv(c.warning),
    variantDestructive: bv(c.destructive),
    variantInfo: bv(c.info),
    variantOutline: bv(c.border, c.background),
    sizeSm: { paddingHorizontal: spacing[2], paddingVertical: spacing[0.5] },
    sizeMd: { paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
    sizeLg: { paddingHorizontal: spacing[4], paddingVertical: spacing[2] },
    textDefault: { ...textBase, color: c.mutedForeground },
    textPrimary: { ...textBase, color: c.primaryForeground },
    textSuccess: { ...textBase, color: c.success },
    textWarning: { ...textBase, color: c.warning },
    textDestructive: { ...textBase, color: c.destructive },
    textInfo: { ...textBase, color: c.info },
    textOutline: { ...textBase, color: c.foreground },
    textSm: { fontSize: t.primitives.typography.xs - 1 },
    textMd: { fontSize: t.primitives.typography.xs },
    textLg: { fontSize: t.primitives.typography.sm },
  });
  return {
    ...sheet,
    containerVariantMap: {
      default: sheet.variantDefault,
      primary: sheet.variantPrimary,
      success: sheet.variantSuccess,
      warning: sheet.variantWarning,
      destructive: sheet.variantDestructive,
      info: sheet.variantInfo,
      outline: sheet.variantOutline,
    } as Record<BadgeVariant, Style>,
    textVariantMap: {
      default: sheet.textDefault,
      primary: sheet.textPrimary,
      success: sheet.textSuccess,
      warning: sheet.textWarning,
      destructive: sheet.textDestructive,
      info: sheet.textInfo,
      outline: sheet.textOutline,
    } as Record<BadgeVariant, Style>,
    containerSizeMap: { sm: sheet.sizeSm, md: sheet.sizeMd, lg: sheet.sizeLg } as Record<
      BadgeSize,
      Style
    >,
    textSizeMap: { sm: sheet.textSm, md: sheet.textMd, lg: sheet.textLg } as Record<
      BadgeSize,
      Style
    >,
  };
}

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
  const containerStyles: Style[] = [
    styles.containerBase,
    styles.containerVariantMap[variant],
    styles.containerSizeMap[size],
    ...(background ? [{ backgroundColor: resolveColor(background, theme.colors) }] : []),
    ...(style ? [style].flat() : []),
  ];
  const textStyles: Style[] = [
    styles.textVariantMap[variant],
    styles.textSizeMap[size],
    ...(color ? [{ color: resolveColor(color, theme.colors) }] : []),
  ];
  return (
    <View style={containerStyles}>
      <PDFText style={textStyles}>{label}</PDFText>
    </View>
  );
}
