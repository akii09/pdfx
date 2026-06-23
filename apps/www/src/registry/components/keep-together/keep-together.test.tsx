import { describe, expect, it } from 'vitest';
import { KeepTogether } from './keep-together';

describe('KeepTogether', () => {
  it('renders with string children', () => {
    expect(() => KeepTogether({ children: 'Content' })).not.toThrow();
  });

  it('renders with null/undefined children (no-op wrapper)', () => {
    expect(() => KeepTogether({ children: null })).not.toThrow();
    expect(() => KeepTogether({})).not.toThrow();
  });

  it('accepts minPresenceAhead', () => {
    expect(() => KeepTogether({ children: 'x', minPresenceAhead: 0 })).not.toThrow();
    expect(() => KeepTogether({ children: 'x', minPresenceAhead: 80 })).not.toThrow();
    expect(() => KeepTogether({ children: 'x', minPresenceAhead: 9999 })).not.toThrow();
  });

  it('accepts a style override and combines it with minPresenceAhead', () => {
    expect(() =>
      KeepTogether({ children: 'x', style: { marginTop: 8, padding: 4 } })
    ).not.toThrow();
    expect(() =>
      KeepTogether({
        children: 'x',
        minPresenceAhead: 40,
        style: { backgroundColor: '#eee' },
      })
    ).not.toThrow();
  });

  it('returns a React element', () => {
    const result = KeepTogether({ children: 'x' });
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});
