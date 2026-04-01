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

interface GoogleFontFace {
  weight: number;
  style?: 'normal' | 'italic';
}

interface GoogleFontDefinition {
  packageName: string;
  fileFamily: string;
  faces: GoogleFontFace[];
}

export const GOOGLE_FONT_DEFINITIONS: Record<string, GoogleFontDefinition> = {
  Inter: {
    packageName: 'inter',
    fileFamily: 'inter',
    faces: [{ weight: 400 }, { weight: 500 }, { weight: 600 }, { weight: 700 }],
  },
  Roboto: {
    packageName: 'roboto',
    fileFamily: 'roboto',
    faces: [{ weight: 400 }, { weight: 400, style: 'italic' }, { weight: 500 }, { weight: 700 }],
  },
  'Open Sans': {
    packageName: 'open-sans',
    fileFamily: 'open-sans',
    faces: [{ weight: 400 }, { weight: 400, style: 'italic' }, { weight: 600 }, { weight: 700 }],
  },
  Lato: {
    packageName: 'lato',
    fileFamily: 'lato',
    faces: [{ weight: 400 }, { weight: 400, style: 'italic' }, { weight: 700 }],
  },
  Nunito: {
    packageName: 'nunito',
    fileFamily: 'nunito',
    faces: [{ weight: 400 }, { weight: 600 }, { weight: 700 }],
  },
  Merriweather: {
    packageName: 'merriweather',
    fileFamily: 'merriweather',
    faces: [{ weight: 400 }, { weight: 400, style: 'italic' }, { weight: 700 }],
  },
  'Playfair Display': {
    packageName: 'playfair-display',
    fileFamily: 'playfair-display',
    faces: [{ weight: 400 }, { weight: 700 }],
  },
  Lora: {
    packageName: 'lora',
    fileFamily: 'lora',
    faces: [{ weight: 400 }, { weight: 400, style: 'italic' }, { weight: 700 }],
  },
  'Source Code Pro': {
    packageName: 'source-code-pro',
    fileFamily: 'source-code-pro',
    faces: [{ weight: 400 }, { weight: 700 }],
  },
  'JetBrains Mono': {
    packageName: 'jetbrains-mono',
    fileFamily: 'jetbrains-mono',
    faces: [{ weight: 400 }, { weight: 700 }],
  },
};

export function generateGoogleFontRegistrationSnippet(fontFamilies: string[]): string {
  const uniqueFamilies = [...new Set(fontFamilies)].filter((name) => GOOGLE_FONT_DEFINITIONS[name]);
  if (uniqueFamilies.length === 0) return '';

  const registrations = uniqueFamilies
    .map((name) => {
      const def = GOOGLE_FONT_DEFINITIONS[name];
      const fonts = def.faces
        .map((face) => {
          const style = face.style ?? 'normal';
          const styleProp = face.style ? `, fontStyle: '${face.style}'` : '';
          return `      { src: fontSrc('${def.packageName}', '${def.fileFamily}', ${face.weight}, '${style}'), fontWeight: ${face.weight}${styleProp} }`;
        })
        .join(',\n');

      return `Font.register({\n  family: '${name}',\n  fonts: [\n${fonts}\n  ],\n});`;
    })
    .join('\n\n');

  return `import { Font } from '@react-pdf/renderer';\n\nconst FONT_CDN = 'https://cdn.jsdelivr.net/npm/@fontsource';\n\nfunction fontSrc(\n  pkg: string,\n  family: string,\n  weight: number,\n  style: 'normal' | 'italic' = 'normal'\n): string {\n  return \`${'${'}FONT_CDN}/${'${'}pkg}@4/files/${'${'}family}-latin-${'${'}weight}-${'${'}style}.woff\`;\n}\n\n${registrations}`;
}

// ── Font catalogue ────────────────────────────────────────────────────────────

export interface FontOption {
  value: string;
  label: string;
  category: 'sans' | 'serif' | 'mono';
}

/** All available font families, grouped by category for the UI. */
export const FONT_OPTIONS: FontOption[] = [
  // Google fonts (via @fontsource on jsDelivr)
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
  sans: 'Google Sans-serif',
  serif: 'Google Serif',
  mono: 'Google Monospace',
};
