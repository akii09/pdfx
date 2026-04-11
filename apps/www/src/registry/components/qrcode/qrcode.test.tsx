import { describe, expect, it } from 'vitest';
import { PdfQRCode } from './qrcode';

describe('PdfQRCode', () => {
  const errorLevels = ['L', 'M', 'Q', 'H'] as const;

  it('renders with only the required value', () => {
    expect(() => PdfQRCode({ value: 'https://pdfx.dev' })).not.toThrow();
  });

  it('renders all error correction levels', () => {
    for (const errorLevel of errorLevels) {
      expect(() => PdfQRCode({ value: 'x', errorLevel })).not.toThrow();
    }
  });

  it('renders at multiple sizes', () => {
    for (const size of [32, 64, 100, 256]) {
      expect(() => PdfQRCode({ value: 'x', size })).not.toThrow();
    }
  });

  it('handles short and long payloads', () => {
    expect(() => PdfQRCode({ value: 'x' })).not.toThrow();
    expect(() => PdfQRCode({ value: 'a'.repeat(500) })).not.toThrow();
    expect(() => PdfQRCode({ value: 'https://example.com/path?q=hello+world&n=42' })).not.toThrow();
  });

  it('accepts zero margin (margin-only mode)', () => {
    // qrcode.tsx:42-63 — zero margin should still produce a valid matrix.
    expect(() => PdfQRCode({ value: 'x', margin: 0 })).not.toThrow();
    expect(() => PdfQRCode({ value: 'x', margin: 4 })).not.toThrow();
  });

  it('accepts color (tokens and hex) and transparent background', () => {
    // qrcode.tsx:84 — 'transparent' backgroundColor is a special case that
    // skips the background rect.
    expect(() => PdfQRCode({ value: 'x', color: 'primary' })).not.toThrow();
    expect(() =>
      PdfQRCode({ value: 'x', color: '#ff00ff', backgroundColor: '#00ff00' })
    ).not.toThrow();
    expect(() => PdfQRCode({ value: 'x', backgroundColor: 'transparent' })).not.toThrow();
  });

  it('accepts caption and style override', () => {
    expect(() =>
      PdfQRCode({
        value: 'x',
        caption: 'Scan to verify',
        style: { marginTop: 8, padding: 4 },
      })
    ).not.toThrow();
  });
});
