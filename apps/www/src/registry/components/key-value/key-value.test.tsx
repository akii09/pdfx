import { describe, expect, it } from 'vitest';
import { KeyValue } from './key-value';

describe('KeyValue', () => {
  const sizes = ['sm', 'md', 'lg'] as const;
  const directions = ['horizontal', 'vertical'] as const;
  const sampleItems = [
    { key: 'Name', value: 'Ada Lovelace' },
    { key: 'Role', value: 'Engineer' },
    { key: 'Email', value: 'ada@example.com' },
  ];

  it('renders with empty items array', () => {
    expect(() => KeyValue({ items: [] })).not.toThrow();
  });

  it('renders with a single item', () => {
    expect(() => KeyValue({ items: [{ key: 'K', value: 'V' }] })).not.toThrow();
  });

  it('renders both directions', () => {
    for (const direction of directions) {
      expect(() => KeyValue({ items: sampleItems, direction })).not.toThrow();
    }
  });

  it('renders all sizes', () => {
    for (const size of sizes) {
      expect(() => KeyValue({ items: sampleItems, size })).not.toThrow();
    }
  });

  it('renders divided rows in both directions', () => {
    expect(() =>
      KeyValue({ items: sampleItems, divided: true, direction: 'horizontal' })
    ).not.toThrow();
    expect(() =>
      KeyValue({ items: sampleItems, divided: true, direction: 'vertical' })
    ).not.toThrow();
  });

  it('accepts labelFlex, labelColor, valueColor, boldValue, noWrap', () => {
    expect(() =>
      KeyValue({
        items: sampleItems,
        labelFlex: 2,
        labelColor: 'mutedForeground',
        valueColor: 'primary',
        boldValue: true,
        noWrap: true,
      })
    ).not.toThrow();
  });

  it('accepts custom divider styling and per-item overrides', () => {
    expect(() =>
      KeyValue({
        items: [
          { key: 'K', value: 'V', valueColor: '#ff0000' },
          { key: 'K2', value: 'V2', valueStyle: { fontSize: 14 }, keyStyle: { fontSize: 10 } },
        ],
        divided: true,
        dividerColor: 'border',
        dividerThickness: 2,
        dividerMargin: 4,
      })
    ).not.toThrow();
  });

  it('accepts a style override', () => {
    expect(() => KeyValue({ items: sampleItems, style: { marginTop: 12 } })).not.toThrow();
  });
});
