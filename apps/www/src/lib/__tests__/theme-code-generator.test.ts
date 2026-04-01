import { modernTheme } from '@pdfx/shared';
import { describe, expect, it } from 'vitest';
import { generateDeltaCode, generateThemeCode } from '../theme-code-generator';

describe('theme-code-generator', () => {
  it('generates self-contained full theme code with inline type', () => {
    const code = generateThemeCode(modernTheme);

    expect(code).toContain('interface PdfxTheme');
    expect(code).toContain('export const theme: PdfxTheme');
    expect(code).not.toContain("from '@pdfx/shared'");
    expect(code).not.toContain('defaultPrimitives');
  });

  it('includes auto font registration for selected Google fonts', () => {
    const custom = {
      ...modernTheme,
      typography: {
        ...modernTheme.typography,
        body: {
          ...modernTheme.typography.body,
          fontFamily: 'Inter',
        },
        heading: {
          ...modernTheme.typography.heading,
          fontFamily: 'Lora',
        },
      },
    };

    const code = generateThemeCode(custom);
    expect(code).toContain("import { Font } from '@react-pdf/renderer';");
    expect(code).toContain("family: 'Inter'");
    expect(code).toContain("family: 'Lora'");
    expect(code).toContain("fontSrc('inter', 'inter', 400, 'normal')");
    expect(code).toContain("fontSrc('lora', 'lora', 700, 'normal')");
  });

  it('escapes apostrophes in generated strings', () => {
    const custom = {
      ...modernTheme,
      name: "ak's-theme",
      typography: {
        ...modernTheme.typography,
        body: {
          ...modernTheme.typography.body,
          fontFamily: "Open Sans 'Alt'",
        },
      },
    };

    const code = generateThemeCode(custom);
    expect(code).toContain('name: "ak\'s-theme"');
    expect(code).toContain('fontFamily: "Open Sans \'Alt\'"');
  });

  it('returns no-op delta when nothing changed', () => {
    const delta = generateDeltaCode(modernTheme, 'modern');
    expect(delta).toContain("No changes from the 'modern' preset");
  });
});
