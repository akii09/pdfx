import { describe, expect, it } from 'vitest';
import { PdfPageNumber } from './page-number';

describe('PdfPageNumber', () => {
  const aligns = ['left', 'center', 'right'] as const;
  const sizes = ['xs', 'sm', 'md'] as const;

  it('renders with no props', () => {
    expect(() => PdfPageNumber({})).not.toThrow();
  });

  it('renders all alignments', () => {
    for (const align of aligns) {
      expect(() => PdfPageNumber({ align })).not.toThrow();
    }
  });

  it('renders all sizes', () => {
    for (const size of sizes) {
      expect(() => PdfPageNumber({ size })).not.toThrow();
    }
  });

  it('accepts custom format strings', () => {
    // page-number.tsx:55 — formatPageNumber replaces {page} and {total} in the template.
    expect(() => PdfPageNumber({ format: '{page} / {total}' })).not.toThrow();
    expect(() => PdfPageNumber({ format: 'Page {page}' })).not.toThrow();
    expect(() => PdfPageNumber({ format: 'Sheet {page} of {total}' })).not.toThrow();
    // No tokens — render function still runs and returns the literal string.
    expect(() => PdfPageNumber({ format: 'Footer' })).not.toThrow();
  });

  it('honors fixed, muted, and style overrides', () => {
    expect(() => PdfPageNumber({ fixed: true })).not.toThrow();
    expect(() => PdfPageNumber({ muted: false })).not.toThrow();
    expect(() => PdfPageNumber({ muted: true })).not.toThrow();
    expect(() => PdfPageNumber({ style: { marginTop: 8 } })).not.toThrow();
    expect(() =>
      PdfPageNumber({
        align: 'right',
        size: 'md',
        format: 'Page {page} of {total}',
        fixed: true,
        muted: false,
        style: { paddingRight: 12 },
      })
    ).not.toThrow();
  });
});
