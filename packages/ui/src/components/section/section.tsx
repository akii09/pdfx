import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

/** Vertical margin preset applied above and below the section. */
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
/** Internal padding preset for the section container. */
export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';
/** Visual style variant that controls background, border, and accent decoration. */
export type SectionVariant = 'default' | 'callout' | 'highlight' | 'card';

export interface SectionProps extends PDFComponentProps {
  /** Vertical margin applied above and below the section. @default 'md' */
  spacing?: SectionSpacing;
  /** Internal padding preset. Defaults to the variant's built-in padding when omitted. */
  padding?: SectionPadding;
  /** Background fill color — accepts a theme token or any hex/rgb value. */
  background?: string;
  /** Add a full rectangle border around the section (only applies to the `default` variant). @default false */
  border?: boolean;
  /** Visual style preset. @default 'default' */
  variant?: SectionVariant;
  /** Override the accent bar color for `callout` and `highlight` variants. */
  accentColor?: string;
  /** Prevent the section from splitting across PDF pages. @default false */
  noWrap?: boolean;
}

function createSectionStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: { flexDirection: 'column' },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: spacing[4] },
    spacingMd: { marginVertical: t.spacing.sectionGap },
    spacingLg: { marginVertical: spacing[8] },
    spacingXl: { marginVertical: spacing[12] },
    paddingNone: { padding: spacing[0] },
    paddingSm: { padding: spacing[3] },
    paddingMd: { padding: spacing[4] },
    paddingLg: { padding: spacing[6] },
    border: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
    },
    callout: {
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      paddingLeft: spacing[4],
      paddingVertical: spacing[2],
    },
    highlight: {
      backgroundColor: t.colors.muted,
      borderLeftWidth: spacing[1],
      borderLeftColor: t.colors.primary,
      borderLeftStyle: 'solid',
      padding: spacing[4],
    },
    card: {
      borderWidth: spacing[0.5],
      borderColor: t.colors.border,
      borderStyle: 'solid',
      borderRadius: borderRadius.md,
      padding: spacing[4],
    },
  });
}

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
  const styleArray: Style[] = [styles.base, spacingMap[spacing]];
  const variantStyle = variantMap[variant];
  if (variantStyle) styleArray.push(variantStyle);
  if (accentColor && (variant === 'callout' || variant === 'highlight')) {
    styleArray.push({ borderLeftColor: resolveColor(accentColor, theme.colors) });
  }
  if (padding && padding in paddingMap) styleArray.push(paddingMap[padding]);
  if (border && variant === 'default') styleArray.push(styles.border);
  if (background) styleArray.push({ backgroundColor: resolveColor(background, theme.colors) });
  if (style) styleArray.push(...[style].flat());
  return (
    <View wrap={noWrap ? false : undefined} style={styleArray}>
      {children}
    </View>
  );
}
