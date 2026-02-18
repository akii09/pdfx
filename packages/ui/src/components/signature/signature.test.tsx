import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { PdfSignatureBlock } from './signature';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  // Handle raw arrays (e.g. from .map() in JSX)
  if (Array.isArray(node)) return node.some((c: unknown) => findText(c, value));
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

describe('PdfSignatureBlock', () => {
  it('renders without crashing', () => {
    const result = PdfSignatureBlock({});
    expect(result).toBeDefined();
  });

  it('single variant renders label', () => {
    const result = PdfSignatureBlock({ label: 'Authorized signature' });
    expect(findText(result, 'Authorized signature')).toBe(true);
  });

  it('single variant renders name when provided', () => {
    const result = PdfSignatureBlock({ name: 'Jane Doe' });
    expect(findText(result, 'Jane Doe')).toBe(true);
  });

  it('single variant renders title when provided', () => {
    const result = PdfSignatureBlock({ title: 'Director' });
    expect(findText(result, 'Director')).toBe(true);
  });

  it('single variant renders date when provided', () => {
    const result = PdfSignatureBlock({ date: '2026-02-17' });
    expect(findText(result, '2026-02-17')).toBe(true);
  });

  it('double variant renders two default labels', () => {
    const result = PdfSignatureBlock({ variant: 'double' });
    expect(findText(result, 'Authorized by')).toBe(true);
    expect(findText(result, 'Approved by')).toBe(true);
  });

  it('double variant uses custom signers when provided', () => {
    const result = PdfSignatureBlock({
      variant: 'double',
      signers: [
        { label: 'Client', name: 'Alice', title: 'CEO', date: '2026-01-01' },
        { label: 'Vendor', name: 'Bob', title: 'CTO', date: '2026-01-01' },
      ],
    });
    expect(findText(result, 'Client')).toBe(true);
    expect(findText(result, 'Vendor')).toBe(true);
    expect(findText(result, 'Alice')).toBe(true);
    expect(findText(result, 'Bob')).toBe(true);
  });

  it('double variant row has flexDirection row (side by side)', () => {
    const result = PdfSignatureBlock({ variant: 'double' });
    const inner = result.props.children as { props?: { style?: unknown } };
    const s = inner?.props?.style;
    const arr = Array.isArray(s) ? s : [s];
    const isRow = arr.some((x: { flexDirection?: string }) => x?.flexDirection === 'row');
    expect(isRow).toBe(true);
  });

  it('inline variant renders label with colon', () => {
    const result = PdfSignatureBlock({ variant: 'inline', label: 'Signed by' });
    expect(findText(result, 'Signed by:')).toBe(true);
  });

  it('inline variant renders name when provided', () => {
    const result = PdfSignatureBlock({ variant: 'inline', name: 'J. Smith' });
    expect(findText(result, 'J. Smith')).toBe(true);
  });

  it('inline variant row has flexDirection row', () => {
    const result = PdfSignatureBlock({ variant: 'inline' });
    const inner = result.props.children as { props?: { style?: unknown } };
    const s = inner?.props?.style;
    const arr = Array.isArray(s) ? s : [s];
    const isRow = arr.some((x: { flexDirection?: string }) => x?.flexDirection === 'row');
    expect(isRow).toBe(true);
  });

  it('container has marginTop from theme sectionGap', () => {
    const result = PdfSignatureBlock({});
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasMarginTop = styleArr.some(
      (s: { marginTop?: number }) => s.marginTop === theme.spacing.sectionGap
    );
    expect(hasMarginTop).toBe(true);
  });

  it('applies style override', () => {
    const result = PdfSignatureBlock({ style: { opacity: 0.7 } });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const last = styleArr[styleArr.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.7);
  });
});
