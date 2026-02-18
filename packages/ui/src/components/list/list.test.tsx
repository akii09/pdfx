import { describe, expect, it } from 'vitest';
import { PdfList } from './list';

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

/** Collect all string leaf values in the tree. */
function collectTexts(node: unknown, acc: string[] = []): string[] {
  if (!node || typeof node !== 'object') {
    if (typeof node === 'string') acc.push(node);
    return acc;
  }
  if (Array.isArray(node)) {
    for (const c of node) collectTexts(c, acc);
    return acc;
  }
  const n = node as { props?: { children?: unknown } };
  const ch = n.props?.children;
  if (typeof ch === 'string') {
    acc.push(ch);
    return acc;
  }
  if (Array.isArray(ch)) {
    for (const c of ch) collectTexts(c, acc);
    return acc;
  }
  if (ch) collectTexts(ch, acc);
  return acc;
}

const sampleItems = [
  { text: 'Alpha', description: 'First item' },
  { text: 'Beta', description: 'Second item' },
  { text: 'Gamma', description: 'Third item' },
];

describe('PdfList', () => {
  it('renders without crashing', () => {
    const result = PdfList({ items: sampleItems });
    expect(result).toBeDefined();
  });

  it('renders all item texts (bullet variant)', () => {
    const result = PdfList({ items: sampleItems, variant: 'bullet' });
    for (const item of sampleItems) {
      expect(findText(result, item.text)).toBe(true);
    }
  });

  it('renders numbered variant with dot separator', () => {
    const result = PdfList({ items: sampleItems, variant: 'numbered' });
    // In JSX {index+1}. becomes separate children: number and ". "
    const texts = collectTexts(result);
    // Should contain the separator string ". " for each item
    expect(texts.filter((t) => t === '. ').length).toBe(sampleItems.length);
  });

  it('renders checklist items', () => {
    const result = PdfList({ items: sampleItems, variant: 'checklist' });
    expect(findText(result, sampleItems[0].text)).toBe(true);
  });

  it('renders icon list items', () => {
    const result = PdfList({ items: sampleItems, variant: 'icon' });
    expect(findText(result, sampleItems[0].text)).toBe(true);
  });

  it('renders multi-level items with nesting', () => {
    const nestedItems = [
      {
        text: 'Parent',
        children: [{ text: 'Child A' }, { text: 'Child B' }],
      },
    ];
    const result = PdfList({ items: nestedItems, variant: 'multi-level' });
    expect(findText(result, 'Parent')).toBe(true);
    expect(findText(result, 'Child A')).toBe(true);
    expect(findText(result, 'Child B')).toBe(true);
  });

  it('renders descriptive variant with descriptions', () => {
    const result = PdfList({ items: sampleItems, variant: 'descriptive' });
    expect(findText(result, sampleItems[0].text)).toBe(true);
    expect(findText(result, sampleItems[0].description as string)).toBe(true);
  });

  it('renders checklist with checked=true showing checkmark', () => {
    const items = [{ text: 'Done', checked: true }];
    const result = PdfList({ items, variant: 'checklist' });
    expect(findText(result, '✓')).toBe(true);
  });

  it('renders checklist with checked=false without checkmark', () => {
    const items = [{ text: 'Pending', checked: false }];
    const result = PdfList({ items, variant: 'checklist' });
    expect(findText(result, '✓')).toBe(false);
  });

  it('applies style override to outer container', () => {
    const result = PdfList({ items: sampleItems, style: { opacity: 0.5 } });
    const styleArr = Array.isArray(result.props.style) ? result.props.style : [result.props.style];
    const last = styleArr[styleArr.length - 1] as { opacity?: number };
    expect(last.opacity).toBe(0.5);
  });

  it('defaults to bullet variant — renders bullet character', () => {
    const result = PdfList({ items: sampleItems });
    // JSX {marker} ' ' produces two children: the marker char and ' '
    const texts = collectTexts(result);
    expect(texts.some((t) => t === '\u2022')).toBe(true);
  });

  it('renders nested bullet sub-items with open circle marker', () => {
    const nestedItems = [
      {
        text: 'Parent',
        children: [{ text: 'Sub-item' }],
      },
    ];
    const result = PdfList({ items: nestedItems, variant: 'bullet' });
    const texts = collectTexts(result);
    // Sub-level uses ◦ (open circle) as separate child
    expect(texts.some((t) => t === '\u25E6')).toBe(true);
  });
});
