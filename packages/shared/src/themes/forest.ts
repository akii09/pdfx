import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Forest theme preset.
 *
 * Character: Natural deep greens, Merriweather headings for gravitas, Inter
 * body for readability. Earthy and trustworthy.
 * Ideal for sustainability reports, environmental docs, and wellness brands.
 */
export const forestTheme: PdfxTheme = {
  name: 'forest',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#14532d',
    background: '#ffffff',
    muted: '#f0fdf4',
    mutedForeground: '#4d7c5f',
    primary: '#15803d',
    primaryForeground: '#ffffff',
    border: '#bbf7d0',
    accent: '#16a34a',
    destructive: '#dc2626',
    success: '#15803d',
    warning: '#d97706',
    info: '#0ea5e9',
  },
  typography: {
    body: {
      fontFamily: 'Inter',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Merriweather',
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: {
        h1: 32,
        h2: 24,
        h3: 19,
        h4: 15,
        h5: 13,
        h6: 11,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 56,
      marginRight: 48,
      marginBottom: 56,
      marginLeft: 48,
    },
    sectionGap: 28,
    paragraphGap: 10,
    componentGap: 14,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
