import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/** Divider line variant. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/** Divider thickness. */
export type DividerThickness = 'thin' | 'medium' | 'thick';

/** Divider spacing. */
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

/**
 * Props for the Divider component.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing="md" />
 * <Divider variant="dashed" color="muted" />
 * <Divider thickness="thick" />
 * <Divider label="OR" />
 * <Divider label="Section Break" color="primary" />
 * <Divider width="60%" align="center" />
 * ```
 */
export interface DividerProps extends Omit<PDFComponentProps, 'children'> {
  /** Vertical spacing above and below. Maps to theme spacing scale. */
  spacing?: DividerSpacing;
  /** Line style variant. */
  variant?: DividerVariant;
  /** Line color. Use theme token (e.g. 'border', 'muted', 'primary') or any CSS color. */
  color?: string;
  /** Line thickness. */
  thickness?: DividerThickness;
  /** Optional text label displayed in the center of the divider. Common for "OR", "Section N", etc. */
  label?: string;
  /** Width of the divider line. Use a percentage string (e.g. '60%') or number (pts). Defaults to '100%'. */
  width?: string | number;
  /** Horizontal alignment when width is less than 100%. */
  align?: 'left' | 'center' | 'right';
}

/** Creates divider styles from theme tokens. Zero hardcoded values. */
function createDividerStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
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
    // Label container (horizontal flex with lines and text)
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelLine: {
      flex: 1,
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
    },
    labelText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      paddingHorizontal: spacing[3],
      textTransform: 'uppercase',
      letterSpacing: t.primitives.letterSpacing.wider * 10,
    },
    // Alignment wrappers
    alignLeft: { alignSelf: 'flex-start' },
    alignCenter: { alignSelf: 'center' },
    alignRight: { alignSelf: 'flex-end' },
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

const alignMap = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
} as const;

/**
 * PDF divider component — a horizontal rule.
 * Uses theme tokens for border color, spacing, and thickness.
 * Supports an optional centered text label (e.g. "OR", "Section Break").
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider spacing="lg" />
 * <Divider variant="dashed" />
 * <Divider color="primary" thickness="thick" />
 * <Divider label="OR" />
 * <Divider label="Section 2" variant="dashed" color="mutedForeground" />
 * <Divider width="50%" align="center" />
 * <Divider style={{ borderBottomColor: 'navy' }} />
 * ```
 */
export function Divider({
  spacing = 'md',
  variant = 'solid',
  color,
  thickness = 'thin',
  label,
  width,
  align,
  style,
}: DividerProps) {
  const spacingStyle = spacingMap[spacing];

  // ─── Label variant: two lines with text in between ──────────────────────
  if (label) {
    const lineStyle: Style[] = [styles.labelLine, thicknessMap[thickness], variantMap[variant]];
    if (color) {
      lineStyle.push({ borderBottomColor: resolveColor(color, theme.colors) });
    }

    const containerStyles: Style[] = [styles.labelContainer, spacingStyle];

    if (width !== undefined) {
      containerStyles.push({ width } as Style);
    }
    if (align && align in alignMap) {
      containerStyles.push(alignMap[align]);
    }
    if (style) {
      containerStyles.push(style);
    }

    const labelTextStyle: Style[] = [styles.labelText];
    if (color) {
      labelTextStyle.push({ color: resolveColor(color, theme.colors) });
    }

    return (
      <View style={containerStyles}>
        <View style={lineStyle} />
        <PDFText style={labelTextStyle}>{label}</PDFText>
        <View style={lineStyle} />
      </View>
    );
  }

  // ─── Standard line divider ──────────────────────────────────────────────
  const styleArray: Style[] = [
    styles.base,
    spacingStyle,
    variantMap[variant],
    thicknessMap[thickness],
  ];

  // Apply custom color
  if (color) {
    styleArray.push({ borderBottomColor: resolveColor(color, theme.colors) });
  }

  // Apply width
  if (width !== undefined) {
    styleArray.push({ width } as Style);
  }

  // Apply alignment
  if (align && align in alignMap) {
    styleArray.push(alignMap[align]);
  }

  // Apply custom style last
  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray} />;
}
