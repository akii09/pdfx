import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createPageNumberStyles(theme: PdfxTheme) {
  const { typography, colors, primitives } = theme;

  return StyleSheet.create({
    container: {
      width: '100%',
    },
    text: {
      fontFamily: typography.body.fontFamily,
    },
    // Alignment variants
    alignLeft: {
      textAlign: 'left',
    },
    alignCenter: {
      textAlign: 'center',
    },
    alignRight: {
      textAlign: 'right',
    },
    // Size variants
    sizeXs: {
      fontSize: primitives.typography.xs,
    },
    sizeSm: {
      fontSize: primitives.typography.sm,
    },
    sizeMd: {
      fontSize: primitives.typography.base,
    },
    // Color variants
    colorForeground: {
      color: colors.foreground,
    },
    colorMuted: {
      color: colors.mutedForeground,
    },
  });
}
