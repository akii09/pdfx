import { describe, expect, it } from 'vitest';
import { PdfCard } from './card';

describe('PdfCard', () => {
  const variants = ['default', 'bordered', 'muted'] as const;
  const paddings = ['sm', 'md', 'lg'] as const;

  it('renders with string children', () => {
    expect(() => PdfCard({ children: 'Body' })).not.toThrow();
  });

  it('renders with title and string children', () => {
    expect(() => PdfCard({ title: 'T', children: 'Body' })).not.toThrow();
  });

  it('renders with no content at all', () => {
    expect(() => PdfCard({})).not.toThrow();
  });

  it('renders with non-string children (null pass-through)', () => {
    // card.tsx:88 — non-string children are passed through without wrapping.
    expect(() => PdfCard({ children: null })).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => PdfCard({ variant, children: 'x' })).not.toThrow();
    }
  });

  it('renders all padding presets', () => {
    for (const padding of paddings) {
      expect(() => PdfCard({ padding, children: 'x' })).not.toThrow();
    }
  });

  it('honors wrap prop in both modes', () => {
    expect(() => PdfCard({ wrap: true, children: 'x' })).not.toThrow();
    expect(() => PdfCard({ wrap: false, children: 'x' })).not.toThrow();
  });

  it('accepts a style override and combines with variant', () => {
    expect(() => PdfCard({ children: 'x', style: { borderRadius: 12 } })).not.toThrow();
    expect(() =>
      PdfCard({
        title: 'T',
        variant: 'bordered',
        padding: 'lg',
        wrap: true,
        children: 'x',
        style: { marginTop: 8 },
      })
    ).not.toThrow();
  });
});
