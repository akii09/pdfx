import type { PDFComponentProps } from '@pdfx/shared';

/**
 * KeyValue layout direction.
 *
 * - `horizontal` — Key and value appear side by side on one row (ideal for metadata blocks)
 * - `vertical`   — Key is stacked above the value (ideal for form-like displays)
 */
export type KeyValueDirection = 'horizontal' | 'vertical';

/** KeyValue size — scales label/value font sizes together. */
export type KeyValueSize = 'sm' | 'md' | 'lg';

/** A single key-value pair entry. */
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
