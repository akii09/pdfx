import { describe, expect, it } from 'vitest';
import { PdfPageNumber } from './page-number';

describe('PdfPageNumber', () => {
  it('renders without throwing', () => {
    expect(() => PdfPageNumber({})).not.toThrow();
  });
  it('accepts align prop', () => {
    expect(() => PdfPageNumber({ align: 'right' })).not.toThrow();
  });
});
