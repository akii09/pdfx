import { describe, expect, it } from 'vitest';
import { KeepTogether } from './keep-together';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

/** Get the flat style array from a result's props.style */
function getStyleArray(result: { props: { style?: unknown } }): Record<string, unknown>[] {
  const s = result.props.style;
  if (!s) return [];
  return Array.isArray(s) ? (s as Record<string, unknown>[]) : [s as Record<string, unknown>];
}

describe('KeepTogether', () => {
  it('renders without crashing', () => {
    const result = KeepTogether({ children: 'Content' });
    expect(result).toBeDefined();
  });

  it('renders children', () => {
    const result = KeepTogether({ children: 'Keep this together' });
    expect(findText(result, 'Keep this together')).toBe(true);
  });

  it('sets wrap={false} on the View', () => {
    const result = KeepTogether({ children: 'x' });
    expect(result.props.wrap).toBe(false);
  });

  it('passes minPresenceAhead to the View when provided', () => {
    const result = KeepTogether({ children: 'x', minPresenceAhead: 100 });
    expect(result.props.minPresenceAhead).toBe(100);
  });

  it('does not set minPresenceAhead when not provided', () => {
    const result = KeepTogether({ children: 'x' });
    expect(result.props.minPresenceAhead).toBeUndefined();
  });

  it('applies custom style when provided', () => {
    const result = KeepTogether({ children: 'x', style: { marginBottom: 20 } });
    const styleArr = getStyleArray(result);
    const hasMargin = styleArr.some((s) => s.marginBottom === 20);
    expect(hasMargin).toBe(true);
  });

  it('renders with no children (empty wrapper)', () => {
    const result = KeepTogether({});
    expect(result).toBeDefined();
    expect(result.props.wrap).toBe(false);
  });

  it('renders with multiple children', () => {
    const result = KeepTogether({
      children: [
        { type: 'Text', props: { children: 'First' } },
        { type: 'Text', props: { children: 'Second' } },
      ] as unknown as React.ReactNode,
    });
    expect(result.props.wrap).toBe(false);
  });
});
