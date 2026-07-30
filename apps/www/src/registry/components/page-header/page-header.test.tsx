import { describe, expect, it } from 'vitest';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
  const variants = [
    'simple',
    'centered',
    'minimal',
    'branded',
    'logo-left',
    'logo-right',
    'two-column',
  ] as const;

  it('renders with only required title', () => {
    expect(() => PageHeader({ title: 'My Report' })).not.toThrow();
  });

  it('renders all variants with base props', () => {
    for (const variant of variants) {
      expect(() => PageHeader({ title: 'Title', subtitle: 'Subtitle', variant })).not.toThrow();
    }
  });

  it('simple/minimal/logo-left render right-side text blocks', () => {
    for (const variant of ['simple', 'minimal', 'logo-left'] as const) {
      expect(() =>
        PageHeader({
          title: 'T',
          variant,
          rightText: 'Q4 2025',
          rightSubText: 'v2.1',
        })
      ).not.toThrow();
    }
  });

  it('two-column renders with contact info', () => {
    // page-header.tsx:340 — two-column variant uses address/phone/email.
    expect(() =>
      PageHeader({
        title: 'T',
        variant: 'two-column',
        address: '123 Main St',
        phone: '555-1212',
        email: 'team@example.com',
      })
    ).not.toThrow();
  });

  it('logo-left and logo-right accept a logo ReactNode', () => {
    const logo = null; // ReactNode accepts null without throwing
    expect(() => PageHeader({ title: 'T', variant: 'logo-left', logo })).not.toThrow();
    expect(() => PageHeader({ title: 'T', variant: 'logo-right', logo })).not.toThrow();
  });

  it('accepts background, titleColor, marginBottom, fixed, noWrap, and style', () => {
    expect(() =>
      PageHeader({
        title: 'T',
        background: 'muted',
        titleColor: 'primary',
        marginBottom: 32,
        fixed: true,
        noWrap: false,
        style: { paddingTop: 8 },
      })
    ).not.toThrow();
    expect(() =>
      PageHeader({ title: 'T', background: '#eeeeee', titleColor: '#000000' })
    ).not.toThrow();
  });
});
