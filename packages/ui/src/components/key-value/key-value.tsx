import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type KeyValueDirection = 'horizontal' | 'vertical';
export type KeyValueSize = 'sm' | 'md' | 'lg';

export interface KeyValueEntry {
  key: string;
  value: string;
  valueColor?: string;
  valueStyle?: Style;
  keyStyle?: Style;
}

export interface KeyValueProps extends Omit<PDFComponentProps, 'children'> {
  items: KeyValueEntry[];
  direction?: KeyValueDirection;
  divided?: boolean;
  size?: KeyValueSize;
  labelFlex?: number;
  labelColor?: string;
  valueColor?: string;
  boldValue?: boolean;
  noWrap?: boolean;
  dividerColor?: string;
  dividerThickness?: number;
  dividerMargin?: number;
}

function createKeyValueStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;
  const keyBase = {
    fontFamily: body.fontFamily,
    color: c.mutedForeground,
    fontWeight: fontWeights.medium,
  };
  const valueBase = {
    fontFamily: body.fontFamily,
    color: c.foreground,
    fontWeight: fontWeights.regular,
  };
  return StyleSheet.create({
    container: { flexDirection: 'column' },
    rowHorizontal: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing[1] },
    rowVertical: { flexDirection: 'column', marginBottom: t.spacing.paragraphGap },
    divider: {
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },
    keySm: { ...keyBase, fontSize: t.primitives.typography.xs },
    keyMd: { ...keyBase, fontSize: body.fontSize },
    keyLg: { ...keyBase, fontSize: t.primitives.typography.base },
    valueSm: { ...valueBase, fontSize: t.primitives.typography.xs },
    valueMd: { ...valueBase, fontSize: body.fontSize },
    valueLg: { ...valueBase, fontSize: t.primitives.typography.base },
    valueBold: { fontWeight: fontWeights.bold },
  });
}

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
  const keyStyleMap = { sm: styles.keySm, md: styles.keyMd, lg: styles.keyLg } as Record<
    KeyValueSize,
    Style
  >;
  const valueStyleMap = { sm: styles.valueSm, md: styles.valueMd, lg: styles.valueLg } as Record<
    KeyValueSize,
    Style
  >;
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(...[style].flat());

  return (
    <View wrap={!noWrap} style={containerStyles}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const keyStyles: Style[] = [keyStyleMap[size]];
        if (labelColor) keyStyles.push({ color: resolveColor(labelColor, theme.colors) });
        if (item.keyStyle) keyStyles.push(item.keyStyle);
        const valStyles: Style[] = [valueStyleMap[size]];
        if (boldValue) valStyles.push(styles.valueBold);
        const resolvedValueColor = item.valueColor ?? valueColor;
        if (resolvedValueColor)
          valStyles.push({ color: resolveColor(resolvedValueColor, theme.colors) });
        if (item.valueStyle) valStyles.push(item.valueStyle);

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
