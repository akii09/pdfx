import { Text as PDFText, Rect, Svg, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import QRCode from 'qrcode';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color';
import { createQRCodeStyles } from './qrcode.styles';
import type { PdfQRCodeProps, QRCodeErrorLevel } from './qrcode.types';

/**
 * Generates QR code matrix from the input value.
 * Returns a 2D boolean array where true = dark module.
 */
function generateQRMatrix(
  value: string,
  errorLevel: QRCodeErrorLevel,
  margin: number
): boolean[][] {
  // Use qrcode library to generate the modules
  const qr = QRCode.create(value, {
    errorCorrectionLevel: errorLevel,
  });

  const modules = qr.modules;
  const size = modules.size;
  const data = modules.data;

  // Create matrix with margin
  const totalSize = size + margin * 2;
  const matrix: boolean[][] = [];

  for (let row = 0; row < totalSize; row++) {
    const rowData: boolean[] = [];
    for (let col = 0; col < totalSize; col++) {
      // Check if this cell is within the margin
      const isInMargin =
        row < margin || row >= size + margin || col < margin || col >= size + margin;

      if (isInMargin) {
        rowData.push(false); // Margin is always light
      } else {
        // Map to original QR data
        const qrRow = row - margin;
        const qrCol = col - margin;
        const index = qrRow * size + qrCol;
        rowData.push(data[index] === 1);
      }
    }
    matrix.push(rowData);
  }

  return matrix;
}

/**
 * PdfQRCode — Renders a QR code using native SVG primitives.
 *
 * Uses the `qrcode` library for generation and react-pdf's SVG
 * support for rendering. The result is a crisp, vector QR code
 * that scales perfectly at any size.
 *
 * @example Basic usage
 * ```tsx
 * <PdfQRCode value="https://example.com" />
 * ```
 *
 * @example Invoice with payment link
 * ```tsx
 * <PdfQRCode
 *   value="https://pay.example.com/invoice/123"
 *   size={80}
 *   caption="Scan to pay"
 * />
 * ```
 *
 * @example Styled QR code
 * ```tsx
 * <PdfQRCode
 *   value="https://example.com"
 *   size={120}
 *   color="primary"
 *   backgroundColor="muted"
 *   errorLevel="H"
 * />
 * ```
 */
export function PdfQRCode({
  value,
  size = 100,
  color = 'foreground',
  backgroundColor = 'background',
  errorLevel = 'M',
  margin = 2,
  caption,
  style,
}: PdfQRCodeProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createQRCodeStyles(theme), [theme]);

  // Generate QR matrix
  const matrix = useSafeMemo(
    () => generateQRMatrix(value, errorLevel, margin),
    [value, errorLevel, margin]
  );

  const moduleCount = matrix.length;
  const moduleSize = size / moduleCount;

  // Resolve colors
  const resolvedColor = resolveColor(color, theme.colors);
  const resolvedBgColor =
    backgroundColor === 'transparent' ? 'transparent' : resolveColor(backgroundColor, theme.colors);

  const containerStyles: Style[] = [styles.container];
  if (style) {
    containerStyles.push(style);
  }

  return (
    <View style={containerStyles}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background */}
        {resolvedBgColor !== 'transparent' && (
          <Rect x={0} y={0} width={size} height={size} fill={resolvedBgColor} />
        )}

        {/* QR modules - render dark modules as Rects */}
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
