import type { PrimitiveTokens } from '../theme.js';

/**
 * Default primitive tokens shared by all theme presets.
 *
 * These define the raw design scales — the "palette" of values available.
 * Themes select from these scales when assigning semantic tokens.
 *
 * - Typography: Major Third (1.25) ratio, 12pt base
 * - Spacing: 4pt grid system
 * - Font weights: 400–700
 * - Line heights: 1.2–1.6
 */
export const defaultPrimitives: PrimitiveTokens = {
  typography: {
    xs: 10,
    sm: 12,
    base: 15,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 36,
  },
  spacing: {
    0: 0,
    0.5: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};
