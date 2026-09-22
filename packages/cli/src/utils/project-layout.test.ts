import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ValidationError } from '@pdfx/shared';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEFAULTS } from '../constants.js';
import { detectProjectLayout, usesSrcDirectory } from './project-layout.js';

/**
 * Layout detection decides what `init` pre-fills, so these run against real temporary
 * directories rather than a mocked filesystem.
 */
describe('project layout detection', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-project-layout-'));
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('proposes src/ paths for a project that keeps its source under src/', () => {
    fs.mkdirSync(path.join(testDir, 'src'));

    expect(detectProjectLayout(testDir)).toEqual({
      usesSrcDirectory: true,
      componentDir: DEFAULTS.COMPONENT_DIR,
      blockDir: DEFAULTS.BLOCK_DIR,
      themeFile: DEFAULTS.THEME_FILE,
    });
  });

  it('proposes root-level paths when there is no src/ directory', () => {
    expect(detectProjectLayout(testDir)).toEqual({
      usesSrcDirectory: false,
      componentDir: './components/pdfx',
      blockDir: './blocks/pdfx',
      themeFile: './lib/pdfx-theme.ts',
    });
  });

  it('proposes root-level paths for a Next.js App Router project without src/', () => {
    // The reported case: app/, components/ and lib/ all sit at the root.
    fs.mkdirSync(path.join(testDir, 'app'));
    fs.writeFileSync(
      path.join(testDir, 'package.json'),
      JSON.stringify({ dependencies: { next: '^15.0.0', react: '^19.0.0' } })
    );

    const layout = detectProjectLayout(testDir);

    expect(layout.componentDir).toBe('./components/pdfx');
    expect(layout.themeFile).toBe('./lib/pdfx-theme.ts');
  });

  it('proposes src/ paths for a Next.js project that does use src/', () => {
    fs.mkdirSync(path.join(testDir, 'src'));
    fs.writeFileSync(
      path.join(testDir, 'package.json'),
      JSON.stringify({ dependencies: { next: '^15.0.0', react: '^19.0.0' } })
    );

    expect(detectProjectLayout(testDir).componentDir).toBe(DEFAULTS.COMPONENT_DIR);
  });

  it('treats a file named src as no src/ layout', () => {
    fs.writeFileSync(path.join(testDir, 'src'), 'not a directory');

    expect(usesSrcDirectory(testDir)).toBe(false);
    expect(detectProjectLayout(testDir).componentDir).toBe('./components/pdfx');
  });

  it('follows a symlinked src directory', () => {
    const real = path.join(testDir, 'actual-source');
    fs.mkdirSync(real);
    fs.symlinkSync(real, path.join(testDir, 'src'), 'dir');

    expect(usesSrcDirectory(testDir)).toBe(true);
  });

  it('treats a dangling src symlink as no src/ layout', () => {
    fs.symlinkSync(path.join(testDir, 'missing'), path.join(testDir, 'src'), 'dir');

    expect(usesSrcDirectory(testDir)).toBe(false);
  });

  it('reports a symlink loop instead of guessing the root layout', () => {
    // src → loop-b → src. statSync reports ELOOP, which is not "there is no src/".
    fs.symlinkSync(path.join(testDir, 'loop-b'), path.join(testDir, 'src'), 'dir');
    fs.symlinkSync(path.join(testDir, 'src'), path.join(testDir, 'loop-b'), 'dir');

    expect(() => usesSrcDirectory(testDir)).toThrow(/Could not determine the project layout/);
    expect(() => usesSrcDirectory(testDir)).toThrow(/ELOOP/);
    expect(() => detectProjectLayout(testDir)).toThrow(ValidationError);
  });

  it('carries a hint pointing at the fields to set by hand', () => {
    fs.symlinkSync(path.join(testDir, 'loop-b'), path.join(testDir, 'src'), 'dir');
    fs.symlinkSync(path.join(testDir, 'src'), path.join(testDir, 'loop-b'), 'dir');

    try {
      usesSrcDirectory(testDir);
      expect.unreachable('expected a ValidationError');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).suggestion).toContain('componentDir');
    }
  });

  it('does not throw for a directory that does not exist', () => {
    expect(() => detectProjectLayout(path.join(testDir, 'missing'))).not.toThrow();
    expect(usesSrcDirectory(path.join(testDir, 'missing'))).toBe(false);
  });
});
