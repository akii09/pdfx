import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { Children, type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';
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
  children: ReactNode,
  variant: TableVariant,
  zebraStripe: boolean
): ReactNode {
  let bodyRowIndex = 0;

  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === TableHeader || child.type === TableBody || child.type === TableFooter) {
      const isBody = child.type === TableBody;
      const sectionChild = child as ReactElement<TableSectionProps>;
      const sectionChildren = Children.map(sectionChild.props.children, (rowChild) => {
        if (isValidElement(rowChild) && rowChild.type === TableRow) {
          const rowProps: Partial<TableRowProps> = { variant };

          if (isBody && zebraStripe) {
            const isStripe = bodyRowIndex % 2 === 1;
            bodyRowIndex++;
            if (isStripe) {
              rowProps.stripe = true;
            }
          }

          return cloneElement(rowChild as ReactElement<TableRowProps>, rowProps);
        }
        return rowChild;
      });

      return cloneElement(child, {}, sectionChildren);
    }

    if (child.type === TableRow) {
      return cloneElement(child as ReactElement<TableRowProps>, { variant });
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

  tableStyles.push(
    {
      grid: styles.tableGrid,
      line: styles.tableLine,
      minimal: styles.tableMinimal,
      striped: styles.tableStriped,
      compact: styles.tableCompact,
      bordered: styles.tableBordered,
      'primary-header': styles.tablePrimaryHeader,
    }[variant]
  );

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

  rowStyles.push(
    {
      grid: styles.rowGrid,
      line: styles.rowLine,
      minimal: styles.rowMinimal,
      striped: styles.rowStriped,
      compact: styles.rowCompact,
      bordered: styles.rowBordered,
      'primary-header': styles.rowPrimaryHeader,
    }[variant]
  );

  if (header) {
    rowStyles.push(
      {
        grid: styles.rowHeaderGrid,
        line: styles.rowHeaderLine,
        minimal: styles.rowHeaderMinimal,
        striped: styles.rowHeaderStriped,
        compact: styles.rowHeaderCompact,
        bordered: styles.rowHeaderBordered,
        'primary-header': styles.rowHeaderPrimaryHeader,
      }[variant]
    );
  }

  if (footer) {
    if (variant === 'striped') rowStyles.push(styles.rowFooterStriped);
    else rowStyles.push(styles.rowFooter);
  }

  if (stripe && !header && !footer) {
    rowStyles.push(styles.rowStripe);
  }

  const styleArray = style ? [...rowStyles, style] : rowStyles;
  const childArray = Children.toArray(children);
  const processedChildren = childArray.map((child, i) => {
    if (isValidElement(child) && child.type === TableCell) {
      return cloneElement(child as ReactElement<TableCellProps>, {
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

  // Only certain variants carry a cell-level style override; grid/line use the base cell style.
  const cellVariantStyle = (
    {
      minimal: styles.cellMinimal,
      striped: styles.cellStriped,
      compact: styles.cellCompact,
      bordered: styles.cellBordered,
      'primary-header': styles.cellPrimaryHeader,
    } as Partial<Record<TableVariant, Style>>
  )[variant];
  if (cellVariantStyle) cellStyles.push(cellVariantStyle);

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
    textStyle = {
      grid: styles.cellTextHeaderGrid,
      line: styles.cellTextHeaderLine,
      minimal: styles.cellTextHeaderMinimal,
      striped: styles.cellTextHeaderStriped,
      compact: styles.cellTextHeaderCompact,
      bordered: styles.cellTextHeaderBordered,
      'primary-header': styles.cellTextHeaderPrimaryHeader,
    }[variant];
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
