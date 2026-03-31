import { Font } from '@react-pdf/renderer';

/**
 * OSS-friendly font families for PDFx Theme Builder.
 *
 * Fonts are served via jsDelivr (npm CDN) from @fontsource v4 packages.
 * We use WOFF format (not WOFF2) because fontkit in @react-pdf/renderer
 * has known WOFF2 decompression issues with variable-font tables used
 * in newer fontsource v5 packages.
 *
 * All packages are pinned to @4 for consistent file layout:
 *   {CDN}/{pkg}@4/files/{family}-latin-{weight}-{style}.woff
 *
 * Licenses: Apache 2.0 (Roboto) · OFL (all others).
 *
 * Registration is a side-effect — import this module once before rendering.
 * Fonts are cached by react-pdf after the first download.
 */

const CDN = 'https://cdn.jsdelivr.net/npm/@fontsource';

/**
 * Constructs the jsDelivr CDN URL for a @fontsource v4 WOFF file.
 * All v4 packages use the same path pattern:
 *   {family}-latin-{weight}-{style}.woff
 */
function src(
  pkg: string,
  family: string,
  weight: number,
  style: 'normal' | 'italic' = 'normal'
): string {
  return `${CDN}/${pkg}@4/files/${family}-latin-${weight}-${style}.woff`;
}

// ── Sans-serif ────────────────────────────────────────────────────────────────

Font.register({
  family: 'Inter',
  fonts: [
    { src: src('inter', 'inter', 400), fontWeight: 400 },
    { src: src('inter', 'inter', 500), fontWeight: 500 },
    { src: src('inter', 'inter', 600), fontWeight: 600 },
    { src: src('inter', 'inter', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Roboto',
  fonts: [
    { src: src('roboto', 'roboto', 400), fontWeight: 400 },
    { src: src('roboto', 'roboto', 400, 'italic'), fontWeight: 400, fontStyle: 'italic' },
    { src: src('roboto', 'roboto', 500), fontWeight: 500 },
    { src: src('roboto', 'roboto', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: src('open-sans', 'open-sans', 400), fontWeight: 400 },
    { src: src('open-sans', 'open-sans', 400, 'italic'), fontWeight: 400, fontStyle: 'italic' },
    { src: src('open-sans', 'open-sans', 600), fontWeight: 600 },
    { src: src('open-sans', 'open-sans', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Lato',
  fonts: [
    { src: src('lato', 'lato', 400), fontWeight: 400 },
    { src: src('lato', 'lato', 400, 'italic'), fontWeight: 400, fontStyle: 'italic' },
    { src: src('lato', 'lato', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Nunito',
  fonts: [
    { src: src('nunito', 'nunito', 400), fontWeight: 400 },
    { src: src('nunito', 'nunito', 600), fontWeight: 600 },
    { src: src('nunito', 'nunito', 700), fontWeight: 700 },
  ],
});

// ── Serif ─────────────────────────────────────────────────────────────────────

Font.register({
  family: 'Merriweather',
  fonts: [
    { src: src('merriweather', 'merriweather', 400), fontWeight: 400 },
    {
      src: src('merriweather', 'merriweather', 400, 'italic'),
      fontWeight: 400,
      fontStyle: 'italic',
    },
    { src: src('merriweather', 'merriweather', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: src('playfair-display', 'playfair-display', 400), fontWeight: 400 },
    { src: src('playfair-display', 'playfair-display', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Lora',
  fonts: [
    { src: src('lora', 'lora', 400), fontWeight: 400 },
    { src: src('lora', 'lora', 400, 'italic'), fontWeight: 400, fontStyle: 'italic' },
    { src: src('lora', 'lora', 700), fontWeight: 700 },
  ],
});

// ── Monospace ─────────────────────────────────────────────────────────────────

Font.register({
  family: 'Source Code Pro',
  fonts: [
    { src: src('source-code-pro', 'source-code-pro', 400), fontWeight: 400 },
    { src: src('source-code-pro', 'source-code-pro', 700), fontWeight: 700 },
  ],
});

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    { src: src('jetbrains-mono', 'jetbrains-mono', 400), fontWeight: 400 },
    { src: src('jetbrains-mono', 'jetbrains-mono', 700), fontWeight: 700 },
  ],
});

// ── Font catalogue ────────────────────────────────────────────────────────────

export interface FontOption {
  value: string;
  label: string;
  category: 'builtin-sans' | 'builtin-serif' | 'builtin-mono' | 'sans' | 'serif' | 'mono';
}

/** All available font families, grouped by category for the UI. */
export const FONT_OPTIONS: FontOption[] = [
  // Built-in PDF fonts — no network required
  { value: 'Helvetica', label: 'Helvetica', category: 'builtin-sans' },
  { value: 'Times-Roman', label: 'Times Roman', category: 'builtin-serif' },
  { value: 'Courier', label: 'Courier', category: 'builtin-mono' },
  // OSS sans-serif
  { value: 'Inter', label: 'Inter', category: 'sans' },
  { value: 'Roboto', label: 'Roboto', category: 'sans' },
  { value: 'Open Sans', label: 'Open Sans', category: 'sans' },
  { value: 'Lato', label: 'Lato', category: 'sans' },
  { value: 'Nunito', label: 'Nunito', category: 'sans' },
  // OSS serif
  { value: 'Merriweather', label: 'Merriweather', category: 'serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'serif' },
  { value: 'Lora', label: 'Lora', category: 'serif' },
  // OSS monospace
  { value: 'Source Code Pro', label: 'Source Code Pro', category: 'mono' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'mono' },
];

export const FONT_CATEGORY_LABELS: Record<FontOption['category'], string> = {
  'builtin-sans': 'Built-in — Sans-serif',
  'builtin-serif': 'Built-in — Serif',
  'builtin-mono': 'Built-in — Monospace',
  sans: 'Sans-serif',
  serif: 'Serif',
  mono: 'Monospace',
};
