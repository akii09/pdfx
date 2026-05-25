import { Circle, Text as PDFText, Rect, Svg, Line as SvgLine, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { resolveColor } from '../../lib/resolve-color.js';
import { createSvgStyles } from './svg.styles';
import type {
  PdfSvgAlign,
  PdfSvgCircleProps,
  PdfSvgLineProps,
  PdfSvgProps,
  PdfSvgRectProps,
} from './svg.types';

// ─── Alignment helper ───────────────────────────────────────────────────────

function getAlignStyle(
  align: PdfSvgAlign | undefined,
  styles: ReturnType<typeof createSvgStyles>
): Style | undefined {
  if (!align || align === 'left') return styles.alignLeft;
  if (align === 'center') return styles.alignCenter;
  return styles.alignRight;
}

// ─── PdfSvg ─────────────────────────────────────────────────────────────────

/**
 * Themed SVG container for embedding custom shapes and illustrations in PDFs.
 *
 * Wraps `@react-pdf/renderer`'s `<Svg>` with theme-aware alignment, captions,
 * and page-break control. Pass react-pdf SVG primitives as children.
 *
 * @example
 * ```tsx
 * import { Circle, Path } from '@react-pdf/renderer';
 *
 * <PdfSvg width={120} height={120} align="center" caption="Company logo">
 *   <Circle cx={60} cy={60} r={50} fill="#3b82f6" />
 *   <Path d="M40 60 L55 75 L80 45" stroke="#fff" strokeWidth={4} fill="none" />
 * </PdfSvg>
 * ```
 */
export function PdfSvg({
  width,
  height,
  viewBox,
  preserveAspectRatio,
  align,
  caption,
  noWrap = true,
  children,
  style,
}: PdfSvgProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createSvgStyles(theme), [theme]);

  const resolvedViewBox =
    viewBox ??
    `0 0 ${typeof width === 'number' ? width : 0} ${typeof height === 'number' ? height : 0}`;

  const containerStyles: Style[] = [styles.container];
  const alignStyle = getAlignStyle(align, styles);
  if (alignStyle) containerStyles.push(alignStyle);
  if (style) containerStyles.push(...[style].flat());

  const content = (
    <View style={containerStyles}>
      <Svg
        width={width}
        height={height}
        viewBox={resolvedViewBox}
        preserveAspectRatio={preserveAspectRatio}
      >
        {children}
      </Svg>
      {caption && <PDFText style={styles.caption}>{caption}</PDFText>}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}

// ─── PdfSvgCircle ───────────────────────────────────────────────────────────

/**
 * Preset circle shape with theme-aware colors.
 *
 * @example
 * ```tsx
 * <PdfSvgCircle size={60} fill="primary" stroke="border" strokeWidth={2} />
 * ```
 */
export function PdfSvgCircle({
  size = 48,
  fill,
  stroke,
  strokeWidth = 0,
  caption,
  align,
  noWrap = true,
  style,
}: PdfSvgCircleProps) {
  const theme = usePdfxTheme();
  const r = size / 2;
  const resolvedFill = fill ? resolveColor(fill, theme.colors) : 'none';
  const resolvedStroke = stroke ? resolveColor(stroke, theme.colors) : 'none';

  return (
    <PdfSvg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      align={align}
      caption={caption}
      noWrap={noWrap}
      style={style}
    >
      <Circle
        cx={r}
        cy={r}
        r={r - strokeWidth / 2}
        fill={resolvedFill}
        stroke={resolvedStroke}
        strokeWidth={strokeWidth}
      />
    </PdfSvg>
  );
}

// ─── PdfSvgRect ─────────────────────────────────────────────────────────────

/**
 * Preset rectangle shape with theme-aware colors and optional rounded corners.
 *
 * @example
 * ```tsx
 * <PdfSvgRect width={80} height={40} fill="muted" stroke="border" rx={4} />
 * ```
 */
export function PdfSvgRect({
  width = 48,
  height = 48,
  fill,
  stroke,
  strokeWidth = 0,
  rx,
  ry,
  caption,
  align,
  noWrap = true,
  style,
}: PdfSvgRectProps) {
  const theme = usePdfxTheme();
  const resolvedFill = fill ? resolveColor(fill, theme.colors) : 'none';
  const resolvedStroke = stroke ? resolveColor(stroke, theme.colors) : 'none';
  const offset = strokeWidth / 2;

  return (
    <PdfSvg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      align={align}
      caption={caption}
      noWrap={noWrap}
      style={style}
    >
      <Rect
        x={offset}
        y={offset}
        width={width - strokeWidth}
        height={height - strokeWidth}
        rx={rx}
        ry={ry}
        fill={resolvedFill}
        stroke={resolvedStroke}
        strokeWidth={strokeWidth}
      />
    </PdfSvg>
  );
}

// ─── PdfSvgLine ─────────────────────────────────────────────────────────────

/**
 * Preset horizontal line with theme-aware stroke color.
 *
 * @example
 * ```tsx
 * <PdfSvgLine length={200} stroke="border" strokeWidth={2} />
 * ```
 */
export function PdfSvgLine({
  length = 100,
  stroke,
  strokeWidth = 1,
  caption,
  align,
  noWrap = true,
  style,
}: PdfSvgLineProps) {
  const theme = usePdfxTheme();
  const resolvedStroke = stroke ? resolveColor(stroke, theme.colors) : theme.colors.foreground;
  const svgH = strokeWidth + 2;
  const midY = svgH / 2;

  return (
    <PdfSvg
      width={length}
      height={svgH}
      viewBox={`0 0 ${length} ${svgH}`}
      align={align}
      caption={caption}
      noWrap={noWrap}
      style={style}
    >
      <SvgLine
        x1={0}
        y1={midY}
        x2={length}
        y2={midY}
        stroke={resolvedStroke}
        strokeWidth={strokeWidth}
      />
    </PdfSvg>
  );
}
