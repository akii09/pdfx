import { describe, expect, it } from 'vitest';
import { PdfAlert } from './alert';

describe('PdfAlert', () => {
  it('renders without error', () => {
    const result = PdfAlert({ title: 'Test Alert' });
    expect(result).toBeDefined();
    expect(result?.type).toBeDefined();
  });

  it('returns null when no title or children provided', () => {
    const result = PdfAlert({});
    expect(result).toBeNull();
  });

  it('renders with title only', () => {
    const result = PdfAlert({ title: 'Important Notice' });
    expect(result).toBeDefined();
  });

  it('renders with children only', () => {
    const result = PdfAlert({ children: 'This is the content' });
    expect(result).toBeDefined();
  });

  it('renders with title and children', () => {
    const result = PdfAlert({ title: 'Notice', children: 'Content here' });
    expect(result).toBeDefined();
  });

  it('accepts variant prop', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;
    for (const variant of variants) {
      const result = PdfAlert({ title: 'Test', variant });
      expect(result).toBeDefined();
    }
  });

  it('defaults to info variant', () => {
    const result = PdfAlert({ title: 'Test' });
    expect(result).toBeDefined();
  });

  it('accepts showIcon prop', () => {
    const withIcon = PdfAlert({ title: 'Test', showIcon: true });
    const withoutIcon = PdfAlert({ title: 'Test', showIcon: false });
    expect(withIcon).toBeDefined();
    expect(withoutIcon).toBeDefined();
  });

  it('accepts showBorder prop', () => {
    const withBorder = PdfAlert({ title: 'Test', showBorder: true });
    const withoutBorder = PdfAlert({ title: 'Test', showBorder: false });
    expect(withBorder).toBeDefined();
    expect(withoutBorder).toBeDefined();
  });

  it('accepts custom style prop', () => {
    const customStyle = { marginTop: 20 };
    const result = PdfAlert({ title: 'Test', style: customStyle });
    expect(result).toBeDefined();
  });

  it('renders info variant correctly', () => {
    const result = PdfAlert({ variant: 'info', title: 'Info', children: 'Info content' });
    expect(result).toBeDefined();
  });

  it('renders success variant correctly', () => {
    const result = PdfAlert({ variant: 'success', title: 'Success', children: 'Success content' });
    expect(result).toBeDefined();
  });

  it('renders warning variant correctly', () => {
    const result = PdfAlert({ variant: 'warning', title: 'Warning', children: 'Warning content' });
    expect(result).toBeDefined();
  });

  it('renders error variant correctly', () => {
    const result = PdfAlert({ variant: 'error', title: 'Error', children: 'Error content' });
    expect(result).toBeDefined();
  });
});
