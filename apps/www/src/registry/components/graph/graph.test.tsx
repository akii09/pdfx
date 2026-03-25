import { describe, expect, it } from 'vitest';
import { PdfGraph } from './graph';

describe('PdfGraph', () => {
  it('renders without throwing', () => {
    expect(() => PdfGraph({ data: [] })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PdfGraph({ data: [], variant: 'bar' })).not.toThrow();
  });
});
