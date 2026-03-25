import { describe, expect, it } from 'vitest';
import { PdfImage } from './pdf-image';

describe('PdfImage', () => {
  it('renders without throwing', () => {
    expect(() => PdfImage({ src: '/test.png' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PdfImage({ src: '/test.png', variant: 'rounded' })).not.toThrow();
  });
});
