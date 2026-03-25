import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('Link', () => {
  it('renders without throwing', () => {
    expect(() => Link({ href: 'https://example.com', children: 'Click here' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() =>
      Link({ href: 'https://example.com', children: 'Click', variant: 'primary' })
    ).not.toThrow();
  });
});
