export { defaultPrimitives } from './primitives.js';
export { professionalTheme } from './professional.js';
export { modernTheme } from './modern.js';
export { minimalTheme } from './minimal.js';

import { minimalTheme } from './minimal.js';
import { modernTheme } from './modern.js';
import { professionalTheme } from './professional.js';

/** Map of all built-in theme presets */
export const themePresets = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
} as const;

/** Valid theme preset names */
export type ThemePresetName = keyof typeof themePresets;
