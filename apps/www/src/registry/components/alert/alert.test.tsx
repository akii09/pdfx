import { describe, expect, it } from 'vitest';
import { PdfAlert } from './alert';

describe('PdfAlert', () => {
  const variants = ['info', 'success', 'warning', 'error'] as const;

  it('renders with title only', () => {
    expect(() => PdfAlert({ title: 'Heads up' })).not.toThrow();
  });

  it('renders with string children only', () => {
    expect(() => PdfAlert({ children: 'Body text' })).not.toThrow();
  });

  it('returns null when both title and children are missing', () => {
    // alert.tsx:193 — early return null when there's nothing to render.
    expect(PdfAlert({})).toBeNull();
  });

  it('renders all variants with title and children', () => {
    for (const variant of variants) {
      expect(() => PdfAlert({ variant, title: 'T', children: 'Body' })).not.toThrow();
    }
  });

  it('respects showIcon and showBorder toggles', () => {
    expect(() => PdfAlert({ title: 'T', showIcon: false, showBorder: false })).not.toThrow();
    expect(() => PdfAlert({ title: 'T', showIcon: true, showBorder: true })).not.toThrow();
    expect(() => PdfAlert({ title: 'T', showIcon: false, showBorder: true })).not.toThrow();
    expect(() => PdfAlert({ title: 'T', showIcon: true, showBorder: false })).not.toThrow();
  });

  it('accepts non-string children and style overrides', () => {
    expect(() => PdfAlert({ title: 'T', children: null, style: { marginTop: 8 } })).not.toThrow();
    expect(() => PdfAlert({ title: 'T', style: { marginTop: 8, padding: 4 } })).not.toThrow();
  });
});
