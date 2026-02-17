import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type SectionPadding = 'none' | 'sm' | 'md' | 'lg';

export type SectionVariant = 'default' | 'callout' | 'highlight' | 'card';

export interface SectionProps extends PDFComponentProps {
  /** Vertical spacing (margin) around the section. Maps to theme spacing. */
  spacing?: SectionSpacing;
  /** Inner padding. Maps to theme spacing. */
  padding?: SectionPadding;
  /** Background color. Use theme token (e.g. 'muted', 'primary') or any CSS color. */
  background?: string;
  /** Add a border around the section. */
  border?: boolean;
  /** Section visual variant. 'callout' adds left accent border. 'highlight' adds muted bg. 'card' adds border + rounded. */
  variant?: SectionVariant;
  /** Accent color for callout/highlight left border. Use theme token or CSS color. Defaults to 'primary'. */
  accentColor?: string;
}

function createSectionStyles(t: PdfxTheme) {
  const { spacing, borderRadius } = t.primitives;
  return StyleSheet.create({
    base: {
      display: 'flex',
      flexDirection: 'column',
    },
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
      borderRadius: borderRadius.sm,
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

const styles = createSectionStyles(theme);

const spacingMap = {
  none: styles.spacingNone,
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
  xl: styles.spacingXl,
} as const;

const paddingMap = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
} as const;

const variantMap = {
  default: null,
  callout: styles.callout,
  highlight: styles.highlight,
  card: styles.card,
} as const;

export function Section({
  spacing = 'md',
  padding,
  background,
  border,
  variant = 'default',
  accentColor,
  children,
  style,
}: SectionProps) {
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

  return <View style={styleArray}>{children}</View>;
}
