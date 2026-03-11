import type { PDFComponentProps } from '@pdfx/shared';

/**
 * Error correction level for the QR code.
 * Higher levels allow more damage but require more space.
 * - L: ~7% recovery
 * - M: ~15% recovery
 * - Q: ~25% recovery
 * - H: ~30% recovery
 */
export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Props for the PdfQRCode component.
 */
export interface PdfQRCodeProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * The data to encode in the QR code.
   * Can be a URL, text, or any string data.
   */
  value: string;

  /**
   * Size of the QR code in PDF points.
   * The QR code is always square.
   * @default 100
   */
  size?: number;

  /**
   * Color of the QR code modules (dark squares).
   * Can be a hex color or theme color key.
   * @default "foreground"
   */
  color?: string;

  /**
   * Background color of the QR code.
   * Can be a hex color, theme color key, or "transparent".
   * @default "background"
   */
  backgroundColor?: string;

  /**
   * Error correction level.
   * Higher levels are more resilient but create denser codes.
   * @default "M"
   */
  errorLevel?: QRCodeErrorLevel;

  /**
   * Margin around the QR code in modules (not points).
   * @default 2
   */
  margin?: number;

  /**
   * Optional caption text below the QR code.
   */
  caption?: string;

  /**
   * No children allowed.
   */
  children?: never;
}
