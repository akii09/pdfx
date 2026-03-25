import { describe, expect, it } from 'vitest';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
  it('renders without throwing', () => {
    expect(() => PageHeader({ title: 'My Report' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => PageHeader({ title: 'My Report', variant: 'centered' })).not.toThrow();
  });
});
