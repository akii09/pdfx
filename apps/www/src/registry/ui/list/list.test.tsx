import { describe, expect, it } from 'vitest';
import { PdfList } from './list';

describe('PdfList', () => {
  it('renders without throwing', () => {
    expect(() => PdfList({ items: [] })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() =>
      PdfList({ items: [{ text: 'First' }, { text: 'Second' }], variant: 'numbered' })
    ).not.toThrow();
  });
});
