import { describe, expect, it } from 'vitest';
import { PdfSvg, PdfSvgCircle, PdfSvgLine, PdfSvgRect } from './svg';

describe('PdfSvg', () => {
  it('renders without throwing', () => {
    expect(() => PdfSvg({ width: 100, height: 100 })).not.toThrow();
  });
  it('accepts viewBox and caption', () => {
    expect(() =>
      PdfSvg({ width: 200, height: 200, viewBox: '0 0 200 200', caption: 'Test SVG' })
    ).not.toThrow();
  });
  it('accepts align prop', () => {
    expect(() => PdfSvg({ width: 100, height: 100, align: 'center' })).not.toThrow();
  });
});

describe('PdfSvgCircle', () => {
  it('renders without throwing', () => {
    expect(() => PdfSvgCircle({})).not.toThrow();
  });
  it('accepts fill and stroke props', () => {
    expect(() =>
      PdfSvgCircle({ size: 60, fill: 'primary', stroke: 'border', strokeWidth: 2 })
    ).not.toThrow();
  });
});

describe('PdfSvgRect', () => {
  it('renders without throwing', () => {
    expect(() => PdfSvgRect({})).not.toThrow();
  });
  it('accepts rounded corners', () => {
    expect(() => PdfSvgRect({ width: 80, height: 40, fill: 'muted', rx: 4, ry: 4 })).not.toThrow();
  });
});

describe('PdfSvgLine', () => {
  it('renders without throwing', () => {
    expect(() => PdfSvgLine({})).not.toThrow();
  });
  it('accepts length and stroke props', () => {
    expect(() => PdfSvgLine({ length: 200, stroke: 'border', strokeWidth: 2 })).not.toThrow();
  });
});
