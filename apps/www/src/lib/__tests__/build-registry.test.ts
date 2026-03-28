import { describe, expect, it } from 'vitest';
import { transformBlockForRegistry, transformForRegistry } from '../build-registry.js';

//  transformForRegistry ─────────────────────────────────────────────────────

describe('transformForRegistry: @pdfx/shared import removal', () => {
  it('strips a type-only import from @pdfx/shared', () => {
    const input = `import type { PDFComponentProps } from '@pdfx/shared';\nexport function Heading() {}`;
    const { content } = transformForRegistry(input);
    expect(content).not.toContain("from '@pdfx/shared'");
    expect(content).toContain('export function Heading');
  });

  it('strips multiple @pdfx/shared imports', () => {
    const input = [
      `import type { PDFComponentProps } from '@pdfx/shared';`,
      `import type { PdfxTheme } from '@pdfx/shared';`,
      'export function Text() {}',
    ].join('\n');
    const { content } = transformForRegistry(input);
    expect(content).not.toContain("'@pdfx/shared'");
  });

  it('leaves unrelated imports untouched', () => {
    const input = `import type { Style } from '@react-pdf/types';\nexport function Heading() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from '@react-pdf/types'");
  });
});

describe('transformForRegistry: PDFComponentProps inlining', () => {
  it('inlines extends PDFComponentProps {} (empty body)', () => {
    const input = `import type { PDFComponentProps } from '@pdfx/shared';\nexport interface HeadingProps extends PDFComponentProps {}`;
    const { content } = transformForRegistry(input);
    expect(content).not.toContain('PDFComponentProps');
    expect(content).toContain('children: React.ReactNode');
    expect(content).toContain('style?: Style');
  });

  it('inlines extends PDFComponentProps { (non-empty body)', () => {
    const input = [
      `import type { PDFComponentProps } from '@pdfx/shared';`,
      'export interface BadgeProps extends PDFComponentProps {',
      "  variant?: 'solid' | 'outline';",
      '}',
    ].join('\n');
    const { content } = transformForRegistry(input);
    expect(content).not.toContain('extends PDFComponentProps');
    expect(content).toContain("variant?: 'solid' | 'outline'");
    expect(content).toContain('children: React.ReactNode');
  });

  it('inlines extends Omit<PDFComponentProps, "children"> {} (empty body)', () => {
    const input = `import type { PDFComponentProps } from '@pdfx/shared';\nexport interface DividerProps extends Omit<PDFComponentProps, 'children'> {}`;
    const { content } = transformForRegistry(input);
    expect(content).not.toContain('PDFComponentProps');
    expect(content).toContain('style?: Style');
    expect(content).not.toContain('children: React.ReactNode');
  });
});

describe('transformForRegistry: PdfxTheme alias injection', () => {
  it('injects ReturnType alias after usePdfxTheme import in .tsx files', () => {
    const input = [
      `import { usePdfxTheme } from '../lib/pdfx-theme-context';`,
      'export function Heading({ theme }: { theme: PdfxTheme }) {}',
    ].join('\n');
    const { content } = transformForRegistry(input);
    expect(content).toContain('type PdfxTheme = ReturnType<typeof usePdfxTheme>');
  });

  it('does not inject alias when PdfxTheme is absent', () => {
    const input = `import { usePdfxTheme } from '../lib/pdfx-theme-context';\nexport function Heading() {}`;
    const { content } = transformForRegistry(input);
    expect(content).not.toContain('ReturnType');
  });
});

describe('transformForRegistry: theme import path normalization', () => {
  it('normalizes ../../lib/pdfx-theme to ../lib/pdfx-theme', () => {
    const input = `import { theme } from '../../lib/pdfx-theme';\nexport function X() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from '../lib/pdfx-theme'");
    expect(content).not.toContain("from '../../lib/pdfx-theme'");
  });

  it('normalizes ../../lib/pdfx-theme-context to ../lib/pdfx-theme-context', () => {
    const input = `import { usePdfxTheme } from '../../lib/pdfx-theme-context';\nexport function X() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from '../lib/pdfx-theme-context'");
    expect(content).not.toContain("from '../../lib/pdfx-theme-context'");
  });
});

describe('transformForRegistry: intra-component import rewriting', () => {
  it('rewrites ./heading.styles to ./pdfx-heading.styles', () => {
    const input = `import { createHeadingStyles } from './heading.styles';\nexport function Heading() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from './pdfx-heading.styles'");
    expect(content).not.toContain("'./heading.styles'");
  });

  it('rewrites ./heading.types to ./pdfx-heading.types', () => {
    const input = `import type { HeadingProps } from './heading.types';\nexport function Heading() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from './pdfx-heading.types'");
    expect(content).not.toContain("'./heading.types'");
  });

  it('rewrites cross-component ../table/table.types to ../table/pdfx-table.types', () => {
    const input = `import type { TableVariant } from '../table/table.types';\nexport function DataTable() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from '../table/pdfx-table.types'");
    expect(content).not.toContain("'../table/table.types'");
  });

  it('rewrites ../table import to ../table/pdfx-table', () => {
    const input = `import { Table } from '../table';\nexport function DataTable() {}`;
    const { content } = transformForRegistry(input);
    expect(content).toContain("from '../table/pdfx-table'");
    expect(content).not.toContain("from '../table'");
  });
});

