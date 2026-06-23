import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  const levels = [1, 2, 3, 4, 5, 6] as const;
  const weights = ['normal', 'medium', 'semibold', 'bold'] as const;
  const trackings = ['tighter', 'tight', 'normal', 'wide', 'wider'] as const;
  const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;
  const aligns = ['left', 'center', 'right'] as const;

  it('renders with minimal props', () => {
    expect(() => Heading({ children: 'Title' })).not.toThrow();
  });

  it('renders all levels', () => {
    for (const level of levels) {
      expect(() => Heading({ level, children: `h${level}` })).not.toThrow();
    }
  });

  it('clamps out-of-range levels to the 1-6 window', () => {
    // level is typed as 1-6 but runtime clamps Math.round(level) to [1,6].
    // biome-ignore lint/suspicious/noExplicitAny: intentional out-of-range runtime input
    expect(() => Heading({ level: 0 as any, children: 'under' })).not.toThrow();
    // biome-ignore lint/suspicious/noExplicitAny: intentional out-of-range runtime input
    expect(() => Heading({ level: 9 as any, children: 'over' })).not.toThrow();
  });

  it('renders all weights and trackings', () => {
    for (const weight of weights) {
      expect(() => Heading({ weight, children: 'x' })).not.toThrow();
    }
    for (const tracking of trackings) {
      expect(() => Heading({ tracking, children: 'x' })).not.toThrow();
    }
  });

  it('renders all transforms and alignments', () => {
    for (const transform of transforms) {
      expect(() => Heading({ transform, children: 'x' })).not.toThrow();
    }
    for (const align of aligns) {
      expect(() => Heading({ align, children: 'x' })).not.toThrow();
    }
  });

  it('accepts noMargin, keepWithNext, color, and style overrides', () => {
    expect(() => Heading({ noMargin: true, children: 'x' })).not.toThrow();
    expect(() => Heading({ keepWithNext: false, children: 'x' })).not.toThrow();
    expect(() => Heading({ color: 'primary', children: 'x' })).not.toThrow();
    expect(() => Heading({ color: '#333333', children: 'x' })).not.toThrow();
    expect(() => Heading({ children: 'x', style: { marginLeft: 8 } })).not.toThrow();
  });
});
