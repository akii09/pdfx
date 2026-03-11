import { describe, expect, it } from 'vitest';
import { PdfPageNumber } from './page-number';

describe('PdfPageNumber', () => {
  it('renders without error', () => {
    const result = PdfPageNumber({});
    expect(result).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('renders with default format', () => {
    const result = PdfPageNumber({});
    // The component renders a View with a Text child that has a render prop
    expect(result.props.children).toBeDefined();
  });

  it('accepts custom format prop', () => {
    const result = PdfPageNumber({ format: '{page} / {total}' });
    expect(result).toBeDefined();
  });

  it('accepts align prop', () => {
    const resultLeft = PdfPageNumber({ align: 'left' });
    const resultCenter = PdfPageNumber({ align: 'center' });
    const resultRight = PdfPageNumber({ align: 'right' });
    expect(resultLeft).toBeDefined();
    expect(resultCenter).toBeDefined();
    expect(resultRight).toBeDefined();
  });

  it('accepts size prop', () => {
    const resultXs = PdfPageNumber({ size: 'xs' });
    const resultSm = PdfPageNumber({ size: 'sm' });
    const resultMd = PdfPageNumber({ size: 'md' });
    expect(resultXs).toBeDefined();
    expect(resultSm).toBeDefined();
    expect(resultMd).toBeDefined();
  });

  it('accepts fixed prop', () => {
    const result = PdfPageNumber({ fixed: true });
    expect(result.props.fixed).toBe(true);
  });

  it('accepts muted prop', () => {
    const resultMuted = PdfPageNumber({ muted: true });
    const resultNotMuted = PdfPageNumber({ muted: false });
    expect(resultMuted).toBeDefined();
    expect(resultNotMuted).toBeDefined();
  });

  it('accepts custom style prop', () => {
    const customStyle = { marginTop: 10 };
    const result = PdfPageNumber({ style: customStyle });
    expect(result).toBeDefined();
  });
});
