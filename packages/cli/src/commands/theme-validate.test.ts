import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { professionalTheme, themePresets } from '@pdfx/shared';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { generateThemeFile } from '../utils/generate-theme.js';
import { readJsonFile } from '../utils/read-json.js';
import { themeValidate } from './theme.js';

const spinner = vi.hoisted(() => ({
  start: vi.fn(),
  succeed: vi.fn(),
  fail: vi.fn(),
}));

vi.mock('ora', () => ({ default: vi.fn(() => spinner) }));
vi.mock('../utils/file-system.js', () => ({ checkFileExists: vi.fn(() => true) }));
vi.mock('../utils/read-json.js', () => ({
  readJsonFile: vi.fn(() => ({
    componentDir: './components/pdfx',
    registry: 'https://example.com/r',
    theme: './custom/theme.tsx',
  })),
}));
vi.mock('../utils/posthog.js', () => ({
  distinctId: 'test',
  posthog: { capture: vi.fn(), captureException: vi.fn() },
  shutdownPosthog: vi.fn().mockResolvedValue(true),
}));

describe('theme validate: export guidance', () => {
  const configuredPath = './custom/theme.tsx';
  const themePath = path.resolve('custom/theme.tsx');
  const homeDirectory = os.homedir();
  const literal = JSON.stringify(professionalTheme);

  beforeEach(() => {
    vi.clearAllMocks();
    spinner.start.mockReturnValue(spinner);
    vi.spyOn(fs, 'readFileSync').mockReturnValue('');
    // Stubbed, not just observed: a regression that writes must not touch the worktree
    // before afterEach gets a chance to report the unexpected call.
    vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(() => {
    const writes = vi.mocked(fs.writeFileSync).mock.calls.length;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    expect(writes).toBe(0);
  });

  it.each(Object.entries(themePresets))(
    'validates the generated %s preset',
    async (_name, theme) => {
      vi.mocked(fs.readFileSync).mockReturnValue(generateThemeFile(theme));

      await themeValidate();

      expect(fs.readFileSync).toHaveBeenCalledWith(themePath, 'utf-8');
      expect(spinner.succeed).toHaveBeenCalledWith('Theme file is valid');
      expect(process.exit).not.toHaveBeenCalled();
    }
  );

  it.each([
    `export const theme = ${literal};`,
    `export const theme: PdfxTheme = ${literal};`,
    `export const theme = (${literal});`,
    `export const theme = ${literal} as const;`,
    `export let theme = ${literal};`,
    `export const unrelated = 1, theme = ${literal};`,
  ])('retains support for a direct named declaration (%#)', async (source) => {
    vi.mocked(fs.readFileSync).mockReturnValue(source);

    await themeValidate();

    expect(spinner.succeed).toHaveBeenCalledWith('Theme file is valid');
    expect(process.exit).not.toHaveBeenCalled();
  });

  it.each([
    ['default export', `export default ${literal};`],
    ['different name', `export const customTheme = ${literal};`],
    ['separate export', `const theme = ${literal}; export { theme };`],
    ['alias', `const customTheme = ${literal}; export { customTheme as theme };`],
    ['re-export', "export { theme } from './other-theme';"],
    ['empty file', ''],
  ])(
    'explains export requirements for %s without replacing existing tokens',
    async (_name, source) => {
      vi.mocked(fs.readFileSync).mockReturnValue(source);

      await expect(themeValidate()).rejects.toThrow('process.exit(1)');

      expect(console.error).toHaveBeenCalledWith(expect.stringContaining(configuredPath));
      expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining(themePath));
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('export const theme = { ... }')
      );
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Default exports'));
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('export { theme }'));
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('existing tokens'));
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('"theme" in pdfx.json'));
      expect(spinner.succeed).not.toHaveBeenCalled();
    }
  );

  it.each([
    'createTheme()',
    'baseTheme',
    '{ ...baseTheme }',
    '{ colors }',
    '{ ["name"]: "custom" }',
    '{ get name() { throw new Error("must not run"); } }',
    '{ name() { throw new Error("must not run"); } }',
  ])(
    'reports the file and required literal for unsupported expressions (%#)',
    async (expression) => {
      vi.mocked(fs.readFileSync).mockReturnValue(`export const theme = ${expression};`);

      await expect(themeValidate()).rejects.toThrow('process.exit(1)');

      expect(console.error).toHaveBeenCalledWith(expect.stringContaining(configuredPath));
      expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining(themePath));
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('export const theme = { ... }')
      );
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('plain object literal'));
      expect(spinner.succeed).not.toHaveBeenCalled();
    }
  );

  it.each(['{}', 'null', JSON.stringify({ ...professionalTheme, colors: {} })])(
    'still rejects schema-invalid named exports (%#)',
    async (expression) => {
      vi.mocked(fs.readFileSync).mockReturnValue(`export const theme = ${expression};`);

      await expect(themeValidate()).rejects.toThrow('process.exit(1)');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Missing or invalid fields')
      );
      expect(spinner.succeed).not.toHaveBeenCalled();
    }
  );

  it.each([
    ['absolute inside the project', path.resolve('custom/theme.tsx'), './custom/theme.tsx'],
    ['outside the project', '../shared/pdfx-theme.ts', 'pdfx-theme.ts'],
  ])('keeps an %s theme path out of the reported message', async (_name, configured, expected) => {
    vi.mocked(readJsonFile).mockReturnValueOnce({
      componentDir: './components/pdfx',
      registry: 'https://example.com/r',
      theme: configured,
    });
    vi.mocked(fs.readFileSync).mockReturnValue(`export default ${literal};`);

    await expect(themeValidate()).rejects.toThrow('process.exit(1)');

    const reported = vi.mocked(console.error).mock.calls.flat().join('\n');
    expect(reported).toContain(`"${expected}"`);
    expect(reported).not.toContain(homeDirectory);
    expect(reported).not.toContain(path.resolve(configured));
  });

  it('does not let a valid default export hide an invalid named export', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      `export const theme = {}; export default ${literal};`
    );

    await expect(themeValidate()).rejects.toThrow('process.exit(1)');

    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Missing or invalid fields'));
    expect(spinner.succeed).not.toHaveBeenCalled();
  });

  it('does not execute theme imports or top-level statements', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(`
      import './module-that-does-not-exist';
      throw new Error('must not execute the theme module');
      export const theme = ${literal};
    `);

    await themeValidate();

    expect(spinner.succeed).toHaveBeenCalledWith('Theme file is valid');
    expect(process.exit).not.toHaveBeenCalled();
  });

  it('never evaluates a theme factory to discover its value', async () => {
    const factory = vi.fn(() => professionalTheme);
    vi.stubGlobal('__pdfxThemeFactory', factory);
    vi.mocked(fs.readFileSync).mockReturnValue(
      'export const theme = globalThis.__pdfxThemeFactory();'
    );

    await expect(themeValidate()).rejects.toThrow('process.exit(1)');

    expect(factory).not.toHaveBeenCalled();
    expect(spinner.succeed).not.toHaveBeenCalled();
  });
});
