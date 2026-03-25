import type { PDFComponentProps } from '@pdfx/shared';

/** Table visual style variant. */
export type TableVariant =
  | 'line'
  | 'grid'
  | 'minimal'
  | 'striped'
  | 'compact'
  | 'bordered'
  | 'primary-header';

export interface TableProps extends PDFComponentProps {
  /** Visual style variant that controls borders, backgrounds, and spacing. @default 'line' */
  variant?: TableVariant;
  /** Apply alternating row background colors to body rows. Automatically enabled for the `striped` variant. @default false */
  zebraStripe?: boolean;
  /** Prevent the entire table from splitting across PDF pages. Use for short tables that fit on one page. @default false */
  noWrap?: boolean;
}

export interface TableSectionProps extends PDFComponentProps {}

export interface TableRowProps extends PDFComponentProps {
  /** Render this row as a header row — applies bold text and variant header background. */
  header?: boolean;
  /** Render this row as a footer row — applies bold text and a top border. */
  footer?: boolean;
  /** Apply the zebra stripe background to this row. Set automatically by `Table` when `zebraStripe` is enabled. */
  stripe?: boolean;
  /** Visual variant inherited from the parent `Table`. Set automatically — do not pass manually. */
  variant?: TableVariant;
}

export interface TableCellProps extends PDFComponentProps {
  /** Render this cell in header text style — bold, variant accent color. */
  header?: boolean;
  /** Render this cell in footer text style. */
  footer?: boolean;
  /** Horizontal text alignment within the cell. */
  align?: 'left' | 'center' | 'right';
  /** Fixed column width in PDF points or CSS-like string. When omitted the cell flex-grows. */
  width?: string | number;
  /** Visual variant inherited from the parent `TableRow`. Set automatically — do not pass manually. */
  variant?: TableVariant;
  /**
   * True when this is the last cell in its row.
   * Used internally to omit the right border on the last cell in `grid` / `bordered` variants.
   * @internal Set automatically by `TableRow` via `cloneElement` — do not pass manually.
   */
  _last?: boolean;
}
