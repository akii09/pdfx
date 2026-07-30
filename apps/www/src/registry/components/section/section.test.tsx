import { describe, expect, it } from 'vitest';
import { Section } from './section';

describe('Section', () => {
  const variants = ['default', 'callout', 'highlight', 'card'] as const;
  const spacings = ['none', 'sm', 'md', 'lg', 'xl'] as const;
  const paddings = ['none', 'sm', 'md', 'lg'] as const;

  it('renders with minimal props', () => {
    expect(() => Section({ children: 'Content' })).not.toThrow();
  });

  it('renders with null children', () => {
    // PDFComponentProps marks children as required, but null is a valid ReactNode.
    expect(() => Section({ children: null })).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => Section({ variant, children: 'x' })).not.toThrow();
    }
  });

  it('renders all spacing and padding presets', () => {
    for (const spacing of spacings) {
      expect(() => Section({ spacing, children: 'x' })).not.toThrow();
    }
    for (const padding of paddings) {
      expect(() => Section({ padding, children: 'x' })).not.toThrow();
    }
  });

  it('border prop is only applied on the default variant', () => {
    // section.tsx:120 — border is a no-op on callout/highlight/card variants.
    expect(() => Section({ border: true, children: 'x' })).not.toThrow();
    expect(() => Section({ border: true, variant: 'callout', children: 'x' })).not.toThrow();
  });

  it('accentColor applies only to callout and highlight variants', () => {
    // section.tsx:116 — accentColor is gated by variant.
    expect(() =>
      Section({ variant: 'callout', accentColor: 'primary', children: 'x' })
    ).not.toThrow();
    expect(() =>
      Section({ variant: 'highlight', accentColor: '#ff0000', children: 'x' })
    ).not.toThrow();
    // Ignored on other variants, must not throw.
    expect(() => Section({ variant: 'card', accentColor: 'primary', children: 'x' })).not.toThrow();
  });

  it('accepts background (token and hex), noWrap, and style override', () => {
    expect(() => Section({ background: 'muted', children: 'x' })).not.toThrow();
    expect(() => Section({ background: '#f5f5f5', children: 'x' })).not.toThrow();
    expect(() => Section({ noWrap: true, children: 'x' })).not.toThrow();
    expect(() => Section({ children: 'x', style: { marginLeft: 12 } })).not.toThrow();
  });
});
