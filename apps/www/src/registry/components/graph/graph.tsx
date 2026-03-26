/* eslint-disable react-refresh/only-export-components */

import type { PdfxTheme } from '@pdfx/shared';
import { Circle, G, Line, Path, Rect, Svg, Text as SvgText } from '@react-pdf/renderer';
import { Text as PDFText, StyleSheet, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';

export const A4_WIDTH = 595;

/**
 * Options for calculating graph width based on theme page margins and container context.
 * Props - `containerPadding` | `wrapperPadding` | `pageWidth`
 * @see {@link GraphWidthOptions}
 */
export interface GraphWidthOptions {
  containerPadding?: number;
  wrapperPadding?: number;
  pageWidth?: number;
}

/**
 * Calculate the safe graph width based on theme page margins and container context.
 *
 * This utility ensures graphs don't overflow their container by accounting for:
 * - Page margins (from theme)
 * - Container padding (e.g., Section component)
 * - Wrapper padding (e.g., a bordered graphShell View)
 *
 * @example
 * ```tsx
 * const width = getGraphWidth(theme);
 * // For a graph inside a Section with padding="md" (12pt) and a graphShell (12pt):
 * const width = getGraphWidth(theme, { containerPadding: 12, wrapperPadding: 12 });
 * ```
 */
export function getGraphWidth(theme: PdfxTheme, options: GraphWidthOptions = {}): number {
  const { containerPadding = 0, wrapperPadding = 0, pageWidth = A4_WIDTH } = options;
  const { marginLeft, marginRight } = theme.spacing.page;
  // pageWidth - page margins - container padding (both sides) - wrapper padding (both sides)
  const availableWidth =
    pageWidth - marginLeft - marginRight - containerPadding * 2 - wrapperPadding * 2;
  // Return floored value to avoid sub-pixel overflow, with minimum width guard
  return Math.max(Math.floor(availableWidth), 100);
}

/**
 * Pre-calculated safe graph widths for common scenarios.
 * These values work with all built-in themes on A4 pages.
 */
export const GRAPH_SAFE_WIDTHS = {
  /** Safe width for graph directly in page content (no extra containers) */
  default: 420,
  /** Safe width for graph inside a Section with md padding */
  inSection: 400,
  /** Safe width for graph inside a Section + bordered wrapper (like graphShell) */
  inSectionWithWrapper: 380,
} as const;

const CHART_MARGINS = {
  axisLeft: 40,
  pieLeft: 10,
  right: 10,
  top: 10,
  axisBottom: 24,
  pieBottom: 10,
} as const;

export type GraphVariant = 'bar' | 'horizontal-bar' | 'line' | 'area' | 'pie' | 'donut';

export type GraphLegendPosition = 'bottom' | 'right' | 'none';

/**
 * A single data point with a label, numeric value, and optional color override.
 * Props - `label` | `value` | `color`
 * @see {@link GraphDataPoint}
 */
export interface GraphDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * A named data series containing multiple data points, used for multi-series charts.
 * Props - `name` | `data` | `color`
 * @see {@link GraphSeries}
 */
export interface GraphSeries {
  name: string;
  data: GraphDataPoint[];
  color?: string;
}

/**
 * Multi-variant PDF chart (bar, line, area, pie, donut) rendered with SVG primitives.
 * Props - `variant` | `data` | `title` | `subtitle` | `xLabel` | `yLabel` | `width` | `height` | `fullWidth` | `containerPadding` | `wrapperPadding` | `colors` | `showValues` | `showGrid` | `legend` | `centerLabel` | `showDots` | `smooth` | `yTicks` | `noWrap` | `style`
 * @see {@link GraphProps}
 */
export interface GraphProps {
  /**
   * @default 'bar'
   */
  variant?: GraphVariant;
  data: GraphDataPoint[] | GraphSeries[];
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  /**
   * @default 420
   */
  width?: number;
  /**
   * @default 260
   */
  height?: number;
  /**
   * @default false
   */
  fullWidth?: boolean;
  containerPadding?: number;
  wrapperPadding?: number;
  colors?: string[];
  /**
   * @default false
   */
  showValues?: boolean;
  /**
   * @default true
   */
  showGrid?: boolean;
  /**
   * @default 'bottom'
   */
  legend?: GraphLegendPosition;
  centerLabel?: string;
  /**
   * @default true
   */
  showDots?: boolean;
  /**
   * @default false
   */
  smooth?: boolean;
  /**
   * @default 5
   */
  yTicks?: number;
  /**
   * @default true
   */
  noWrap?: boolean;
  style?: Style;
}

interface ChartLayout {
  svgW: number;
  svgH: number;
  chartX: number; // left edge of chart area
  chartY: number; // top edge of chart area
  chartW: number; // usable chart width
  chartH: number; // usable chart height
  yMin: number;
  yMax: number;
  yTicks: number[];
  xLabels: string[];
}

function createGraphStyles(t: PdfxTheme) {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: t.spacing.componentGap,
    },
    title: {
      fontFamily: t.typography.heading.fontFamily,
      fontSize: t.primitives.typography.base,
      fontWeight: t.primitives.fontWeights.semibold,
      color: t.colors.foreground,
      marginBottom: 2,
    },
    subtitle: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
      marginBottom: 6,
    },
    legendRow: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 6,
    },
    legendColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginLeft: 12,
      marginTop: 18,
      minWidth: 120,
    },
    legendItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    legendText: {
      fontFamily: t.typography.body.fontFamily,
      fontSize: t.primitives.typography.xs,
      color: t.colors.mutedForeground,
    },
    chartWithRightLegend: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });
}

