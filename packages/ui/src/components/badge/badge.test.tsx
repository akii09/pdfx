import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders with a label', () => {
    const result = Badge({ label: 'Active' });
    expect(result).toBeDefined();
    // Badge renders a View wrapping a Text
    const text = result.props.children;
    expect(text.props.children).toBe('Active');
  });

  it('uses default variant (default)', () => {
    const result = Badge({ label: 'Test' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // default variant uses muted background
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#f4f4f5')
    ).toBe(true);
  });

  it('applies primary variant', () => {
    const result = Badge({ label: 'Primary', variant: 'primary' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // primary variant uses primary color as background
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#18181b')
    ).toBe(true);
  });

  it('applies success variant text color', () => {
    const result = Badge({ label: 'Paid', variant: 'success' });
    const text = result.props.children;
    const textStyles = Array.isArray(text.props.style) ? text.props.style : [text.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#16a34a')).toBe(true);
  });

  it('applies destructive variant text color', () => {
    const result = Badge({ label: 'Overdue', variant: 'destructive' });
    const text = result.props.children;
    const textStyles = Array.isArray(text.props.style) ? text.props.style : [text.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#dc2626')).toBe(true);
  });

  it('applies warning variant text color', () => {
    const result = Badge({ label: 'Pending', variant: 'warning' });
    const text = result.props.children;
    const textStyles = Array.isArray(text.props.style) ? text.props.style : [text.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#d97706')).toBe(true);
  });

  it('applies info variant text color', () => {
    const result = Badge({ label: 'Info', variant: 'info' });
    const text = result.props.children;
    const textStyles = Array.isArray(text.props.style) ? text.props.style : [text.props.style];
    expect(textStyles.some((s: { color?: string }) => s.color === '#0ea5e9')).toBe(true);
  });

  it('applies sm size padding', () => {
    const result = Badge({ label: 'Small', size: 'sm' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { paddingHorizontal?: number }) => s.paddingHorizontal === 8)
    ).toBe(true);
  });

  it('applies lg size padding', () => {
    const result = Badge({ label: 'Large', size: 'lg' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { paddingHorizontal?: number }) => s.paddingHorizontal === 16)
    ).toBe(true);
  });

  it('applies background override with theme token', () => {
    const result = Badge({ label: 'Custom', background: 'primary' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    // 'primary' resolves to '#18181b' in the professional theme
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#18181b')
    ).toBe(true);
  });

  it('applies background override with raw CSS color', () => {
    const result = Badge({ label: 'Custom', background: '#ff0000' });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    expect(
      containerStyles.some((s: { backgroundColor?: string }) => s.backgroundColor === '#ff0000')
    ).toBe(true);
  });

  it('applies color override with theme token', () => {
    const result = Badge({ label: 'Custom', color: 'accent' });
    const text = result.props.children;
    const textStyles = Array.isArray(text.props.style) ? text.props.style : [text.props.style];
    // 'accent' resolves to '#3b82f6' in the professional theme
    expect(textStyles.some((s: { color?: string }) => s.color === '#3b82f6')).toBe(true);
  });

  it('applies style override last', () => {
    const result = Badge({ label: 'Test', style: { opacity: 0.5 } });
    const containerStyles = Array.isArray(result.props.style)
      ? result.props.style
      : [result.props.style];
    const last = containerStyles[containerStyles.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.5);
  });
});
