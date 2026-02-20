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

  // ──── New variant tests ─────────────────────────────────────────────

  it('renders logo-left variant with logo container', () => {
    const result = PageHeader({
      title: 'Company Name',
      subtitle: 'Tagline',
      variant: 'logo-left',
      logo: 'MockLogo',
    });
    expect(findText(result, 'Company Name')).toBe(true);
    expect(findText(result, 'Tagline')).toBe(true);
    // Verify it's a row layout (logo + content)
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(
      true
    );
  });

  it('renders logo-left variant without logo when not provided', () => {
    const result = PageHeader({
      title: 'Company Name',
      variant: 'logo-left',
    });
    expect(findText(result, 'Company Name')).toBe(true);
  });

  it('renders two-column variant with contact info', () => {
    const result = PageHeader({
      title: 'Invoice',
      subtitle: 'Company Name',
      variant: 'two-column',
      address: '123 Main St',
      phone: '+1-555-0100',
      email: 'info@example.com',
    });
    expect(findText(result, 'Invoice')).toBe(true);
    expect(findText(result, 'Company Name')).toBe(true);
    expect(findText(result, '123 Main St')).toBe(true);
    expect(findText(result, '+1-555-0100')).toBe(true);
    expect(findText(result, 'info@example.com')).toBe(true);
  });

  it('renders two-column variant without contact info when not provided', () => {
    const result = PageHeader({
      title: 'Invoice',
      variant: 'two-column',
    });
    expect(findText(result, 'Invoice')).toBe(true);
    // Should still render but without right column
  });

  it('backward compatibility: existing simple variant still works', () => {
    const result = PageHeader({
      title: 'Legacy Usage',
      subtitle: 'No breaking changes',
      rightText: 'Date: 2026-02-19',
    });
    expect(findText(result, 'Legacy Usage')).toBe(true);
    expect(findText(result, 'No breaking changes')).toBe(true);
    expect(findText(result, 'Date: 2026-02-19')).toBe(true);
  });

  it('renders logo-right variant with title on left and logo on right', () => {
    const result = PageHeader({
      title: 'Company Name',
      subtitle: 'Tagline',
      variant: 'logo-right',
      logo: 'MockLogo',
    });
    expect(findText(result, 'Company Name')).toBe(true);
    expect(findText(result, 'Tagline')).toBe(true);
    // Container should use row layout (justify-between: title left, logo right)
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(containerStyles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(
      true
    );
  });

  it('renders logo-right variant without logo when not provided', () => {
    const result = PageHeader({
      title: 'Company Name',
      variant: 'logo-right',
    });
    expect(findText(result, 'Company Name')).toBe(true);
  });

  it('applies custom background to logo-right variant', () => {
    const result = PageHeader({
      title: 'Test',
      variant: 'logo-right',
      background: '#ff0000',
    });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#ff0000')
    ).toBe(true);
  });
});
