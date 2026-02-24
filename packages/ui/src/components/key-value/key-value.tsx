import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createKeyValueStyles } from './key-value.styles';
import type { KeyValueProps, KeyValueSize } from './key-value.types';

export function KeyValue({
  items,
  direction = 'horizontal',
  divided = false,
  size = 'md',
  labelFlex = 1,
  labelColor,
  valueColor,
  boldValue = false,
  noWrap = false,
  dividerColor,
  dividerThickness,
  dividerMargin,
  style,
}: KeyValueProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createKeyValueStyles(theme), [theme]);
  const keyStyleMap: Record<KeyValueSize, Style> = {
    sm: styles.keySm,
    md: styles.keyMd,
    lg: styles.keyLg,
  };
  const valueStyleMap: Record<KeyValueSize, Style> = {
    sm: styles.valueSm,
    md: styles.valueMd,
    lg: styles.valueLg,
  };
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(style);

  return (
    <View wrap={!noWrap} style={containerStyles}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        // Key text styles
        const keyStyles: Style[] = [keyStyleMap[size]];
        if (labelColor) {
          keyStyles.push({ color: resolveColor(labelColor, theme.colors) });
        }
        if (item.keyStyle) {
          keyStyles.push(item.keyStyle);
        }

        // Value text styles — per-item color takes priority over global valueColor
        const valStyles: Style[] = [valueStyleMap[size]];
        if (boldValue) valStyles.push(styles.valueBold);
        const resolvedValueColor = item.valueColor ?? valueColor;
        if (resolvedValueColor) {
          valStyles.push({ color: resolveColor(resolvedValueColor, theme.colors) });
        }
        if (item.valueStyle) {
          valStyles.push(item.valueStyle);
        }

        if (direction === 'horizontal') {
          const rowStyles: Style[] = [styles.rowHorizontal];
          if (divided && !isLast) {
            const dividerStyle: Style = {};
            if (dividerColor)
              dividerStyle.borderBottomColor = resolveColor(dividerColor, theme.colors);
            if (dividerThickness) dividerStyle.borderBottomWidth = dividerThickness;
            if (dividerMargin) dividerStyle.marginBottom = dividerMargin;
            rowStyles.push({ ...styles.divider, ...dividerStyle });
          }

          return (
            <View key={item.key} style={rowStyles}>
              <PDFText style={[...keyStyles, { flex: labelFlex }]}>{item.key}</PDFText>
              <PDFText style={[...valStyles, { flex: 1, textAlign: 'right' }]}>
                {item.value}
              </PDFText>
            </View>
          );
        }

        // vertical
        const rowStyles: Style[] = [styles.rowVertical];
        if (divided && !isLast) rowStyles.push(styles.divider);

        return (
          <View key={item.key} style={rowStyles}>
            <PDFText style={keyStyles}>{item.key}</PDFText>
            <PDFText style={valStyles}>{item.value}</PDFText>
          </View>
        );
      })}
    </View>
  );
}
