import { describe, expect, it } from 'vitest';
import { PdfWatermark } from './watermark';

describe('PdfWatermark', () => {
  it('renders without throwing', () => {
    expect(() => PdfWatermark({ text: 'DRAFT' })).not.toThrow();
  });
  it('accepts opacity prop', () => {
    expect(() => PdfWatermark({ text: 'CONFIDENTIAL', opacity: 0.3 })).not.toThrow();
  });
});