/** Normalize to always work with GraphSeries[]. */
function normalizeData(data: GraphDataPoint[] | GraphSeries[]): GraphSeries[] {
  if (data.length === 0) return [];
  if ('label' in data[0] && 'value' in data[0]) {
    return [{ name: 'Series 1', data: data as GraphDataPoint[] }];
  }
  return data as GraphSeries[];
}

/** Compute nice Y-axis ticks for a given value range. */
function computeYTicks(min: number, max: number, count: number): number[] {
  if (min === max) return [0, max || 1];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    const v = min + i * step;
    return Math.round(v * 100) / 100;
  });
}

/** Format a number for display on axis labels. */
function fmtNum(v: number): string {
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  if (!Number.isInteger(v)) return v.toFixed(1);
  return String(v);
}

/** Truncate a label to at most maxLen characters. */
function truncate(s: string, maxLen: number): string {
  return s.length > maxLen ? `${s.slice(0, maxLen - 1)}…` : s;
}

/** Polar to Cartesian coordinate conversion for pie/donut arcs. */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Build an SVG arc path for a pie/donut slice. */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  innerR = 0
): string {
  // Clamp to prevent degenerate arcs (full 360°)
  const safeEnd = Math.min(endAngle, startAngle + 359.999);
  const large = safeEnd - startAngle > 180 ? 1 : 0;
  const s = polarToCartesian(cx, cy, r, safeEnd);
  const e = polarToCartesian(cx, cy, r, startAngle);
  if (innerR === 0) {
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
  }
  const si = polarToCartesian(cx, cy, innerR, safeEnd);
  const ei = polarToCartesian(cx, cy, innerR, startAngle);
  return [
    `M ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${innerR} ${innerR} 0 ${large} 1 ${si.x} ${si.y}`,
    'Z',
  ].join(' ');
}

/** Compute smooth bezier control points (Catmull-Rom → cubic bezier). */
function smoothPath(points: { x: number; y: number }[], tension = 0.4): string {
  if (points.length < 2) return '';
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }
  const parts: string[] = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    parts.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return parts.join(' ');
}

function getDefaultPalette(t: PdfxTheme): string[] {
  return [
    t.colors.primary,
    t.colors.info ?? '#3B82F6',
    t.colors.success ?? '#22C55E',
    t.colors.warning ?? '#F59E0B',
    t.colors.destructive ?? '#EF4444',
    '#8B5CF6',
    '#F97316',
    '#14B8A6',
  ];
}

