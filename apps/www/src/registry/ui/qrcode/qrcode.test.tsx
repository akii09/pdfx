import { describe, expect, it } from 'vitest';
import { PdfQRCode } from './qrcode';

describe('PdfQRCode', () => {
  it('renders without throwing', () => {
    expect(() => PdfQRCode({ value: 'https://pdfx.dev' })).not.toThrow();
  });
  it('accepts size prop', () => {
    expect(() => PdfQRCode({ value: 'https://pdfx.dev', size: 80 })).not.toThrow();
  });
});
