import type { PdfxTheme } from '@pdfx/shared';
import { StyleSheet } from '@react-pdf/renderer';

/**
 * Creates all stack layout styles derived from the active theme.
 * Returns a StyleSheet covering direction, gap scale, alignment, justification, and wrap.
 * @param t - The resolved PdfxTheme instance.
 */
export function createStackStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    vertical: { flexDirection: 'column', display: 'flex' },
    horizontal: { flexDirection: 'row', display: 'flex' },
    gapNone: { gap: spacing[0] },
    gapSm: { gap: spacing[2] },
    gapMd: { gap: spacing[4] },
    gapLg: { gap: spacing[6] },
    gapXl: { gap: spacing[8] },
    alignStart: { alignItems: 'flex-start' },
    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignStretch: { alignItems: 'stretch' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    wrap: { flexWrap: 'wrap' },
  });
}
