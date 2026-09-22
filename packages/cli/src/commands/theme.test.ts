import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { minimalTheme, modernTheme, professionalTheme, themePresets } from '@pdfx/shared';
import prompts from 'prompts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULTS } from '../constants.js';
import { generateThemeContextFile, generateThemeFile } from '../utils/generate-theme';
import { normalizeThemePath, validateThemePath } from '../utils/theme-path';
import { init } from './init.js';
import { themeInit, themeSwitch } from './theme.js';

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

describe('theme file destinations', () => {
  let testDir: string;
  let configPath: string;
  let themePath: string;
  let contextPath: string;

  function writeConfig(theme: string = DEFAULTS.THEME_FILE) {
    const config = {
      componentDir: DEFAULTS.COMPONENT_DIR,
      registry: DEFAULTS.REGISTRY_URL,
      theme,
      customSetting: 'preserve me',
    };
    const content = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, content);
    return content;
  }

  beforeEach(() => {
    vi.clearAllMocks();
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-theme-destination-'));
    vi.spyOn(process, 'cwd').mockReturnValue(testDir);
    configPath = path.join(testDir, 'pdfx.json');
    themePath = path.resolve(testDir, DEFAULTS.THEME_FILE);
    contextPath = path.join(path.dirname(themePath), 'pdfx-theme-context.tsx');
    spinner.start.mockReturnValue(spinner);
    vi.mocked(prompts).mockResolvedValue({
      confirm: true,
      preset: 'modern',
      themePath: DEFAULTS.THEME_FILE,
    });
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  const commands = [
    { name: 'theme switch', run: () => themeSwitch('modern') },
    { name: 'theme init', run: () => themeInit() },
    { name: 'init --yes', run: () => init({ yes: true }) },
    {
      name: 'interactive init',
      run: () => {
        vi.mocked(prompts).mockResolvedValueOnce({ overwrite: true }).mockResolvedValueOnce({
          componentDir: DEFAULTS.COMPONENT_DIR,
          registry: DEFAULTS.REGISTRY_URL,
          themePath: DEFAULTS.THEME_FILE,
          themePreset: 'modern',
        });
        return init();
      },
    },
  ];

  describe.each(commands)('$name', ({ run }) => {
    it.each(['theme', 'context'])(
      'rejects a %s directory without changing files',
      async (target) => {
        const configBefore = writeConfig();
        const directoryPath = target === 'theme' ? themePath : contextPath;
        const otherPath = target === 'theme' ? contextPath : themePath;
        fs.mkdirSync(directoryPath, { recursive: true });
        fs.writeFileSync(path.join(directoryPath, 'sentinel.txt'), 'keep directory contents');
        fs.writeFileSync(otherPath, 'keep existing file');

        await expect(run()).rejects.toThrow('process.exit(1)');

        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('is a directory'));
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining(directoryPath));
        expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining('EISDIR'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('"theme" in pdfx.json'));
        expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
        expect(fs.readFileSync(otherPath, 'utf-8')).toBe('keep existing file');
        expect(fs.readdirSync(directoryPath)).toEqual(['sentinel.txt']);
        expect(fs.readFileSync(path.join(directoryPath, 'sentinel.txt'), 'utf-8')).toBe(
          'keep directory contents'
        );
        expect(spinner.succeed).not.toHaveBeenCalled();
      }
    );
  });

  it.each(['./src/lib/custom-theme.tsx', './src/lib'])(
    'rejects a configured directory at %s without appending a filename',
    async (configuredPath) => {
      writeConfig(configuredPath);
      const directoryPath = path.resolve(testDir, configuredPath);
      fs.mkdirSync(directoryPath, { recursive: true });

      await expect(themeSwitch('modern')).rejects.toThrow('process.exit(1)');

      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('is a directory'));
      expect(fs.readdirSync(directoryPath)).toEqual([]);
    }
  );

  it.each(['theme', 'context'])('rejects a symlink to a %s directory', async (target) => {
    const configBefore = writeConfig();
    const linkPath = target === 'theme' ? themePath : contextPath;
    const directoryPath = path.join(testDir, 'linked-directory');
    fs.mkdirSync(directoryPath);
    fs.mkdirSync(path.dirname(themePath), { recursive: true });
    fs.writeFileSync(path.join(directoryPath, 'sentinel.txt'), 'keep linked contents');
    if (target === 'context') fs.writeFileSync(themePath, 'original theme');
    fs.symlinkSync(directoryPath, linkPath, 'dir');

    await expect(themeSwitch('modern')).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('is a directory'));
    expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
    expect(fs.readFileSync(path.join(directoryPath, 'sentinel.txt'), 'utf-8')).toBe(
      'keep linked contents'
    );
    expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
    if (target === 'context') {
      expect(fs.readFileSync(themePath, 'utf-8')).toBe('original theme');
    }
  });

  it.each(['theme', 'context'])(
    'rejects a dangling symlink at the %s destination without changing files',
    async (target) => {
      const configBefore = writeConfig();
      const linkPath = target === 'theme' ? themePath : contextPath;
      fs.mkdirSync(path.dirname(themePath), { recursive: true });
      if (target === 'context') fs.writeFileSync(themePath, 'original theme');
      fs.symlinkSync(path.join(testDir, 'missing', 'target.ts'), linkPath, 'file');

      await expect(themeSwitch('modern')).rejects.toThrow('process.exit(1)');

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('is a symlink to a missing target')
      );
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining(linkPath));
      expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining('ENOENT'));
      expect(fs.lstatSync(linkPath).isSymbolicLink()).toBe(true);
      expect(fs.existsSync(path.join(testDir, 'missing'))).toBe(false);
      expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
      if (target === 'context') {
        expect(fs.readFileSync(themePath, 'utf-8')).toBe('original theme');
      } else {
        expect(fs.existsSync(contextPath)).toBe(false);
      }
      expect(spinner.succeed).not.toHaveBeenCalled();
    }
  );

  it('rejects a file blocking the theme parent directory without changing files', async () => {
    const configBefore = writeConfig('./src/lib/custom-theme.ts');
    fs.mkdirSync(path.join(testDir, 'src'));
    const blockingFile = path.join(testDir, 'src', 'lib');
    fs.writeFileSync(blockingFile, 'not a directory');

    await expect(themeSwitch('modern')).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('is not a directory'));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(blockingFile));
    expect(console.error).not.toHaveBeenCalledWith(expect.stringContaining('ENOTDIR'));
    expect(fs.readFileSync(blockingFile, 'utf-8')).toBe('not a directory');
    expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
    expect(spinner.succeed).not.toHaveBeenCalled();
  });

  it('rejects a dangling symlink in the theme parent chain', async () => {
    const configBefore = writeConfig('./src/lib/custom-theme.ts');
    fs.mkdirSync(path.join(testDir, 'src'));
    const linkedDir = path.join(testDir, 'src', 'lib');
    fs.symlinkSync(path.join(testDir, 'missing-dir'), linkedDir, 'dir');

    await expect(themeSwitch('modern')).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('is a symlink to a missing target')
    );
    expect(fs.existsSync(path.join(testDir, 'missing-dir'))).toBe(false);
    expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
  });

  it('init --yes rejects a blocked parent before creating a new configuration', async () => {
    const blockingFile = path.dirname(themePath);
    fs.mkdirSync(path.dirname(blockingFile), { recursive: true });
    fs.writeFileSync(blockingFile, 'not a directory');

    await expect(init({ yes: true })).rejects.toThrow('process.exit(1)');

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('is not a directory'));
    expect(fs.existsSync(configPath)).toBe(false);
    expect(fs.existsSync(path.resolve(testDir, DEFAULTS.COMPONENT_DIR))).toBe(false);
    expect(fs.readFileSync(blockingFile, 'utf-8')).toBe('not a directory');
  });

  it.each(['professional', 'modern', 'minimal', 'default'] as const)(
    'switches to %s while preserving existing context and configuration',
    async (preset) => {
      const configBefore = writeConfig();
      fs.mkdirSync(path.dirname(themePath), { recursive: true });
      fs.writeFileSync(themePath, 'old theme');
      fs.writeFileSync(contextPath, 'custom context');

      await themeSwitch(preset);

      const expectedPreset = preset === 'default' ? 'professional' : preset;
      expect(fs.readFileSync(themePath, 'utf-8')).toBe(
        generateThemeFile(themePresets[expectedPreset])
      );
      expect(fs.readFileSync(contextPath, 'utf-8')).toBe('custom context');
      expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
      expect(process.exit).not.toHaveBeenCalled();
    }
  );

  it.each(['./src/lib/custom.ts', 'src/nested/custom.tsx'])(
    'creates a missing theme, context, and parent directories for %s',
    async (configuredPath) => {
      const configBefore = writeConfig(configuredPath);

      await themeSwitch('modern');

      const destination = path.resolve(testDir, configuredPath);
      expect(fs.readFileSync(destination, 'utf-8')).toBe(generateThemeFile(modernTheme));
      expect(
        fs.readFileSync(path.join(path.dirname(destination), 'pdfx-theme-context.tsx'), 'utf-8')
      ).toBe(generateThemeContextFile());
      expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
    }
  );

  it('continues to support an absolute configured theme file', async () => {
    writeConfig(themePath);

    await themeSwitch('modern');

    expect(fs.readFileSync(themePath, 'utf-8')).toBe(generateThemeFile(modernTheme));
  });

  it('continues to support a symlink to a regular theme file', async () => {
    writeConfig();
    fs.mkdirSync(path.dirname(themePath), { recursive: true });
    const realFile = path.join(testDir, 'linked-theme.ts');
    fs.writeFileSync(realFile, 'old theme');
    fs.symlinkSync(realFile, themePath, 'file');

    await themeSwitch('modern');

    expect(fs.lstatSync(themePath).isSymbolicLink()).toBe(true);
    expect(fs.readFileSync(realFile, 'utf-8')).toBe(generateThemeFile(modernTheme));
  });

  it('does not write anything when switching is cancelled', async () => {
    const configBefore = writeConfig();
    fs.mkdirSync(path.dirname(themePath), { recursive: true });
    fs.writeFileSync(themePath, 'old theme');
    vi.mocked(prompts).mockResolvedValue({ confirm: false });

    await themeSwitch('modern');

    expect(fs.readFileSync(themePath, 'utf-8')).toBe('old theme');
    expect(fs.existsSync(contextPath)).toBe(false);
    expect(fs.readFileSync(configPath, 'utf-8')).toBe(configBefore);
    expect(process.exit).not.toHaveBeenCalled();
  });

  it('theme init creates theme files and updates the configured path', async () => {
    writeConfig('./old-theme.ts');

    await themeInit();

    expect(fs.readFileSync(themePath, 'utf-8')).toBe(generateThemeFile(modernTheme));
    expect(fs.readFileSync(contextPath, 'utf-8')).toBe(generateThemeContextFile());
    expect(JSON.parse(fs.readFileSync(configPath, 'utf-8')).theme).toBe(DEFAULTS.THEME_FILE);
    expect(process.exit).not.toHaveBeenCalled();
  });

  it('init --yes rejects a directory before creating a new configuration', async () => {
    fs.mkdirSync(themePath, { recursive: true });

    await expect(init({ yes: true })).rejects.toThrow('process.exit(1)');

    expect(fs.existsSync(configPath)).toBe(false);
    expect(fs.existsSync(contextPath)).toBe(false);
    expect(fs.existsSync(path.resolve(testDir, DEFAULTS.COMPONENT_DIR))).toBe(false);
    expect(fs.readdirSync(themePath)).toEqual([]);
  });

  it('init --yes creates configuration and theme files at valid destinations', async () => {
    await init({ yes: true });

    expect(fs.readFileSync(themePath, 'utf-8')).toBe(generateThemeFile(professionalTheme));
    expect(fs.readFileSync(contextPath, 'utf-8')).toBe(generateThemeContextFile());
    expect(JSON.parse(fs.readFileSync(configPath, 'utf-8')).theme).toBe(DEFAULTS.THEME_FILE);
    expect(process.exit).not.toHaveBeenCalled();
  });
});

