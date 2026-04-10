import { describe, expect, it } from 'vitest';
import { PdfList } from './list';
import { createListStyles } from './list.styles';

describe('PdfList', () => {
  it('renders without throwing', () => {
    expect(() => PdfList({ items: [] })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() =>
      PdfList({ items: [{ text: 'First' }, { text: 'Second' }], variant: 'numbered' })
    ).not.toThrow();
  });
  it('renders all variants without throwing', () => {
    const variants = [
      'bullet',
      'numbered',
      'checklist',
      'icon',
      'multi-level',
      'descriptive',
    ] as const;
    const items = [
      { text: 'Item one with a long text that wraps to multiple lines in a PDF document' },
      { text: 'Item two' },
    ];
    for (const variant of variants) {
      expect(() => PdfList({ items, variant })).not.toThrow();
    }
  });
});

describe('PdfList styles', () => {
  it('itemText and itemTextSub do not have flex (prevents Yoga height underestimation)', () => {
    // Regression for: overlapping rows when list item text wraps to multiple lines.
    // flex on a Text node sets flexBasis:0 — Yoga then under-measures the text
    // height for multi-line content. flex:1 must live on the wrapping View only.
    const mockTheme = {
      colors: {
        foreground: '#000',
        mutedForeground: '#666',
        primary: '#3b82f6',
        primaryForeground: '#fff',
        border: '#e2e8f0',
        background: '#fff',
        success: '#22c55e',
      },
      typography: { body: { fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.4 } },
      primitives: {
        spacing: { 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20 },
        fontWeights: { semibold: 600, bold: 700 },
        typography: { xs: 10, sm: 12 },
        borderRadius: { sm: 2, md: 4 },
      },
      spacing: { componentGap: 16 },
      // biome-ignore lint/suspicious/noExplicitAny: minimal mock theme for unit test
    } as any;
    const styles = createListStyles(mockTheme);
    expect(styles.itemText).not.toHaveProperty('flex');
    expect(styles.itemTextSub).not.toHaveProperty('flex');
    expect(styles.itemTextWrap.flex).toBe(1);
  });
});
