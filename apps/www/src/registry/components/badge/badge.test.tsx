import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders without throwing', () => {
    expect(() => Badge({ label: 'Test' })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Badge({ label: 'Test', variant: 'primary' })).not.toThrow();
  });
});
