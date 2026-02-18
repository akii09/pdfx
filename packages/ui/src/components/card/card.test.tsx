import { describe, expect, it } from 'vitest';
import { theme } from '../../lib/pdfx-theme';
import { PdfCard } from './card';

/** Recursively search a react-pdf element tree for a text value. */
function findText(node: unknown, value: string): boolean {
  if (!node || typeof node !== 'object') return false;
  const n = node as { props?: { children?: unknown } };
  if (n.props?.children === value) return true;
  const children = Array.isArray(n.props?.children) ? n.props.children : [n.props?.children];
  return children.some((c: unknown) => findText(c, value));
}

describe('PdfCard', () => {
  it('renders without crashing', () => {
    const result = PdfCard({ children: 'Body text' });
    expect(result).toBeDefined();
  });

  it('renders string children as text', () => {
    const result = PdfCard({ children: 'Hello Card' });
    expect(findText(result, 'Hello Card')).toBe(true);
  });

  it('renders title when provided', () => {
    const result = PdfCard({ title: 'Summary', children: 'Content' });
    expect(findText(result, 'Summary')).toBe(true);
  });

  it('does not render title element when not provided', () => {
    const result = PdfCard({ children: 'No title' });
    expect(findText(result, 'Summary')).toBe(false);
  });

  it('default variant has 1px border', () => {
    const result = PdfCard({ children: 'x', variant: 'default' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const has1pxBorder = styleArr.some((s: { borderWidth?: number }) => s.borderWidth === 1);
    expect(has1pxBorder).toBe(true);
  });

  it('bordered variant has 2px border', () => {
    const result = PdfCard({ children: 'x', variant: 'bordered' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const has2pxBorder = styleArr.some((s: { borderWidth?: number }) => s.borderWidth === 2);
    expect(has2pxBorder).toBe(true);
  });

  it('muted variant has muted background', () => {
    const result = PdfCard({ children: 'x', variant: 'muted' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasMuted = styleArr.some(
      (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.muted
    );
    expect(hasMuted).toBe(true);
  });

  it('default variant has background (not muted)', () => {
    const result = PdfCard({ children: 'x', variant: 'default' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const hasBackground = styleArr.some(
      (s: { backgroundColor?: string }) => s.backgroundColor === theme.colors.background
    );
    expect(hasBackground).toBe(true);
  });

  it('applies sm padding', () => {
    const result = PdfCard({ children: 'x', padding: 'sm' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // sm = spacing[2] = 8
    const hasSm = styleArr.some((s: { padding?: number }) => s.padding === 8);
    expect(hasSm).toBe(true);
  });

  it('applies lg padding', () => {
    const result = PdfCard({ children: 'x', padding: 'lg' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // lg = spacing[4] = 16
    const hasLg = styleArr.some((s: { padding?: number }) => s.padding === 16);
    expect(hasLg).toBe(true);
  });

  it('applies style override last', () => {
    const result = PdfCard({ children: 'x', style: { opacity: 0.6 } });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const last = styleArr[styleArr.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.6);
  });
});
