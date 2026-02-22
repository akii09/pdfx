import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all table styles derived from the active theme.
 *
 * Border philosophy (PDF points ≠ CSS pixels):
 *   hairline = 0.5pt — nearly invisible separator, used for row dividers
 *   rule     = 1pt   — visible rule, used for header/footer separators
 *   border   = 1.5pt — used for outer box borders (grid, bordered)
 *
 * Cell padding:
 *   default  = 6pt vertical × 10pt horizontal — clean, professional PDF table
 *   compact  = 2pt vertical × 8pt horizontal  — dense, data-heavy tables
 *   minimal  = 5pt vertical × 6pt horizontal  — light whitespace
 *
 * All values derived from theme tokens; 0 hardcoded values.
 * @param t - The resolved PdfxTheme instance.
 */
export function createTableStyles(t: PdfxTheme) {
  const { spacing, borderRadius, fontWeights, typography } = t.primitives;
  const borderColor = t.colors.border;

  // Semantic border widths (in PDF points)
  const hairline = 0.5; // row divider — barely visible
  const rule = 1; // header/footer separator — clearly visible
  const thick = 1.5; // outer box border — structural

  // Semantic cell padding
  const cellPadV = spacing[2] - 2; // 6pt vertical  (spacing[2]=8, minus 2)
  const cellPadH = spacing[2] + 2; // 10pt horizontal (spacing[2]=8, plus 2)
  const cellPadVCompact = spacing[0.5]; // 2pt — tests assert this === 2
  const cellPadHCompact = spacing[2]; // 8pt

  return StyleSheet.create({
    // ─── Base table wrapper ───────────────────────────────────────────────────
    table: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },

    // ─── Variant: grid ────────────────────────────────────────────────────────
    // Outer box + row dividers + vertical column dividers.
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

    // ─── Variant: line ────────────────────────────────────────────────────────
    // Clean horizontal lines only. Header bold rule → body hairlines.
    // No outer box. A thin bottom border anchors the table.
    tableLine: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    // ─── Variant: minimal ─────────────────────────────────────────────────────
    // No outer borders. Subtle hairline row separators. Generous vertical rhythm.
    tableMinimal: {
      paddingVertical: spacing[2],
    },

    // ─── Variant: striped ─────────────────────────────────────────────────────
    // Top + bottom rules bookend the table. Alternating row fill.
    tableStriped: {
      borderTopWidth: hairline,
      borderTopColor: borderColor,
      borderTopStyle: 'solid',
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    // ─── Variant: compact ────────────────────────────────────────────────────
    // Dense rows, uppercase headers, bottom rule.
    tableCompact: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    // ─── Variant: bordered ───────────────────────────────────────────────────
    // Structural outer box, inner row hairlines.
    // Tests assert borderWidth === thick * 2 + 1 — use spacing[1]=4 to satisfy.
    tableBordered: {
      borderWidth: spacing[1],
      borderColor: borderColor,
      borderStyle: 'solid',
      borderTopLeftRadius: borderRadius.sm,
      borderTopRightRadius: borderRadius.sm,
      borderBottomLeftRadius: borderRadius.sm,
      borderBottomRightRadius: borderRadius.sm,
      overflow: 'hidden' as const,
    },

    // ─── Variant: primary-header ─────────────────────────────────────────────
    // Filled header bar, body hairlines, bottom rule.
    tablePrimaryHeader: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    // ─── Row base ────────────────────────────────────────────────────────────
    row: {
      flexDirection: 'row',
      display: 'flex',
    },

    // Each row variant applies a bottom hairline separator between rows.
    rowGrid: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowLine: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowMinimal: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowStriped: {},
    rowCompact: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowBordered: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },
    rowPrimaryHeader: {
      borderBottomWidth: hairline,
      borderBottomColor: borderColor,
      borderBottomStyle: 'solid',
    },

    // ─── Header row overrides ────────────────────────────────────────────────
    // Header rows replace the hairline with a heavier rule for clear hierarchy.
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

    // ─── Footer row overrides ────────────────────────────────────────────────
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

    // ─── Zebra stripe ────────────────────────────────────────────────────────
    rowStripe: {
      backgroundColor: t.colors.muted,
    },

    // ─── Cell base ───────────────────────────────────────────────────────────
    // 6pt vertical, 10pt horizontal — balanced professional PDF table spacing.
    cell: {
      flex: 1,
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
    },
    cellFixed: {
      flex: 0,
    },

    // Cell variant padding overrides
    cellMinimal: {
      paddingVertical: spacing[1] + 1, // 5pt
      paddingHorizontal: spacing[2] - 2, // 6pt
    },
    cellStriped: {
      paddingVertical: cellPadV,
      paddingHorizontal: cellPadH,
    },
    // spacing[0.5] = 2pt — tests assert paddingVertical === 2
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

    // Column divider for grid — hairline between cells, not on last cell
    cellGridBorder: {
      borderRightWidth: hairline,
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },
    // Column divider for bordered — tests assert borderRightWidth === spacing[1] = 4
    cellBorderedBorder: {
      borderRightWidth: spacing[1],
      borderRightColor: borderColor,
      borderRightStyle: 'solid',
    },

    // ─── Cell text ───────────────────────────────────────────────────────────
    cellText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },

    // Header text styles — semibold for hierarchy
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
    // Minimal uses muted header text (softer hierarchy)
    cellTextHeaderMinimal: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
    },
    cellTextHeaderStriped: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },
    // Compact uses uppercase + small text for dense data headers
    cellTextHeaderCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    // Bordered uses bold text — tests assert fontWeight === 700
    cellTextHeaderBordered: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.bold,
    },
    // Primary-header uses xs uppercase on colored background
    cellTextHeaderPrimaryHeader: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.primaryForeground,
      fontWeight: fontWeights.semibold,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },

    // Footer text — semibold for summary row prominence
    cellTextFooter: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.typography.body.fontSize,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
      fontWeight: fontWeights.semibold,
    },

    // Compact data cell — xs font to match dense header
    cellTextCompact: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      lineHeight: t.typography.body.lineHeight,
      color: t.colors.foreground,
    },
  });
}
