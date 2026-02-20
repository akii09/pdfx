import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { Fragment } from 'react';
import { theme } from '../../lib/pdfx-theme';
import type { TableVariant } from '../table';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '../table';

export type DataTableSize = 'default' | 'compact';

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
}

function createCompactStyles(t: PdfxTheme) {
  const { spacing, fontWeights, lineHeights } = t.primitives;
  return StyleSheet.create({
    cell: {
      paddingVertical: spacing[0.5],
      paddingHorizontal: spacing[2],
    },
    text: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
    },
    headerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    footerText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      lineHeight: lineHeights.normal,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
  });
}

const compact = createCompactStyles(theme);

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
