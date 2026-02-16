import type { PdfxTheme } from '../theme.js';
import { defaultPrimitives } from './primitives.js';

/**
 * Minimal theme preset.
 *
 * Character: Courier headings for a typewriter feel, stark black primary,
 * maximum whitespace with wide margins, restrained color palette.
 * Ideal for clean documentation, technical specs, and literary manuscripts.
 */
export const minimalTheme: PdfxTheme = {
  name: 'minimal',
  primitives: defaultPrimitives,
  colors: {
    foreground: '#171717',
    background: '#ffffff',
    muted: '#fafafa',
    mutedForeground: '#a3a3a3',
    primary: '#171717',
    primaryForeground: '#ffffff',
    border: '#e5e5e5',
    accent: '#525252',
    destructive: '#b91c1c',
  },
  typography: {
    body: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6,
    },
    heading: {
      fontFamily: 'Courier',
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: {
        h1: 28,
        h2: 22,
        h3: 18,
        h4: 15,
        h5: 12,
        h6: 10,
      },
    },
  },
  spacing: {
    page: {
      marginTop: 64,
      marginRight: 64,
      marginBottom: 64,
      marginLeft: 64,
    },
    sectionGap: 32,
    paragraphGap: 12,
    componentGap: 16,
  },
  page: {
    size: 'A4',
    orientation: 'portrait',
  },
};
