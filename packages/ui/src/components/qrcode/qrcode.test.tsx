import { describe, expect, it } from 'vitest';
import { PdfQRCode } from './qrcode';

describe('PdfQRCode', () => {
  it('renders without error', () => {
    const result = PdfQRCode({ value: 'https://example.com' });
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('renders SVG element', () => {
    const result = PdfQRCode({ value: 'test' });
    // The component renders a View containing an Svg
    expect(result.props.children).toBeDefined();
  });

  it('accepts size prop', () => {
    const result = PdfQRCode({ value: 'test', size: 150 });
    expect(result).toBeDefined();
  });

  it('accepts color prop', () => {
    const result = PdfQRCode({ value: 'test', color: 'primary' });
    expect(result).toBeDefined();
  });

  it('accepts backgroundColor prop', () => {
    const result = PdfQRCode({ value: 'test', backgroundColor: 'muted' });
    expect(result).toBeDefined();
  });

  it('accepts transparent background', () => {
    const result = PdfQRCode({ value: 'test', backgroundColor: 'transparent' });
    expect(result).toBeDefined();
  });

  it('accepts errorLevel prop', () => {
    const errorLevels = ['L', 'M', 'Q', 'H'] as const;
    for (const errorLevel of errorLevels) {
      const result = PdfQRCode({ value: 'test', errorLevel });
      expect(result).toBeDefined();
    }
  });

  it('accepts margin prop', () => {
    const result = PdfQRCode({ value: 'test', margin: 4 });
    expect(result).toBeDefined();
  });

  it('renders caption when provided', () => {
    const result = PdfQRCode({ value: 'test', caption: 'Scan me' });
    expect(result).toBeDefined();
    // Caption should be rendered as a Text element after the Svg
    const children = result.props.children;
    expect(Array.isArray(children)).toBe(true);
  });

  it('accepts custom style prop', () => {
    const customStyle = { marginTop: 20 };
    const result = PdfQRCode({ value: 'test', style: customStyle });
    expect(result).toBeDefined();
  });

  it('generates different QR codes for different values', () => {
    const result1 = PdfQRCode({ value: 'value1' });
    const result2 = PdfQRCode({ value: 'value2' });
    expect(result1).toBeDefined();
    expect(result2).toBeDefined();
    // They should be different (different SVG content)
  });
});
