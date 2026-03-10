import type { PDFComponentProps } from '@pdfx/shared';

/**
 * Position preset for the watermark.
 */
export type WatermarkPosition =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * Props for the PdfWatermark component.
 */
export interface PdfWatermarkProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * The text to display as a watermark.
   * Common values: "DRAFT", "CONFIDENTIAL", "PAID", "VOID", "COPY", "SAMPLE"
   */
  text: string;

  /**
   * Opacity of the watermark (0 to 1).
   * @default 0.15
   */
  opacity?: number;

  /**
   * Font size in PDF points.
   * @default 60
   */
  fontSize?: number;

  /**
   * Color of the watermark text.
   * Can be a hex color or theme color key (e.g., "primary", "destructive").
   * @default "mutedForeground"
   */
  color?: string;

  /**
   * Rotation angle in degrees.
   * Use negative values for counter-clockwise rotation.
   * @default -45
   */
  angle?: number;

  /**
   * Position of the watermark on the page.
   * @default "center"
   */
  position?: WatermarkPosition;

  /**
   * Whether the watermark should be fixed (appear on every page).
   * @default true
   */
  fixed?: boolean;

  /**
   * No children allowed.
   */
  children?: never;
}
