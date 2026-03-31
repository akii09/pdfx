import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Vivid theme preset.
 *
 * Character: Deep violet/purple palette, Nunito rounded sans-serif, playful
 * but still professional. High-energy creative accent.
 * Ideal for creative agencies, startups, marketing decks, and pitch docs.
 */
export const vividTheme: PdfxTheme = {
  name: 'vivid',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#1e1b4b',
    background: '#ffffff',
    muted: '#f5f3ff',
    mutedForeground: '#7c3aed',
    primary: '#6d28d9',
    primaryForeground: '#ffffff',
    border: '#ddd6fe',
    accent: '#8b5cf6',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    info: '#0ea5e9',
  },
  typography: {
    body: {
      fontFamily: 'Nunito',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Nunito',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 32,
        h2: 24,
        h3: 19,
        h4: 16,
        h5: 14,
        h6: 12,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 48,
      marginRight: 44,
      marginBottom: 48,
      marginLeft: 44,
    },
    sectionGap: 26,
    paragraphGap: 10,
    componentGap: 14,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
