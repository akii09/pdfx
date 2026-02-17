import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import React from 'react';
import { theme as defaultTheme } from '../../lib/pdfx-theme';

export type TableVariant = 'line' | 'grid' | 'minimal' | 'striped';

export interface TableProps extends PDFComponentProps {
  variant?: TableVariant;
  zebraStripe?: boolean;
}

/** Props for semantic table section wrappers. */
export interface TableSectionProps extends PDFComponentProps {}

export interface TableRowProps extends PDFComponentProps {
  header?: boolean;
  footer?: boolean;
  stripe?: boolean;
  variant?: TableVariant;
}

export interface TableCellProps extends PDFComponentProps {
  header?: boolean;
  footer?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  variant?: TableVariant;
  _last?: boolean;
}

let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createTableStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createTableStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

/** Derives all styles from theme tokens. Zero hardcoded values. */
function createTableStyles(t: PdfxTheme) {
  const { spacing, borderRadius, letterSpacing, fontWeights, typography } = t.primitives;
  const borderWidth = spacing[0.5];
  const borderColor = t.colors.border;

  return StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },
    tableGrid: {
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderTopLeftRadius: borderRadius.md,
      borderTopRightRadius: borderRadius.md,
      borderBottomLeftRadius: borderRadius.md,
      borderBottomRightRadius: borderRadius.md,
      overflow: 'hidden',
    },
    tableLine: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    tableMinimal: {
      paddingVertical: spacing[2],
    },
    tableStriped: {
      borderTopWidth: borderWidth,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    row: {
      flexDirection: 'row',
      display: 'flex',
    },
    rowGrid: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowLine: {
      borderBottomWidth: 0,
    },
    rowMinimal: {
      paddingVertical: spacing[1],
    },
    rowStriped: {},
    rowHeaderGrid: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
    },
    rowHeaderLine: {
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderMinimal: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderStriped: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowFooter: {
      borderTopWidth: borderWidth * 2,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
    },
    rowFooterStriped: {
      borderTopWidth: borderWidth,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
      backgroundColor: t.colors.muted,
    },
    rowStripe: {
      backgroundColor: t.colors.muted,
    },
    cell: {
      flex: 1,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
    },
    cellFixed: {
      flex: 0,
    },
    cellGridBorder: {
      borderRightWidth: borderWidth,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },
    cellMinimal: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
    },
    cellStriped: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[4],
    },
    cellText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    cellTextHeaderGrid: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderLine: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.wider * 10,
    },
    cellTextHeaderMinimal: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    cellTextHeaderStriped: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextFooter: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
  });
}

/**
 * Propagates variant and zebra striping to child rows.
 * Prevents prop drilling while maintaining semantic JSX structure.
 */
function processTableChildren(
  children: React.ReactNode,
  variant: TableVariant,
  zebraStripe: boolean
): React.ReactNode {
  let bodyRowIndex = 0;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === TableHeader || child.type === TableBody || child.type === TableFooter) {
      const isBody = child.type === TableBody;
      const sectionChild = child as React.ReactElement<TableSectionProps>;
      const sectionChildren = React.Children.map(sectionChild.props.children, (rowChild) => {
        if (React.isValidElement(rowChild) && rowChild.type === TableRow) {
          const rowProps: Partial<TableRowProps> = { variant };

          if (isBody && zebraStripe) {
            const isStripe = bodyRowIndex % 2 === 1;
            bodyRowIndex++;
            if (isStripe) {
              rowProps.stripe = true;
            }
          }

          return React.cloneElement(rowChild as React.ReactElement<TableRowProps>, rowProps);
        }
        return rowChild;
      });

      return React.cloneElement(child, {}, sectionChildren);
    }

    if (child.type === TableRow) {
      return React.cloneElement(child as React.ReactElement<TableRowProps>, { variant });
    }

    return child;
  });
}

// ─── Components ───────────────────────────────────────────────────────────────

