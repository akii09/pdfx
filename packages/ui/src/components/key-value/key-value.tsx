import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { theme } from '../../lib/pdfx-theme';
import { resolveColor } from '../../lib/resolve-color.js';

/**
 * KeyValue layout direction.
 *
 * - `horizontal` — Key and value appear side by side on one row (ideal for metadata blocks)
 * - `vertical`   — Key is stacked above the value (ideal for form-like displays)
 */
export type KeyValueDirection = 'horizontal' | 'vertical';

/**
 * KeyValue size — scales label/value font sizes together.
 */
export type KeyValueSize = 'sm' | 'md' | 'lg';

/**
 * A single key-value pair entry.
 */
export interface KeyValueEntry {
  /** The label / field name shown in muted style. */
  key: string;
  /** The display value. */
  value: string;
  /** Optional color for the value text. Use theme token or CSS color. */
  valueColor?: string;
}

export interface KeyValueProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Array of key-value pairs to display.
   * Each entry has a `key` (label) and `value` (data).
   */
  items: KeyValueEntry[];
  /**
   * Layout direction. Defaults to 'horizontal'.
   *
   * - `horizontal` — Good for invoice headers, summary boxes
   * - `vertical`   — Good for form field displays
   */
  direction?: KeyValueDirection;
  /**
   * Show a horizontal divider line between each row.
   * Most useful with the horizontal direction. Defaults to false.
   */
  divided?: boolean;
  /** Font size scale. Defaults to 'md'. */
  size?: KeyValueSize;
  /**
   * In horizontal layout, controls the label column width as a flex ratio.
   * Value column takes the remaining space. Defaults to 1 (equal columns).
   * Use 0.5 for a narrower label, 2 for a wider label.
   */
  labelFlex?: number;
  /** Color override for all keys/labels. Use theme token or CSS color. */
  labelColor?: string;
  /** Color override for all values. Use theme token or CSS color. */
  valueColor?: string;
  /** Bold the value text. Defaults to false. */
  boldValue?: boolean;
}

function createKeyValueStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  const c = t.colors;
  const { body } = t.typography;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },

    // ── Row layouts ─────────────────────────────────────────────────────
    rowHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: spacing[1],
    },
    rowVertical: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: spacing[3],
    },

    // ── Divider line between rows ────────────────────────────────────────
    divider: {
      borderBottomWidth: spacing[0.5],
      borderBottomColor: c.border,
      borderBottomStyle: 'solid',
    },

    // ── Key (label) ─────────────────────────────────────────────────────
    keySm: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    keyMd: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    keyLg: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.base,
      color: c.mutedForeground,
      fontWeight: fontWeights.medium,
    },

    // ── Value ───────────────────────────────────────────────────────────
    valueSm: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },
    valueMd: {
      fontFamily: body.fontFamily,
      fontSize: body.fontSize,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },
    valueLg: {
      fontFamily: body.fontFamily,
      fontSize: t.primitives.typography.base,
      color: c.foreground,
      fontWeight: fontWeights.regular,
    },

    valueBold: { fontWeight: fontWeights.bold },
  });
}

const styles = createKeyValueStyles(theme);

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

export function KeyValue({
  items,
  direction = 'horizontal',
  divided = false,
  size = 'md',
  labelFlex = 1,
  labelColor,
  valueColor,
  boldValue = false,
  style,
}: KeyValueProps) {
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(style);

  return (
    <View style={containerStyles}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        // Key text styles
        const keyStyles: Style[] = [keyStyleMap[size]];
        if (labelColor) {
          keyStyles.push({ color: resolveColor(labelColor, theme.colors) });
        }

        // Value text styles — per-item color takes priority over global valueColor
        const valStyles: Style[] = [valueStyleMap[size]];
        if (boldValue) valStyles.push(styles.valueBold);
        const resolvedValueColor = item.valueColor ?? valueColor;
        if (resolvedValueColor) {
          valStyles.push({ color: resolveColor(resolvedValueColor, theme.colors) });
        }

        if (direction === 'horizontal') {
          const rowStyles: Style[] = [styles.rowHorizontal];
          if (divided && !isLast) rowStyles.push(styles.divider);

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
