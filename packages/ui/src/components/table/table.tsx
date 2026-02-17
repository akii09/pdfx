import type { PDFComponentProps } from '@pdfx/shared';
import type { PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import React from 'react';
import { theme as defaultTheme } from '../../lib/pdfx-theme';

/**
 * Table visual variant.
 * - `line`: Horizontal dividers only (Stripe-style). Best for invoices, receipts, quotes.
 * - `grid`: Full borders on all sides. Best for reports, data sheets, comparison tables.
 * - `minimal`: No borders. Structure via spacing/typography. Best for certificates, elegant reports.
 */
export type TableVariant = 'line' | 'grid' | 'minimal';

/**
 * Props for the Table component.
 *
 * @example
 * ```tsx
 * <Table variant="line">
 *   <TableHeader>
 *     <TableRow header>...</TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>...</TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export interface TableProps extends PDFComponentProps {
  /** Visual variant. line = horizontal dividers only. grid = full borders. minimal = borderless. */
  variant?: TableVariant;
  /** Enable automatic zebra striping on body rows. */
  zebraStripe?: boolean;
}

/**
 * Props for semantic table section wrappers.
 */
export interface TableSectionProps extends PDFComponentProps {}

/**
 * Props for the TableRow component.
 */
export interface TableRowProps extends PDFComponentProps {
  /** Header row (uppercase, muted text). */
  header?: boolean;
  /** Footer row (totals). Top border, bold text. */
  footer?: boolean;
  /** Alternating stripe background. */
  stripe?: boolean;
  /** Override table variant (default from parent Table). */
  variant?: TableVariant;
}

/**
 * Props for the TableCell component.
 */
export interface TableCellProps extends PDFComponentProps {
  /** Header cell styling. */
  header?: boolean;
  /** Footer cell styling (bold). */
  footer?: boolean;
  /** Text alignment. Use 'right' for amounts/numbers. */
  align?: 'left' | 'center' | 'right';
  /** Column width. String ('50%') or number (pts). Omit for equal-width flex. */
  width?: string | number;
  /** Override table variant (default from parent TableRow). */
  variant?: TableVariant;
  /** Internal: omit right border (last cell in row). */
  _last?: boolean;
}

// ─── Theme Caching ────────────────────────────────────────────────────────────
// Cache styles by theme reference to avoid recreating on every render.
// This is safe because themes are typically constant per PDF render.
let cachedTheme: PdfxTheme | null = null;
let cachedStyles: ReturnType<typeof createTableStyles> | null = null;

function getStyles(t: PdfxTheme) {
  if (cachedTheme !== t || !cachedStyles) {
    cachedStyles = createTableStyles(t);
    cachedTheme = t;
  }
  return cachedStyles;
}

/** Creates table styles from theme tokens. Zero hardcoded values. */
function createTableStyles(t: PdfxTheme) {
  const { spacing, borderRadius, letterSpacing, fontWeights, typography } = t.primitives;
  const borderWidth = spacing[0.5];
  const borderColor = t.colors.border;

  return StyleSheet.create({
    // ─── Container ─────────────────────────────────────────────────────────
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },
    // Grid variant: Full bordered table with rounded corners
    tableGrid: {
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderTopLeftRadius: borderRadius.md,
      borderTopRightRadius: borderRadius.md,
      borderBottomLeftRadius: borderRadius.md,
      borderBottomRightRadius: borderRadius.md,
    },
    // Line variant: Clean, professional look with horizontal lines only
    tableLine: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    // Minimal variant: Maximum whitespace, subtle styling
    tableMinimal: {
      paddingVertical: spacing[2],
    },

    // ─── Rows ─────────────────────────────────────────────────────────────
    row: {
      flexDirection: 'row',
      display: 'flex',
    },
    // Grid variant row styling
    rowGrid: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    // Line variant row styling (clean horizontal lines)
    rowLine: {
      borderBottomWidth: 0,
    },
    // Minimal variant row styling
    rowMinimal: {
      paddingVertical: spacing[1],
    },
    // Header row - grid variant
    rowHeaderGrid: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
    },
    // Header row - line variant (Stripe-style)
    rowHeaderLine: {
      borderBottomWidth: borderWidth * 2,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    // Header row - minimal variant
    rowHeaderMinimal: {
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    // Footer row styling
    rowFooter: {
      borderTopWidth: borderWidth * 2,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
    },
    // Alternating stripe background
    rowStripe: {
      backgroundColor: t.colors.muted,
    },

    // ─── Cells ─────────────────────────────────────────────────────────────
    cell: {
      flex: 1,
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
    },
    // Fixed-width cell (when width prop is set)
    cellFixed: {
      flex: 0,
    },
    // Grid variant: vertical cell dividers
    cellGridBorder: {
      borderRightWidth: borderWidth,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },
    // Minimal variant: adjusted padding
    cellMinimal: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
    },

    // ─── Cell Text Styles ──────────────────────────────────────────────────
    cellText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
    // Header cell text - grid variant
    cellTextHeaderGrid: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    // Header cell text - line variant (uppercase, small)
    cellTextHeaderLine: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: letterSpacing.wider * 10, // Scale for pt units
    },
    // Header cell text - minimal variant
    cellTextHeaderMinimal: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    // Footer cell text (bold for totals)
    cellTextFooter: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
  });
}

