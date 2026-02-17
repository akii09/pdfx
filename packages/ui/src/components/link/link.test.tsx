import { describe, expect, it } from 'vitest';
import { Link } from './link';

describe('Link', () => {
  it('renders with href and maps to src', () => {
    const result = Link({ href: 'https://example.com', children: 'Click me' });
    expect(result).toBeDefined();
    expect(result.props.src).toBe('https://example.com');
    expect(result.props.children).toBe('Click me');
  });

  it('renders with anchor href', () => {
    const result = Link({ href: '#section-1', children: 'Jump to section' });
    expect(result.props.src).toBe('#section-1');
  });

  it('uses theme accent color by default', () => {
    const result = Link({ href: 'https://example.com', children: 'Link' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.color).toBe('#3b82f6'); // professional theme accent
  });

  it('applies color prop with theme token', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', color: 'primary' });
    const style = result.props.style as object[];
    const semanticStyle = style[1] as { color: string };
    expect(semanticStyle.color).toBe('#18181b'); // professional theme primary
  });

  it('applies align prop as textAlign', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', align: 'center' });
    const style = result.props.style as object[];
    const semanticStyle = style[1] as { textAlign: string };
    expect(semanticStyle.textAlign).toBe('center');
  });

  it('applies style override', () => {
    const result = Link({
      href: 'https://example.com',
      children: 'Link',
      style: { fontSize: 14 },
    });
    const style = result.props.style as object[];
    const userStyle = style[style.length - 1] as { fontSize: number };
    expect(userStyle.fontSize).toBe(14);
  });

  // New tests for variant prop
  it('applies variant default with accent color', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', variant: 'default' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.color).toBe('#3b82f6'); // professional theme accent
    expect(style.textDecoration).toBe('underline');
  });

  it('applies variant muted with muted foreground color', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', variant: 'muted' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.color).toBe('#71717a'); // professional theme mutedForeground
  });

  it('applies variant primary with primary color', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', variant: 'primary' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.color).toBe('#18181b'); // professional theme primary
  });

  // New tests for underline prop
  it('applies underline always', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', underline: 'always' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { textDecoration?: string }) => s.textDecoration === 'underline')).toBe(
      true
    );
  });

  it('applies underline none', () => {
    const result = Link({ href: 'https://example.com', children: 'Link', underline: 'none' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { textDecoration?: string }) => s.textDecoration === 'none')).toBe(true);
  });

  // Combined tests
  it('applies variant and underline together', () => {
    const result = Link({
      href: 'https://example.com',
      children: 'Link',
      variant: 'muted',
      underline: 'none',
    });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { color?: string }) => s.color === '#71717a')).toBe(true);
    expect(styles.some((s: { textDecoration?: string }) => s.textDecoration === 'none')).toBe(true);
  });

  it('color prop overrides variant color', () => {
    const result = Link({
      href: 'https://example.com',
      children: 'Link',
      variant: 'muted',
      color: '#ff0000',
    });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Custom color should be last and override variant
    expect(styles.some((s: { color?: string }) => s.color === '#ff0000')).toBe(true);
  });
});
