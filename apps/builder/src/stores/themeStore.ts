import type { FontConfig, ThemeState } from '@pdfx/builder-core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Default font configuration
 */
const defaultFonts: FontConfig = {
  heading: { family: 'Helvetica-Bold' },
  body: { family: 'Helvetica' },
  baseFontSize: 10,
  lineHeight: 1.4,
};

/**
 * Theme store state interface
 */
interface ThemeStoreState extends ThemeState {
  // Actions
  setPreset: (preset: ThemeState['preset']) => void;
  setColor: (token: string, value: string) => void;
  setFont: (target: 'heading' | 'body', family: string, src?: string) => void;
  setBaseFontSize: (pt: number) => void;
  setLineHeight: (ratio: number) => void;
  setSpacingScale: (scale: number) => void;
  resetToPreset: (preset: ThemeState['preset']) => void;
}

/**
 * Theme store with localStorage persistence
 */
export const useThemeStore = create<ThemeStoreState>()(
  persist(
    immer((set) => ({
      // Initial state
      preset: 'professional',
      colors: {},
      fonts: defaultFonts,
      spacingScale: 1.0,

      // Actions
      setPreset: (preset) =>
        set((state) => {
          state.preset = preset;
          // Reset colors to preset defaults (will be implemented with actual presets)
          state.colors = {};
        }),

      setColor: (token, value) =>
        set((state) => {
          state.colors[token] = value;
        }),

      setFont: (target, family, src) =>
        set((state) => {
          state.fonts[target] = { family, src };
        }),

      setBaseFontSize: (pt) =>
        set((state) => {
          state.fonts.baseFontSize = Math.max(6, Math.min(24, pt));
        }),

      setLineHeight: (ratio) =>
        set((state) => {
          state.fonts.lineHeight = Math.max(1.0, Math.min(2.5, ratio));
        }),

      setSpacingScale: (scale) =>
        set((state) => {
          state.spacingScale = Math.max(0.5, Math.min(2.0, scale));
        }),

      resetToPreset: (preset) =>
        set((state) => {
          state.preset = preset;
          state.colors = {};
          state.fonts = defaultFonts;
          state.spacingScale = 1.0;
        }),
    })),
    {
      name: 'pdfx-builder-theme',
    }
  )
);
