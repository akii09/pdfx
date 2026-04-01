import type { PdfxTheme } from '@pdfx/shared';
import {
  type ThemePresetName,
  blueprintTheme,
  corporateTheme,
  elegantTheme,
  executiveTheme,
  forestTheme,
  minimalTheme,
  modernTheme,
  professionalTheme,
  vividTheme,
} from '@pdfx/shared';
import { generateGoogleFontRegistrationSnippet } from './pdf-fonts';

export type PresetName = ThemePresetName;

export const PRESET_MAP: Record<PresetName, PdfxTheme> = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  executive: executiveTheme,
  corporate: corporateTheme,
  elegant: elegantTheme,
  vivid: vividTheme,
  forest: forestTheme,
  blueprint: blueprintTheme,
};

function q(value: string): string {
  return JSON.stringify(value);
}

/**
 * Generates the full pdfx-theme.ts source string from a theme object.
 */
export function generateThemeCode(theme: PdfxTheme): string {
  const t = theme;
  const fontRegistrationSnippet = generateGoogleFontRegistrationSnippet([
    t.typography.body.fontFamily,
    t.typography.heading.fontFamily,
  ]);

  return `
    ${fontRegistrationSnippet ? `${fontRegistrationSnippet}\n` : ''}
interface PdfxTheme {
  name: string;
  primitives: {
    typography: Record<string, number>;
    spacing: Record<string | number, number>;
    fontWeights: { regular: number; medium: number; semibold: number; bold: number };
    lineHeights: { tight: number; normal: number; relaxed: number };
    borderRadius: { none: number; sm: number; md: number; lg: number; full: number };
    letterSpacing: { tight: number; normal: number; wide: number; wider: number };
  };
  colors: {
    foreground: string;
    background: string;
    muted: string;
    mutedForeground: string;
    primary: string;
    primaryForeground: string;
    border: string;
    accent: string;
    destructive: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    body: { fontFamily: string; fontSize: number; lineHeight: number };
    heading: {
      fontFamily: string;
      fontWeight: number;
      lineHeight: number;
      fontSize: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number };
    };
  };
  spacing: {
    page: { marginTop: number; marginRight: number; marginBottom: number; marginLeft: number };
    sectionGap: number;
    paragraphGap: number;
    componentGap: number;
  };
  page: {
    size: 'A4' | 'LETTER' | 'LEGAL';
    orientation: 'portrait' | 'landscape';
  };
}

export const theme: PdfxTheme = {
  name: ${q(t.name)},
  primitives: {
    typography: {
      xs: ${t.primitives.typography.xs},
      sm: ${t.primitives.typography.sm},
      base: ${t.primitives.typography.base},
      lg: ${t.primitives.typography.lg},
      xl: ${t.primitives.typography.xl},
      '2xl': ${t.primitives.typography['2xl']},
      '3xl': ${t.primitives.typography['3xl']},
    },
    spacing: {
      0: ${t.primitives.spacing[0]},
      0.5: ${t.primitives.spacing[0.5]},
      1: ${t.primitives.spacing[1]},
      2: ${t.primitives.spacing[2]},
      3: ${t.primitives.spacing[3]},
      4: ${t.primitives.spacing[4]},
      5: ${t.primitives.spacing[5]},
      6: ${t.primitives.spacing[6]},
      8: ${t.primitives.spacing[8]},
      10: ${t.primitives.spacing[10]},
      12: ${t.primitives.spacing[12]},
      16: ${t.primitives.spacing[16]},
    },
    fontWeights: {
      regular: ${t.primitives.fontWeights.regular},
      medium: ${t.primitives.fontWeights.medium},
      semibold: ${t.primitives.fontWeights.semibold},
      bold: ${t.primitives.fontWeights.bold},
    },
    lineHeights: {
      tight: ${t.primitives.lineHeights.tight},
      normal: ${t.primitives.lineHeights.normal},
      relaxed: ${t.primitives.lineHeights.relaxed},
    },
    borderRadius: {
      none: ${t.primitives.borderRadius.none},
      sm: ${t.primitives.borderRadius.sm},
      md: ${t.primitives.borderRadius.md},
      lg: ${t.primitives.borderRadius.lg},
      full: ${t.primitives.borderRadius.full},
    },
    letterSpacing: {
      tight: ${t.primitives.letterSpacing.tight},
      normal: ${t.primitives.letterSpacing.normal},
      wide: ${t.primitives.letterSpacing.wide},
      wider: ${t.primitives.letterSpacing.wider},
    },
  },
  colors: {
    foreground: ${q(t.colors.foreground)},
    background: ${q(t.colors.background)},
    muted: ${q(t.colors.muted)},
    mutedForeground: ${q(t.colors.mutedForeground)},
    primary: ${q(t.colors.primary)},
    primaryForeground: ${q(t.colors.primaryForeground)},
    border: ${q(t.colors.border)},
    accent: ${q(t.colors.accent)},
    destructive: ${q(t.colors.destructive)},
    success: ${q(t.colors.success)},
    warning: ${q(t.colors.warning)},
    info: ${q(t.colors.info)},
  },
  typography: {
    body: {
      fontFamily: ${q(t.typography.body.fontFamily)},
      fontSize: ${t.typography.body.fontSize},
      lineHeight: ${t.typography.body.lineHeight},
    },
    heading: {
      fontFamily: ${q(t.typography.heading.fontFamily)},
      fontWeight: ${t.typography.heading.fontWeight},
      lineHeight: ${t.typography.heading.lineHeight},
      fontSize: {
        h1: ${t.typography.heading.fontSize.h1},
        h2: ${t.typography.heading.fontSize.h2},
        h3: ${t.typography.heading.fontSize.h3},
        h4: ${t.typography.heading.fontSize.h4},
        h5: ${t.typography.heading.fontSize.h5},
        h6: ${t.typography.heading.fontSize.h6},
      },
    },
  },
  spacing: {
    page: {
      marginTop: ${t.spacing.page.marginTop},
      marginRight: ${t.spacing.page.marginRight},
      marginBottom: ${t.spacing.page.marginBottom},
      marginLeft: ${t.spacing.page.marginLeft},
    },
    sectionGap: ${t.spacing.sectionGap},
    paragraphGap: ${t.spacing.paragraphGap},
    componentGap: ${t.spacing.componentGap},
  },
  page: {
    size: ${q(t.page.size)},
    orientation: ${q(t.page.orientation)},
  },
};
`;
}

