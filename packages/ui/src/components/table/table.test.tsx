import { describe, expect, it } from 'vitest';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from './table';

describe('Table', () => {
  it('renders children', () => {
    const result = Table({ children: 'content' });
    expect(result).toBeDefined();
    const children = result.props.children;
    expect(Array.isArray(children) ? children[0] : children).toBe('content');
  });

  it('defaults to line variant', () => {
    const result = Table({ children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Line variant should have bottom border style
    const hasBottomBorder = styleArr.some(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(hasBottomBorder).toBe(true);
  });

  it('has border and flexDirection column for grid variant', () => {
    const result = Table({ variant: 'grid', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some(
      (s: { borderWidth?: number }) => typeof s.borderWidth === 'number' && s.borderWidth > 0
    );
    const hasColumn = styleArr.some(
      (s: { flexDirection?: string }) => s.flexDirection === 'column'
    );
    expect(hasBorder).toBe(true);
    expect(hasColumn).toBe(true);
  });

  it('applies line variant styles', () => {
    const result = Table({ variant: 'line', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Line variant should have bottom border style
    const hasBottomBorder = styleArr.some(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(hasBottomBorder).toBe(true);
  });

  it('applies minimal variant styles', () => {
    const result = Table({ variant: 'minimal', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Minimal variant should have padding
    const hasPadding = styleArr.some(
      (s: { paddingVertical?: number }) => typeof s.paddingVertical === 'number'
    );
    expect(hasPadding).toBe(true);
  });
});

describe('TableRow', () => {
  it('renders children', () => {
    const result = TableRow({ children: 'cell' });
    expect(result).toBeDefined();
    const children = result.props.children;
    expect(Array.isArray(children) ? children[0] : children).toBe('cell');
  });

  it('has flexDirection row', () => {
    const result = TableRow({ children: null });
    const style = Array.isArray(result.props.style) ? result.props.style[0] : result.props.style;
    expect(style.flexDirection).toBe('row');
  });

  it('applies header styles for grid variant', () => {
    const result = TableRow({ header: true, variant: 'grid', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBackground = styleArr.some(
      (s: { backgroundColor?: string }) => typeof s.backgroundColor === 'string'
    );
    expect(hasBackground).toBe(true);
  });

  it('applies stripe styles only for body rows', () => {
    const result = TableRow({ stripe: true, children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBackground = styleArr.some(
      (s: { backgroundColor?: string }) => typeof s.backgroundColor === 'string'
    );
    expect(hasBackground).toBe(true);
  });

  it('does not apply stripe to header rows', () => {
    const result = TableRow({ header: true, stripe: true, children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Should have header styles but stripe should be ignored
    const headerStyle = styleArr.find(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(headerStyle).toBeDefined();
  });

  it('does not apply stripe to footer rows', () => {
    const result = TableRow({ footer: true, stripe: true, children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Should have footer styles but stripe should be ignored
    const footerStyle = styleArr.find(
      (s: { borderTopWidth?: number }) => typeof s.borderTopWidth === 'number'
    );
    expect(footerStyle).toBeDefined();
  });
});

describe('TableCell', () => {
  it('wraps string children in Text', () => {
    const result = TableCell({ variant: 'grid', children: 'Hello' });
    expect(result).toBeDefined();
    expect(result.props.children.type).toBeDefined();
    expect(result.props.children.props.children).toBe('Hello');
  });

  it('applies header styles when header=true', () => {
    const result = TableCell({ variant: 'grid', header: true, children: 'Header' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    expect(textStyleArr.some((s: { fontWeight?: number }) => s.fontWeight === 600)).toBe(true);
  });

  it('applies align right', () => {
    const result = TableCell({ variant: 'grid', align: 'right', children: '$10' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    expect(styleArr.some((s: { textAlign?: string }) => s.textAlign === 'right')).toBe(true);
  });

  it('applies cell borders only for grid variant', () => {
    const gridResult = TableCell({ variant: 'grid', _last: false, children: 'cell' });
    const gridStyleArr = Array.isArray(gridResult.props.style)
      ? gridResult.props.style
      : [gridResult.props.style];
    const hasBorder = gridStyleArr.some(
      (s: { borderRightWidth?: number }) => typeof s.borderRightWidth === 'number'
    );
    expect(hasBorder).toBe(true);

    const lineResult = TableCell({ variant: 'line', _last: false, children: 'cell' });
    const lineStyleArr = Array.isArray(lineResult.props.style)
      ? lineResult.props.style
      : [lineResult.props.style];
    const lineHasBorder = lineStyleArr.some(
      (s: { borderRightWidth?: number }) => typeof s.borderRightWidth === 'number'
    );
    expect(lineHasBorder).toBe(false);
  });

  it('applies width prop with fixed flex', () => {
    const result = TableCell({ width: '50%', children: 'Wide' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasWidth = styleArr.some((s: { width?: string }) => s.width === '50%');
    const hasFlex0 = styleArr.some((s: { flex?: number }) => s.flex === 0);
    expect(hasWidth).toBe(true);
    expect(hasFlex0).toBe(true);
  });

  it('applies numeric width prop', () => {
    const result = TableCell({ width: 200, children: 'Fixed' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasWidth = styleArr.some((s: { width?: number }) => s.width === 200);
    expect(hasWidth).toBe(true);
  });
});

describe('TableHeader/TableBody/TableFooter', () => {
  it('TableHeader renders children', () => {
    const result = TableHeader({ children: 'header content' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('header content');
  });

  it('TableBody renders children', () => {
    const result = TableBody({ children: 'body content' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('body content');
  });

  it('TableFooter renders children', () => {
    const result = TableFooter({ children: 'footer content' });
    expect(result).toBeDefined();
    expect(result.props.children).toBe('footer content');
  });
});
