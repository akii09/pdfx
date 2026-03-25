import { describe, expect, it } from 'vitest';
import { Section } from './section';

describe('Section', () => {
  it('renders without throwing', () => {
    expect(() => Section({ children: 'Content' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Section({ children: 'Content', variant: 'callout' })).not.toThrow();
  });
});
