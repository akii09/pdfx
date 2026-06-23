import { describe, expect, it } from 'vitest';
import { PdfWatermark } from './watermark';

describe('PdfWatermark', () => {
  const positions = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

  it('renders with only the required text', () => {
    expect(() => PdfWatermark({ text: 'DRAFT' })).not.toThrow();
  });

  it('renders all positions', () => {
    for (const position of positions) {
      expect(() => PdfWatermark({ text: 'CONFIDENTIAL', position })).not.toThrow();
    }
  });

  it('accepts opacity across the full 0..1 range', () => {
    expect(() => PdfWatermark({ text: 'DRAFT', opacity: 0 })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', opacity: 0.15 })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', opacity: 1 })).not.toThrow();
  });

  it('accepts arbitrary rotation angles', () => {
    for (const angle of [0, -45, 45, 90, 180, 270]) {
      expect(() => PdfWatermark({ text: 'DRAFT', angle })).not.toThrow();
    }
  });

  it('accepts custom fontSize and color (tokens and hex)', () => {
    expect(() => PdfWatermark({ text: 'DRAFT', fontSize: 12 })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', fontSize: 120 })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', color: 'primary' })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', color: '#ff0000' })).not.toThrow();
  });

  it('honors fixed toggle and style override', () => {
    expect(() => PdfWatermark({ text: 'DRAFT', fixed: true })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', fixed: false })).not.toThrow();
    expect(() => PdfWatermark({ text: 'DRAFT', style: { top: 20, left: 20 } })).not.toThrow();
  });
});