/** Derive ChartLayout from series data, SVG dimensions, and variant. */
function buildLayout(
  series: GraphSeries[],
  width: number,
  height: number,
  isPieOrDonut: boolean,
  yTickCount: number
): ChartLayout {
  const mL = isPieOrDonut ? CHART_MARGINS.pieLeft : CHART_MARGINS.axisLeft;
  const mB = isPieOrDonut ? CHART_MARGINS.pieBottom : CHART_MARGINS.axisBottom;
  const chartX = mL;
  const chartY = CHART_MARGINS.top;
  const chartW = width - mL - CHART_MARGINS.right;
  const chartH = height - CHART_MARGINS.top - mB;
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const rawMin = Math.min(...allValues, 0);
  const rawMax = Math.max(...allValues, 1);
  const yMin = rawMin >= 0 ? 0 : rawMin;
  const yMax = rawMax + (rawMax - yMin) * 0.08; // 8% headroom
  return {
    svgW: width,
    svgH: height,
    chartX,
    chartY,
    chartW,
    chartH,
    yMin,
    yMax,
    yTicks: computeYTicks(yMin, yMax, yTickCount),
    xLabels: series[0]?.data.map((d) => d.label) ?? [],
  };
}

/**
 * Shared Y-axis grid lines and tick labels for cartesian charts (bar, line, area).
 * Extracted to avoid duplicating the identical block across render functions.
 */
function renderGridAndYAxis(
  ticks: number[],
  toY: (v: number) => number,
  chartX: number,
  chartW: number,
  showGrid: boolean,
  gridColor: string,
  textColor: string
) {
  return (
    <>
      {ticks.map((tick) => {
        const ty = toY(tick);
        return (
          <G key={`grid-${tick}`}>
            {showGrid && (
              <Line
                x1={chartX}
                y1={ty}
                x2={chartX + chartW}
                y2={ty}
                stroke={gridColor}
                strokeWidth={0.5}
                strokeDasharray="3 3"
              />
            )}
            <SvgText
              x={chartX - 4}
              y={ty + 3}
              fill={textColor}
              textAnchor="end"
              style={{ fontSize: 7 }}
            >
              {fmtNum(tick)}
            </SvgText>
          </G>
        );
      })}
    </>
  );
}

function renderBarChart(
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showGrid: boolean,
  showValues: boolean,
  theme: PdfxTheme
) {
  const { chartX, chartY, chartW, chartH, yMin, yMax, yTicks, xLabels } = layout;
  const nCategories = xLabels.length;
  const nSeries = series.length;
  const groupGap = 0.25;
  const groupW = chartW / nCategories;
  const barW = (groupW * (1 - groupGap)) / nSeries;
  const textColor = theme.colors.mutedForeground;
  const gridColor = theme.colors.border;
  const axisColor = theme.colors.foreground;
  const range = yMax - yMin || 1;
  const toY = (v: number) => chartY + chartH - ((v - yMin) / range) * chartH;

  return (
    <>
      {renderGridAndYAxis(yTicks, toY, chartX, chartW, showGrid, gridColor, textColor)}

      <Line
        x1={chartX}
        y1={chartY + chartH}
        x2={chartX + chartW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />

      {xLabels.map((label, ci) => {
        const groupLeft = chartX + ci * groupW + groupW * (groupGap / 2);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <G key={`group-${ci}`}>
            {series.map((s, si) => {
              const val = s.data[ci]?.value ?? 0;
              const color = s.data[ci]?.color ?? s.color ?? palette[si % palette.length];
              const barH = ((val - yMin) / range) * chartH;
              const bx = groupLeft + si * barW;
              const by = chartY + chartH - barH;
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                <G key={`bar-${ci}-${si}`}>
                  <Rect x={bx} y={by} width={barW - 1} height={barH} fill={color} />
                  {showValues && barH > 10 && (
                    <SvgText
                      x={bx + barW / 2 - 0.5}
                      y={by - 2}
                      fill={axisColor}
                      textAnchor="middle"
                      style={{ fontSize: 6 }}
                    >
                      {fmtNum(val)}
                    </SvgText>
                  )}
                </G>
              );
            })}
            <SvgText
              x={groupLeft + (nSeries * barW) / 2}
              y={chartY + chartH + 10}
              fill={textColor}
              textAnchor="middle"
              style={{ fontSize: 7 }}
            >
              {truncate(label, 10)}
            </SvgText>
          </G>
        );
      })}
    </>
  );
}

