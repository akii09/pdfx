import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all table styles derived from the active theme.
 * Returns a StyleSheet covering table, row, cell, header, footer, and all variant styles.
 * All values are derived from theme tokens — zero hardcoded values.
 * @param t - The resolved PdfxTheme instance.
 */
export function createTableStyles(t: PdfxTheme) {
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
