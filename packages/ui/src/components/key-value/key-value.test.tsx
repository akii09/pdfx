import { describe, expect, it } from 'vitest';
import { KeyValue } from './key-value';

const sampleItems = [
  { key: 'Invoice #', value: 'INV-001' },
  { key: 'Date', value: '2026-01-15' },
  { key: 'Total', value: '$1,200.00' },
];

describe('KeyValue', () => {
  it('renders without crashing', () => {
    const result = KeyValue({ items: sampleItems });
    expect(result).toBeDefined();
  });

  it('renders all items', () => {
    const result = KeyValue({ items: sampleItems });
    const rows = result.props.children;
    expect(rows).toHaveLength(3);
  });

  it('defaults to horizontal direction', () => {
    const result = KeyValue({ items: sampleItems });
    const firstRow = result.props.children[0];
    const rowStyles = Array.isArray(firstRow.props.style)
      ? firstRow.props.style
      : [firstRow.props.style];
    expect(rowStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(true);
  });

  it('applies vertical direction', () => {
    const result = KeyValue({ items: sampleItems, direction: 'vertical' });
    const firstRow = result.props.children[0];
    const rowStyles = Array.isArray(firstRow.props.style)
      ? firstRow.props.style
      : [firstRow.props.style];
    expect(rowStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')).toBe(
      true
    );
  });

  it('renders key and value text', () => {
    const result = KeyValue({ items: [{ key: 'Status', value: 'Paid' }] });
    const row = result.props.children[0];
    const [keyText, valText] = row.props.children;
    expect(keyText.props.children).toBe('Status');
    expect(valText.props.children).toBe('Paid');
  });

  it('applies valueColor override at item level', () => {
    const items = [{ key: 'Status', value: 'Paid', valueColor: 'success' }];
    const result = KeyValue({ items });
    const row = result.props.children[0];
    const valText = row.props.children[1];
    const valStyles = Array.isArray(valText.props.style)
      ? valText.props.style
      : [valText.props.style];
    expect(valStyles.some((s: { color?: string }) => s.color === '#16a34a')).toBe(true);
  });

  it('applies global valueColor', () => {
    const result = KeyValue({ items: sampleItems, valueColor: 'accent' });
    const row = result.props.children[0];
    const valText = row.props.children[1];
    const valStyles = Array.isArray(valText.props.style)
      ? valText.props.style
      : [valText.props.style];
    expect(valStyles.some((s: { color?: string }) => s.color === '#3b82f6')).toBe(true);
  });

  it('applies global labelColor with raw CSS color', () => {
    const result = KeyValue({ items: sampleItems, labelColor: '#999999' });
    const row = result.props.children[0];
    const keyText = row.props.children[0];
    const keyStyles = Array.isArray(keyText.props.style)
      ? keyText.props.style
      : [keyText.props.style];
    expect(keyStyles.some((s: { color?: string }) => s.color === '#999999')).toBe(true);
  });

  it('applies boldValue', () => {
    const result = KeyValue({ items: sampleItems, boldValue: true });
    const row = result.props.children[0];
    const valText = row.props.children[1];
    const valStyles = Array.isArray(valText.props.style)
      ? valText.props.style
      : [valText.props.style];
    // fontWeight 700 (bold)
    expect(valStyles.some((s: { fontWeight?: number }) => s.fontWeight === 700)).toBe(true);
  });

  it('applies divided style (not on last row)', () => {
    const result = KeyValue({ items: sampleItems, divided: true });
    const rows = result.props.children;
    // First row (not last) should have divider border
    const firstRowStyles = Array.isArray(rows[0].props.style)
      ? rows[0].props.style
      : [rows[0].props.style];
    expect(
      firstRowStyles.some(
        (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
      )
    ).toBe(true);
    // Last row should NOT have divider
    const lastRowStyles = Array.isArray(rows[2].props.style)
      ? rows[2].props.style
      : [rows[2].props.style];
    expect(
      lastRowStyles.some(
        (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
      )
    ).toBe(false);
  });

  it('applies style override', () => {
    const result = KeyValue({ items: sampleItems, style: { opacity: 0.5 } });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    const last = containerStyles[containerStyles.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.5);
  });
});
