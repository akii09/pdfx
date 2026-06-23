import { describe, expect, it } from 'vitest';
import { Stack } from './stack';

describe('Stack', () => {
  const gaps = ['none', 'sm', 'md', 'lg', 'xl'] as const;
  const directions = ['vertical', 'horizontal'] as const;
  const aligns = ['start', 'center', 'end', 'stretch'] as const;
  const justifies = ['start', 'center', 'end', 'between', 'around'] as const;

  it('renders with minimal props', () => {
    expect(() => Stack({ children: 'Content' })).not.toThrow();
  });

  it('renders with empty children', () => {
    expect(() => Stack({ children: null })).not.toThrow();
    expect(() => Stack({ children: [] })).not.toThrow();
  });

  it('renders all gap sizes', () => {
    for (const gap of gaps) {
      expect(() => Stack({ gap, children: 'x' })).not.toThrow();
    }
  });

  it('renders both directions', () => {
    for (const direction of directions) {
      expect(() => Stack({ direction, children: 'x' })).not.toThrow();
    }
  });

  it('renders all alignments and justifications', () => {
    for (const align of aligns) {
      expect(() => Stack({ align, children: 'x' })).not.toThrow();
    }
    for (const justify of justifies) {
      expect(() => Stack({ justify, children: 'x' })).not.toThrow();
    }
  });

  it('accepts wrap, noWrap, and style override', () => {
    expect(() => Stack({ wrap: true, children: 'x' })).not.toThrow();
    expect(() => Stack({ noWrap: true, children: 'x' })).not.toThrow();
    expect(() =>
      Stack({ children: 'x', style: { padding: 8, backgroundColor: '#eee' } })
    ).not.toThrow();
  });
});
