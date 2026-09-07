import { describe, expect, it } from 'vitest';
import { PdfGraph } from './graph';
import { resolveLegendAlign } from './graph.utils';

const seriesData = [
  { name: 'Revenue', data: [{ label: 'Q1', value: 42000 }] },
  { name: 'Expenses', data: [{ label: 'Q1', value: 28000 }] },
];

describe('PdfGraph', () => {
  it('renders without throwing', () => {
    expect(() => PdfGraph({ data: [] })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PdfGraph({ data: [], variant: 'bar' })).not.toThrow();
  });
  it('accepts legendAlign with a bottom legend', () => {
    expect(() =>
      PdfGraph({ data: seriesData, legend: 'bottom', legendAlign: 'center' })
    ).not.toThrow();
  });
  it('accepts legendAlign with a right legend', () => {
    expect(() =>
      PdfGraph({ data: seriesData, legend: 'right', legendAlign: 'right' })
    ).not.toThrow();
  });
});

describe('resolveLegendAlign', () => {
  it('maps left to flex-start (default)', () => {
    expect(resolveLegendAlign('left')).toBe('flex-start');
  });
  it('maps center and right to matching flex values', () => {
    expect(resolveLegendAlign('center')).toBe('center');
    expect(resolveLegendAlign('right')).toBe('flex-end');
  });
});
