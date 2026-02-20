import { describe, expect, it } from 'vitest';
import { Stack } from './stack';

describe('Stack', () => {
  it('renders children', () => {
    const result = Stack({ children: 'Child' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Child');
  });

  it('uses default gap md', () => {
    const result = Stack({ children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { gap?: number }) => s.gap === 16)).toBe(true);
  });

  it('applies gap none', () => {
    const result = Stack({ gap: 'none', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { gap?: number }) => s.gap === 0)).toBe(true);
  });

  it('applies gap sm', () => {
    const result = Stack({ gap: 'sm', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { gap?: number }) => s.gap === 8)).toBe(true);
  });

  it('applies gap lg', () => {
    const result = Stack({ gap: 'lg', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { gap?: number }) => s.gap === 24)).toBe(true);
  });

  it('has flexDirection column', () => {
    const result = Stack({ children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')).toBe(true);
  });

  // New tests for direction prop
  it('applies direction horizontal', () => {
    const result = Stack({ direction: 'horizontal', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(true);
  });

  it('applies direction vertical explicitly', () => {
    const result = Stack({ direction: 'vertical', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexDirection?: string }) => s.flexDirection === 'column')).toBe(true);
  });

  // New tests for align prop
  it('applies align start', () => {
    const result = Stack({ align: 'start', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { alignItems?: string }) => s.alignItems === 'flex-start')).toBe(true);
  });

  it('applies align center', () => {
    const result = Stack({ align: 'center', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { alignItems?: string }) => s.alignItems === 'center')).toBe(true);
  });

  it('applies align end', () => {
    const result = Stack({ align: 'end', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { alignItems?: string }) => s.alignItems === 'flex-end')).toBe(true);
  });

  it('applies align stretch', () => {
    const result = Stack({ align: 'stretch', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { alignItems?: string }) => s.alignItems === 'stretch')).toBe(true);
  });

  // New tests for justify prop
  it('applies justify start', () => {
    const result = Stack({ justify: 'start', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { justifyContent?: string }) => s.justifyContent === 'flex-start')).toBe(
      true
    );
  });

  it('applies justify center', () => {
    const result = Stack({ justify: 'center', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { justifyContent?: string }) => s.justifyContent === 'center')).toBe(
      true
    );
  });

  it('applies justify end', () => {
    const result = Stack({ justify: 'end', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { justifyContent?: string }) => s.justifyContent === 'flex-end')).toBe(
      true
    );
  });

  it('applies justify between', () => {
    const result = Stack({ justify: 'between', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(
      styles.some((s: { justifyContent?: string }) => s.justifyContent === 'space-between')
    ).toBe(true);
  });

  it('applies justify around', () => {
    const result = Stack({ justify: 'around', children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(
      styles.some((s: { justifyContent?: string }) => s.justifyContent === 'space-around')
    ).toBe(true);
  });

  // New tests for wrap prop
  it('applies wrap true', () => {
    const result = Stack({ wrap: true, children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexWrap?: string }) => s.flexWrap === 'wrap')).toBe(true);
  });

  it('does not apply wrap by default', () => {
    const result = Stack({ children: null });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexWrap?: string }) => s.flexWrap === 'wrap')).toBe(false);
  });

  // Combined props test
  it('applies direction, align, justify, and wrap together', () => {
    const result = Stack({
      direction: 'horizontal',
      align: 'center',
      justify: 'between',
      wrap: true,
      gap: 'lg',
      children: null,
    });
    const styles = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styles.some((s: { flexDirection?: string }) => s.flexDirection === 'row')).toBe(true);
    expect(styles.some((s: { alignItems?: string }) => s.alignItems === 'center')).toBe(true);
    expect(
      styles.some((s: { justifyContent?: string }) => s.justifyContent === 'space-between')
    ).toBe(true);
    expect(styles.some((s: { flexWrap?: string }) => s.flexWrap === 'wrap')).toBe(true);
    expect(styles.some((s: { gap?: number }) => s.gap === 24)).toBe(true);
  });
});
