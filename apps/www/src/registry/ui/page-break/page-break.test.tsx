import { describe, expect, it } from 'vitest';
import { PageBreak } from './page-break';

describe('PageBreak', () => {
  it('renders without throwing', () => {
    expect(() => PageBreak({})).not.toThrow();
  });
  it('accepts style prop', () => {
    expect(() => PageBreak({ style: { marginBottom: 0 } })).not.toThrow();
  });
});
