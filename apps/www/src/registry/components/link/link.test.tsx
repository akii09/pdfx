import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('Link', () => {
  const variants = ['default', 'muted', 'primary'] as const;
  const underlines = ['always', 'none'] as const;
  const aligns = ['left', 'center', 'right'] as const;

  it('renders with required href', () => {
    expect(() => Link({ href: 'https://example.com', children: 'Click here' })).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => Link({ href: 'https://example.com', variant, children: 'x' })).not.toThrow();
    }
  });

  it('renders all underline modes', () => {
    for (const underline of underlines) {
      expect(() => Link({ href: 'https://example.com', underline, children: 'x' })).not.toThrow();
    }
  });

  it('renders all alignments', () => {
    for (const align of aligns) {
      expect(() => Link({ href: 'https://example.com', align, children: 'x' })).not.toThrow();
    }
  });

  it('supports mailto, tel, and relative hrefs', () => {
    expect(() => Link({ href: 'mailto:a@b.com', children: 'email' })).not.toThrow();
    expect(() => Link({ href: 'tel:+15551234567', children: 'call' })).not.toThrow();
    expect(() => Link({ href: '#section-1', children: 'anchor' })).not.toThrow();
  });

  it('accepts color tokens, raw colors, and style overrides', () => {
    expect(() =>
      Link({ href: 'https://example.com', color: 'primary', children: 'x' })
    ).not.toThrow();
    expect(() =>
      Link({ href: 'https://example.com', color: '#0000ff', children: 'x' })
    ).not.toThrow();
    expect(() =>
      Link({ href: 'https://example.com', children: 'x', style: { marginLeft: 4 } })
    ).not.toThrow();
  });
});
