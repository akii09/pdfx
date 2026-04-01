/**
 * Theme preset registry for the PDFx Theme Builder.
 *
 * This is the single source of truth for all preset metadata used across
 * the builder UI — the preset dropdown, the header badge, and the code
 * generator all pull from here.
 *
 * ## Adding a new preset
 * 1. Create `packages/shared/src/themes/{name}.ts`
 * 2. Export it from `packages/shared/src/themes/index.ts`
 * 3. Export it from `packages/shared/src/index.ts`
 * 4. Add `PresetName` union member to `apps/www/src/lib/theme-code-generator.ts`
 * 5. Add entry to `THEME_PRESETS` below — that's it.
 */

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
import type { PresetName } from './theme-code-generator';

// ─── Preset metadata ──────────────────────────────────────────────────────────

export interface ThemePresetMeta {
  /** Must match a key in PRESET_MAP / PresetName union */
  name: PresetName;
  label: string;
  /** Short descriptor shown under the label in the dropdown */
  description: string;
  /**
   * Hardcoded accent swatch — intentionally NOT derived from the live theme
   * so the dropdown colours stay stable while the user edits the theme.
   */
  accent: string;
  /** Two secondary colour dots (foreground + border tone) */
  dots: [string, string];
  /** The actual PdfxTheme object */
  theme: PdfxTheme;
}

/**
 * Ordered list of all available theme presets.
 * Classic presets first, then specialty themes alphabetically.
 */
export const THEME_PRESETS: ThemePresetMeta[] = [
  {
    name: 'professional',
    label: 'Professional',
    description: 'Serif · Formal · Business',
    accent: '#3b82f6',
    dots: ['#18181b', '#e4e4e7'],
    theme: professionalTheme,
  },
  {
    name: 'modern',
    label: 'Modern',
    description: 'Sans · Clean · Minimal',
    accent: '#6366f1',
    dots: ['#0f172a', '#f1f5f9'],
    theme: modernTheme,
  },
  {
    name: 'minimal',
    label: 'Minimal',
    description: 'Mono · Airy · Stripped',
    accent: '#71717a',
    dots: ['#18181b', '#f4f4f5'],
    theme: minimalTheme,
  },
  {
    name: 'executive',
    label: 'Executive',
    description: 'Serif · Navy · Premium',
    accent: '#1e40af',
    dots: ['#0f172a', '#cbd5e1'],
    theme: executiveTheme,
  },
  {
    name: 'corporate',
    label: 'Corporate',
    description: 'Sans · Sky · Dependable',
    accent: '#0ea5e9',
    dots: ['#1e293b', '#e2e8f0'],
    theme: corporateTheme,
  },
  {
    name: 'elegant',
    label: 'Elegant',
    description: 'Serif · Amber · Editorial',
    accent: '#b45309',
    dots: ['#1c1917', '#d6d3d1'],
    theme: elegantTheme,
  },
  {
    name: 'vivid',
    label: 'Vivid',
    description: 'Rounded · Violet · Creative',
    accent: '#8b5cf6',
    dots: ['#1e1b4b', '#ddd6fe'],
    theme: vividTheme,
  },
  {
    name: 'forest',
    label: 'Forest',
    description: 'Serif · Green · Nature',
    accent: '#16a34a',
    dots: ['#14532d', '#bbf7d0'],
    theme: forestTheme,
  },
  {
    name: 'blueprint',
    label: 'Blueprint',
    description: 'Mono · Cyan · Technical',
    accent: '#0891b2',
    dots: ['#0f172a', '#cbd5e1'],
    theme: blueprintTheme,
  },
];

// ─── Derived lookups ─────────────────────────────────────────────────────────

/** Map from preset name → accent hex — for the header badge dot. */
export const PRESET_ACCENT_MAP = Object.fromEntries(
  THEME_PRESETS.map(({ name, accent }) => [name, accent])
) as Record<PresetName, string>;

/** Map from preset name → ThemePresetMeta — for O(1) lookups. */
export const PRESET_META_MAP = Object.fromEntries(THEME_PRESETS.map((p) => [p.name, p])) as Record<
  PresetName,
  ThemePresetMeta
>;