describe('generateThemeFile', () => {
  it.each(['professional', 'modern', 'minimal'] as const)(
    'should generate valid TypeScript for %s preset',
    (name) => {
      const content = generateThemeFile(themePresets[name]);
      expect(content).toContain('export const theme: PdfxTheme');
      expect(content).toContain(`name: "${name}"`);
    }
  );

  it('should include all required theme sections', () => {
    const content = generateThemeFile(professionalTheme);
    expect(content).toContain('primitives:');
    expect(content).toContain('colors:');
    expect(content).toContain('typography:');
    expect(content).toContain('spacing:');
    expect(content).toContain('page:');
  });

  it('should include all color tokens', () => {
    const content = generateThemeFile(professionalTheme);
    expect(content).toContain('foreground:');
    expect(content).toContain('background:');
    expect(content).toContain('muted:');
    expect(content).toContain('mutedForeground:');
    expect(content).toContain('primary:');
    expect(content).toContain('primaryForeground:');
    expect(content).toContain('border:');
    expect(content).toContain('accent:');
    expect(content).toContain('destructive:');
  });

  it('should include all heading levels', () => {
    const content = generateThemeFile(professionalTheme);
    expect(content).toContain('h1:');
    expect(content).toContain('h2:');
    expect(content).toContain('h3:');
    expect(content).toContain('h4:');
    expect(content).toContain('h5:');
    expect(content).toContain('h6:');
  });

  it('should include the inline PdfxTheme type', () => {
    const content = generateThemeFile(professionalTheme);
    expect(content).toContain('export interface PdfxTheme');
  });

  it('should generate different content for different presets', () => {
    const professional = generateThemeFile(professionalTheme);
    const modern = generateThemeFile(modernTheme);
    const minimal = generateThemeFile(minimalTheme);

    // They should have different font families
    expect(professional).toContain('fontFamily: "Times-Roman"');
    expect(modern).toContain('fontFamily: "Helvetica"');
    expect(minimal).toContain('fontFamily: "Courier"');

    // And theme-specific colors (shadcn-inspired palettes)
    expect(professional).toContain('#18181b');
    expect(modern).toContain('#334155');
    expect(minimal).toContain('#18181b');
  });

  it('should generate self-contained file with no external imports', () => {
    const content = generateThemeFile(professionalTheme);
    // Should not have import statements (import ... from ...)
    expect(content).not.toMatch(/^import\s+/m);
    expect(content).not.toContain('require(');
  });
});

