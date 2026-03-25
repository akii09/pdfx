import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

/** Line style of the divider. */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
/** Visual weight of the divider line. */
export type DividerThickness = 'thin' | 'medium' | 'thick';
/** Vertical margin preset applied above and below the divider. */
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerProps extends Omit<PDFComponentProps, 'children'> {
  /** Vertical margin above and below the divider. @default 'md' */
  spacing?: DividerSpacing;
  /** Line style of the divider. @default 'solid' */
  variant?: DividerVariant;
  /** Line and label color — accepts a theme token ('primary', 'muted') or any hex/rgb value. */
  color?: string;
  /** Line weight. @default 'thin' */
  thickness?: DividerThickness;
  /** Optional centered label text rendered on top of the divider line. */
  label?: string;
  /** Fixed width of the divider. Omit to span full width. */
  width?: string | number;
}

function createDividerStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  return StyleSheet.create({
    base: { borderBottomColor: t.colors.border, borderBottomStyle: 'solid' },
    spacingNone: { marginVertical: spacing[0] },
    spacingSm: { marginVertical: t.spacing.paragraphGap },
    spacingMd: { marginVertical: t.spacing.componentGap },
    spacingLg: { marginVertical: t.spacing.sectionGap },
    solid: { borderBottomStyle: 'solid' },
    dashed: { borderBottomStyle: 'dashed' },
    dotted: { borderBottomStyle: 'dotted' },
    thin: { borderBottomWidth: spacing[0.5] },
    medium: { borderBottomWidth: spacing[1] },
    thick: { borderBottomWidth: spacing[2] },
    labelContainer: { flexDirection: 'row', alignItems: 'center' },
    labelLine: { flex: 1, borderBottomColor: t.colors.border, borderBottomStyle: 'solid' },
    labelText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      paddingHorizontal: spacing[3],
      textTransform: 'uppercase',
      letterSpacing: t.primitives.letterSpacing.wider * 10,
    },
  });
}

export function Divider({
  spacing = 'md',
  variant = 'solid',
  color,
  thickness = 'thin',
  label,
  width,
  style,
}: DividerProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createDividerStyles(theme), [theme]);
  const spacingMap = {
    none: styles.spacingNone,
    sm: styles.spacingSm,
    md: styles.spacingMd,
    lg: styles.spacingLg,
  };
  const variantMap = { solid: styles.solid, dashed: styles.dashed, dotted: styles.dotted };
  const thicknessMap = { thin: styles.thin, medium: styles.medium, thick: styles.thick };

  if (label) {
    const lineStyle: Style[] = [styles.labelLine, thicknessMap[thickness], variantMap[variant]];
    if (color) lineStyle.push({ borderBottomColor: resolveColor(color, theme.colors) });
    const containerStyles: Style[] = [styles.labelContainer, spacingMap[spacing]];
    if (width !== undefined) containerStyles.push({ width } as Style);
    if (style) containerStyles.push(...[style].flat());
    const labelTextStyle: Style[] = [styles.labelText];
    if (color) labelTextStyle.push({ color: resolveColor(color, theme.colors) });
    return (
      <View style={containerStyles}>
        <View style={lineStyle} />
        <PDFText style={labelTextStyle}>{label}</PDFText>
        <View style={lineStyle} />
      </View>
    );
  }

  const styleArray: Style[] = [
    styles.base,
    spacingMap[spacing],
    variantMap[variant],
    thicknessMap[thickness],
  ];
  if (color) styleArray.push({ borderBottomColor: resolveColor(color, theme.colors) });
  if (width !== undefined) styleArray.push({ width } as Style);
  if (style) styleArray.push(...[style].flat());
  return <View style={styleArray} />;
}
