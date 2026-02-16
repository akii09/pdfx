import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Modern theme preset.
 *
 * Character: All-Helvetica, vibrant purple primary, tighter spacing,
 * contemporary feel. Ideal for startups, tech companies, and
 * design-forward documents.
 */
export const modernTheme: PdfxTheme = {
  name: 'modern',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#0f172a',
    background: '#ffffff',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    primary: '#6d28d9',
    primaryForeground: '#ffffff',
    border: '#e2e8f0',
    accent: '#0ea5e9',
    destructive: '#ef4444',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 36,
        h2: 28,
        h3: 22,
        h4: 18,
        h5: 15,
        h6: 12,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 32,
      marginRight: 32,
      marginBottom: 32,
      marginLeft: 32,
    },
    sectionGap: 20,
    paragraphGap: 8,
    componentGap: 8,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
