import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type KeyValueDirection = 'horizontal' | 'vertical';
export type KeyValueSize = 'sm' | 'md' | 'lg';

/** A single key-value pair to display in the list. */
export interface KeyValueEntry {
  /** The label (key) text. */
  key: string;
  /** The value text. */
  value: string;
  /** Override color for this item's value — accepts a theme token or hex/rgb value. */
  valueColor?: string;
  /** Inline style override for the value text element. */
  valueStyle?: Style;
  /** Inline style override for the key text element. */
  keyStyle?: Style;
}

export interface KeyValueProps extends Omit<PDFComponentProps, 'children'> {
  /** Array of key-value pairs to display. */
  items: KeyValueEntry[];
  /** Layout direction — horizontal puts key and value on the same row. @default 'horizontal' */
  direction?: KeyValueDirection;
  /** Show a divider line between each row. @default false */
  divided?: boolean;
  /** Font size preset for both keys and values. @default 'md' */
  size?: KeyValueSize;
  /** Flex weight of the key column (controls width relative to the value column). @default 1 */
  labelFlex?: number;
  /** Global key color override — accepts a theme token or hex/rgb value. */
  labelColor?: string;
  /** Global value color override — accepts a theme token or hex/rgb value. */
  valueColor?: string;
  /** Render all values in bold weight. @default false */
  boldValue?: boolean;
  /** Prevent the list from splitting across PDF pages. @default false */
  noWrap?: boolean;
  /** Custom divider line color — accepts a theme token or hex/rgb value. */
  dividerColor?: string;
  /** Custom divider line thickness in points. */
  dividerThickness?: number;
  /** Custom bottom margin below each divider in points. */
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
