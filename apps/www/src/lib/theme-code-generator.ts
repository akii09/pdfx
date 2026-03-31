import type { PdfxTheme } from '@pdfx/shared';
import {
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

export type PresetName =
  | 'professional'
  | 'modern'
  | 'minimal'
  | 'executive'
  | 'corporate'
  | 'elegant'
  | 'vivid'
  | 'forest'
  | 'blueprint';

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

/**
 * Generates the complete pdfx-theme.ts TypeScript source for a given theme object.
 */
export function generateThemeCode(theme: PdfxTheme): string {
  const t = theme;
  return `import type { PdfxTheme } from '@pdfx/shared';
import { defaultPrimitives } from '@pdfx/shared';

export const theme: PdfxTheme = {
  name: '${t.name}',
  primitives: defaultPrimitives,
  colors: {
    foreground: '${t.colors.foreground}',
    background: '${t.colors.background}',
    muted: '${t.colors.muted}',
    mutedForeground: '${t.colors.mutedForeground}',
    primary: '${t.colors.primary}',
    primaryForeground: '${t.colors.primaryForeground}',
    border: '${t.colors.border}',
    accent: '${t.colors.accent}',
    destructive: '${t.colors.destructive}',
    success: '${t.colors.success}',
    warning: '${t.colors.warning}',
    info: '${t.colors.info}',
  },
  typography: {
    body: {
      fontFamily: '${t.typography.body.fontFamily}',
      fontSize: ${t.typography.body.fontSize},
      lineHeight: ${t.typography.body.lineHeight},
    },
    heading: {
      fontFamily: '${t.typography.heading.fontFamily}',
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
    size: '${t.page.size}',
    orientation: '${t.page.orientation}',
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

  if (theme.name !== preset.name) lines.push(`  name: '${theme.name}',`);

  // Colors diff
  const colorDiffs: string[] = [];
  for (const key of Object.keys(theme.colors) as (keyof PdfxTheme['colors'])[]) {
    if (theme.colors[key] !== preset.colors[key]) {
      colorDiffs.push(`    ${key}: '${theme.colors[key]}',`);
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
    bodyDiffs.push(`      fontFamily: '${theme.typography.body.fontFamily}',`);
  if (theme.typography.body.fontSize !== preset.typography.body.fontSize)
    bodyDiffs.push(`      fontSize: ${theme.typography.body.fontSize},`);
  if (theme.typography.body.lineHeight !== preset.typography.body.lineHeight)
    bodyDiffs.push(`      lineHeight: ${theme.typography.body.lineHeight},`);

  // Typography heading diff
  const headingDiffs: string[] = [];
  if (theme.typography.heading.fontFamily !== preset.typography.heading.fontFamily)
    headingDiffs.push(`      fontFamily: '${theme.typography.heading.fontFamily}',`);
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
  if (theme.page.size !== preset.page.size) pageSizeDiffs.push(`    size: '${theme.page.size}',`);
  if (theme.page.orientation !== preset.page.orientation)
    pageSizeDiffs.push(`    orientation: '${theme.page.orientation}',`);
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
