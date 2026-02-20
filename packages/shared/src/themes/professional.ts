import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Professional theme preset.
 *
 * Character: Serif headings (Times-Roman), refined zinc/slate palette,
 * generous margins, formal document feel. shadcn-inspired minimal aesthetic.
 * Ideal for business documents, reports, and official correspondence.
 */
export const professionalTheme: PdfxTheme = {
  name: 'professional',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#18181b',
    background: '#ffffff',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    primary: '#18181b',
    primaryForeground: '#ffffff',
    border: '#e4e4e7',
    accent: '#3b82f6',
    destructive: '#dc2626',
    success: '#16a34a',
    warning: '#d97706',
    info: '#0ea5e9',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Times-Roman',
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: {
        h1: 32,
        h2: 24,
        h3: 20,
        h4: 16,
        h5: 14,
        h6: 12,
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
