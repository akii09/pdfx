import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { PageHeader } from './page-header';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

describe('PageHeader', () => {
  it('renders without crashing', () => {
    const result = PageHeader({ title: 'Annual Report' });
    expect(result).toBeDefined();
  });

  it('renders the title', () => {
    const result = PageHeader({ title: 'Invoice #INV-001' });
    expect(findText(result, 'Invoice #INV-001')).toBe(true);
  });

  it('renders subtitle when provided', () => {
    const result = PageHeader({ title: 'Report', subtitle: 'Acme Corp.' });
    expect(findText(result, 'Acme Corp.')).toBe(true);
  });

  it('defaults to simple variant (flexDirection row)', () => {
    const result = PageHeader({ title: 'Test' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(
      true
    );
  });

  it('applies centered variant (flexDirection column)', () => {
    const result = PageHeader({ title: 'Centered', variant: 'centered' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')
    ).toBe(true);
  });

  it('applies branded variant with primary background', () => {
    const result = PageHeader({ title: 'Branded', variant: 'branded' });
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
    const result = PageHeader({ title: 'Custom', background: '#ff0000' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#ff0000')
    ).toBe(true);
  });

  it('applies custom marginBottom', () => {
    const result = PageHeader({ title: 'Test', marginBottom: 42 });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { marginBottom?: number }) => s.marginBottom === 42)).toBe(
      true
    );
  });

  it('applies style override last', () => {
    const result = PageHeader({ title: 'Test', style: { opacity: 0.7 } });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    const last = containerStyles[containerStyles.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.7);
  });
});
