import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  it('renders children', () => {
    const result = Text({ children: 'Hello' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Hello');
  });

  it('uses default body styles when no variant', () => {
    const result = Text({ children: 'Body' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(11);
  });

  it('applies variant xs', () => {
    const result = Text({ variant: 'xs', children: 'Caption' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(10);
  });

  it('applies variant sm', () => {
    const result = Text({ variant: 'sm', children: 'Small' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(12); // primitives.typography.sm
  });

  it('applies variant base', () => {
    const result = Text({ variant: 'base', children: 'Base' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(15);
  });

  it('applies variant lg', () => {
    const result = Text({ variant: 'lg', children: 'Large' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(18);
  });

  it('applies variant xl', () => {
    const result = Text({ variant: 'xl', children: 'XL' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(22);
  });

  it('applies variant 2xl', () => {
    const result = Text({ variant: '2xl', children: '2XL' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(28);
  });

  it('applies variant 3xl', () => {
    const result = Text({ variant: '3xl', children: '3XL' });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.fontSize).toBe(36);
  });

  it('applies align', () => {
    const result = Text({ align: 'center', children: 'Centered' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const semantic = styles.find((s: Record<string, unknown>) => s.textAlign === 'center');
    expect(semantic).toBeDefined();
    expect(semantic?.textAlign).toBe('center');
  });

  it('applies color via resolveColor', () => {
    const result = Text({ color: 'primary', children: 'Primary' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const semantic = styles.find((s: Record<string, unknown>) => s.color === '#18181b');
    expect(semantic).toBeDefined();
    expect(semantic?.color).toBe('#18181b');
  });

  it('merges custom style with base', () => {
    const result = Text({ children: 'Custom', style: { marginTop: 20 } });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const custom = styles.find((s: Record<string, unknown>) => s.marginTop === 20);
    expect(custom).toBeDefined();
  });

  it('variant and color work together', () => {
    const result = Text({ variant: 'xs', color: 'mutedForeground', children: 'Caption' });
    expect(result).toBeDefined();
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontSize === 10)).toBe(true);
    expect(styles.some((s: Record<string, unknown>) => s.color === '#71717a')).toBe(true);
  });

  // New tests for weight prop
  it('applies weight normal', () => {
    const result = Text({ weight: 'normal', children: 'Normal' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 400)).toBe(true);
  });

  it('applies weight medium', () => {
    const result = Text({ weight: 'medium', children: 'Medium' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 500)).toBe(true);
  });

  it('applies weight semibold', () => {
    const result = Text({ weight: 'semibold', children: 'Semibold' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 600)).toBe(true);
  });

  it('applies weight bold', () => {
    const result = Text({ weight: 'bold', children: 'Bold' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 700)).toBe(true);
  });

  // New tests for italic prop
  it('applies italic style', () => {
    const result = Text({ italic: true, children: 'Italic' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontStyle === 'italic')).toBe(true);
  });

  it('applies weight and italic together', () => {
    const result = Text({ weight: 'bold', italic: true, children: 'Bold Italic' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 700)).toBe(true);
    expect(styles.some((s: Record<string, unknown>) => s.fontStyle === 'italic')).toBe(true);
  });

  it('applies variant, weight, and color together', () => {
    const result = Text({ variant: 'lg', weight: 'semibold', color: 'primary', children: 'Test' });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: Record<string, unknown>) => s.fontSize === 18)).toBe(true);
    expect(styles.some((s: Record<string, unknown>) => s.fontWeight === 600)).toBe(true);
    expect(styles.some((s: Record<string, unknown>) => s.color === '#18181b')).toBe(true);
  });
});