describe('normalizeThemePath', () => {
  it('prepends ./ to a bare relative path', () => {
    expect(normalizeThemePath('src/lib/pdfx-theme.ts')).toBe('./src/lib/pdfx-theme.ts');
  });

  it('leaves a path already starting with ./ unchanged', () => {
    expect(normalizeThemePath('./src/lib/pdfx-theme.ts')).toBe('./src/lib/pdfx-theme.ts');
  });

  it('leaves a ../ path unchanged', () => {
    expect(normalizeThemePath('../lib/pdfx-theme.ts')).toBe('../lib/pdfx-theme.ts');
  });

  it('leaves an absolute path unchanged (validate will reject it)', () => {
    expect(normalizeThemePath('/abs/path.ts')).toBe('/abs/path.ts');
  });

  it('trims surrounding whitespace before normalising', () => {
    expect(normalizeThemePath('  src/lib/pdfx-theme.ts  ')).toBe('./src/lib/pdfx-theme.ts');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeThemePath('')).toBe('');
  });

  it('does not double-prepend ./ when path already starts with ./', () => {
    const input = './src/lib/pdfx-theme.ts';
    expect(normalizeThemePath(input)).toBe(input);
  });
});

describe('validateThemePath', () => {
  it('accepts a valid ./ relative .ts path', () => {
    expect(validateThemePath('./src/lib/pdfx-theme.ts')).toBe(true);
  });

  it('accepts a .tsx extension', () => {
    expect(validateThemePath('./src/lib/pdfx-theme.tsx')).toBe(true);
  });

  it('accepts a ../ relative path', () => {
    expect(validateThemePath('../lib/theme.ts')).toBe(true);
  });

  it('accepts a bare path without dot prefix (format will normalise it)', () => {
    // validate does not reject "src/..." — format() adds "./" afterward
    expect(validateThemePath('src/lib/pdfx-theme.ts')).toBe(true);
  });

  it('rejects empty string', () => {
    const result = validateThemePath('');
    expect(result).toBe('Theme path is required');
  });

  it('rejects whitespace-only input', () => {
    const result = validateThemePath('   ');
    expect(result).toBe('Theme path is required');
  });

  it('rejects an absolute path', () => {
    const result = validateThemePath('/abs/src/theme.ts');
    expect(typeof result).toBe('string');
    expect(result as string).toContain('relative');
  });

  it('rejects the malformed .src/... pattern (dot without slash)', () => {
    const result = validateThemePath('.src/lib/pdfx-theme.ts');
    expect(typeof result).toBe('string');
    expect(result as string).toContain('./');
  });

  it('rejects a path with only a dot and no slash (.pdfx-theme.ts)', () => {
    const result = validateThemePath('.pdfx-theme.ts');
    expect(typeof result).toBe('string');
  });

  it('rejects a path without .ts or .tsx extension', () => {
    const result = validateThemePath('./src/lib/pdfx-theme.js');
    expect(typeof result).toBe('string');
    expect(result as string).toContain('extension');
  });

  it('rejects a path with no extension at all', () => {
    const result = validateThemePath('./src/lib/pdfx-theme');
    expect(typeof result).toBe('string');
    expect(result as string).toContain('extension');
  });
});
