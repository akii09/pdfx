import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  it('renders without throwing', () => {
    expect(() => Heading({ level: 1, children: 'Title' })).not.toThrow();
  });
  it('accepts level prop', () => {
    expect(() => Heading({ level: 3, children: 'Subtitle' })).not.toThrow();
  });
});
