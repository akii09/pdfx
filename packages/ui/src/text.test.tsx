import { describe, expect, it } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  it('should render with string children', () => {
    const result = Text({ children: 'Hello World' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('Hello World');
  });

  it('should apply theme body fontSize (12) and lineHeight (1.4)', () => {
    const result = Text({ children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.fontSize).toBe(12);
    expect(baseStyle.lineHeight).toBe(1.4);
  });

  it('should use theme body font family (Helvetica)', () => {
    const result = Text({ children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.fontFamily).toBe('Helvetica');
  });

  it('should use theme foreground color', () => {
    const result = Text({ children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.color).toBe('#1a1a1a');
  });

  it('should use theme paragraphGap for marginBottom', () => {
    const result = Text({ children: 'Test' });
    const style = result.props.style;
    const baseStyle = Array.isArray(style) ? style[0] : style;
    expect(baseStyle.marginBottom).toBe(8);
  });

  it('should apply custom styles alongside default styles', () => {
    const customStyle = { color: 'blue' };
    const result = Text({ children: 'Styled text', style: customStyle });
    expect(result.props.style).toBeInstanceOf(Array);
    expect(result.props.style).toHaveLength(2);
  });

  it('should preserve base style when custom style is applied', () => {
    const result = Text({ children: 'Test', style: { color: 'navy' } });
    const [base, custom] = result.props.style;
    expect(base.fontSize).toBe(12);
    expect(base.fontFamily).toBe('Helvetica');
    expect(base.marginBottom).toBe(8);
    expect(custom.color).toBe('navy');
  });

  it('should use single style object when no custom style provided', () => {
    const result = Text({ children: 'Plain text' });
    expect(result.props.style).not.toBeInstanceOf(Array);
  });

  it('should render with empty string', () => {
    const result = Text({ children: '' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('');
  });
});
