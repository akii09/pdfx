import { describe, expect, it } from 'vitest';
import { KeyValue } from './key-value';

describe('KeyValue', () => {
  it('renders without throwing', () => {
    expect(() => KeyValue({ items: [] })).not.toThrow();
  });
  it('accepts direction prop', () => {
    expect(() =>
      KeyValue({ items: [{ key: 'Name', value: 'Alice' }], direction: 'vertical' })
    ).not.toThrow();
  });
  it('renders horizontal items without throwing', () => {
    expect(() =>
      KeyValue({
        items: [
          { key: 'שם', value: 'אליס' },
          { key: 'גיל', value: '30' },
        ],
        direction: 'horizontal',
      })
    ).not.toThrow();
  });
});
