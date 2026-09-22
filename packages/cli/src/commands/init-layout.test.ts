import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import prompts from 'prompts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULTS } from '../constants.js';
import { init } from './init.js';

const spinner = vi.hoisted(() => ({
  start: vi.fn(),
  succeed: vi.fn(),
  fail: vi.fn(),
}));

vi.mock('ora', () => ({ default: vi.fn(() => spinner) }));
vi.mock('prompts', () => ({ default: vi.fn() }));
vi.mock('../utils/posthog.js', () => ({
  distinctId: 'test',
  posthog: { capture: vi.fn(), captureException: vi.fn() },
  shutdownPosthog: vi.fn().mockResolvedValue(true),
}));
vi.mock('../utils/pre-flight.js', () => ({
  runPreFlightChecks: vi.fn(() => ({
    canProceed: true,
    dependencies: { reactPdfRenderer: { installed: true, valid: true } },
  })),
  displayPreFlightResults: vi.fn(),
}));
vi.mock('../utils/install-dependencies.js', () => ({
  ensureReactPdfRenderer: vi.fn(async () => true),
}));

/**
 * Verifies that layout detection reaches the destinations `init` actually writes to,
 * not just the helper that computes them.
 */
describe('init: project layout defaults', () => {
  let testDir: string;

  function readConfig() {
    return JSON.parse(fs.readFileSync(path.join(testDir, 'pdfx.json'), 'utf-8'));
  }

  beforeEach(() => {
    vi.clearAllMocks();
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-init-layout-'));
    vi.spyOn(process, 'cwd').mockReturnValue(testDir);
    spinner.start.mockReturnValue(spinner);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('writes root-level paths and files when the project has no src/', async () => {
    await init({ yes: true });

    expect(readConfig()).toMatchObject({
      componentDir: './components/pdfx',
      blockDir: './blocks/pdfx',
      theme: './lib/pdfx-theme.ts',
    });
    expect(fs.existsSync(path.join(testDir, 'lib/pdfx-theme.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'lib/pdfx-theme-context.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'components/pdfx'))).toBe(true);
    expect(fs.existsSync(path.join(testDir, 'src'))).toBe(false);
  });

  it('keeps the existing src/ defaults for a project that uses src/', async () => {
    fs.mkdirSync(path.join(testDir, 'src'));

    await init({ yes: true });

    expect(readConfig()).toMatchObject({
      componentDir: DEFAULTS.COMPONENT_DIR,
      blockDir: DEFAULTS.BLOCK_DIR,
      theme: DEFAULTS.THEME_FILE,
    });
    expect(fs.existsSync(path.join(testDir, 'src/lib/pdfx-theme.ts'))).toBe(true);
  });

  it.each([
    ['without src/', false, './components/pdfx', './blocks/pdfx', './lib/pdfx-theme.ts'],
    ['with src/', true, DEFAULTS.COMPONENT_DIR, DEFAULTS.BLOCK_DIR, DEFAULTS.THEME_FILE],
  ])(
    'pre-fills the interactive prompts %s',
    async (_name, makeSrc, componentDir, blockDir, themeFile) => {
      if (makeSrc) fs.mkdirSync(path.join(testDir, 'src'));
      vi.mocked(prompts).mockResolvedValue({
        componentDir,
        blockDir,
        registry: DEFAULTS.REGISTRY_URL,
        themePreset: 'modern',
        themePath: themeFile,
      });

      await init();

      const questions = vi.mocked(prompts).mock.calls[0]?.[0] as {
        name: string;
        initial: string;
      }[];
      const initialFor = (name: string) => questions.find((q) => q.name === name)?.initial;

      expect(initialFor('componentDir')).toBe(componentDir);
      expect(initialFor('blockDir')).toBe(blockDir);
      expect(initialFor('themePath')).toBe(themeFile);
    }
  );

  it('stops with an actionable message when the layout cannot be determined', async () => {
    fs.symlinkSync(path.join(testDir, 'loop-b'), path.join(testDir, 'src'), 'dir');
    fs.symlinkSync(path.join(testDir, 'src'), path.join(testDir, 'loop-b'), 'dir');
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });

    await expect(init({ yes: true })).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Could not determine the project layout')
    );
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('componentDir'));
    // Nothing written on a layout it could not read.
    expect(fs.existsSync(path.join(testDir, 'pdfx.json'))).toBe(false);
    expect(fs.existsSync(path.join(testDir, 'components'))).toBe(false);
    expect(fs.existsSync(path.join(testDir, 'lib'))).toBe(false);
  });

  it('explains the root-level suggestion only when there is no src/', async () => {
    await init({ yes: true });
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('No src/ directory found'));

    vi.mocked(console.log).mockClear();
    fs.mkdirSync(path.join(testDir, 'src'));
    await init({ yes: true });
    expect(console.log).not.toHaveBeenCalledWith(
      expect.stringContaining('No src/ directory found')
    );
  });
});
