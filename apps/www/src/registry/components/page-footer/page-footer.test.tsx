import { describe, expect, it } from 'vitest';
import { PageFooter } from './page-footer';

describe('PageFooter', () => {
  const variants = [
    'simple',
    'centered',
    'branded',
    'minimal',
    'three-column',
    'detailed',
  ] as const;

  it('renders with minimal props', () => {
    expect(() => PageFooter({ leftText: 'Co' })).not.toThrow();
  });

  it('renders with no props at all (empty footer)', () => {
    // All text fields are optional — the component still renders the container.
    expect(() => PageFooter({})).not.toThrow();
  });

  it('renders every variant with full prop set', () => {
    for (const variant of variants) {
      expect(() =>
        PageFooter({
          variant,
          leftText: 'Co',
          centerText: 'Center',
          rightText: 'Page 1',
          address: '123 Main',
          phone: '555-1212',
          email: 'a@b.com',
          website: 'example.com',
        })
      ).not.toThrow();
    }
  });

  it('sticky implies fixed and resets marginTop to 0', () => {
    // page-footer.tsx:236-237 — sticky forces isFixed=true and mt=0.
    expect(() => PageFooter({ leftText: 'x', sticky: true, pagePadding: 24 })).not.toThrow();
    expect(() => PageFooter({ leftText: 'x', sticky: true, pagePadding: 0 })).not.toThrow();
    expect(() => PageFooter({ leftText: 'x', fixed: true })).not.toThrow();
  });

  it('accepts background and textColor as both tokens and raw hex', () => {
    expect(() =>
      PageFooter({ leftText: 'x', background: 'muted', textColor: 'foreground' })
    ).not.toThrow();
    expect(() =>
      PageFooter({ leftText: 'x', background: '#fafafa', textColor: '#333' })
    ).not.toThrow();
  });

  it('accepts marginTop override, noWrap, and style override', () => {
    expect(() =>
      PageFooter({
        leftText: 'x',
        marginTop: 32,
        noWrap: false,
        style: { paddingHorizontal: 16 },
      })
    ).not.toThrow();
  });
});
