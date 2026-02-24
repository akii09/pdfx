import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import React from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createTableStyles } from './table.styles';
import type {
  TableCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableVariant,
} from './table.types';

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
      <PDFText
        style={[
          textStyle,
          align ? { textAlign: align } : {},
          { margin: 0, padding: 0 }, // ← hard reset — always last so it wins
        ]}
      >
        {children}
      </PDFText>
    ) : (
      children
    );

  return <View style={styleArray}>{content}</View>;
}