/** Semantic wrapper for table header rows. */
export function TableHeader({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/** Semantic wrapper for table body rows. */
export function TableBody({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/** Semantic wrapper for table footer rows. */
export function TableFooter({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/** PDF table container. All styling is theme-driven. */
export function Table({ children, style, variant = 'line', zebraStripe = false }: TableProps) {
  const styles = getStyles(defaultTheme);
  const tableStyles: Style[] = [styles.table];
  const effectiveZebra = variant === 'striped' ? true : zebraStripe;

  if (variant === 'grid') {
    tableStyles.push(styles.tableGrid);
  } else if (variant === 'line') {
    tableStyles.push(styles.tableLine);
  } else if (variant === 'minimal') {
    tableStyles.push(styles.tableMinimal);
  } else if (variant === 'striped') {
    tableStyles.push(styles.tableStriped);
  }

  const styleArray = style ? [...tableStyles, style] : tableStyles;
  const processedChildren = processTableChildren(children, variant, effectiveZebra);

  return <View style={styleArray}>{processedChildren}</View>;
}

/** PDF table row component. */
export function TableRow({
  header,
  footer,
  stripe,
  children,
  style,
  variant = 'line',
}: TableRowProps) {
  const styles = getStyles(defaultTheme);
  const rowStyles: Style[] = [styles.row];

  if (variant === 'grid') {
    rowStyles.push(styles.rowGrid);
  } else if (variant === 'line') {
    rowStyles.push(styles.rowLine);
  } else if (variant === 'minimal') {
    rowStyles.push(styles.rowMinimal);
  } else if (variant === 'striped') {
    rowStyles.push(styles.rowStriped);
  }

  if (header) {
    if (variant === 'line') rowStyles.push(styles.rowHeaderLine);
    else if (variant === 'minimal') rowStyles.push(styles.rowHeaderMinimal);
    else if (variant === 'striped') rowStyles.push(styles.rowHeaderStriped);
    else rowStyles.push(styles.rowHeaderGrid);
  }

  if (footer) {
    if (variant === 'striped') rowStyles.push(styles.rowFooterStriped);
    else rowStyles.push(styles.rowFooter);
  }

  if (stripe && !header && !footer) {
    rowStyles.push(styles.rowStripe);
  }

  const styleArray = style ? [...rowStyles, style] : rowStyles;
  const childArray = React.Children.toArray(children);
  const processedChildren = childArray.map((child, i) => {
    if (React.isValidElement(child) && child.type === TableCell) {
      return React.cloneElement(child as React.ReactElement<TableCellProps>, {
        variant,
        header,
        footer,
        _last: i === childArray.length - 1,
      });
    }
    return child;
  });

  return <View style={styleArray}>{processedChildren}</View>;
}

/** PDF table cell component. */
export function TableCell({
  header,
  footer,
  align,
  width,
  children,
  style,
  variant = 'line',
  _last,
}: TableCellProps) {
  const styles = getStyles(defaultTheme);
  const cellStyles: Style[] = [styles.cell];

  if (width !== undefined) {
    cellStyles.push(styles.cellFixed);
    cellStyles.push({ width } as Style);
  }

  if (variant === 'minimal') {
    cellStyles.push(styles.cellMinimal);
  } else if (variant === 'striped') {
    cellStyles.push(styles.cellStriped);
  }

  if (variant === 'grid' && !_last) {
    cellStyles.push(styles.cellGridBorder);
  }

  if (align) {
    cellStyles.push({ textAlign: align } as Style);
  }

  const styleArray = style ? [...cellStyles, style] : cellStyles;

  let textStyle: Style = styles.cellText;
  if (header) {
    if (variant === 'line') textStyle = styles.cellTextHeaderLine;
    else if (variant === 'minimal') textStyle = styles.cellTextHeaderMinimal;
    else if (variant === 'striped') textStyle = styles.cellTextHeaderStriped;
    else textStyle = styles.cellTextHeaderGrid;
  } else if (footer) {
    textStyle = styles.cellTextFooter;
  }

  const content =
    typeof children === 'string' ? (
      <PDFText style={[textStyle, align ? { textAlign: align } : {}]}>{children}</PDFText>
    ) : (
      children
    );

  return <View style={styleArray}>{content}</View>;
}
