import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createQRCodeStyles(theme: PdfxTheme) {
  const { typography, colors, primitives } = theme;

  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    caption: {
      fontFamily: typography.body.fontFamily,
      fontSize: primitives.typography.xs,
      color: colors.mutedForeground,
      marginTop: 4,
      textAlign: 'center',
    },
  });
}
