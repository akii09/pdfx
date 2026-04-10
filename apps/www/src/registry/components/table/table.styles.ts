import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all table styles derived from the active theme.
 * @param t - The resolved PdfxTheme instance.
 */
export function createTableStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;

  const hairline = 0.5;
  const rule = 1;
  const thick = 1.5;

  const cellPadV = spacing[2] - 2;
  const cellPadH = spacing[2] + 2;
  const cellPadVCompact = spacing[0.5];
  const cellPadHCompact = spacing[2];

  const rowDivider = {
    borderBottomWidth: hairline,
    borderBottomColor: borderColor,
    borderBottomStyle: 'solid' as const,
  };

  return StyleSheet.create({
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },

    tableGrid: {
      borderWidth: thick,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderTopLeftRadius: borderRadius.md,
      borderTopRightRadius: borderRadius.md,
      borderBottomLeftRadius: borderRadius.md,
      borderBottomRightRadius: borderRadius.md,
      overflow: 'hidden' as const,
    },

    tableLine: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    tableMinimal: {
      paddingVertical: spacing[2],
    },

    tableStriped: {
      borderTopWidth: hairline,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    tableCompact: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    tableBordered: {
      borderWidth: rule,
      borderColor: borderColor,
      borderStyle: 'solid',
      borderTopLeftRadius: borderRadius.sm,
      borderTopRightRadius: borderRadius.sm,
      borderBottomLeftRadius: borderRadius.sm,
      borderBottomRightRadius: borderRadius.sm,
      overflow: 'hidden' as const,
    },

    tablePrimaryHeader: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    row: {
      flexDirection: 'row',
      display: 'flex',
    },

    rowGrid: rowDivider,
    rowLine: rowDivider,
    rowMinimal: rowDivider,
    rowStriped: {},
    rowCompact: rowDivider,
    rowBordered: rowDivider,
    rowPrimaryHeader: rowDivider,

    rowHeaderGrid: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderLine: {
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderMinimal: {
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderStriped: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderCompact: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: rule,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderBordered: {
      backgroundColor: t.colors.muted,
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowHeaderPrimaryHeader: {
      backgroundColor: t.colors.primary,
    },

    rowFooter: {
      borderTopWidth: rule,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
    },
    rowFooterStriped: {
      borderTopWidth: rule,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
      backgroundColor: t.colors.muted,
    },

    rowStripe: {
      backgroundColor: t.colors.muted,
    },

    cell: {
      flex: 1,
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
      justifyContent: 'center',
    },
    cellFixed: {
      flexGrow: 0,
      flexShrink: 0,
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
      justifyContent: 'center',
    },

    cellMinimal: {
      paddingVertical: spacing[1] + 1,
      paddingHorizontal: spacing[2] - 2,
    },
    cellStriped: {
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
    },
    cellCompact: {
      paddingVertical: cellPadVCompact,
      paddingHorizontal: cellPadHCompact,
    },
    cellBordered: {
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
    },
    cellPrimaryHeader: {
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
    },

    cellGridBorder: {
      borderRightWidth: hairline,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },
    cellBorderedBorder: {
      borderRightWidth: hairline,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },

    cellText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
    },

    cellTextHeaderGrid: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderLine: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderMinimal: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    cellTextHeaderStriped: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    cellTextHeaderCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    cellTextHeaderBordered: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.bold,
    },
    cellTextHeaderPrimaryHeader: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: 1.2,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },

    cellTextFooter: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: 1.2,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },

    cellTextCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: 1.2,
      color: t.colors.foreground,
    },
  });
}
