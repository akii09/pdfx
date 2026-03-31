import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Blueprint theme preset.
 *
 * Character: Dark slate palette with cyan accent, JetBrains Mono headings,
 * Source Code Pro body — a technical, precision-first aesthetic.
 * Ideal for API docs, engineering specs, and developer-focused reports.
 */
export const blueprintTheme: PdfxTheme = {
  name: 'blueprint',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#0f172a',
    background: '#ffffff',
    muted: '#f1f5f9',
    mutedForeground: '#475569',
    primary: '#0f172a',
    primaryForeground: '#f0f9ff',
    border: '#cbd5e1',
    accent: '#0891b2',
    destructive: '#e11d48',
    success: '#059669',
    warning: '#d97706',
    info: '#0284c7',
  },
  typography: {
    body: {
      fontFamily: 'Source Code Pro',
      fontSize: 10,
      lineHeight: 1.75,
    },
    heading: {
      fontFamily: 'JetBrains Mono',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 28,
        h2: 21,
        h3: 17,
        h4: 14,
        h5: 12,
        h6: 10,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 52,
      marginRight: 48,
      marginBottom: 52,
      marginLeft: 48,
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
