import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  it('renders without throwing', () => {
    expect(() => Text({ children: 'Hello world' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Text({ children: 'Small text', variant: 'sm' })).not.toThrow();
  });
});
