import { describe, expect, it } from 'vitest';
import { Heading } from './heading';

describe('Heading', () => {
  it('should render with default level 1', () => {
    const result = Heading({ children: 'Hello World' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Hello World');
  });

  // Font sizes from the professional theme preset (shadcn-inspired)
  it.each([
    [1, 32],
    [2, 24],
    [3, 20],
    [4, 16],
    [5, 14],
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
    expect(baseStyle.color).toBe('#18181b');
  });

  it('should use theme heading line height', () => {
    const result = Heading({ level: 1, children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.lineHeight).toBe(1.25);
  });

  it('should apply custom styles as last in array', () => {
    const customStyle = { color: 'red' };
    const result = Heading({ children: 'Styled', style: customStyle });
    expect(result.props.style).toBeInstanceOf(Array);
    const styleArr = result.props.style as object[];
    expect(styleArr[styleArr.length - 1]).toEqual(customStyle);
  });

  it('should preserve base heading style when custom style is applied', () => {
    const result = Heading({ level: 2, children: 'Test', style: { color: 'red' } });
    const styleArr = result.props.style as Array<{
      fontSize?: number;
      fontFamily?: string;
      color?: string;
    }>;
    expect(styleArr[0].fontSize).toBe(24);
    expect(styleArr[0].fontFamily).toBe('Times-Roman');
    expect(styleArr[styleArr.length - 1].color).toBe('red');
  });

  it('should always return style array', () => {
    const result = Heading({ children: 'Plain' });
    expect(result.props.style).toBeInstanceOf(Array);
  });

  it('should render with empty string children', () => {
    const result = Heading({ children: '' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('');
  });

  it('should apply align prop as textAlign', () => {
    const result = Heading({ children: 'Centered', align: 'center' });
    const styleArr = result.props.style as object[];
    const hasTextAlign = styleArr.some((s: { textAlign?: string }) => s.textAlign === 'center');
    expect(hasTextAlign).toBe(true);
  });

  it('should apply color prop with theme token', () => {
    const result = Heading({ children: 'Primary', color: 'primary' });
    const styleArr = result.props.style as object[];
    const colorStyle = styleArr.find((s: { color?: string }) => s.color === '#18181b');
    expect(colorStyle).toBeDefined();
  });

  it('should apply color prop with raw CSS color', () => {
    const result = Heading({ children: 'Custom', color: '#ff0000' });
    const styleArr = result.props.style as object[];
    const colorStyle = styleArr.find((s: { color?: string }) => s.color === '#ff0000');
    expect(colorStyle).toBeDefined();
  });

  it('should apply transform uppercase with letter spacing', () => {
    const result = Heading({ children: 'Uppercase', transform: 'uppercase' });
    const styleArr = result.props.style as object[];
    const transformStyle = styleArr.find(
      (s: { textTransform?: string }) => s.textTransform === 'uppercase'
    );
    expect(transformStyle).toBeDefined();
  });

  it('should apply weight prop', () => {
    const result = Heading({ children: 'Medium', weight: 'medium' });
    const styleArr = result.props.style as object[];
    const weightStyle = styleArr.find((s: { fontWeight?: number }) => s.fontWeight === 500);
    expect(weightStyle).toBeDefined();
  });

  it('should let style override align and color', () => {
    const result = Heading({
      children: 'Override',
      align: 'left',
      color: 'primary',
      style: { textAlign: 'right', color: 'navy' },
    });
    const styleArr = result.props.style as object[];
    const userStyle = styleArr[styleArr.length - 1] as { textAlign: string; color: string };
    expect(userStyle.textAlign).toBe('right');
    expect(userStyle.color).toBe('navy');
  });
});
