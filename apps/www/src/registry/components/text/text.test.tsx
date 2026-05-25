import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  it('renders without throwing', () => {
    expect(() => Text({ children: 'Hello world' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Text({ children: 'Small text', variant: 'sm' })).not.toThrow();
  });
  it('renders with explicit align in RTL without throwing', () => {
    expect(() => Text({ children: 'שלום', align: 'right' })).not.toThrow();
  });
  it('accepts all alignment values without throwing', () => {
    for (const align of ['left', 'center', 'right', 'justify'] as const) {
      expect(() => Text({ children: 'text', align })).not.toThrow();
    }
  });
});
