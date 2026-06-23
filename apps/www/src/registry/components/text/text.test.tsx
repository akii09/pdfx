import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  const variants = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const;
  const weights = ['normal', 'medium', 'semibold', 'bold'] as const;
  const decorations = ['underline', 'line-through', 'none'] as const;
  const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;
  const aligns = ['left', 'center', 'right', 'justify'] as const;

  it('renders with minimal props', () => {
    expect(() => Text({ children: 'Hello world' })).not.toThrow();
  });

  it('renders with empty children', () => {
    expect(() => Text({ children: '' })).not.toThrow();
  });

  it('renders all variants', () => {
    for (const variant of variants) {
      expect(() => Text({ variant, children: 'x' })).not.toThrow();
    }
  });

  it('renders all weights', () => {
    for (const weight of weights) {
      expect(() => Text({ weight, children: 'x' })).not.toThrow();
    }
  });

  it('renders all decorations', () => {
    for (const decoration of decorations) {
      expect(() => Text({ decoration, children: 'x' })).not.toThrow();
    }
  });

  it('renders all transforms', () => {
    for (const transform of transforms) {
      expect(() => Text({ transform, children: 'x' })).not.toThrow();
    }
  });

  it('renders all alignments', () => {
    for (const align of aligns) {
      expect(() => Text({ align, children: 'x' })).not.toThrow();
    }
  });

  it('accepts italic, noMargin, and style overrides', () => {
    expect(() => Text({ italic: true, noMargin: true, children: 'x' })).not.toThrow();
    expect(() => Text({ children: 'x', style: { marginTop: 4 } })).not.toThrow();
    expect(() => Text({ children: 'x', style: { marginTop: 4, padding: 2 } })).not.toThrow();
  });

  it('resolves color token names and raw hex', () => {
    expect(() => Text({ color: 'primary', children: 'x' })).not.toThrow();
    expect(() => Text({ color: '#ff0000', children: 'x' })).not.toThrow();
  });
});
