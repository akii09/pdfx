import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline';

/** Badge size — controls font size and padding */
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<PDFComponentProps, 'children'> {
  /** Display text of the badge. */
  label: string;
  /** Visual variant. Controls colors. Defaults to 'default'. */
  variant?: BadgeVariant;
  /** Badge size. Defaults to 'md'. */
  size?: BadgeSize;
  /** Override the background color. Use theme token or any CSS color. */
  background?: string;
  /** Override the text color. Use theme token or any CSS color. */
  color?: string;
}

function createBadgeStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights } = t.primitives;
  const c = t.colors;

  const base = {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  };

  const textBase = {
    fontFamily: t.typography.body.fontFamily,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
  };

  return StyleSheet.create({
    // ── Container variants ──────────────────────────────────────────────
    containerBase: base,
    variantDefault: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.border,
      borderStyle: 'solid',
    },
    variantPrimary: {
      backgroundColor: c.primary,
      borderWidth: spacing[0.5],
    },
    variantSuccess: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.success,
      borderStyle: 'solid',
    },
    variantWarning: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.warning,
      borderStyle: 'solid',
    },
    variantDestructive: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.destructive,
      borderStyle: 'solid',
    },
    variantInfo: {
      backgroundColor: c.muted,
      borderWidth: spacing[0.5],
      borderColor: c.info,
      borderStyle: 'solid',
    },
    variantOutline: {
      backgroundColor: c.background,
      borderWidth: spacing[0.5],
      borderColor: c.border,
      borderStyle: 'solid',
    },

    // ── Size variants ───────────────────────────────────────────────────
    sizeSm: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[0.5],
    },
    sizeMd: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
    },
    sizeLg: {
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[2],
    },

    // ── Text variants ───────────────────────────────────────────────────
    textBase,
    textDefault: { ...textBase, color: c.mutedForeground },
    textPrimary: { ...textBase, color: c.primaryForeground },
    textSuccess: { ...textBase, color: c.success },
    textWarning: { ...textBase, color: c.warning },
    textDestructive: { ...textBase, color: c.destructive },
    textInfo: { ...textBase, color: c.info },
    textOutline: { ...textBase, color: c.foreground },

    // ── Text sizes ──────────────────────────────────────────────────────
    textSm: { fontSize: t.primitives.typography.xs - 1 }, // ~9pt
    textMd: { fontSize: t.primitives.typography.xs }, // 10pt
    textLg: { fontSize: t.primitives.typography.sm }, // 12pt
  });
}

const styles = createBadgeStyles(theme);

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

export function Badge({
  label,
  variant = 'default',
  size = 'md',
  background,
  color,
  style,
}: BadgeProps) {
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
