import { describe, expect, it } from 'vitest';
import { PageBreak } from './page-break';

describe('PageBreak', () => {
  it('renders with no props', () => {
    expect(() => PageBreak({})).not.toThrow();
  });

  it('renders with a style override (single object)', () => {
    expect(() => PageBreak({ style: { marginBottom: 0 } })).not.toThrow();
  });

  it('accepts combined margin and padding style overrides', () => {
    expect(() =>
      PageBreak({ style: { marginBottom: 0, marginTop: 8, paddingBottom: 4 } })
    ).not.toThrow();
  });

  it('returns a React element, not null', () => {
    // PageBreak is a forced-break marker and must always render the wrapping View.
    const result = PageBreak({});
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});
