import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Minimal theme preset.
 *
 * Character: Courier headings, zinc neutrals, maximum whitespace.
 * shadcn-inspired restrained palette. Ideal for clean documentation,
 * technical specs, and literary manuscripts.
 */
export const minimalTheme: PdfxTheme = {
  name: 'minimal',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#18181b',
    background: '#ffffff',
    muted: '#fafafa',
    mutedForeground: '#a1a1aa',
    primary: '#18181b',
    primaryForeground: '#ffffff',
    border: '#e4e4e7',
    accent: '#71717a',
    destructive: '#b91c1c',
    success: '#15803d',
    warning: '#a16207',
    info: '#0369a1',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.65,
    },
    heading: {
      fontFamily: 'Courier',
      fontWeight: 600,
      lineHeight: 1.25,
      fontSize: {
        h1: 24,
        h2: 20,
        h3: 16,
        h4: 14,
        h5: 12,
        h6: 10,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 72,
      marginRight: 56,
      marginBottom: 72,
      marginLeft: 56,
    },
    sectionGap: 36,
    paragraphGap: 14,
    componentGap: 18,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
