import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  it('should render with default level 1', () => {
    const result = Heading({ children: 'Hello World' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Hello World');
  });

  // Font sizes from the professional theme preset
  it.each([
    [1, 36],
    [2, 28],
    [3, 22],
    [4, 18],
    [5, 15],
    [6, 12],
  ] as const)('h%i should have fontSize %d from theme', (level, expectedSize) => {
    const result = Heading({ level, children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.fontSize).toBe(expectedSize);
  });

  it('should use theme heading font family (Times-Roman)', () => {
    const result = Heading({ level: 1, children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.fontFamily).toBe('Times-Roman');
  });

  it('should use theme foreground color', () => {
    const result = Heading({ level: 1, children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.color).toBe('#1a1a1a');
  });

  it('should use theme heading line height', () => {
    const result = Heading({ level: 1, children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.lineHeight).toBe(1.2);
  });

  it('should apply custom styles alongside heading styles', () => {
    const customStyle = { color: 'red' };
    const result = Heading({ children: 'Styled', style: customStyle });
    expect(result.props.style).toBeInstanceOf(Array);
    expect(result.props.style).toHaveLength(2);
  });

  it('should preserve base heading style when custom style is applied', () => {
    const result = Heading({ level: 2, children: 'Test', style: { color: 'red' } });
    const [base, custom] = result.props.style;
    expect(base.fontSize).toBe(28);
    expect(base.fontFamily).toBe('Times-Roman');
    expect(custom.color).toBe('red');
  });

  it('should use single style object when no custom style provided', () => {
    const result = Heading({ children: 'Plain' });
    expect(result.props.style).not.toBeInstanceOf(Array);
  });

  it('should render with empty string children', () => {
    const result = Heading({ children: '' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('');
  });
});
