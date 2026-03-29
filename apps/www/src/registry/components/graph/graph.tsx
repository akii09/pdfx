import type { PdfxTheme } from '@pdfx/shared';
import { Circle, G, Line, Path, Rect, Svg, Text as SvgText } from '@react-pdf/renderer';
import { Text as PDFText, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type React from 'react';
import { usePdfxTheme, useSafeMemo } from '../../lib/pdfx-theme-context';
import { createGraphStyles } from './graph.styles';
import type { ChartLayout, GraphProps, GraphSeries } from './graph.types';
import {
  GRAPH_SAFE_WIDTHS,
  arcPath,
  buildLayout,
  fmtNum,
  getDefaultPalette,
  getGraphWidth,
  normalizeData,
  polarToCartesian,
  smoothPath,
  truncate,
} from './graph.utils';

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
