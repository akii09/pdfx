import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createGraphStyles(t: PdfxTheme) {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: t.spacing.componentGap,
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      fontWeight: t.primitives.fontWeights.semibold,
      color: t.colors.foreground,
      marginBottom: 2,
    },
    subtitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginBottom: 6,
    },
    legendRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 6,
    },
    legendColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginLeft: 12,
      marginTop: 18,
      minWidth: 120,
    },
    legendItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    legendText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
    },
    chartWithRightLegend: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });
}
