import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color';
import { createWatermarkStyles } from './watermark.styles';
import type { PdfWatermarkProps, WatermarkPosition } from './watermark.types';

/**
 * PdfWatermark — Displays a diagonal or positioned text overlay on PDF pages.
 *
 * Common use cases include "DRAFT", "CONFIDENTIAL", "PAID", "VOID", "COPY", etc.
 * The watermark uses absolute positioning and appears behind content.
 * Use the `fixed` prop (default: true) to repeat on every page.
 *
 * @example Basic usage (diagonal "DRAFT" on every page)
 * ```tsx
 * <Page>
 *   <PdfWatermark text="DRAFT" />
 *   {content}
 * </Page>
 * ```
 *
 * @example Confidential document
 * ```tsx
 * <PdfWatermark text="CONFIDENTIAL" color="destructive" opacity={0.1} />
 * ```
 *
 * @example Paid invoice stamp (no rotation)
 * ```tsx
 * <PdfWatermark text="PAID" angle={0} color="success" fontSize={80} />
 * ```
 *
 * @example Corner watermark
 * ```tsx
 * <PdfWatermark text="COPY" position="top-right" angle={0} fontSize={24} />
 * ```
 */
export function PdfWatermark({
  text,
  opacity = 0.15,
  fontSize = 60,
  color = 'mutedForeground',
  angle = -45,
  position = 'center',
  fixed = true,
  style,
}: PdfWatermarkProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createWatermarkStyles(theme), [theme]);

  const positionMap: Record<WatermarkPosition, Style> = {
    center: styles.positionCenter,
    'top-left': styles.positionTopLeft,
    'top-right': styles.positionTopRight,
    'bottom-left': styles.positionBottomLeft,
    'bottom-right': styles.positionBottomRight,
  };

  const containerStyles: Style[] = [styles.container, positionMap[position]];

  if (style) {
    containerStyles.push(style);
  }

  const resolvedColor = resolveColor(color, theme.colors);

  const textStyles: Style[] = [
    styles.text,
    {
      fontSize,
      color: resolvedColor,
      opacity,
      transform: `rotate(${angle}deg)`,
    },
  ];

  return (
    <View style={containerStyles} fixed={fixed}>
      <PDFText style={textStyles}>{text}</PDFText>
    </View>
  );
}
