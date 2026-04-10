import { describe, expect, it } from 'vitest';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './table';
import { createTableStyles } from './table.styles';

describe('Table', () => {
  it('renders without throwing', () => {
    expect(() => Table({ children: null })).not.toThrow();
  });
  it('accepts variant prop', () => {
    expect(() => Table({ variant: 'bordered', children: null })).not.toThrow();
  });
});

describe('TableRow / TableCell', () => {
  it('TableRow renders without throwing', () => {
    expect(() => TableRow({ children: null })).not.toThrow();
  });
  it('TableCell renders without throwing', () => {
    expect(() => TableCell({ children: 'Value' })).not.toThrow();
  });
  it('TableCell accepts a fixed width without throwing', () => {
    // Regression test for: fixed-width columns collapsing to zero width.
    // Root cause was `flex: 0` in cellFixed, which sets flexBasis:0 and
    // overrides the explicit `width` prop in Yoga layout.
    expect(() => TableCell({ width: '50px', children: 'Score' })).not.toThrow();
    expect(() => TableCell({ width: 80, children: 'Score' })).not.toThrow();
  });
  it('cellFixed style uses individual flex properties, not the flex shorthand', () => {
    // `flex: 0` is shorthand for flexGrow:0 + flexShrink:0 + flexBasis:0.
    // flexBasis:0 collapses fixed-width cells to zero regardless of the width prop.
    // Using flexGrow/flexShrink individually leaves flexBasis unset so `width` works.
    const mockTheme = {
      colors: {
        border: '#e2e8f0',
        muted: '#f8fafc',
        primary: '#3b82f6',
        foreground: '#1a1a1a',
        mutedForeground: '#6b7280',
        primaryForeground: '#ffffff',
      },
      typography: { body: { fontFamily: 'Helvetica', fontSize: 11, lineHeight: 1.4 } },
      primitives: {
        spacing: { 0.5: 2, 1: 4, 2: 8, 3: 12, 4: 16 },
        fontWeights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
        typography: { xs: 10, sm: 12 },
        lineHeights: { normal: 1.4 },
        borderRadius: { sm: 2, md: 4 },
      },
      spacing: { componentGap: 16, paragraphGap: 8 },
      // biome-ignore lint/suspicious/noExplicitAny: minimal mock theme for unit test
    } as any;
    const styles = createTableStyles(mockTheme);
    expect(styles.cellFixed).not.toHaveProperty('flex');
    expect(styles.cellFixed.flexGrow).toBe(0);
    expect(styles.cellFixed.flexShrink).toBe(0);
  });
});

describe('TableHeader / TableBody', () => {
  it('TableHeader renders without throwing', () => {
    expect(() => TableHeader({ children: null })).not.toThrow();
  });
  it('TableBody renders without throwing', () => {
    expect(() => TableBody({ children: null })).not.toThrow();
  });
});
