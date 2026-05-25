import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';
import type { BubbleSize } from './bubble-sheet.types';

/** Pixel diameter for each bubble size variant. */
export const BUBBLE_DIAMETERS: Record<BubbleSize, number> = {
  sm: 8,
  md: 10,
  lg: 13,
};

/** Style factory for BubbleSheet, derived from the active theme. */
export function createBubbleSheetStyles(t: PdfxTheme, bubbleSize: BubbleSize = 'md') {
  const { spacing, fontWeights, typography } = t.primitives;
  const diameter = BUBBLE_DIAMETERS[bubbleSize];
  // Width reserved for the question number column
  const numColWidth = 20;

  return StyleSheet.create({
    root: {
      width: '100%',
      marginBottom: t.spacing.componentGap,
    },

    // ── Title ──────────────────────────────────────────────────────────────
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: typography.lg,
      fontWeight: fontWeights.bold,
      color: t.colors.foreground,
      marginBottom: spacing[3],
      textAlign: 'center',
    },

    // ── Student info header ────────────────────────────────────────────────
    studentInfoRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[4],
      marginBottom: spacing[4],
    },
    studentField: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      flex: 1,
      minWidth: 80,
    },
    studentFieldLabel: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.sm,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.medium,
      marginRight: spacing[1],
    },
    studentFieldLine: {
      flex: 1,
      borderBottomWidth: 0.75,
      borderBottomColor: t.colors.foreground,
      borderBottomStyle: 'solid',
      minHeight: spacing[4],
    },

    // ── Divider below student info ─────────────────────────────────────────
    headerDivider: {
      borderBottomWidth: 0.75,
      borderBottomColor: t.colors.border,
      borderBottomStyle: 'solid',
      marginBottom: spacing[3],
    },

    // ── Grid layout ────────────────────────────────────────────────────────
    columnsRow: {
      flexDirection: 'row',
      gap: spacing[5],
    },
    column: {
      flex: 1,
    },

    // ── Choice header row (A B C D E labels) ──────────────────────────────
    choiceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[1],
      paddingLeft: numColWidth,
    },
    choiceLabel: {
      width: diameter + 4,
      textAlign: 'center',
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.mutedForeground,
      fontWeight: fontWeights.semibold,
    },

    // ── Question row ───────────────────────────────────────────────────────
    questionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[0.5],
    },
    questionNumber: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: typography.xs,
      color: t.colors.foreground,
      width: numColWidth,
      textAlign: 'right',
      paddingRight: spacing[1],
    },
    bubblesRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },

    // ── Individual bubble circle ───────────────────────────────────────────
    bubble: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      borderWidth: 0.75,
      borderColor: t.colors.foreground,
      borderStyle: 'solid',
    },
  });
}
