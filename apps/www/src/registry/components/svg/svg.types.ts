import type { PDFComponentProps } from '@pdfx/shared';
import type { ReactNode } from 'react';

/** Horizontal alignment of the SVG container within its parent. */
export type PdfSvgAlign = 'left' | 'center' | 'right';

/**
 * Themed SVG container for custom shapes and illustrations.
 *
 * Wraps `@react-pdf/renderer`'s `<Svg>` with theme integration, alignment,
 * and an optional caption. Use react-pdf SVG primitives (`Circle`, `Rect`,
 * `Path`, `Line`, `G`, etc.) as children.
 *
 * Props - `width` | `height` | `viewBox` | `preserveAspectRatio` | `align` | `caption` | `noWrap` | `children` | `style`
 * @see {@link PdfSvgProps}
 *
 * @example
 * ```tsx
 * <PdfSvg width={100} height={100} viewBox="0 0 100 100" caption="Logo">
 *   <Circle cx={50} cy={50} r={40} fill="primary" />
 * </PdfSvg>
 * ```
 */
export interface PdfSvgProps extends Omit<PDFComponentProps, 'children'> {
  /** Width of the SVG viewport in points. */
  width: number | string;
  /** Height of the SVG viewport in points. */
  height: number | string;
  /**
   * The SVG viewBox defining the coordinate system (e.g. "0 0 100 100").
   * When omitted, defaults to `"0 0 {width} {height}"`.
   */
  viewBox?: string;
  /** Controls how the SVG scales within the viewBox. */
  preserveAspectRatio?: string;
  /**
   * Horizontal alignment of the SVG within its parent container.
   * @default 'left'
   */
  align?: PdfSvgAlign;
  /** Optional caption rendered below the SVG. */
  caption?: string;
  /**
   * Prevent the SVG from splitting across pages.
   * @default true
   */
  noWrap?: boolean;
  /** SVG content — use react-pdf SVG primitives (Circle, Rect, Path, etc.). */
  children?: ReactNode;
}

/**
 * Preset circle shape rendered inside a themed `<PdfSvg>` container.
 * Props - `size` | `fill` | `stroke` | `strokeWidth` | `caption` | `align` | `noWrap` | `style`
 * @see {@link PdfSvgCircleProps}
 */
export interface PdfSvgCircleProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Diameter of the circle in points.
   * @default 48
   */
  size?: number;
  /** Fill color — theme color key or raw CSS color. */
  fill?: string;
  /** Stroke color — theme color key or raw CSS color. */
  stroke?: string;
  /**
   * @default 0
   */
  strokeWidth?: number;
  caption?: string;
  align?: PdfSvgAlign;
  noWrap?: boolean;
}

/**
 * Preset rectangle shape rendered inside a themed `<PdfSvg>` container.
 * Props - `width` | `height` | `fill` | `stroke` | `strokeWidth` | `rx` | `ry` | `caption` | `align` | `noWrap` | `style`
 * @see {@link PdfSvgRectProps}
 */
export interface PdfSvgRectProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * @default 48
   */
  width?: number;
  /**
   * @default 48
   */
  height?: number;
  fill?: string;
  stroke?: string;
  /**
   * @default 0
   */
  strokeWidth?: number;
  /** Horizontal corner radius. */
  rx?: number;
  /** Vertical corner radius. */
  ry?: number;
  caption?: string;
  align?: PdfSvgAlign;
  noWrap?: boolean;
}

/**
 * Preset horizontal line rendered inside a themed `<PdfSvg>` container.
 * Props - `length` | `stroke` | `strokeWidth` | `caption` | `align` | `noWrap` | `style`
 * @see {@link PdfSvgLineProps}
 */
export interface PdfSvgLineProps extends Omit<PDFComponentProps, 'children'> {
  /**
   * Length of the line in points.
   * @default 100
   */
  length?: number;
  /** Stroke color — theme color key or raw CSS color. */
  stroke?: string;
  /**
   * @default 1
   */
  strokeWidth?: number;
  caption?: string;
  align?: PdfSvgAlign;
  noWrap?: boolean;
}
