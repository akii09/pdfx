import { minimalTheme, modernTheme, professionalTheme, themePresets } from '@pdfx/shared';
import { describe, expect, it } from 'vitest';
import { generateThemeFile } from '../utils/generate-theme';

describe('generateThemeFile', () => {
  it.each(['professional', 'modern', 'minimal'] as const)(
    'should generate valid TypeScript for %s preset',
    (name) => {
      const content = generateThemeFile(themePresets[name]);
      expect(content).toContain('export const theme: PdfxTheme');
      expect(content).toContain(`name: '${name}'`);
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
    expect(professional).toContain("fontFamily: 'Times-Roman'");
    expect(modern).toContain("fontFamily: 'Helvetica'");
    expect(minimal).toContain("fontFamily: 'Courier'");

    // And different primary colors
    expect(professional).toContain('#1e3a5f');
    expect(modern).toContain('#6d28d9');
    expect(minimal).toContain('#171717');
  });

  it('should generate self-contained file with no external imports', () => {
    const content = generateThemeFile(professionalTheme);
    // Should not have import statements (import ... from ...)
    expect(content).not.toMatch(/^import\s+/m);
    expect(content).not.toContain('require(');
  });
});
