import { describe, expect, it } from 'vitest';
import { KeepTogether } from './keep-together';

describe('KeepTogether', () => {
  it('renders without throwing', () => {
    expect(() => KeepTogether({ children: 'Content' })).not.toThrow();
  });
  it('accepts style prop', () => {
    expect(() => KeepTogether({ children: 'Content', style: { marginTop: 8 } })).not.toThrow();
  });
});
