import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Divider line variant. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/** Divider thickness. */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/**
 * Props for the Divider component.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing="md" />
 * <Divider variant="dashed" color="muted" />
 * <Divider thickness="thick" />
 * ```
 */
export interface DividerProps extends Omit<PDFComponentProps, 'children'> {
  /** Vertical spacing above and below. Maps to theme spacing scale. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Line style variant. */
  variant?: DividerVariant;
  /** Line color. Use theme token (e.g. 'border', 'muted', 'primary') or any CSS color. */
  color?: string;
  /** Line thickness. */
  thickness?: DividerThickness;
}

/** Creates divider styles from theme tokens. Zero hardcoded values. */
function createDividerStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    base: {
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
    },
    // Spacing
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: spacing[3] },
    spacingMd: { marginVertical: spacing[5] },
    spacingLg: { marginVertical: spacing[8] },
    // Variants
    solid: { borderBottomStyle: 'solid' },
    dashed: { borderBottomStyle: 'dashed' },
    dotted: { borderBottomStyle: 'dotted' },
    // Thickness
    thin: { borderBottomWidth: spacing[0.5] },
    medium: { borderBottomWidth: spacing[1] },
    thick: { borderBottomWidth: spacing[2] },
  });
}

const styles = createDividerStyles(theme);

const spacingMap = {
  none: styles.spacingNone,
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
} as const;

const variantMap = {
  solid: styles.solid,
  dashed: styles.dashed,
  dotted: styles.dotted,
} as const;

const thicknessMap = {
  thin: styles.thin,
  medium: styles.medium,
  thick: styles.thick,
} as const;

/**
 * PDF divider component — a horizontal rule.
 * Uses theme tokens for border color, spacing, and thickness.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing="lg" />
 * <Divider variant="dashed" />
 * <Divider color="primary" thickness="thick" />
 * <Divider style={{ borderBottomColor: 'navy' }} />
 * ```
 */
export function Divider({
  spacing = 'md',
  variant = 'solid',
  color,
  thickness = 'thin',
  style,
}: DividerProps) {
  const spacingStyle = spacingMap[spacing];
  const variantStyle = variantMap[variant];
  const thicknessStyle = thicknessMap[thickness];
  const styleArray: Style[] = [styles.base, spacingStyle, variantStyle, thicknessStyle];

  // Apply custom color
  if (color) {
    styleArray.push({ borderBottomColor: resolveColor(color, theme.colors) });
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray} />;
}
