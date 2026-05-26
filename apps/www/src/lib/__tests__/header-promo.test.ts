import { describe, expect, it } from 'vitest';
import { isSafeHref, parsePromoPayload } from '../../components/header-promo.utils';

const validMinimal = {
  label: 'Hello',
  href: 'https://example.com',
};

describe('parsePromoPayload — happy path', () => {
  it('accepts a minimal {label, href} payload and returns only those fields', () => {
    const result = parsePromoPayload(validMinimal);
    expect(result).toEqual({ label: 'Hello', href: 'https://example.com' });
  });

  it('passes through optional badge / variant / tooltip when valid', () => {
    const result = parsePromoPayload({
      ...validMinimal,
      badge: 'NEW',
      variant: 'shimmer',
      tooltip: 'A helpful tooltip',
    });
    expect(result).toEqual({
      label: 'Hello',
      href: 'https://example.com',
      badge: 'NEW',
      variant: 'shimmer',
      tooltip: 'A helpful tooltip',
    });
  });

  it('drops unknown extra fields silently (defence-in-depth against prop injection)', () => {
    const result = parsePromoPayload({
      ...validMinimal,
      // biome-ignore lint/suspicious/noExplicitAny: simulating untrusted runtime input
      dangerouslySetInnerHTML: { __html: '<script>' } as any,
      onClick: 'alert(1)',
    });
    expect(result).toEqual({ label: 'Hello', href: 'https://example.com' });
    expect(result).not.toHaveProperty('dangerouslySetInnerHTML');
    expect(result).not.toHaveProperty('onClick');
  });
});

describe('parsePromoPayload — rejected inputs return null', () => {
  it('rejects non-object inputs', () => {
    expect(parsePromoPayload(null)).toBeNull();
    expect(parsePromoPayload(undefined)).toBeNull();
    expect(parsePromoPayload('string')).toBeNull();
    expect(parsePromoPayload(42)).toBeNull();
    expect(parsePromoPayload(['a', 'b'])).toBeNull();
  });

  it('rejects missing required fields', () => {
    expect(parsePromoPayload({ href: 'https://example.com' })).toBeNull();
    expect(parsePromoPayload({ label: 'Hello' })).toBeNull();
    expect(parsePromoPayload({})).toBeNull();
  });

  it('rejects empty-string label or href', () => {
    expect(parsePromoPayload({ label: '', href: 'https://example.com' })).toBeNull();
    expect(parsePromoPayload({ label: 'Hello', href: '' })).toBeNull();
  });

  it('rejects label longer than 24 chars (prevents header layout breakage)', () => {
    expect(parsePromoPayload({ label: 'x'.repeat(25), href: 'https://example.com' })).toBeNull();
    expect(
      parsePromoPayload({ label: 'x'.repeat(24), href: 'https://example.com' })
    ).not.toBeNull();
  });

  it('rejects badge longer than 8 chars', () => {
    expect(parsePromoPayload({ ...validMinimal, badge: 'x'.repeat(9) })).toBeNull();
  });

  it('rejects unknown variant values', () => {
    expect(parsePromoPayload({ ...validMinimal, variant: 'rainbow' })).toBeNull();
    expect(parsePromoPayload({ ...validMinimal, variant: 'pulse' })).toBeNull();
  });

  it('rejects non-string field types', () => {
    expect(parsePromoPayload({ label: 42, href: 'https://example.com' })).toBeNull();
    expect(parsePromoPayload({ label: 'Hello', href: 42 })).toBeNull();
    expect(parsePromoPayload({ ...validMinimal, badge: true })).toBeNull();
  });
});

describe('isSafeHref — protocol allow-list', () => {
  it('allows https URLs with a non-empty hostname', () => {
    expect(isSafeHref('https://example.com')).toBe(true);
    expect(isSafeHref('https://example.com/path?q=1#frag')).toBe(true);
    expect(isSafeHref('https://sub.example.co.uk/x')).toBe(true);
  });

  it('rejects http (must be https)', () => {
    expect(isSafeHref('http://example.com')).toBe(false);
  });

  it('rejects XSS-prone schemes', () => {
    expect(isSafeHref('javascript:alert(1)')).toBe(false);
    expect(isSafeHref('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isSafeHref('vbscript:msgbox')).toBe(false);
    expect(isSafeHref('file:///etc/passwd')).toBe(false);
  });

  it('rejects relative URLs (no scheme)', () => {
    expect(isSafeHref('/some/path')).toBe(false);
    expect(isSafeHref('//cdn.example.com/x')).toBe(false);
    expect(isSafeHref('example.com')).toBe(false);
  });

  it('rejects malformed URLs', () => {
    expect(isSafeHref('')).toBe(false);
    expect(isSafeHref('not a url')).toBe(false);
    expect(isSafeHref('https://')).toBe(false);
  });
});

describe('parsePromoPayload — href safety (integration)', () => {
  it('rejects payloads whose href fails isSafeHref', () => {
    expect(parsePromoPayload({ label: 'Hello', href: 'javascript:alert(1)' })).toBeNull();
    expect(parsePromoPayload({ label: 'Hello', href: 'http://example.com' })).toBeNull();
    expect(parsePromoPayload({ label: 'Hello', href: '/relative' })).toBeNull();
  });
});
