import { describe, expect, it } from 'vitest';
import { resolveBlockImports } from './block.js';

/**
 * Unit tests for resolveBlockImports.
 *
 * The function rewrites two classes of import in block source files:
 *
 *   1. Peer-component imports
 *      Pattern:  ../../components/pdfx/{name}/pdfx-{name}
 *      Rewritten to the real relative path between the installed block
 *      directory and the installed component directory.
 *
 *   2. Theme / theme-context imports
 *      Pattern:  ../../lib/pdfx-theme  and  ../../lib/pdfx-theme-context
 *      Rewritten only when config.theme is set.
 *
 * All assertions are CWD-independent because path.relative() cancels out
 * the cwd prefix — only the structural relationship between directories
 * matters.
 */

const defaultConfig = {
  componentDir: './src/components/pdfx',
  blockDir: './src/blocks/pdfx',
  registry: 'https://pdfx.akashpise.dev/r',
};

describe('resolveBlockImports: no rewrites needed', () => {
  it('returns content unchanged when there are no pdfx imports', () => {
    const content = `import { Document, Page } from '@react-pdf/renderer';`;
    expect(resolveBlockImports(content, 'invoice-classic', defaultConfig)).toBe(content);
  });

  it('returns content unchanged when theme imports are present but config.theme is not set', () => {
    const content = `import { theme } from '../../lib/pdfx-theme';`;
    expect(resolveBlockImports(content, 'invoice-classic', defaultConfig)).toBe(content);
  });
});

describe('resolveBlockImports: peer component imports', () => {
  it('rewrites a single peer component import for the default layout', () => {
    // blockSubdir  = {cwd}/src/blocks/pdfx/invoice-classic
    // absCompFile  = {cwd}/src/components/pdfx/page-header/pdfx-page-header
    // relative     = ../../../components/pdfx/page-header/pdfx-page-header
    const content = `import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';`;
    const result = resolveBlockImports(content, 'invoice-classic', defaultConfig);
    expect(result).toContain("from '../../../components/pdfx/page-header/pdfx-page-header'");
    expect(result).not.toContain("'../../components/pdfx/page-header/pdfx-page-header'");
  });

  it('rewrites multiple peer component imports in a single pass', () => {
    const content = [
      `import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';`,
      `import { PageFooter } from '../../components/pdfx/page-footer/pdfx-page-footer';`,
    ].join('\n');
    const result = resolveBlockImports(content, 'invoice-classic', defaultConfig);
    expect(result).toContain("from '../../../components/pdfx/page-header/pdfx-page-header'");
    expect(result).toContain("from '../../../components/pdfx/page-footer/pdfx-page-footer'");
  });

  it('preserves unrelated imports unchanged', () => {
    const content = [
      `import { View } from '@react-pdf/renderer';`,
      `import { PageHeader } from '../../components/pdfx/page-header/pdfx-page-header';`,
    ].join('\n');
    const result = resolveBlockImports(content, 'invoice-classic', defaultConfig);
    expect(result).toContain("from '@react-pdf/renderer'");
  });

  it('computes a shallower relative path for a custom blockDir closer to root', () => {
    // blockSubdir  = {cwd}/blocks/invoice-classic
    // absCompFile  = {cwd}/src/components/pdfx/page-header/pdfx-page-header
    // relative     = ../../src/components/pdfx/page-header/pdfx-page-header
    const config = { ...defaultConfig, blockDir: './blocks' };
    const content = `import { A } from '../../components/pdfx/page-header/pdfx-page-header';`;
    const result = resolveBlockImports(content, 'invoice-classic', config);
    expect(result).toContain("from '../../src/components/pdfx/page-header/pdfx-page-header'");
  });

  it('uses DEFAULTS.BLOCK_DIR when config.blockDir is absent', () => {
    const configWithoutBlockDir = {
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
    };
    const content = `import { A } from '../../components/pdfx/page-header/pdfx-page-header';`;
    // Should not throw; falls back to DEFAULTS.BLOCK_DIR
    expect(() =>
      resolveBlockImports(content, 'invoice-classic', configWithoutBlockDir as never)
    ).not.toThrow();
  });
});

describe('resolveBlockImports: theme imports', () => {
  const themeConfig = { ...defaultConfig, theme: './src/lib/pdfx-theme.ts' };

  it('rewrites the theme import when config.theme is set', () => {
    // blockSubdir   = {cwd}/src/blocks/pdfx/invoice-classic
    // absThemePath  = {cwd}/src/lib/pdfx-theme  (extension stripped)
    // relative      = ../../../lib/pdfx-theme
    const content = `import { theme } from '../../lib/pdfx-theme';`;
    const result = resolveBlockImports(content, 'invoice-classic', themeConfig);
    expect(result).toContain("from '../../../lib/pdfx-theme'");
    expect(result).not.toContain("'../../lib/pdfx-theme'");
  });

  it('rewrites the theme-context import when config.theme is set', () => {
    const content = `import { usePdfxTheme } from '../../lib/pdfx-theme-context';`;
    const result = resolveBlockImports(content, 'invoice-classic', themeConfig);
    expect(result).toContain("from '../../../lib/pdfx-theme-context'");
    expect(result).not.toContain("'../../lib/pdfx-theme-context'");
  });

  it('rewrites both theme and theme-context imports together', () => {
    const content = [
      `import { theme } from '../../lib/pdfx-theme';`,
      `import { usePdfxTheme } from '../../lib/pdfx-theme-context';`,
    ].join('\n');
    const result = resolveBlockImports(content, 'invoice-classic', themeConfig);
    expect(result).toContain("from '../../../lib/pdfx-theme'");
    expect(result).toContain("from '../../../lib/pdfx-theme-context'");
  });

  it('handles a .tsx theme extension correctly (strips extension before resolving)', () => {
    const config = { ...defaultConfig, theme: './src/lib/pdfx-theme.tsx' };
    const content = `import { theme } from '../../lib/pdfx-theme';`;
    const result = resolveBlockImports(content, 'invoice-classic', config);
    expect(result).toContain("from '../../../lib/pdfx-theme'");
  });
});

describe('resolveBlockImports: block name in path', () => {
  it('uses the provided block name to construct the block subdirectory', () => {
    // Different block name → different blockSubdir depth is identical but
    // we verify the function accepts any valid block name without error.
    const content = `import { A } from '../../components/pdfx/page-header/pdfx-page-header';`;
    expect(() => resolveBlockImports(content, 'report-financial', defaultConfig)).not.toThrow();
    expect(() => resolveBlockImports(content, 'invoice-consultant', defaultConfig)).not.toThrow();
  });
});
