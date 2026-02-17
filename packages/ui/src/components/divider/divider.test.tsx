import { describe, expect, it } from 'vitest';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders with default spacing', () => {
    const result = Divider({});
    expect(result).toBeDefined();
    expect(result.props.style).toBeInstanceOf(Array);
    // base + spacing + variant + thickness = 4 styles
    expect(result.props.style).toHaveLength(4);
  });

  it('uses theme border color', () => {
    const result = Divider({});
    const baseStyle = result.props.style[0];
    expect(baseStyle.borderBottomColor).toBe('#e4e4e7'); // professional theme border
  });

  it('applies spacing prop', () => {
    const result = Divider({ spacing: 'lg' });
    const spacingStyle = result.props.style[1];
    expect(spacingStyle.marginVertical).toBe(32); // primitives.spacing[8]
  });

  it('applies style override', () => {
    const result = Divider({ style: { borderBottomColor: 'navy' } });
    expect(result.props.style.length).toBeGreaterThanOrEqual(5); // base + spacing + variant + thickness + user
    expect(result.props.style[result.props.style.length - 1]).toEqual({
      borderBottomColor: 'navy',
    });
  });

  // New tests for variant prop
  it('applies variant solid', () => {
    const result = Divider({ variant: 'solid' });
    const styles = result.props.style as Array<{ borderBottomStyle?: string }>;
    expect(styles.some((s) => s.borderBottomStyle === 'solid')).toBe(true);
  });

  it('applies variant dashed', () => {
    const result = Divider({ variant: 'dashed' });
    const styles = result.props.style as Array<{ borderBottomStyle?: string }>;
    expect(styles.some((s) => s.borderBottomStyle === 'dashed')).toBe(true);
  });

  it('applies variant dotted', () => {
    const result = Divider({ variant: 'dotted' });
    const styles = result.props.style as Array<{ borderBottomStyle?: string }>;
    expect(styles.some((s) => s.borderBottomStyle === 'dotted')).toBe(true);
  });

  // New tests for color prop
  it('applies color with theme token', () => {
    const result = Divider({ color: 'primary' });
    const styles = result.props.style as Array<{ borderBottomColor?: string }>;
    expect(styles.some((s) => s.borderBottomColor === '#18181b')).toBe(true);
  });

  it('applies color with CSS color', () => {
    const result = Divider({ color: '#ff0000' });
    const styles = result.props.style as Array<{ borderBottomColor?: string }>;
    expect(styles.some((s) => s.borderBottomColor === '#ff0000')).toBe(true);
  });

  // New tests for thickness prop
  it('applies thickness thin', () => {
    const result = Divider({ thickness: 'thin' });
    const styles = result.props.style as Array<{ borderBottomWidth?: number }>;
    expect(styles.some((s) => typeof s.borderBottomWidth === 'number')).toBe(true);
  });

  it('applies thickness medium', () => {
    const result = Divider({ thickness: 'medium' });
    const styles = result.props.style as Array<{ borderBottomWidth?: number }>;
    // medium is spacing[1] = 4
    expect(styles.some((s) => s.borderBottomWidth === 4)).toBe(true);
  });

  it('applies thickness thick', () => {
    const result = Divider({ thickness: 'thick' });
    const styles = result.props.style as Array<{ borderBottomWidth?: number }>;
    // thick is spacing[2] = 8
    expect(styles.some((s) => s.borderBottomWidth === 8)).toBe(true);
  });

  // Combined tests
  it('applies variant, color, and thickness together', () => {
    const result = Divider({ variant: 'dashed', color: 'accent', thickness: 'medium' });
    const styles = result.props.style as Array<Record<string, unknown>>;
    expect(styles.some((s) => s.borderBottomStyle === 'dashed')).toBe(true);
    expect(styles.some((s) => s.borderBottomColor === '#3b82f6')).toBe(true); // accent
    expect(styles.some((s) => s.borderBottomWidth === 4)).toBe(true);
  });

  it('applies spacing none', () => {
    const result = Divider({ spacing: 'none' });
    const styles = result.props.style as Array<{ marginVertical?: number }>;
    expect(styles.some((s) => s.marginVertical === 0)).toBe(true);
  });

  it('applies spacing sm', () => {
    const result = Divider({ spacing: 'sm' });
    const styles = result.props.style as Array<{ marginVertical?: number }>;
    expect(styles.some((s) => s.marginVertical === 12)).toBe(true); // spacing[3]
  });
});
