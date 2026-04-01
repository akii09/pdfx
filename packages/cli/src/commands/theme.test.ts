import { minimalTheme, modernTheme, professionalTheme, themePresets } from '@pdfx/shared';
import { describe, expect, it } from 'vitest';
import { generateThemeFile } from '../utils/generate-theme';
import { normalizeThemePath, validateThemePath } from '../utils/theme-path';

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
    expect(content).toContain('interface PdfxTheme');
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