/**
 * Generates only the lines that differ from the base preset.
 * Returns an object diff as a partial TypeScript snippet.
 */
export function generateDeltaCode(theme: PdfxTheme, base: PresetName): string {
  const preset = PRESET_MAP[base];
  const lines: string[] = [];

  if (theme.name !== preset.name) lines.push(`  name: ${q(theme.name)},`);

  // Colors diff
  const colorDiffs: string[] = [];
  for (const key of Object.keys(theme.colors) as (keyof PdfxTheme['colors'])[]) {
    if (theme.colors[key] !== preset.colors[key]) {
      colorDiffs.push(`    ${key}: ${q(theme.colors[key])},`);
    }
  }
  if (colorDiffs.length > 0) {
    lines.push('  colors: {');
    lines.push(...colorDiffs);
    lines.push('  },');
  }

  // Typography body diff
  const bodyDiffs: string[] = [];
  if (theme.typography.body.fontFamily !== preset.typography.body.fontFamily)
    bodyDiffs.push(`      fontFamily: ${q(theme.typography.body.fontFamily)},`);
  if (theme.typography.body.fontSize !== preset.typography.body.fontSize)
    bodyDiffs.push(`      fontSize: ${theme.typography.body.fontSize},`);
  if (theme.typography.body.lineHeight !== preset.typography.body.lineHeight)
    bodyDiffs.push(`      lineHeight: ${theme.typography.body.lineHeight},`);

  // Typography heading diff
  const headingDiffs: string[] = [];
  if (theme.typography.heading.fontFamily !== preset.typography.heading.fontFamily)
    headingDiffs.push(`      fontFamily: ${q(theme.typography.heading.fontFamily)},`);
  if (theme.typography.heading.fontWeight !== preset.typography.heading.fontWeight)
    headingDiffs.push(`      fontWeight: ${theme.typography.heading.fontWeight},`);
  if (theme.typography.heading.lineHeight !== preset.typography.heading.lineHeight)
    headingDiffs.push(`      lineHeight: ${theme.typography.heading.lineHeight},`);

  const headingFontSizeDiffs: string[] = [];
  for (const level of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const) {
    if (theme.typography.heading.fontSize[level] !== preset.typography.heading.fontSize[level])
      headingFontSizeDiffs.push(`        ${level}: ${theme.typography.heading.fontSize[level]},`);
  }
  if (headingFontSizeDiffs.length > 0) {
    headingDiffs.push('      fontSize: {');
    headingDiffs.push(...headingFontSizeDiffs);
    headingDiffs.push('      },');
  }

  if (bodyDiffs.length > 0 || headingDiffs.length > 0) {
    lines.push('  typography: {');
    if (bodyDiffs.length > 0) {
      lines.push('    body: {');
      lines.push(...bodyDiffs);
      lines.push('    },');
    }
    if (headingDiffs.length > 0) {
      lines.push('    heading: {');
      lines.push(...headingDiffs);
      lines.push('    },');
    }
    lines.push('  },');
  }

  // Spacing diff
  const pageDiffs: string[] = [];
  for (const edge of ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] as const) {
    if (theme.spacing.page[edge] !== preset.spacing.page[edge])
      pageDiffs.push(`      ${edge}: ${theme.spacing.page[edge]},`);
  }
  const gapDiffs: string[] = [];
  for (const gap of ['sectionGap', 'paragraphGap', 'componentGap'] as const) {
    if (theme.spacing[gap] !== preset.spacing[gap])
      gapDiffs.push(`    ${gap}: ${theme.spacing[gap]},`);
  }

  if (pageDiffs.length > 0 || gapDiffs.length > 0) {
    lines.push('  spacing: {');
    if (pageDiffs.length > 0) {
      lines.push('    page: {');
      lines.push(...pageDiffs);
      lines.push('    },');
    }
    lines.push(...gapDiffs);
    lines.push('  },');
  }

  // Page diff
  const pageSizeDiffs: string[] = [];
  if (theme.page.size !== preset.page.size) pageSizeDiffs.push(`    size: ${q(theme.page.size)},`);
  if (theme.page.orientation !== preset.page.orientation)
    pageSizeDiffs.push(`    orientation: ${q(theme.page.orientation)},`);
  if (pageSizeDiffs.length > 0) {
    lines.push('  page: {');
    lines.push(...pageSizeDiffs);
    lines.push('  },');
  }

  if (lines.length === 0) {
    return `// No changes from the '${base}' preset`;
  }

  return `// Spread this over the '${base}' preset:\nconst overrides = {\n${lines.join('\n')}\n};`;
}
