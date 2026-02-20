import { describe, expect, it } from 'vitest';
import { PdfFormSection } from './form';

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

const sampleRows = [
  { label: 'Name', value: 'Jane Doe' },
  { label: 'Email', value: 'jane@example.com' },
  { label: 'Phone', value: '+1 555 000' },
  { label: 'Date', value: '2026-02-17' },
];

describe('PdfFormSection', () => {
  it('renders without crashing', () => {
    const result = PdfFormSection({ rows: sampleRows });
    expect(result).toBeDefined();
  });

  it('renders all labels', () => {
    const result = PdfFormSection({ rows: sampleRows });
    for (const row of sampleRows) {
      expect(findText(result, row.label)).toBe(true);
    }
  });

  it('renders all values', () => {
    const result = PdfFormSection({ rows: sampleRows });
    for (const row of sampleRows) {
      expect(findText(result, row.value)).toBe(true);
    }
  });

  it('renders optional title', () => {
    const result = PdfFormSection({ rows: sampleRows, title: 'Applicant Info' });
    expect(findText(result, 'Applicant Info')).toBe(true);
  });

  it('does not render title when not provided', () => {
    const result = PdfFormSection({ rows: sampleRows });
    expect(findText(result, 'Applicant Info')).toBe(false);
  });

  it('single layout has column container (no columnsRow)', () => {
    const result = PdfFormSection({ rows: sampleRows, layout: 'single' });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    // Single layout uses a plain section style (no flexDirection: row)
    const hasRow = styleArr.some((s: { flexDirection?: string }) => s.flexDirection === 'row');
    expect(hasRow).toBe(false);
  });

  it('two-column layout has a row container with two children', () => {
    const result = PdfFormSection({ rows: sampleRows, layout: 'two-column' });
    // The children after optional title should include a row view
    const children = Array.isArray(result.props.children)
      ? result.props.children
      : [result.props.children];
    // Find the columns row (it should have flexDirection row)
    const colRow = children.find((c: { props?: { style?: unknown } }) => {
      const s = c?.props?.style;
      const arr = Array.isArray(s) ? s : [s];
      return arr.some((x: { flexDirection?: string }) => x?.flexDirection === 'row');
    });
    expect(colRow).toBeDefined();
  });

  it('three-column layout renders', () => {
    const result = PdfFormSection({ rows: sampleRows, layout: 'three-column' });
    // All values should still be present
    for (const row of sampleRows) {
      expect(findText(result, row.value)).toBe(true);
    }
  });

  it('applies style override', () => {
    const result = PdfFormSection({ rows: sampleRows, style: { opacity: 0.9 } });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const last = styleArr[styleArr.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.9);
  });
});
