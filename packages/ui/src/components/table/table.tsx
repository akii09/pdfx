import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import React from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export type TableVariant =
  | 'line'
  | 'grid'
  | 'minimal'
  | 'striped'
  | 'compact'
  | 'bordered'
  | 'primary-header';

export interface TableProps extends PDFComponentProps {
  variant?: TableVariant;
  zebraStripe?: boolean;
  noWrap?: boolean;
}

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

/** Derives all styles from theme tokens. Zero hardcoded values. */
function createTableStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights, typography } = t.primitives;
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
      overflow: 'hidden' as const,
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
    tableCompact: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    tableBordered: {
      borderWidth: borderWidth * 2,
      borderColor: borderColor,
      borderStyle: 'solid',
      overflow: 'hidden' as const,
    },
    tablePrimaryHeader: {
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
    rowCompact: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowBordered: {
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowPrimaryHeader: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderCompact: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderBordered: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderPrimaryHeader: {
      backgroundColor: t.colors.primary,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: t.colors.primary,
      borderBottomStyle: 'solid',
    },
    rowHeaderGrid: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
    },
    rowHeaderLine: {
      borderBottomWidth: borderWidth,
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
      borderTopWidth: borderWidth,
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
    cellCompact: {
      paddingVertical: spacing[0.5],
      paddingHorizontal: spacing[3],
    },
    cellBordered: {
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
    },
    cellBorderedBorder: {
      borderRightWidth: borderWidth * 2,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },
    cellPrimaryHeader: {
      paddingVertical: spacing[3],
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
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderMinimal: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.medium,
    },
    cellTextHeaderStriped: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    cellTextHeaderBordered: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.bold,
    },
    cellTextHeaderPrimaryHeader: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    cellTextCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
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

export function TableHeader({ children, style }: TableSectionProps) {
  // minPresenceAhead: if < 60pt remain on the page, move the header to the next page
  // so the header is never stranded alone at the bottom without any body rows.
  return (
    <View minPresenceAhead={60} style={style}>
      {children}
    </View>
  );
}

export function TableBody({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

export function TableFooter({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

export function Table({
  children,
  style,
  variant = 'line',
  zebraStripe = false,
  noWrap = false,
}: TableProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
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
  } else if (variant === 'compact') {
    tableStyles.push(styles.tableCompact);
  } else if (variant === 'bordered') {
    tableStyles.push(styles.tableBordered);
  } else if (variant === 'primary-header') {
    tableStyles.push(styles.tablePrimaryHeader);
  }

  const styleArray = style ? [...tableStyles, style] : tableStyles;
  const processedChildren = processTableChildren(children, variant, effectiveZebra);

  const inner = <View style={styleArray}>{processedChildren}</View>;
  return noWrap ? <View wrap={false}>{inner}</View> : inner;
}

export function TableRow({
  header,
  footer,
  stripe,
  children,
  style,
  variant = 'line',
}: TableRowProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
  const rowStyles: Style[] = [styles.row];

  if (variant === 'grid') {
    rowStyles.push(styles.rowGrid);
  } else if (variant === 'line') {
    rowStyles.push(styles.rowLine);
  } else if (variant === 'minimal') {
    rowStyles.push(styles.rowMinimal);
  } else if (variant === 'striped') {
    rowStyles.push(styles.rowStriped);
  } else if (variant === 'compact') {
    rowStyles.push(styles.rowCompact);
  } else if (variant === 'bordered') {
    rowStyles.push(styles.rowBordered);
  } else if (variant === 'primary-header') {
    rowStyles.push(styles.rowPrimaryHeader);
  }

  if (header) {
    if (variant === 'line') rowStyles.push(styles.rowHeaderLine);
    else if (variant === 'minimal') rowStyles.push(styles.rowHeaderMinimal);
    else if (variant === 'striped') rowStyles.push(styles.rowHeaderStriped);
    else if (variant === 'compact') rowStyles.push(styles.rowHeaderCompact);
    else if (variant === 'bordered') rowStyles.push(styles.rowHeaderBordered);
    else if (variant === 'primary-header') rowStyles.push(styles.rowHeaderPrimaryHeader);
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

  // wrap={false}: each row is atomic — never split mid-row across pages.
  return (
    <View wrap={false} style={styleArray}>
      {processedChildren}
    </View>
  );
}

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
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createTableStyles(theme), [theme]);
  const cellStyles: Style[] = [styles.cell];

  if (width !== undefined) {
    cellStyles.push(styles.cellFixed);
    cellStyles.push({ width } as Style);
  }

  if (variant === 'minimal') {
    cellStyles.push(styles.cellMinimal);
  } else if (variant === 'striped') {
    cellStyles.push(styles.cellStriped);
  } else if (variant === 'compact') {
    cellStyles.push(styles.cellCompact);
  } else if (variant === 'bordered') {
    cellStyles.push(styles.cellBordered);
  } else if (variant === 'primary-header') {
    cellStyles.push(styles.cellPrimaryHeader);
  }

  if (variant === 'grid' && !_last) {
    cellStyles.push(styles.cellGridBorder);
  } else if (variant === 'bordered' && !_last) {
    cellStyles.push(styles.cellBorderedBorder);
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
    else if (variant === 'compact') textStyle = styles.cellTextHeaderCompact;
    else if (variant === 'bordered') textStyle = styles.cellTextHeaderBordered;
    else if (variant === 'primary-header') textStyle = styles.cellTextHeaderPrimaryHeader;
    else textStyle = styles.cellTextHeaderGrid;
  } else if (footer) {
    textStyle = styles.cellTextFooter;
  } else if (variant === 'compact') {
    textStyle = styles.cellTextCompact;
  }

  const content =
    typeof children === 'string' ? (
      <PDFText style={[textStyle, align ? { textAlign: align } : {}]}>{children}</PDFText>
    ) : (
      children
    );

  return <View style={styleArray}>{content}</View>;
}
