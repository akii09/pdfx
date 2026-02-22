import type { PDFComponentProps } from '@pdfx/shared';
import type React from 'react';
import type { TableVariant } from '../table/table.types';

/** DataTable row density size. */
export type DataTableSize = 'default' | 'compact';

/** Column definition for a DataTable. */
export interface DataTableColumn<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: unknown, row: T) => React.ReactNode;
  renderFooter?: (value: unknown) => React.ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<PDFComponentProps, 'children'> {
  columns: DataTableColumn<T>[];
  data: T[];
  variant?: TableVariant;
  footer?: Partial<Record<keyof T & string, string | number>>;
  stripe?: boolean;
  size?: DataTableSize;
  /** Prevent the entire table from splitting across pages. Use for short tables that fit on one page. */
  noWrap?: boolean;
}
