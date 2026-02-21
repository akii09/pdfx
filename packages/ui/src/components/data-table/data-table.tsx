import { Text as PDFText } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { Fragment } from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '../table';
import { createCompactStyles, formatValue } from './data-table.styles';
import type { DataTableProps } from './data-table.types';

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  variant = 'line',
  footer,
  stripe = false,
  size = 'default',
  noWrap = false,
  style,
}: DataTableProps<T>) {
  const theme = usePdfxTheme();
  const compact = useSafeMemo(() => createCompactStyles(theme), [theme]);
  const isCompact = size === 'compact';

  return (
    <Table variant={variant} zebraStripe={stripe} noWrap={noWrap} style={style}>
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
