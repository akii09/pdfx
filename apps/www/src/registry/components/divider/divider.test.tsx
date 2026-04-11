import { describe, expect, it } from 'vitest';
import { Divider } from './divider';

describe('Divider', () => {
  const variants = ['solid', 'dashed', 'dotted'] as const;
  const thicknesses = ['thin', 'medium', 'thick'] as const;
  const spacings = ['none', 'sm', 'md', 'lg'] as const;

  it('renders with no props', () => {
    expect(() => Divider({})).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => Divider({ variant })).not.toThrow();
    }
  });

  it('renders all thicknesses', () => {
    for (const thickness of thicknesses) {
      expect(() => Divider({ thickness })).not.toThrow();
    }
  });

  it('renders all spacing presets', () => {
    for (const spacing of spacings) {
      expect(() => Divider({ spacing })).not.toThrow();
    }
  });

  it('renders the labeled branch', () => {
    expect(() => Divider({ label: 'OR' })).not.toThrow();
    // Labeled divider still honors variant/thickness/spacing.
    for (const variant of variants) {
      expect(() =>
        Divider({ label: 'Section', variant, thickness: 'medium', spacing: 'lg' })
      ).not.toThrow();
    }
  });

  it('accepts width (number and string), color token, and style override', () => {
    expect(() => Divider({ width: 200 })).not.toThrow();
    expect(() => Divider({ width: '50%' })).not.toThrow();
    expect(() => Divider({ color: 'primary' })).not.toThrow();
    expect(() => Divider({ color: '#cccccc' })).not.toThrow();
    expect(() => Divider({ label: 'OR', color: 'primary', width: '75%' })).not.toThrow();
    expect(() => Divider({ style: { marginTop: 8 } })).not.toThrow();
  });
});
