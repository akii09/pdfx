import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Professional theme preset.
 *
 * Character: Serif headings (Times-Roman), conservative navy primary,
 * generous margins, formal document feel. Ideal for business documents,
 * reports, and official correspondence.
 */
export const professionalTheme: PdfxTheme = {
  name: 'professional',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#1a1a1a',
    background: '#ffffff',
    muted: '#f5f5f5',
    mutedForeground: '#6b7280',
    primary: '#1e3a5f',
    primaryForeground: '#ffffff',
    border: '#d1d5db',
    accent: '#2563eb',
    destructive: '#dc2626',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      lineHeight: 1.4,
    },
    heading: {
      fontFamily: 'Times-Roman',
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
      marginTop: 48,
      marginRight: 48,
      marginBottom: 48,
      marginLeft: 48,
    },
    sectionGap: 24,
    paragraphGap: 8,
    componentGap: 12,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
