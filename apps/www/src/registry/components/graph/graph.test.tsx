import { describe, expect, it } from 'vitest';
import { PdfGraph } from './graph';
import type { GraphDataPoint, GraphSeries } from './graph.types';

describe('PdfGraph', () => {
  const variants = ['bar', 'horizontal-bar', 'line', 'area', 'pie', 'donut'] as const;
  const legends = ['bottom', 'right', 'none'] as const;

  const points: GraphDataPoint[] = [
    { label: 'Q1', value: 120 },
    { label: 'Q2', value: 180 },
    { label: 'Q3', value: 90 },
    { label: 'Q4', value: 210 },
  ];

  const series: GraphSeries[] = [
    { name: '2024', data: points },
    { name: '2025', data: points.map((p) => ({ ...p, value: p.value * 1.1 })) },
  ];

  it('renders with empty data array', () => {
    expect(() => PdfGraph({ data: [] })).not.toThrow();
  });

  it('renders every variant with single-series point data', () => {
    for (const variant of variants) {
      expect(() => PdfGraph({ variant, data: points })).not.toThrow();
    }
  });

  it('renders bar/line/area variants with multi-series data', () => {
    // Multi-series is only meaningful for bar/line/area — pie/donut flatten the first series.
    for (const variant of ['bar', 'horizontal-bar', 'line', 'area'] as const) {
      expect(() => PdfGraph({ variant, data: series })).not.toThrow();
    }
  });

  it('renders all legend positions', () => {
    for (const legend of legends) {
      expect(() => PdfGraph({ data: points, legend })).not.toThrow();
    }
  });

  it('accepts title, subtitle, axis labels, and custom colors', () => {
    expect(() =>
      PdfGraph({
        variant: 'bar',
        data: points,
        title: 'Revenue',
        subtitle: 'Fiscal 2025',
        xLabel: 'Quarter',
        yLabel: 'USD',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        showValues: true,
        showGrid: true,
        yTicks: 8,
      })
    ).not.toThrow();
  });

  it('accepts donut centerLabel, smooth line, and no-dots line', () => {
    expect(() => PdfGraph({ variant: 'donut', data: points, centerLabel: 'Total' })).not.toThrow();
    expect(() =>
      PdfGraph({ variant: 'line', data: points, smooth: true, showDots: false })
    ).not.toThrow();
  });

  it('accepts full-width sizing, noWrap, and style override', () => {
    expect(() =>
      PdfGraph({
        data: points,
        fullWidth: true,
        containerPadding: 24,
        wrapperPadding: 12,
        width: 600,
        height: 320,
        noWrap: false,
        style: { marginTop: 16 },
      })
    ).not.toThrow();
  });
});
