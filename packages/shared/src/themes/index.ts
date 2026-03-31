export { defaultPrimitives } from './primitives.js';
export { professionalTheme } from './professional.js';
export { modernTheme } from './modern.js';
export { minimalTheme } from './minimal.js';
export { executiveTheme } from './executive.js';
export { corporateTheme } from './corporate.js';
export { elegantTheme } from './elegant.js';
export { vividTheme } from './vivid.js';
export { forestTheme } from './forest.js';
export { blueprintTheme } from './blueprint.js';

import { blueprintTheme } from './blueprint.js';
import { corporateTheme } from './corporate.js';
import { elegantTheme } from './elegant.js';
import { executiveTheme } from './executive.js';
import { forestTheme } from './forest.js';
import { minimalTheme } from './minimal.js';
import { modernTheme } from './modern.js';
import { professionalTheme } from './professional.js';
import { vividTheme } from './vivid.js';

/** Map of all built-in theme presets */
export const themePresets = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  executive: executiveTheme,
  corporate: corporateTheme,
  elegant: elegantTheme,
  vivid: vividTheme,
  forest: forestTheme,
  blueprint: blueprintTheme,
} as const;

/** Valid theme preset names */
export type ThemePresetName = keyof typeof themePresets;
