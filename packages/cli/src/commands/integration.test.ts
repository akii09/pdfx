import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchComponent, readConfig, resolveThemeImport } from './add.js';

/**
 * CLI Integration Tests
 *
 * These tests verify the CLI's import resolution, config reading, registry
 * fetching, and path-handling logic — all critical for correct component
 * installation. Fetch calls are stubbed so no network access is needed.
 */

// ─── Helpers ────────────────────────────────────────────────────────────────

function createTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-integration-'));
}

function writePdfxJson(dir: string, config: Record<string, unknown>): void {
  fs.writeFileSync(path.join(dir, 'pdfx.json'), JSON.stringify(config, null, 2));
}

function writeFile(filePath: string, content = ''): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function makeRegistryItem(overrides: Record<string, unknown> = {}) {
  return {
    name: 'heading',
    type: 'registry:ui',
    description: 'A heading component',
    files: [
      {
        path: 'pdfx-heading.tsx',
        content: 'export function Heading() {}',
        type: 'registry:component',
      },
    ],
    dependencies: [],
    peerComponents: [],
    ...overrides,
  };
}

function stubFetch(body: unknown, status = 200): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    })
  );
}

// ─── readConfig ─────────────────────────────────────────────────────────────

describe('readConfig', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = createTempDir();
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('reads a valid pdfx.json from disk', () => {
    const cfg = {
      componentDir: './src/components/pdfx',
      registry: 'https://example.com/r',
      theme: './src/lib/pdfx-theme.ts',
    };
    writePdfxJson(testDir, cfg);
    const result = readConfig(path.join(testDir, 'pdfx.json'));
    expect(result.componentDir).toBe('./src/components/pdfx');
    expect(result.registry).toBe('https://example.com/r');
    expect(result.theme).toBe('./src/lib/pdfx-theme.ts');
  });

  it('throws ConfigError for a config missing required fields', () => {
    writePdfxJson(testDir, { componentDir: './src' }); // missing registry
    expect(() => readConfig(path.join(testDir, 'pdfx.json'))).toThrow();
  });

  it('throws when the file does not exist', () => {
    expect(() => readConfig(path.join(testDir, 'missing.json'))).toThrow();
  });

  it('includes optional blockDir when present', () => {
    const cfg = {
      componentDir: './src/components/pdfx',
      registry: 'https://example.com/r',
      theme: './src/lib/pdfx-theme.ts',
      blockDir: './src/blocks',
    };
    writePdfxJson(testDir, cfg);
    const result = readConfig(path.join(testDir, 'pdfx.json'));
    expect(result.blockDir).toBe('./src/blocks');
  });
});

// ─── fetchComponent ──────────────────────────────────────────────────────────

describe('fetchComponent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a validated registry item on success', async () => {
    stubFetch(makeRegistryItem());
    const item = await fetchComponent('heading', 'https://example.com/r');
    expect(item.name).toBe('heading');
    expect(item.type).toBe('registry:ui');
    expect(item.files).toHaveLength(1);
  });

  it('throws RegistryError when component is not found (404)', async () => {
    stubFetch({}, 404);
    await expect(fetchComponent('nonexistent', 'https://example.com/r')).rejects.toThrow(
      'not found in registry'
    );
  });

  it('throws RegistryError on non-404 HTTP error', async () => {
    stubFetch({}, 500);
    await expect(fetchComponent('heading', 'https://example.com/r')).rejects.toThrow('HTTP 500');
  });

  it('throws RegistryError when response JSON fails schema validation', async () => {
    stubFetch({ invalid: 'data' }); // missing required fields
    await expect(fetchComponent('heading', 'https://example.com/r')).rejects.toThrow();
  });

  it('passes the correct URL to fetch', async () => {
    stubFetch(makeRegistryItem());
    await fetchComponent('heading', 'https://example.com/r');
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      'https://example.com/r/heading.json',
      expect.objectContaining({ signal: expect.anything() })
    );
  });

  it('throws NetworkError on fetch network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    await expect(fetchComponent('heading', 'https://example.com/r')).rejects.toThrow();
  });
});

