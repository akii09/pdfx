import type { PDFComponentProps } from '@pdfx/shared';
import type React from 'react';
import { Fragment } from 'react';
import type { TableVariant } from '../table';
import { Table, TableCell, TableRow } from '../table';

/** Column definition for DataTable. */
export interface DataTableColumn<T = Record<string, unknown>> {
  /** Key in the row data object. */
  key: keyof T & string;
  /** Header label. */
  header: string;
  /** Cell alignment. */
  align?: 'left' | 'center' | 'right';
  /** Optional width (e.g. '20%'). Not all renderers support this. */
  width?: string | number;
  /** Custom cell renderer. Receives row value and full row. */
  render?: (value: unknown, row: T) => React.ReactNode;
}

/**
 * Props for the DataTable component.
 * Convenience API for tabular data: columns + data array.
 */
export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<PDFComponentProps, 'children'> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. Each object keys should match column keys. */
  data: T[];
  /** Visual variant. */
  variant?: TableVariant;
  /** Optional footer row (totals). Keys match column keys. */
  footer?: Partial<Record<keyof T & string, string | number>>;
  /** Alternating row stripe (line/grid variants). */
  stripe?: boolean;
}

/**
 * DataTable - convenience API for tables.
 * Accepts `columns` + `data`, renders using composable Table/TableRow/TableCell.
 * Use when you have array data; use composable Table for custom layouts.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'item', header: 'Item' },
 *     { key: 'qty', header: 'Qty', align: 'center' },
 *     { key: 'amount', header: 'Amount', align: 'right' },
 *   ]}
 *   data={[
 *     { item: 'Design', qty: 1, amount: '$150' },
 *     { item: 'Dev', qty: 1, amount: '$2,500' },
 *   ]}
 *   footer={{ item: 'Total', amount: '$2,650' }}
 *   variant="line"
 * />
 * ```
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  variant = 'line',
  footer,
  stripe = false,
  style,
}: DataTableProps<T>) {
  return (
    <Table variant={variant} style={style}>
      <TableRow header>
        {columns.map((col) => (
          <TableCell key={col.key} header align={col.align ?? 'left'}>
            {col.header}
          </TableCell>
        ))}
      </TableRow>
      {data.map((row, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: DataTable has no row id; order is stable for static data
        <Fragment key={i}>
          <TableRow stripe={stripe && i % 2 === 1}>
            {columns.map((col) => {
              const value = row[col.key];
              const content = col.render ? col.render(value, row) : formatValue(value);
              return (
                <TableCell key={col.key} align={col.align ?? 'left'}>
                  {content}
                </TableCell>
              );
            })}
          </TableRow>
        </Fragment>
      ))}
      {footer && (
        <TableRow footer>
          {columns.map((col) => {
            const value = col.key in footer ? footer[col.key] : '';
            return (
              <TableCell key={col.key} footer={!!value} align={col.align ?? 'left'}>
                {formatValue(value)}
              </TableCell>
            );
          })}
        </TableRow>
      )}
    </Table>
  );
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  return String(value);
}
