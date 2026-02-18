import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { Table, TableCell, TableRow } from './table';

// borderWidth = spacing[0.5] = 2
// borderWidth * 2 = 4 (used for thick borders)

describe('Table — compact variant', () => {
  it('renders without crashing', () => {
    const result = Table({ variant: 'compact', children: null });
    expect(result).toBeDefined();
  });

  it('applies bottom border style', () => {
    const result = Table({ variant: 'compact', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(hasBorder).toBe(true);
  });

  it('TableCell has reduced padding (spacing[0.5] = 2)', () => {
    const result = TableCell({ variant: 'compact', children: 'x' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasSmallPadding = styleArr.some(
      (s: { paddingVertical?: number }) => s.paddingVertical === 2
    );
    expect(hasSmallPadding).toBe(true);
  });

  it('TableCell header uses uppercase text style', () => {
    const result = TableCell({ variant: 'compact', header: true, children: 'Header' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasUppercase = textStyleArr.some(
      (s: { textTransform?: string }) => s.textTransform === 'uppercase'
    );
    expect(hasUppercase).toBe(true);
  });

  it('TableCell body uses compact font size (xs=10)', () => {
    const result = TableCell({ variant: 'compact', children: 'data' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasSmallFont = textStyleArr.some((s: { fontSize?: number }) => s.fontSize === 10);
    expect(hasSmallFont).toBe(true);
  });

  it('TableRow applies bottom border', () => {
    const result = TableRow({ variant: 'compact', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(hasBorder).toBe(true);
  });
});

describe('Table — bordered variant', () => {
  it('renders without crashing', () => {
    const result = Table({ variant: 'bordered', children: null });
    expect(result).toBeDefined();
  });

  it('table has thick outer border (borderWidth * 2 = 4)', () => {
    const result = Table({ variant: 'bordered', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // bordered uses borderWidth * 2 where borderWidth = spacing[0.5] = 2, so borderWidth * 2 = 4
    const hasBorder = styleArr.some((s: { borderWidth?: number }) => s.borderWidth === 4);
    expect(hasBorder).toBe(true);
  });

  it('TableCell applies right border for non-last cells (borderWidth * 2 = 4)', () => {
    const result = TableCell({ variant: 'bordered', _last: false, children: 'cell' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some((s: { borderRightWidth?: number }) => s.borderRightWidth === 4);
    expect(hasBorder).toBe(true);
  });

  it('TableCell does not apply right border for last cell', () => {
    const result = TableCell({ variant: 'bordered', _last: true, children: 'last' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some(
      (s: { borderRightWidth?: number }) => typeof s.borderRightWidth === 'number'
    );
    expect(hasBorder).toBe(false);
  });

  it('TableRow header has muted background', () => {
    const result = TableRow({ variant: 'bordered', header: true, children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasMuted = styleArr.some(
      (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.muted
    );
    expect(hasMuted).toBe(true);
  });

  it('TableCell header uses bold text (fontWeight 700)', () => {
    const result = TableCell({ variant: 'bordered', header: true, children: 'Head' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasBold = textStyleArr.some((s: { fontWeight?: number }) => s.fontWeight === 700);
    expect(hasBold).toBe(true);
  });
});

describe('Table — primary-header variant', () => {
  it('renders without crashing', () => {
    const result = Table({ variant: 'primary-header', children: null });
    expect(result).toBeDefined();
  });

  it('table has bottom border', () => {
    const result = Table({ variant: 'primary-header', children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBorder = styleArr.some(
      (s: { borderBottomWidth?: number }) => typeof s.borderBottomWidth === 'number'
    );
    expect(hasBorder).toBe(true);
  });

  it('TableRow header uses primary background color', () => {
    const result = TableRow({ variant: 'primary-header', header: true, children: null });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasPrimary = styleArr.some(
      (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.primary
    );
    expect(hasPrimary).toBe(true);
  });

  it('TableCell header uses primaryForeground color', () => {
    const result = TableCell({ variant: 'primary-header', header: true, children: 'Col' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasPrimaryFg = textStyleArr.some(
      (s: { color?: string }) => s.color === theme.colors.primaryForeground
    );
    expect(hasPrimaryFg).toBe(true);
  });

  it('TableCell header uses uppercase text', () => {
    const result = TableCell({ variant: 'primary-header', header: true, children: 'Col' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasUppercase = textStyleArr.some(
      (s: { textTransform?: string }) => s.textTransform === 'uppercase'
    );
    expect(hasUppercase).toBe(true);
  });

  it('TableCell body uses normal foreground color', () => {
    const result = TableCell({ variant: 'primary-header', children: 'data' });
    const textChild = result.props.children;
    const textStyleArr = Array.isArray(textChild.props.style)
      ? textChild.props.style
      : [textChild.props.style];
    const hasFg = textStyleArr.some((s: { color?: string }) => s.color === theme.colors.foreground);
    expect(hasFg).toBe(true);
  });
});
