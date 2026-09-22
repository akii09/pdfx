import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULTS } from '../constants.js';
import { checkFileExists, ensureDir, writeFile } from '../utils/file-system.js';
import { readJsonFile } from '../utils/read-json.js';
import { blockAdd, blockList, resolveBlockImports } from './block.js';

const spinner = vi.hoisted(() => ({
  start: vi.fn().mockReturnThis(),
  stop: vi.fn(),
  fail: vi.fn(),
  succeed: vi.fn(),
  info: vi.fn(),
}));

vi.mock('ora', () => ({ default: vi.fn(() => spinner) }));
vi.mock('../utils/read-json.js', () => ({ readJsonFile: vi.fn() }));
vi.mock('../utils/file-system.js', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../utils/file-system.js')>()),
  checkFileExists: vi.fn(),
  ensureDir: vi.fn(),
  writeFile: vi.fn(),
}));
vi.mock('../utils/posthog.js', () => ({
  distinctId: 'test',
  posthog: { capture: vi.fn(), captureException: vi.fn() },
  shutdownPosthog: vi.fn().mockResolvedValue(undefined),
}));

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
  registry: DEFAULTS.REGISTRY_URL,
};

describe('block registry requests', () => {
  const block = {
    name: 'invoice-classic',
    files: [
      {
        path: 'invoice-classic.tsx',
        content: 'export const Invoice = {};',
        type: 'registry:block',
      },
    ],
    peerComponents: ['heading'],
  };
  const component = {
    name: 'heading',
    files: [
      {
        path: 'pdfx-heading.tsx',
        content: 'export const Heading = {};',
        type: 'registry:component',
      },
    ],
  };
  const registryIndex = {
    $schema: 'https://example.com/schema.json',
    name: 'test',
    homepage: 'https://example.com',
    items: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    spinner.start.mockReturnValue(spinner);
    vi.mocked(readJsonFile).mockReturnValue({ ...defaultConfig });
    vi.mocked(checkFileExists).mockImplementation((filePath) =>
      filePath.endsWith(`${path.sep}pdfx.json`)
    );
    vi.stubGlobal('fetch', vi.fn());
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each([
    undefined,
    '',
    'REG',
    'http://',
    'ftp://example.com/r',
    'https://example.com/r?token=test',
    'https://example.com/r#registry',
    'https://user:password@example.com/r',
  ])('rejects invalid registry %s before fetching or writing files', async (registry) => {
    vi.mocked(readJsonFile).mockReturnValue({ ...defaultConfig, registry });

    await expect(blockAdd(['invoice-classic'])).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Invalid pdfx.json'));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('"registry"'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(DEFAULTS.REGISTRY_URL));
    expect(fetch).not.toHaveBeenCalled();
    expect(ensureDir).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it.each([
    [DEFAULTS.REGISTRY_URL, DEFAULTS.REGISTRY_URL],
    ['https://example.com/custom/registry///', 'https://example.com/custom/registry'],
    ['  https://example.com/r/  ', 'https://example.com/r'],
    ['http://localhost:3000/r/', 'http://localhost:3000/r'],
    ['http://127.0.0.1:8080/r', 'http://127.0.0.1:8080/r'],
    ['http://[::1]:8080/r', 'http://[::1]:8080/r'],
    ['http://REG', 'http://REG'],
  ])('installs a block and its peers from %s', async (registry, baseUrl) => {
    vi.mocked(readJsonFile).mockReturnValue({ ...defaultConfig, registry });
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(block))
      .mockResolvedValueOnce(Response.json(component));

    await blockAdd(['invoice-classic']);

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      `${baseUrl}/blocks/invoice-classic.json`,
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      `${baseUrl}/heading.json`,
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(writeFile).toHaveBeenCalledWith(
      path.resolve(defaultConfig.blockDir, 'invoice-classic/invoice-classic.tsx'),
      block.files[0].content
    );
    expect(writeFile).toHaveBeenCalledWith(
      path.resolve(defaultConfig.componentDir, 'heading/pdfx-heading.tsx'),
      component.files[0].content
    );
    expect(process.exit).not.toHaveBeenCalled();
  });

  it('explains how to fix an unreachable placeholder registry without falling back', async () => {
    vi.mocked(readJsonFile).mockReturnValue({ ...defaultConfig, registry: 'http://REG' });
    vi.mocked(fetch).mockRejectedValue(
      new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } })
    );

    await expect(blockAdd(['invoice-classic'])).rejects.toThrow('process.exit(1)');

    expect(spinner.fail).toHaveBeenCalledWith(
      expect.stringContaining('Could not reach http://REG')
    );
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('"registry" in pdfx.json'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('placeholder'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(DEFAULTS.REGISTRY_URL));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(ensureDir).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('keeps timeout errors distinct from invalid configuration', async () => {
    vi.mocked(fetch).mockRejectedValue(new DOMException('Timed out', 'TimeoutError'));

    await expect(blockAdd(['invoice-classic'])).rejects.toThrow('process.exit(1)');

    expect(spinner.fail).toHaveBeenCalledWith('Registry request timed out');
    expect(writeFile).not.toHaveBeenCalled();
  });

  it.each([
    [404, {}, 'not found in registry'],
    [500, {}, 'HTTP 500'],
    [200, {}, 'Invalid registry entry'],
  ])('preserves registry response errors for HTTP %s', async (status, body, message) => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(body, { status }))
      .mockResolvedValueOnce(Response.json(registryIndex));

    await expect(blockAdd(['invoice-classic'])).rejects.toThrow('process.exit(1)');

    expect(spinner.fail).toHaveBeenCalledWith(expect.stringContaining(message));
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('reports invalid JSON without writing files', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('not json'));

    await expect(blockAdd(['invoice-classic'])).rejects.toThrow('process.exit(1)');

    expect(spinner.fail).toHaveBeenCalledWith(expect.stringContaining('not valid JSON'));
    expect(writeFile).not.toHaveBeenCalled();
  });

  it('normalizes the registry URL for block list', async () => {
    vi.mocked(readJsonFile).mockReturnValue({
      ...defaultConfig,
      registry: 'https://example.com/custom/r/',
    });
    vi.mocked(fetch).mockResolvedValue(Response.json(registryIndex));

    await blockList();

    expect(fetch).toHaveBeenCalledWith(
      'https://example.com/custom/r/index.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });
});

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
      registry: DEFAULTS.REGISTRY_URL,
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
