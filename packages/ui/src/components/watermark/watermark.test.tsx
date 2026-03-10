import { describe, expect, it } from 'vitest';
import { PdfWatermark } from './watermark';

describe('PdfWatermark', () => {
  it('renders without error', () => {
    const result = PdfWatermark({ text: 'DRAFT' });
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('renders the text prop', () => {
    const result = PdfWatermark({ text: 'CONFIDENTIAL' });
    expect(result.props.children.props.children).toBe('CONFIDENTIAL');
  });

  it('applies fixed prop by default', () => {
    const result = PdfWatermark({ text: 'DRAFT' });
    expect(result.props.fixed).toBe(true);
  });

  it('accepts fixed=false', () => {
    const result = PdfWatermark({ text: 'DRAFT', fixed: false });
    expect(result.props.fixed).toBe(false);
  });

  it('accepts opacity prop', () => {
    const result = PdfWatermark({ text: 'DRAFT', opacity: 0.3 });
    expect(result).toBeDefined();
  });

  it('accepts fontSize prop', () => {
    const result = PdfWatermark({ text: 'DRAFT', fontSize: 80 });
    expect(result).toBeDefined();
  });

  it('accepts color prop', () => {
    const result = PdfWatermark({ text: 'DRAFT', color: 'destructive' });
    expect(result).toBeDefined();
  });

  it('accepts angle prop', () => {
    const resultNegative = PdfWatermark({ text: 'DRAFT', angle: -30 });
    const resultZero = PdfWatermark({ text: 'PAID', angle: 0 });
    const resultPositive = PdfWatermark({ text: 'COPY', angle: 45 });
    expect(resultNegative).toBeDefined();
    expect(resultZero).toBeDefined();
    expect(resultPositive).toBeDefined();
  });

  it('accepts position prop', () => {
    const positions = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
    for (const position of positions) {
      const result = PdfWatermark({ text: 'DRAFT', position });
      expect(result).toBeDefined();
    }
  });

  it('accepts custom style prop', () => {
    const customStyle = { marginTop: 20 };
    const result = PdfWatermark({ text: 'DRAFT', style: customStyle });
    expect(result).toBeDefined();
  });
});
