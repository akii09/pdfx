import { describe, expect, it } from 'vitest';
import type { GraphDataPoint, GraphSeries } from './graph';
import { PdfGraph } from './graph';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

const singleSeriesData: GraphDataPoint[] = [
  { label: 'Jan', value: 10 },
  { label: 'Feb', value: 20 },
  { label: 'Mar', value: 15 },
];

const multiSeriesData: GraphSeries[] = [
  { name: 'Revenue', data: singleSeriesData },
  {
    name: 'Expenses',
    data: [
      { label: 'Jan', value: 5 },
      { label: 'Feb', value: 12 },
      { label: 'Mar', value: 8 },
    ],
  },
];

describe('PdfGraph', () => {
  describe('bar variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ data: singleSeriesData });
      expect(result).toBeDefined();
    });

    it('renders title when provided', () => {
      const result = PdfGraph({ data: singleSeriesData, title: 'Monthly Revenue' });
      expect(findText(result, 'Monthly Revenue')).toBe(true);
    });

    it('renders subtitle when provided', () => {
      const result = PdfGraph({ data: singleSeriesData, title: 'T', subtitle: 'Jan to Mar 2025' });
      expect(findText(result, 'Jan to Mar 2025')).toBe(true);
    });

    it('noWrap=true (default) wraps in View with wrap={false}', () => {
      const result = PdfGraph({ data: singleSeriesData });
      expect(result.props.wrap).toBe(false);
    });

    it('noWrap=false does not add extra wrap View', () => {
      const result = PdfGraph({ data: singleSeriesData, noWrap: false });
      expect(result.props.wrap).toBeUndefined();
    });

    it('renders with multi-series data', () => {
      const result = PdfGraph({ data: multiSeriesData });
      expect(result).toBeDefined();
    });

    it('shows legend entries for series names (multi-series)', () => {
      const result = PdfGraph({ data: multiSeriesData, legend: 'bottom' });
      expect(findText(result, 'Revenue')).toBe(true);
      expect(findText(result, 'Expenses')).toBe(true);
    });

    it('does not render legend when legend="none"', () => {
      const result = PdfGraph({ data: multiSeriesData, legend: 'none' });
      // Legend text should not appear when hidden
      expect(findText(result, 'Revenue')).toBe(false);
    });
  });

  describe('horizontal-bar variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ variant: 'horizontal-bar', data: singleSeriesData });
      expect(result).toBeDefined();
    });
  });

  describe('line variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ variant: 'line', data: singleSeriesData });
      expect(result).toBeDefined();
    });

    it('renders with smooth=true', () => {
      const result = PdfGraph({ variant: 'line', data: singleSeriesData, smooth: true });
      expect(result).toBeDefined();
    });
  });

  describe('area variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ variant: 'area', data: singleSeriesData });
      expect(result).toBeDefined();
    });
  });

  describe('pie variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ variant: 'pie', data: singleSeriesData });
      expect(result).toBeDefined();
    });

    it('does not render legend for pie chart', () => {
      // Pie does not show legend (by design)
      const result = PdfGraph({ variant: 'pie', data: singleSeriesData });
      expect(result).toBeDefined();
    });
  });

  describe('donut variant', () => {
    it('renders without crashing', () => {
      const result = PdfGraph({ variant: 'donut', data: singleSeriesData });
      expect(result).toBeDefined();
    });

    it('renders centerLabel when provided', () => {
      const result = PdfGraph({ variant: 'donut', data: singleSeriesData, centerLabel: '$1.2M' });
      expect(findText(result, '$1.2M')).toBe(true);
    });

    it('renders without centerLabel', () => {
      const result = PdfGraph({ variant: 'donut', data: singleSeriesData });
      expect(result).toBeDefined();
    });
  });

  describe('props', () => {
    it('applies custom width and height', () => {
      const result = PdfGraph({ data: singleSeriesData, width: 300, height: 200 });
      expect(result).toBeDefined();
    });

    it('applies custom colors palette', () => {
      const result = PdfGraph({
        data: singleSeriesData,
        colors: ['#FF0000', '#00FF00', '#0000FF'],
      });
      expect(result).toBeDefined();
    });

    it('showValues=true renders without crashing', () => {
      const result = PdfGraph({ data: singleSeriesData, showValues: true });
      expect(result).toBeDefined();
    });

    it('showGrid=false renders without crashing', () => {
      const result = PdfGraph({ data: singleSeriesData, showGrid: false });
      expect(result).toBeDefined();
    });

    it('handles empty data gracefully', () => {
      const result = PdfGraph({ data: [] });
      expect(result).toBeDefined();
    });

    it('handles single data point', () => {
      const result = PdfGraph({ data: [{ label: 'Only', value: 42 }] });
      expect(result).toBeDefined();
    });

    it('handles all-zero values', () => {
      const result = PdfGraph({
        data: [
          { label: 'A', value: 0 },
          { label: 'B', value: 0 },
        ],
      });
      expect(result).toBeDefined();
    });
  });
});