function renderHorizontalBarChart(
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showValues: boolean,
  theme: PdfxTheme
) {
  const { chartX, chartY, chartW, chartH, xLabels } = layout;
  const nCategories = xLabels.length;
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const maxVal = Math.max(...allValues, 1);
  const rowH = chartH / nCategories;
  const barH = rowH * 0.5;
  const textColor = theme.colors.mutedForeground;
  const axisColor = theme.colors.foreground;
  const labelW = 60;

  return (
    <>
      {xLabels.map((label, ci) => {
        const rowY = chartY + ci * rowH;
        const val = series[0]?.data[ci]?.value ?? 0;
        const color =
          series[0]?.data[ci]?.color ?? series[0]?.color ?? palette[ci % palette.length];
        const barW = (val / maxVal) * (chartW - labelW);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <G key={`hbar-${ci}`}>
            <SvgText
              x={chartX + labelW - 4}
              y={rowY + rowH / 2 + 3}
              fill={textColor}
              textAnchor="end"
              style={{ fontSize: 7 }}
            >
              {truncate(label, 14)}
            </SvgText>
            <Rect
              x={chartX + labelW}
              y={rowY + (rowH - barH) / 2}
              width={Math.max(barW, 1)}
              height={barH}
              fill={color}
            />
            {showValues && (
              <SvgText
                x={chartX + labelW + barW + 3}
                y={rowY + rowH / 2 + 3}
                fill={axisColor}
                textAnchor="start"
                style={{ fontSize: 6 }}
              >
                {fmtNum(val)}
              </SvgText>
            )}
          </G>
        );
      })}
      <Line
        x1={chartX + labelW}
        y1={chartY}
        x2={chartX + labelW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />
    </>
  );
}

function renderLineAreaChart(
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  showGrid: boolean,
  showValues: boolean,
  showDots: boolean,
  smooth: boolean,
  isArea: boolean,
  theme: PdfxTheme
) {
  const { chartX, chartY, chartW, chartH, yMin, yMax, yTicks, xLabels } = layout;
  const range = yMax - yMin || 1;
  const textColor = theme.colors.mutedForeground;
  const gridColor = theme.colors.border;
  const axisColor = theme.colors.foreground;
  const nPoints = xLabels.length;

  const xFor = (i: number) => chartX + (i / Math.max(nPoints - 1, 1)) * chartW;
  const yFor = (v: number) => chartY + chartH - ((v - yMin) / range) * chartH;

  return (
    <>
      {renderGridAndYAxis(yTicks, yFor, chartX, chartW, showGrid, gridColor, textColor)}

      <Line
        x1={chartX}
        y1={chartY + chartH}
        x2={chartX + chartW}
        y2={chartY + chartH}
        stroke={axisColor}
        strokeWidth={1}
      />

      {series.map((s, si) => {
        const color = s.color ?? palette[si % palette.length];
        const points = s.data.map((d, i) => ({ x: xFor(i), y: yFor(d.value) }));

        const lineDStr = smooth
          ? smoothPath(points)
          : `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`;

        const areaPath =
          isArea && points.length > 1
            ? `${lineDStr} L ${points[points.length - 1].x} ${chartY + chartH} L ${points[0].x} ${chartY + chartH} Z`
            : null;

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <G key={`series-${si}`}>
            {isArea && areaPath && (
              <Path d={areaPath} fill={color} fillOpacity={0.2} stroke="none" />
            )}
            <Path d={lineDStr} stroke={color} strokeWidth={2} fill="none" />
            {showDots &&
              points.map((p, pi) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                <Circle key={`dot-${pi}`} cx={p.x} cy={p.y} r={3} fill={color} />
              ))}
            {showValues &&
              points.map((p, pi) => (
                <SvgText
                  // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
                  key={`val-${pi}`}
                  x={p.x}
                  y={p.y - 5}
                  fill={color}
                  textAnchor="middle"
                  style={{ fontSize: 6 }}
                >
                  {fmtNum(s.data[pi].value)}
                </SvgText>
              ))}
          </G>
        );
      })}

      {xLabels.map((label, i) => (
        <SvgText
          key={`xlabel-${label}`}
          x={xFor(i)}
          y={chartY + chartH + 10}
          fill={textColor}
          textAnchor="middle"
          style={{ fontSize: 7 }}
        >
          {truncate(label, 8)}
        </SvgText>
      ))}
    </>
  );
}

