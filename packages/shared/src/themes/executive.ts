import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Executive theme preset.
 *
 * Character: Deep navy palette, Merriweather serif headings, Open Sans body.
 * Generous margins, high contrast, premium boardroom aesthetic.
 * Ideal for board reports, executive briefs, and investor documents.
 */
export const executiveTheme: PdfxTheme = {
  name: 'executive',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#0f172a',
    background: '#ffffff',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    primary: '#1e3a5f',
    primaryForeground: '#ffffff',
    border: '#cbd5e1',
    accent: '#1e40af',
    destructive: '#dc2626',
    success: '#15803d',
    warning: '#b45309',
    info: '#0369a1',
  },
  typography: {
    body: {
      fontFamily: 'Open Sans',
      fontSize: 11,
      lineHeight: 1.65,
    },
    heading: {
      fontFamily: 'Merriweather',
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: {
        h1: 34,
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
      marginTop: 64,
      marginRight: 56,
      marginBottom: 64,
      marginLeft: 56,
    },
    sectionGap: 32,
    paragraphGap: 10,
    componentGap: 16,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