// ─── Helper: Process children and propagate variant ───────────────────────────
function processTableChildren(
  children: React.ReactNode,
  variant: TableVariant,
  zebraStripe: boolean
): React.ReactNode {
  let bodyRowIndex = 0;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // Handle TableHeader, TableBody, TableFooter wrappers
    if (child.type === TableHeader || child.type === TableBody || child.type === TableFooter) {
      const isBody = child.type === TableBody;
      const sectionChild = child as React.ReactElement<TableSectionProps>;
      const sectionChildren = React.Children.map(sectionChild.props.children, (rowChild) => {
        if (React.isValidElement(rowChild) && rowChild.type === TableRow) {
          const rowProps: Partial<TableRowProps> = { variant };

          // Apply zebra striping only to body rows
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

    // Handle direct TableRow children (backwards compatibility)
    if (child.type === TableRow) {
      return React.cloneElement(child as React.ReactElement<TableRowProps>, { variant });
    }

    return child;
  });
}

// ─── Components ───────────────────────────────────────────────────────────────

/**
 * Semantic wrapper for table header rows.
 * Provides structure and enables future features like sticky headers.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow header>
 *     <TableCell>Name</TableCell>
 *     <TableCell>Price</TableCell>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
export function TableHeader({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/**
 * Semantic wrapper for table body rows.
 * Contains the main data rows of the table.
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Item 1</TableCell>
 *     <TableCell>$100</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
export function TableBody({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/**
 * Semantic wrapper for table footer rows.
 * Contains totals, summaries, or other footer content.
 *
 * @example
 * ```tsx
 * <TableFooter>
 *   <TableRow footer>
 *     <TableCell>Total</TableCell>
 *     <TableCell>$500</TableCell>
 *   </TableRow>
 * </TableFooter>
 * ```
 */
export function TableFooter({ children, style }: TableSectionProps) {
  return <View style={style}>{children}</View>;
}

/**
 * PDF table container component.
 * Supports three visual variants: line, grid, and minimal.
 *
 * @example
 * ```tsx
 * <Table variant="line" zebraStripe>
 *   <TableHeader>
 *     <TableRow header>
 *       <TableCell width="50%">Description</TableCell>
 *       <TableCell width="15%" align="center">Qty</TableCell>
 *       <TableCell width="17.5%" align="right">Price</TableCell>
 *       <TableCell width="17.5%" align="right">Total</TableCell>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell width="50%">Web Design</TableCell>
 *       <TableCell width="15%" align="center">1</TableCell>
 *       <TableCell width="17.5%" align="right">$2,000</TableCell>
 *       <TableCell width="17.5%" align="right">$2,000</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
export function Table({ children, style, variant = 'line', zebraStripe = false }: TableProps) {
  const styles = getStyles(defaultTheme);
  const tableStyles: Style[] = [styles.table];

  // Apply variant-specific container styles
  if (variant === 'grid') {
    tableStyles.push(styles.tableGrid);
  } else if (variant === 'line') {
    tableStyles.push(styles.tableLine);
  } else if (variant === 'minimal') {
    tableStyles.push(styles.tableMinimal);
  }

  const styleArray = style ? [...tableStyles, style] : tableStyles;
  const processedChildren = processTableChildren(children, variant, zebraStripe);

  return <View style={styleArray}>{processedChildren}</View>;
}

/**
 * PDF table row component.
 * Renders as a flex row containing TableCell children.
 *
 * @example
 * ```tsx
 * <TableRow header>
 *   <TableCell>Column 1</TableCell>
 *   <TableCell>Column 2</TableCell>
 * </TableRow>
 * ```
 */
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

  // Apply variant-specific base row styles
  if (variant === 'grid') {
    rowStyles.push(styles.rowGrid);
  } else if (variant === 'line') {
    rowStyles.push(styles.rowLine);
  } else if (variant === 'minimal') {
    rowStyles.push(styles.rowMinimal);
  }

  // Apply header row styles
  if (header) {
    if (variant === 'line') {
      rowStyles.push(styles.rowHeaderLine);
    } else if (variant === 'minimal') {
      rowStyles.push(styles.rowHeaderMinimal);
    } else {
      rowStyles.push(styles.rowHeaderGrid);
    }
  }

  // Apply footer row styles
  if (footer) {
    rowStyles.push(styles.rowFooter);
  }

  // Apply stripe styling (only for body rows, not header/footer)
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

/**
 * PDF table cell component.
 * Renders as a flex cell within a TableRow.
 *
 * @example
 * ```tsx
 * <TableCell width="50%" align="left">Description</TableCell>
 * <TableCell width="25%" align="right">$1,000</TableCell>
 * ```
 */
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

  // Apply fixed width if provided
  if (width !== undefined) {
    cellStyles.push(styles.cellFixed);
    cellStyles.push({ width } as Style);
  }

  // Apply variant-specific cell styles
  if (variant === 'minimal') {
    cellStyles.push(styles.cellMinimal);
  }

  // Apply cell borders only for grid variant (not line or minimal)
  if (variant === 'grid' && !_last) {
    cellStyles.push(styles.cellGridBorder);
  }

  // Apply alignment
  if (align) {
    cellStyles.push({ textAlign: align } as Style);
  }

  const styleArray = style ? [...cellStyles, style] : cellStyles;

  // Determine text style based on header/footer and variant
  let textStyle: Style = styles.cellText;
  if (header) {
    if (variant === 'line') {
      textStyle = styles.cellTextHeaderLine;
    } else if (variant === 'minimal') {
      textStyle = styles.cellTextHeaderMinimal;
    } else {
      textStyle = styles.cellTextHeaderGrid;
    }
  } else if (footer) {
    textStyle = styles.cellTextFooter;
  }

  // Wrap string children in Text, pass through other elements
  const content =
    typeof children === 'string' ? (
      <PDFText style={[textStyle, align ? { textAlign: align } : {}]}>{children}</PDFText>
    ) : (
      children
    );

  return <View style={styleArray}>{content}</View>;
}