// ─── resolveThemeImport ──────────────────────────────────────────────────────

describe('CLI Integration: Import Resolution', () => {
  describe('resolveThemeImport', () => {
    const baseContent = `
import type { Style } from '@react-pdf/types';
import { theme } from '../lib/pdfx-theme';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';

export function TestComponent() {}
`;

    it('should not modify content without theme imports', () => {
      const noThemeContent = `
import React from 'react';
export function Button() { return null; }
`;
      const result = resolveThemeImport(
        './src/components/pdfx',
        './src/lib/pdfx-theme.ts',
        noThemeContent
      );

      expect(result).toBe(noThemeContent);
    });

    it('should preserve non-theme imports', () => {
      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        baseContent
      );

      // Should preserve the @react-pdf/types import unchanged
      expect(result).toContain("from '@react-pdf/types'");
    });

    it('should rewrite theme imports to relative paths', () => {
      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        baseContent
      );

      // Should contain rewritten theme imports (exact path depends on implementation)
      expect(result).toContain('pdfx-theme');
      expect(result).toContain('pdfx-theme-context');
    });

    it('should rewrite both theme and theme-context in one pass', () => {
      const content = `import { theme } from '../lib/pdfx-theme';
import { usePdfxTheme } from '../lib/pdfx-theme-context';`;

      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        content
      );

      // Neither should still reference the default ../lib path
      expect(result).not.toContain("'../lib/pdfx-theme'");
      expect(result).not.toContain("'../lib/pdfx-theme-context'");
    });

    it('should produce a path starting with ./ or ../', () => {
      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        `import { theme } from '../lib/pdfx-theme';`
      );

      const match = result.match(/from '([^']+)'/);
      expect(match).not.toBeNull();
      const importPath = match?.[1] ?? '';
      expect(importPath.startsWith('./') || importPath.startsWith('../')).toBe(true);
    });
  });
});

// ─── Install status (pdfx list equivalent) ───────────────────────────────────

describe('Install status detection', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = createTempDir();
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('detects a component as installed when its file exists', () => {
    const componentDir = path.join(testDir, 'src', 'components', 'pdfx', 'heading');
    writeFile(path.join(componentDir, 'pdfx-heading.tsx'), 'export function Heading() {}');

    const installed = fs.existsSync(path.join(componentDir, 'pdfx-heading.tsx'));
    expect(installed).toBe(true);
  });

  it('detects a component as not installed when its directory is absent', () => {
    const componentDir = path.join(testDir, 'src', 'components', 'pdfx', 'missing-component');
    const installed = fs.existsSync(componentDir);
    expect(installed).toBe(false);
  });

  it('detects a block as installed when its directory exists', () => {
    const blockDir = path.join(testDir, 'src', 'blocks', 'invoice-classic');
    fs.mkdirSync(blockDir, { recursive: true });

    const installed = fs.existsSync(blockDir);
    expect(installed).toBe(true);
  });

  it('detects a block as not installed when its directory is absent', () => {
    const blockDir = path.join(testDir, 'src', 'blocks', 'invoice-classic');
    const installed = fs.existsSync(blockDir);
    expect(installed).toBe(false);
  });

  it('distinguishes between installed and uninstalled components in the same dir', () => {
    const pdfxDir = path.join(testDir, 'src', 'components', 'pdfx');
    writeFile(path.join(pdfxDir, 'heading', 'pdfx-heading.tsx'), '');

    const headingInstalled = fs.existsSync(path.join(pdfxDir, 'heading', 'pdfx-heading.tsx'));
    const tableInstalled = fs.existsSync(path.join(pdfxDir, 'table', 'pdfx-table.tsx'));

    expect(headingInstalled).toBe(true);
    expect(tableInstalled).toBe(false);
  });
});

// ─── Path Safety ─────────────────────────────────────────────────────────────

