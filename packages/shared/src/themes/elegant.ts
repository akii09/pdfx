import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Elegant theme preset.
 *
 * Character: Warm cream-adjacent whites, amber/gold accent, Playfair Display
 * headings paired with Lora body — a classic editorial combination.
 * Ideal for design portfolios, luxury brands, and high-end editorial PDFs.
 */
export const elegantTheme: PdfxTheme = {
  name: 'elegant',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#1c1917',
    background: '#ffffff',
    muted: '#fafaf9',
    mutedForeground: '#78716c',
    primary: '#78350f',
    primaryForeground: '#fffbeb',
    border: '#d6d3d1',
    accent: '#b45309',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    info: '#0ea5e9',
  },
  typography: {
    body: {
      fontFamily: 'Lora',
      fontSize: 11,
      lineHeight: 1.7,
    },
    heading: {
      fontFamily: 'Playfair Display',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 36,
        h2: 26,
        h3: 20,
        h4: 16,
        h5: 14,
        h6: 12,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 60,
      marginRight: 52,
      marginBottom: 60,
      marginLeft: 52,
    },
    sectionGap: 30,
    paragraphGap: 12,
    componentGap: 16,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