describe('transformForRegistry: resolveColor inlining', () => {
  it('removes the resolve-color import and inlines the helper', () => {
    // The injection regex anchors on \nexport function, so content must have
    // something before the export (mirrors real component files with imports).
    const input = [
      `import { resolveColor } from '../../lib/resolve-color';`,
      `import { StyleSheet } from '@react-pdf/renderer';`,
      '',
      'export function Badge() {}',
    ].join('\n');
    const { content } = transformForRegistry(input);
    expect(content).not.toContain('resolve-color');
    expect(content).toContain('function resolveColor');
    expect(content).toContain('THEME_COLOR_KEYS');
  });
});

describe('transformForRegistry: usesTheme flag', () => {
  it('returns usesTheme: true when content references pdfx-theme', () => {
    const input = `import { theme } from '../lib/pdfx-theme';\nexport function X() {}`;
    const { usesTheme } = transformForRegistry(input);
    expect(usesTheme).toBe(true);
  });

  it('returns usesTheme: false when content has no pdfx-theme reference', () => {
    const input = `import React from 'react';\nexport function X() {}`;
    const { usesTheme } = transformForRegistry(input);
    expect(usesTheme).toBe(false);
  });
});

//  transformBlockForRegistry ────────────────────────────────────────────────

describe('transformBlockForRegistry: no rewrites needed', () => {
  it('returns content unchanged when no pdfx imports exist', () => {
    const input = `import { Document, Page } from '@react-pdf/renderer';`;
    expect(transformBlockForRegistry(input)).toBe(input);
  });
});

describe('transformBlockForRegistry: @pdfx/shared rewriting', () => {
  it('rewrites @pdfx/shared type import to ../../lib/pdfx-theme', () => {
    const input = `import type { PdfxTheme } from '@pdfx/shared';`;
    const result = transformBlockForRegistry(input);
    expect(result).toContain("from '../../lib/pdfx-theme'");
    expect(result).not.toContain("'@pdfx/shared'");
  });
});

describe('transformBlockForRegistry: @pdfx/components splitting', () => {
  it('rewrites a single component import to its consumer path', () => {
    const input = `import { Heading } from '@pdfx/components';`;
    const result = transformBlockForRegistry(input);
    expect(result).toContain("from '../../components/pdfx/heading/pdfx-heading'");
    expect(result).not.toContain("'@pdfx/components'");
  });

  it('rewrites theme context exports to ../../lib/pdfx-theme-context', () => {
    const input = `import { usePdfxTheme } from '@pdfx/components';`;
    const result = transformBlockForRegistry(input);
    expect(result).toContain("from '../../lib/pdfx-theme-context'");
    expect(result).not.toContain("'@pdfx/components'");
  });

  it('groups multiple exports for the same component file into one import', () => {
    const input = `import { Table, TableRow, TableCell, TableBody, TableHeader } from '@pdfx/components';`;
    const result = transformBlockForRegistry(input);
    // All table exports map to the same file — must be a single import
    const tableImports = result.split('\n').filter((line) => line.includes('pdfx-table'));
    expect(tableImports).toHaveLength(1);
    expect(tableImports[0]).toContain('Table');
    expect(tableImports[0]).toContain('TableRow');
    expect(tableImports[0]).toContain('TableCell');
  });

  it('splits mixed imports: theme context + multiple components', () => {
    const input = `import { Heading, usePdfxTheme, PdfAlert } from '@pdfx/components';`;
    const result = transformBlockForRegistry(input);
    expect(result).toContain("from '../../lib/pdfx-theme-context'");
    expect(result).toContain("from '../../components/pdfx/heading/pdfx-heading'");
    expect(result).toContain("from '../../components/pdfx/alert/pdfx-alert'");
    expect(result).not.toContain("'@pdfx/components'");
  });

  it('preserves unrelated imports alongside rewritten ones', () => {
    const input = [
      `import { Document } from '@react-pdf/renderer';`,
      `import { Heading } from '@pdfx/components';`,
    ].join('\n');
    const result = transformBlockForRegistry(input);
    expect(result).toContain("from '@react-pdf/renderer'");
    expect(result).toContain("from '../../components/pdfx/heading/pdfx-heading'");
  });
});