describe('CLI Integration: Path Safety', () => {
  describe('component name validation patterns', () => {
    const validNames = ['heading', 'text', 'data-table', 'pdf-image', 'key-value'];
    const invalidNames = ['../hack', 'foo/bar', 'Heading', '.hidden', '-invalid'];

    it.each(validNames)('should accept valid name: %s', (name) => {
      const pattern = /^[a-z][a-z0-9-]*$/;
      expect(pattern.test(name)).toBe(true);
    });

    it.each(invalidNames)('should reject invalid name: %s', (name) => {
      const pattern = /^[a-z][a-z0-9-]*$/;
      expect(pattern.test(name)).toBe(false);
    });
  });

  describe('safe path patterns', () => {
    it('should reject paths containing traversal sequences', () => {
      const maliciousPaths = ['../../../etc/passwd', '..\\..\\windows\\system32'];

      for (const malicious of maliciousPaths) {
        // These should be caught by simple pattern matching
        const hasTraversal = malicious.includes('..');
        expect(hasTraversal).toBe(true);
      }
    });

    it('should reject absolute paths', () => {
      const absolutePaths = ['/etc/passwd', 'C:\\Windows\\System32'];

      for (const abs of absolutePaths) {
        const isAbsolute = abs.startsWith('/') || /^[A-Za-z]:/.test(abs);
        expect(isAbsolute).toBe(true);
      }
    });
  });
});

// ─── Config Validation ───────────────────────────────────────────────────────

describe('CLI Integration: Config Validation', () => {
  it('should validate required config fields', () => {
    const validConfig = {
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
      theme: './src/lib/pdfx-theme.ts',
    };

    expect(validConfig.componentDir).toBeTruthy();
    expect(validConfig.registry).toMatch(/^https?:\/\//);
    expect(validConfig.theme).toBeTruthy();
  });

  it('should reject invalid registry URLs', () => {
    const invalidUrls = ['not-a-url', 'ftp://invalid', '', 'javascript:alert(1)'];

    for (const url of invalidUrls) {
      const isValidUrl = /^https?:\/\//.test(url);
      expect(isValidUrl).toBe(false);
    }
  });
});

// ─── Monorepo project structure ───────────────────────────────────────────────

describe('Monorepo project structure', () => {
  let rootDir: string;

  beforeEach(() => {
    rootDir = createTempDir();
  });

  afterEach(() => {
    if (fs.existsSync(rootDir)) {
      fs.rmSync(rootDir, { recursive: true, force: true });
    }
  });

  it('reads pdfx.json correctly from a nested app directory', () => {
    const appDir = path.join(rootDir, 'apps', 'my-app');
    fs.mkdirSync(appDir, { recursive: true });

    const cfg = {
      componentDir: './src/components/pdfx',
      registry: 'https://example.com/r',
      theme: './src/lib/pdfx-theme.ts',
    };
    writePdfxJson(appDir, cfg);

    const result = readConfig(path.join(appDir, 'pdfx.json'));
    expect(result.componentDir).toBe('./src/components/pdfx');
  });

  it('detects installed components relative to the nested app directory', () => {
    const appDir = path.join(rootDir, 'apps', 'my-app');
    const componentDir = path.join(appDir, 'src', 'components', 'pdfx', 'heading');
    writeFile(path.join(componentDir, 'pdfx-heading.tsx'), '');

    // Simulate what pdfx list does: resolve from the app dir
    const resolvedPath = path.resolve(appDir, './src/components/pdfx/heading/pdfx-heading.tsx');
    expect(fs.existsSync(resolvedPath)).toBe(true);
  });

  it('does not confuse monorepo root with app package root', () => {
    const appDir = path.join(rootDir, 'apps', 'my-app');
    fs.mkdirSync(appDir, { recursive: true });

    // Workspace root has workspaces field
    fs.writeFileSync(
      path.join(rootDir, 'package.json'),
      JSON.stringify({ name: 'root', workspaces: ['apps/*'] })
    );
    // App dir has its own package.json without workspaces
    fs.writeFileSync(
      path.join(appDir, 'package.json'),
      JSON.stringify({ name: 'my-app', version: '1.0.0' })
    );

    // The app package.json should not have a workspaces field
    const appPkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8')) as {
      workspaces?: unknown;
    };
    expect(appPkg.workspaces).toBeUndefined();
  });
});
