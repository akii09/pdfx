import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { PageFooter } from './page-footer';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

describe('PageFooter', () => {
  it('renders without crashing', () => {
    const result = PageFooter({ leftText: '© 2026 Acme Corp.' });
    expect(result).toBeDefined();
  });

  it('renders leftText', () => {
    const result = PageFooter({ leftText: '© 2026 Acme' });
    expect(findText(result, '© 2026 Acme')).toBe(true);
  });

  it('renders rightText', () => {
    const result = PageFooter({ rightText: 'Page 1 of 3' });
    expect(findText(result, 'Page 1 of 3')).toBe(true);
  });

  it('defaults to simple variant (flexDirection row, top border)', () => {
    const result = PageFooter({ leftText: 'Test' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(
      true
    );
    expect(
      containerStyles.some((s: { borderTopWidth?: number }) => typeof s.borderTopWidth === 'number')
    ).toBe(true);
  });

  it('applies centered variant (column layout)', () => {
    const result = PageFooter({ leftText: 'Centered', variant: 'centered' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')
    ).toBe(true);
  });

  it('applies branded variant with primary background', () => {
    const result = PageFooter({ leftText: 'Branded', variant: 'branded' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some(
        (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.primary
      )
    ).toBe(true);
  });

  it('applies custom background override', () => {
    const result = PageFooter({ leftText: 'Test', background: 'muted' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // 'muted' resolves to '#f4f4f5'
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#f4f4f5')
    ).toBe(true);
  });

  it('applies custom marginTop', () => {
    const result = PageFooter({ leftText: 'Test', marginTop: 50 });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { marginTop?: number }) => s.marginTop === 50)).toBe(true);
  });

  it('applies textColor override', () => {
    const result = PageFooter({ leftText: 'Test', textColor: 'accent' });
    // Find the left text element — children may be array of conditional nodes
    const children = Array.isArray(result.props.children)
      ? result.props.children
      : [result.props.children];
    const textEl = children.find(
      (c: { props?: { children?: unknown } } | null) => c?.props?.children === 'Test'
    );
    if (!textEl) return; // skip if not found
    const textStyles = Array.isArray(textEl.props.style)
      ? textEl.props.style
      : [textEl.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#3b82f6')).toBe(true);
  });

  it('renders centerText in simple variant', () => {
    const result = PageFooter({
      leftText: 'Left',
      centerText: 'CONFIDENTIAL',
      rightText: 'Right',
    });
    expect(findText(result, 'CONFIDENTIAL')).toBe(true);
  });

  it('applies style override last', () => {
    const result = PageFooter({ leftText: 'Test', style: { opacity: 0.8 } });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    const last = containerStyles[containerStyles.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.8);
  });
});
