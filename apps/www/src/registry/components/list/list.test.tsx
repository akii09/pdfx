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
  it('renders bullet variant with long wrapping text without throwing', () => {
    const longText =
      'This is a very long bullet item that is designed to wrap across multiple lines in the rendered PDF document to ensure row heights are measured correctly and no vertical overlap occurs between consecutive bullet items.';
    expect(() =>
      PdfList({
        items: [{ text: longText }, { text: longText }, { text: longText }],
        variant: 'bullet',
      })
    ).not.toThrow();
  });
  it('renders bullet variant with nested children without throwing', () => {
    expect(() =>
      PdfList({
        items: [
          {
            text: 'Parent item with children',
            children: [{ text: 'Child item one' }, { text: 'Child item two' }],
          },
        ],
        variant: 'bullet',
      })
    ).not.toThrow();
  });
});
