import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  const variants = [
    'default',
    'primary',
    'success',
    'warning',
    'destructive',
    'info',
    'outline',
  ] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  it('renders with label', () => {
    expect(() => Badge({ label: 'New' })).not.toThrow();
  });

  it('renders with string children when label is absent', () => {
    expect(() => Badge({ children: 'Draft' })).not.toThrow();
  });

  it('label takes precedence over children (both branches are safe)', () => {
    // badge.tsx:131 — `label ?? children ?? ''`
    expect(() => Badge({ label: 'A', children: 'B' })).not.toThrow();
  });

  it('renders with neither label nor children (empty text fallback)', () => {
    expect(() => Badge({})).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => Badge({ label: 'x', variant })).not.toThrow();
    }
  });

  it('renders all sizes', () => {
    for (const size of sizes) {
      expect(() => Badge({ label: 'x', size })).not.toThrow();
    }
  });

  it('accepts background and color overrides (tokens and raw hex)', () => {
    expect(() => Badge({ label: 'x', background: '#ff0', color: '#000' })).not.toThrow();
    expect(() => Badge({ label: 'x', background: 'primary', color: 'foreground' })).not.toThrow();
  });

  it('accepts a style override', () => {
    expect(() => Badge({ label: 'x', style: { marginLeft: 4 } })).not.toThrow();
    expect(() => Badge({ label: 'x', style: { marginLeft: 4, opacity: 0.8 } })).not.toThrow();
  });
});
