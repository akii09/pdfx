import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Modern theme preset.
 *
 * Character: All-Helvetica, slate-cool neutrals with subtle violet accent,
 * clean spacing. shadcn-inspired contemporary feel.
 * Ideal for startups, tech companies, and design-forward documents.
 */
export const modernTheme: PdfxTheme = {
  name: 'modern',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#0f172a',
    background: '#ffffff',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    primary: '#334155',
    primaryForeground: '#ffffff',
    border: '#e2e8f0',
    accent: '#6366f1',
    destructive: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 600,
      lineHeight: 1.25,
      fontSize: {
        h1: 28,
        h2: 22,
        h3: 18,
        h4: 16,
        h5: 14,
        h6: 12,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 40,
      marginRight: 40,
      marginBottom: 40,
      marginLeft: 40,
    },
    sectionGap: 24,
    paragraphGap: 10,
    componentGap: 12,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
