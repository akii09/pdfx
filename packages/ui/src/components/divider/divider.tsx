import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createDividerStyles } from './divider.styles';
import type { DividerProps } from './divider.types';

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
  const variantMap = {
    solid: styles.solid,
    dashed: styles.dashed,
    dotted: styles.dotted,
  };
  const thicknessMap = {
    thin: styles.thin,
    medium: styles.medium,
    thick: styles.thick,
  };
  const spacingStyle = spacingMap[spacing];

  if (label) {
    const lineStyle: Style[] = [styles.labelLine, thicknessMap[thickness], variantMap[variant]];
    if (color) {
      lineStyle.push({ borderBottomColor: resolveColor(color, theme.colors) });
    }

    const containerStyles: Style[] = [styles.labelContainer, spacingStyle];

    if (width !== undefined) {
      containerStyles.push({ width } as Style);
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

  const styleArray: Style[] = [
    styles.base,
    spacingStyle,
    variantMap[variant],
    thicknessMap[thickness],
  ];

  if (color) {
    styleArray.push({ borderBottomColor: resolveColor(color, theme.colors) });
  }

  if (width !== undefined) {
    styleArray.push({ width } as Style);
  }

  if (style) {
    styleArray.push(style);
  }

  return <View style={styleArray} />;
}
