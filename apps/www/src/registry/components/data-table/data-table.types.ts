import type { PDFComponentProps } from '@pdfx/shared';
import type React from 'react';
import type { TableVariant } from '../table/table.types';

/** DataTable row density size. */
export type DataTableSize = 'default' | 'compact';

/**
 * Column definition for a DataTable.
 * Props - `key` | `header` | `align` | `width` | `render` | `renderFooter`
 * @see {@link DataTableColumn}
 */
export interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  /**
   * Custom cell renderer. Must return @react-pdf/renderer elements (Text, View,
   * Image, etc.) — NOT HTML DOM elements. TypeScript accepts ReactNode but DOM
   * nodes will crash at runtime in the PDF renderer.
   */
  render?: (value: unknown, row: T) => React.ReactNode;
  /**
   * Custom footer cell renderer. Same constraint: return @react-pdf/renderer
   * elements only — no HTML/DOM nodes.
   */
  renderFooter?: (value: unknown) => React.ReactNode;
}

/**
 * Data table for PDF rendering with column definitions, footer support, and stripe options.
 * Props - `columns` | `data` | `variant` | `footer` | `stripe` | `size` | `noWrap` | `style`
 * @see {@link DataTableProps}
 */
export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<PDFComponentProps, 'children'> {
  columns: DataTableColumn<T>[];
  data: T[];
  /**
   * @default 'grid'
   */
  variant?: TableVariant;
  footer?: Partial<Record<keyof T & string, string | number>>;
  stripe?: boolean;
  /**
   * @default 'default'
   */
  size?: DataTableSize;
  noWrap?: boolean;
}
