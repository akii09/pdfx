import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createSvgStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: { flexDirection: 'column' },
    alignLeft: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignRight: { alignItems: 'flex-end' },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}