function renderPieDonutChart(
  series: GraphSeries[],
  layout: ChartLayout,
  palette: string[],
  centerLabel: string | undefined,
  isDonut: boolean,
  theme: PdfxTheme
) {
  const { svgW, svgH } = layout;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const r = Math.min(svgW, svgH) / 2 - 20;
  const innerR = isDonut ? r * 0.52 : 0;
  const textColor = theme.colors.mutedForeground;

  const data = series[0]?.data ?? [];
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let currentAngle = 0;

  return (
    <>
      {data.map((d, i) => {
        const color = d.color ?? palette[i % palette.length];
        const sweep = (d.value / total) * 360;
        const midAngle = currentAngle + sweep / 2;
        const path = arcPath(cx, cy, r, currentAngle, currentAngle + sweep, innerR);
        currentAngle += sweep;

        const labelR = r * 1.18;
        const lp = polarToCartesian(cx, cy, labelR, midAngle);
        const anchor = lp.x > cx ? 'start' : 'end';

        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static PDF chart data — index is the stable identity
          <G key={`slice-${i}`}>
            <Path d={path} fill={color} stroke="white" strokeWidth={1} />
            {/* Show label only if slice is large enough to label */}
            {sweep > 15 && (
              <SvgText
                x={lp.x}
                y={lp.y + 3}
                fill={textColor}
                textAnchor={anchor}
                style={{ fontSize: 7 }}
              >
                {truncate(d.label, 10)}
              </SvgText>
            )}
          </G>
        );
      })}

      {isDonut && centerLabel && (
        <>
          <Circle cx={cx} cy={cy} r={innerR} fill="white" />
          <SvgText
            x={cx}
            y={cy + 4}
            fill={theme.colors.foreground}
            textAnchor="middle"
            style={{ fontSize: 9, fontWeight: 'bold' }}
          >
            {centerLabel}
          </SvgText>
        </>
      )}
    </>
  );
}

function Legend({
  series,
  palette,
  styles,
  position = 'bottom',
}: {
  series: GraphSeries[];
  palette: string[];
  styles: ReturnType<typeof createGraphStyles>;
  position?: 'bottom' | 'right';
}) {
  const containerStyle = position === 'right' ? styles.legendColumn : styles.legendRow;

  return (
    <View style={containerStyle}>
      {series.map((s, i) => (
        <View key={s.name} style={styles.legendItem}>
          <Svg width={10} height={10}>
            <Rect x={0} y={2} width={8} height={8} fill={s.color ?? palette[i % palette.length]} />
          </Svg>
          <PDFText style={styles.legendText}>{s.name}</PDFText>
        </View>
      ))}
    </View>
  );
}

