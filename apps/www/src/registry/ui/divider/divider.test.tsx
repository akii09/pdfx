import { describe, expect, it } from 'vitest';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders without throwing', () => {
    expect(() => Divider({})).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Divider({ variant: 'dashed' })).not.toThrow();
  });
});
