import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Corporate theme preset.
 *
 * Character: Blue-gray palette, Lato sans-serif throughout, structured and
 * dependable. Sky-blue accent adds clarity without distraction.
 * Ideal for business proposals, project plans, and client-facing reports.
 */
export const corporateTheme: PdfxTheme = {
  name: 'corporate',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#1e293b',
    background: '#ffffff',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    primary: '#0f4c81',
    primaryForeground: '#ffffff',
    border: '#e2e8f0',
    accent: '#0ea5e9',
    destructive: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  typography: {
    body: {
      fontFamily: 'Lato',
      fontSize: 11,
      lineHeight: 1.55,
    },
    heading: {
      fontFamily: 'Lato',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 30,
        h2: 22,
        h3: 18,
        h4: 15,
        h5: 13,
        h6: 11,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 52,
      marginRight: 44,
      marginBottom: 52,
      marginLeft: 44,
    },
    sectionGap: 24,
    paragraphGap: 9,
    componentGap: 13,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