/**
 * PdfGraph — renders bar, horizontal-bar, line, area, pie, and donut charts
 * natively inside react-pdf documents using SVG primitives.
 *
 * No external chart libraries are required or used — all rendering is done via
 * react-pdf's built-in SVG support (`<Svg>`, `<Rect>`, `<Path>`, `<Line>`, etc.).
 *
 * @example Bar chart
 * ```tsx
 * <PdfGraph
 *   variant="bar"
 *   title="Monthly Revenue"
 *   data={[
 *     { label: 'Jan', value: 42000 },
 *     { label: 'Feb', value: 38000 },
 *     { label: 'Mar', value: 55000 },
 *   ]}
 * />
 * ```
 *
 * @example Donut chart with center label
 * ```tsx
 * <PdfGraph
 *   variant="donut"
 *   data={[
 *     { label: 'Product A', value: 45 },
 *     { label: 'Product B', value: 30 },
 *     { label: 'Other', value: 25 },
 *   ]}
 *   centerLabel="$1.2M"
 * />
 * ```
 *
 * **Limitations (by design):**
 * - No interactivity (PDFs are static)
 * - No animations
 * - SVG Text inside charts uses SVG font attributes (not react-pdf StyleSheet fonts)
 * - For print PDFs use SVG-friendly fonts registered with Font.register()
 */
export function PdfGraph({
  variant = 'bar',
  data,
  title,
  subtitle,
  xLabel,
  yLabel,
  width: explicitWidth,
  height = 260,
  fullWidth = false,
  containerPadding = 0,
  wrapperPadding = 0,
  colors,
  showValues = false,
  showGrid = true,
  legend = 'bottom',
  centerLabel,
  showDots = true,
  smooth = false,
  yTicks: yTickCount = 5,
  noWrap = true,
  style,
}: GraphProps) {
  const theme = usePdfxTheme();
  const styles = useSafeMemo(() => createGraphStyles(theme), [theme]);
  const palette = colors ?? getDefaultPalette(theme);
  const series = normalizeData(data);

  const width = useSafeMemo(() => {
    if (fullWidth) return getGraphWidth(theme, { containerPadding, wrapperPadding });
    return explicitWidth ?? GRAPH_SAFE_WIDTHS.default;
  }, [fullWidth, explicitWidth, theme, containerPadding, wrapperPadding]);

  const isPieOrDonut = variant === 'pie' || variant === 'donut';
  const layout = buildLayout(series, width, height, isPieOrDonut, yTickCount);
  const { chartX, chartW } = layout;

  let chartContent: React.ReactNode = null;

  switch (variant) {
    case 'bar':
      chartContent = renderBarChart(series, layout, palette, showGrid, showValues, theme);
      break;
    case 'horizontal-bar':
      chartContent = renderHorizontalBarChart(series, layout, palette, showValues, theme);
      break;
    case 'line':
    case 'area':
      chartContent = renderLineAreaChart(
        series,
        layout,
        palette,
        showGrid,
        showValues,
        showDots,
        smooth,
        variant === 'area',
        theme
      );
      break;
    case 'pie':
      chartContent = renderPieDonutChart(series, layout, palette, undefined, false, theme);
      break;
    case 'donut':
      chartContent = renderPieDonutChart(series, layout, palette, centerLabel, true, theme);
      break;
  }

  const showLegend = legend !== 'none' && !isPieOrDonut;

  const containerStyles: Style[] = [styles.container];
  if (style) containerStyles.push(style);

  const content = (
    <View style={containerStyles}>
      {title && <PDFText style={styles.title}>{title}</PDFText>}
      {subtitle && <PDFText style={styles.subtitle}>{subtitle}</PDFText>}
      <View style={legend === 'right' ? styles.chartWithRightLegend : undefined}>
        <Svg width={width} height={height}>
          {chartContent}
          {!isPieOrDonut && xLabel && (
            <SvgText
              x={chartX + chartW / 2}
              y={height - 2}
              fill={theme.colors.mutedForeground}
              textAnchor="middle"
              style={{ fontSize: 8 }}
            >
              {xLabel}
            </SvgText>
          )}
          {!isPieOrDonut && yLabel && (
            <SvgText
              x={2}
              y={10}
              fill={theme.colors.mutedForeground}
              textAnchor="start"
              style={{ fontSize: 8 }}
            >
              {yLabel}
            </SvgText>
          )}
        </Svg>
        {showLegend && legend === 'right' && Legend({ series, palette, styles, position: 'right' })}
      </View>
      {showLegend && legend === 'bottom' && Legend({ series, palette, styles, position: 'bottom' })}
    </View>
  );

  return noWrap ? <View wrap={false}>{content}</View> : content;
}
