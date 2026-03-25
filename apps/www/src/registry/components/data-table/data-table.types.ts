import type { PDFComponentProps } from '@pdfx/shared';
import type React from 'react';
import type { TableVariant } from '../table/table.types';

/** DataTable row density size. */
export type DataTableSize = 'default' | 'compact';

/** Column definition for a DataTable. */
export interface DataTableColumn<T = Record<string, unknown>> {
  /** Key of the data row object to read the cell value from. */
  key: keyof T & string;
  /** Column header label. */
  header: string;
  /** Horizontal text alignment for both header and body cells. @default 'left' */
  align?: 'left' | 'center' | 'right';
  /** Fixed column width in PDF points or CSS-like string. Omit to let the column flex-grow. */
  width?: string | number;
  /** Custom renderer for body cells. Return `null` to fall back to the default value formatter. */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Custom renderer for the footer cell. Return `null` to fall back to the default value formatter. */
  renderFooter?: (value: unknown) => React.ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<PDFComponentProps, 'children'> {
  /** Column definitions — determines headers, keys, widths, and custom renderers. */
  columns: DataTableColumn<T>[];
  /** Row data array. Each object is rendered as one table row. */
  data: T[];
  /** Visual table style variant passed to the underlying `Table`. @default 'line' */
  variant?: TableVariant;
  /** Optional footer row values keyed by column key. */
  footer?: Partial<Record<keyof T & string, string | number>>;
  /** Apply alternating row background colors. @default false */
  stripe?: boolean;
  /** Row density — `compact` reduces cell padding and font size for data-dense layouts. @default 'default' */
  size?: DataTableSize;
  /** Prevent the entire table from splitting across PDF pages. Use for short tables that fit on one page. */
  noWrap?: boolean;
}
