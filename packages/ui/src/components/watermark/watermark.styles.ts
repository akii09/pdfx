import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

export function createWatermarkStyles(theme: PdfxTheme) {
  const { typography } = theme;

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
      pointerEvents: 'none',
    },
    text: {
      fontFamily: typography.heading.fontFamily,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 4,
    },
    // Position variants
    positionCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    positionTopLeft: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 100,
      paddingLeft: 50,
    },
    positionTopRight: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 100,
      paddingRight: 50,
    },
    positionBottomLeft: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      paddingBottom: 100,
      paddingLeft: 50,
    },
    positionBottomRight: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingBottom: 100,
      paddingRight: 50,
    },
  });
}
