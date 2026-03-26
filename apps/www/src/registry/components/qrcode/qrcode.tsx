import type { PDFComponentProps, PdfxTheme } from '@pdfx/shared';
import { Text as PDFText, Rect, StyleSheet, Svg, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import QRCode from 'qrcode';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';

export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface PdfQRCodeProps extends Omit<PDFComponentProps, 'children'> {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  errorLevel?: QRCodeErrorLevel;
  margin?: number;
  caption?: string;
  children?: never;
}

function createQRCodeStyles(t: PdfxTheme) {
  const { spacing } = t.primitives;
  return StyleSheet.create({
    container: { alignItems: 'center' },
    caption: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginTop: spacing[1],
      textAlign: 'center',
    },
  });
}

function generateQRMatrix(
  value: string,
  errorLevel: QRCodeErrorLevel,
  margin: number
): boolean[][] {
  const qr = QRCode.create(value, { errorCorrectionLevel: errorLevel });
  const { size, data } = qr.modules;
  const totalSize = size + margin * 2;
  const matrix: boolean[][] = [];
  for (let row = 0; row < totalSize; row++) {
    const rowData: boolean[] = [];
    for (let col = 0; col < totalSize; col++) {
      const isInMargin =
        row < margin || row >= size + margin || col < margin || col >= size + margin;
      if (isInMargin) {
        rowData.push(false);
      } else {
        rowData.push(data[(row - margin) * size + (col - margin)] === 1);
      }
    }
    matrix.push(rowData);
  }
  return matrix;
}

export function PdfQRCode({
  value,
  size = 100,
  color = '#000000',
  backgroundColor = '#ffffff',
  errorLevel = 'M',
  margin = 2,
  caption,
  style,
}: PdfQRCodeProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createQRCodeStyles(theme), [theme]);
  const matrix = useSafeMemo(
    () => generateQRMatrix(value, errorLevel, margin),
    [value, errorLevel, margin]
  );
  const moduleSize = size / matrix.length;
  const resolvedColor = resolveColor(color, theme.colors);
  const resolvedBgColor =
    backgroundColor === 'transparent' ? undefined : resolveColor(backgroundColor, theme.colors);
  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(...[style].flat());

  return (
    <View style={containerStyles}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {resolvedBgColor !== undefined && (
          <Rect x={0} y={0} width={size} height={size} fill={resolvedBgColor} />
        )}
        {matrix
          .flatMap((row, y) =>
            row
              .map((isDark, x) => (isDark ? { x, y } : null))
              .filter((pos): pos is { x: number; y: number } => pos !== null)
          )
          .map((pos) => (
            <Rect
              key={`qr-${pos.y}-${pos.x}`}
              x={pos.x * moduleSize}
              y={pos.y * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={resolvedColor}
            />
          ))}
      </Svg>
      {caption && <PDFText style={styles.caption}>{caption}</PDFText>}
    </View>
  );
}
