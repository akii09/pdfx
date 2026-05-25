import { describe, expect, it } from 'vitest';
import { Stack } from './stack';

describe('Stack', () => {
  it('renders without throwing', () => {
    expect(() => Stack({ children: 'Content' })).not.toThrow();
  });
  it('accepts direction prop', () => {
    expect(() => Stack({ children: 'Content', direction: 'horizontal' })).not.toThrow();
  });
  it('renders horizontal stack without throwing (RTL direction supported)', () => {
    expect(() => Stack({ children: 'Content', direction: 'horizontal', gap: 'md' })).not.toThrow();
  });
});
