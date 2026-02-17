import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { Fragment } from 'react';
import { theme } from '../../lib/pdfx-theme';
import type { TableVariant } from '../table';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '../table';

/** DataTable density. 'compact' reduces padding and font size for data-dense views. */
export type DataTableSize = 'default' | 'compact';

/** Column definition for DataTable. */
export interface DataTableColumn<T = Record<string, unknown>> {
  /** Key in the row data object. */
  key: keyof T & string;
  /** Header label. */
  header: string;
  /** Cell alignment. */
  align?: 'left' | 'center' | 'right';
  /** Optional width (e.g. '20%', '150'). */
  width?: string | number;
  /** Custom cell renderer. Receives row value and full row. */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Custom footer cell renderer. Receives the footer value. */
  renderFooter?: (value: unknown) => React.ReactNode;
}

/**
 * Props for the DataTable component.
 * Convenience API for tabular data: columns + data array.
 *
 * @example
 * ```tsx
 * // Compact data-dense table — ideal for user lists, logs, reports
 * <DataTable
 *   size="compact"
 *   variant="striped"
 *   columns={[
 *     { key: 'id', header: 'ID', width: '8%', align: 'center' },
 *     { key: 'name', header: 'Name', width: '22%' },
 *     { key: 'email', header: 'Email', width: '28%' },
 *     { key: 'role', header: 'Role', width: '14%' },
 *     { key: 'dept', header: 'Dept', width: '14%' },
 *     { key: 'status', header: 'Status', width: '14%', align: 'center' },
 *   ]}
 *   data={users}
 * />
 *
 * // Default size — ideal for invoices, summaries
 * <DataTable
 *   variant="line"
 *   columns={[
 *     { key: 'item', header: 'Item', width: '50%' },
 *     { key: 'amount', header: 'Amount', align: 'right', width: '50%' },
 *   ]}
 *   data={lineItems}
 *   footer={{ item: 'Total', amount: '$2,650' }}
 * />
 * ```
 */
export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<PDFComponentProps, 'children'> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. Each object keys should match column keys. */
  data: T[];
  /** Visual variant. Defaults to 'line'. */
  variant?: TableVariant;
  /** Optional footer row (totals). Keys match column keys. */
  footer?: Partial<Record<keyof T & string, string | number>>;
  /** Alternating row stripe (auto-enabled for 'striped' variant). */
  stripe?: boolean;
  /** Table density. 'compact' reduces padding and font size for data-dense views. Defaults to 'default'. */
  size?: DataTableSize;
}

/** Creates compact override styles from theme. */
function createCompactStyles(t: PdfxTheme) {
  const { spacing, fontWeights } = t.primitives;
  return StyleSheet.create({
    cell: {
      paddingVertical: spacing[0.5],
      paddingHorizontal: spacing[2],
    },
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: 1.4,
      color: t.colors.foreground,
    },
    headerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: 1.4,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    footerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: 1.4,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
  });
}

const compact = createCompactStyles(theme);

/**
 * DataTable - convenience API for data-driven tables.
 * Accepts `columns` + `data`, renders using composable Table primitives with
 * proper semantic wrappers (TableHeader, TableBody, TableFooter).
 *
 * Use `size="compact"` for data-dense views with many columns and rows
 * (user lists, logs, reports). Use default size for invoices and summaries.
 *
 * @example
 * ```tsx
 * <DataTable
 *   size="compact"
 *   variant="striped"
 *   columns={[
 *     { key: 'name', header: 'Name', width: '25%' },
 *     { key: 'email', header: 'Email', width: '30%' },
 *     { key: 'role', header: 'Role', width: '15%' },
 *     { key: 'status', header: 'Status', width: '15%', align: 'center' },
 *     { key: 'joined', header: 'Joined', width: '15%', align: 'right' },
 *   ]}
 *   data={users}
 * />
 * ```
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  variant = 'line',
  footer,
  stripe = false,
  size = 'default',
  style,
}: DataTableProps<T>) {
  const isCompact = size === 'compact';

  return (
    <Table variant={variant} zebraStripe={stripe} style={style}>
      <TableHeader>
        <TableRow header>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              header
              align={col.align ?? 'left'}
              width={col.width}
              style={isCompact ? compact.cell : undefined}
            >
              {isCompact ? (
                <PDFText
                  style={[compact.headerText, col.align ? ({ textAlign: col.align } as Style) : {}]}
                >
                  {col.header}
                </PDFText>
              ) : (
                col.header
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: DataTable has no row id; order is stable for static data
          <Fragment key={i}>
            <TableRow>
              {columns.map((col) => {
                const value = row[col.key];
                const rendered = col.render ? col.render(value, row) : null;
                const text = rendered === null ? formatValue(value) : null;
                return (
                  <TableCell
                    key={col.key}
                    align={col.align ?? 'left'}
                    width={col.width}
                    style={isCompact ? compact.cell : undefined}
                  >
                    {isCompact ? (
                      rendered !== null ? (
                        rendered
                      ) : (
                        <PDFText
                          style={[
                            compact.text,
                            col.align ? ({ textAlign: col.align } as Style) : {},
                          ]}
                        >
                          {text}
                        </PDFText>
                      )
                    ) : rendered !== null ? (
                      rendered
                    ) : (
                      text
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow footer>
            {columns.map((col) => {
              const value = col.key in footer ? footer[col.key] : '';
              const rendered = col.renderFooter ? col.renderFooter(value) : null;
              const text = rendered === null ? formatValue(value) : null;
              return (
                <TableCell
                  key={col.key}
                  footer={!!value}
                  align={col.align ?? 'left'}
                  width={col.width}
                  style={isCompact ? compact.cell : undefined}
                >
                  {isCompact ? (
                    rendered !== null ? (
                      rendered
                    ) : (
                      <PDFText
                        style={[
                          value ? compact.footerText : compact.text,
                          col.align ? ({ textAlign: col.align } as Style) : {},
                        ]}
                      >
                        {text}
                      </PDFText>
                    )
                  ) : rendered !== null ? (
                    rendered
                  ) : (
                    text
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  return String(value);
}
