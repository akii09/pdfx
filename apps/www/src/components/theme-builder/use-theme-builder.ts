import type { PdfxTheme } from '@pdfx/shared';
import {
  blueprintTheme,
  corporateTheme,
  elegantTheme,
  executiveTheme,
  forestTheme,
  minimalTheme,
  modernTheme,
  professionalTheme,
  vividTheme,
} from '@pdfx/shared';
import { useMemo, useReducer } from 'react';
import type { PresetName } from '../../lib/theme-code-generator';

// ─── Preset map ───────────────────────────────────────────────────────────────

const PRESETS: Record<PresetName, PdfxTheme> = {
  professional: professionalTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  executive: executiveTheme,
  corporate: corporateTheme,
  elegant: elegantTheme,
  vivid: vividTheme,
  forest: forestTheme,
  blueprint: blueprintTheme,
};

// ─── State ────────────────────────────────────────────────────────────────────

interface ThemeBuilderState {
  theme: PdfxTheme;
  basePreset: PresetName;
  /** Past snapshots for undo (oldest → newest, max 20) */
  past: PdfxTheme[];
  /** Future snapshots for redo (next → furthest, max 20) */
  future: PdfxTheme[];
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_NAME'; value: string }
  | { type: 'SET_COLOR'; key: keyof PdfxTheme['colors']; value: string }
  | { type: 'SET_BODY_FONT_FAMILY'; value: string }
  | { type: 'SET_BODY_FONT_SIZE'; value: number }
  | { type: 'SET_BODY_LINE_HEIGHT'; value: number }
  | { type: 'SET_HEADING_FONT_FAMILY'; value: string }
  | { type: 'SET_HEADING_FONT_WEIGHT'; value: number }
  | { type: 'SET_HEADING_LINE_HEIGHT'; value: number }
  | { type: 'SET_HEADING_FONT_SIZE'; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; value: number }
  | {
      type: 'SET_PAGE_MARGIN';
      edge: 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft';
      value: number;
    }
  | { type: 'SET_SPACING_GAP'; key: 'sectionGap' | 'paragraphGap' | 'componentGap'; value: number }
  | { type: 'SET_PAGE_SIZE'; value: 'A4' | 'LETTER' | 'LEGAL' }
  | { type: 'SET_PAGE_ORIENTATION'; value: 'portrait' | 'landscape' }
  | { type: 'LOAD_PRESET'; preset: PresetName }
  | { type: 'LOAD_THEME'; theme: PdfxTheme }
  | { type: 'UNDO' }
  | { type: 'REDO' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pushPast(past: PdfxTheme[], snapshot: PdfxTheme): PdfxTheme[] {
  return [...past.slice(-19), snapshot];
}

function applyChange(state: ThemeBuilderState, newTheme: PdfxTheme): ThemeBuilderState {
  return {
    ...state,
    theme: newTheme,
    past: pushPast(state.past, state.theme),
    future: [],
  };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: ThemeBuilderState, action: Action): ThemeBuilderState {
  switch (action.type) {
    case 'SET_NAME':
      return applyChange(state, { ...state.theme, name: action.value });

    case 'SET_COLOR':
      return applyChange(state, {
        ...state.theme,
        colors: { ...state.theme.colors, [action.key]: action.value },
      });

    case 'SET_BODY_FONT_FAMILY':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          body: { ...state.theme.typography.body, fontFamily: action.value },
        },
      });

    case 'SET_BODY_FONT_SIZE':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          body: { ...state.theme.typography.body, fontSize: action.value },
        },
      });

    case 'SET_BODY_LINE_HEIGHT':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          body: { ...state.theme.typography.body, lineHeight: action.value },
        },
      });

    case 'SET_HEADING_FONT_FAMILY':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          heading: { ...state.theme.typography.heading, fontFamily: action.value },
        },
      });

    case 'SET_HEADING_FONT_WEIGHT':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          heading: { ...state.theme.typography.heading, fontWeight: action.value },
        },
      });

    case 'SET_HEADING_LINE_HEIGHT':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          heading: { ...state.theme.typography.heading, lineHeight: action.value },
        },
      });

    case 'SET_HEADING_FONT_SIZE':
      return applyChange(state, {
        ...state.theme,
        typography: {
          ...state.theme.typography,
          heading: {
            ...state.theme.typography.heading,
            fontSize: { ...state.theme.typography.heading.fontSize, [action.level]: action.value },
          },
        },
      });

    case 'SET_PAGE_MARGIN':
      return applyChange(state, {
        ...state.theme,
        spacing: {
          ...state.theme.spacing,
          page: { ...state.theme.spacing.page, [action.edge]: action.value },
        },
      });

    case 'SET_SPACING_GAP':
      return applyChange(state, {
        ...state.theme,
        spacing: { ...state.theme.spacing, [action.key]: action.value },
      });

    case 'SET_PAGE_SIZE':
      return applyChange(state, {
        ...state.theme,
        page: { ...state.theme.page, size: action.value },
      });

    case 'SET_PAGE_ORIENTATION':
      return applyChange(state, {
        ...state.theme,
        page: { ...state.theme.page, orientation: action.value },
      });

    case 'LOAD_PRESET':
      return {
        theme: { ...PRESETS[action.preset], name: state.theme.name },
        basePreset: action.preset,
        past: pushPast(state.past, state.theme),
        future: [],
      };

    case 'LOAD_THEME':
      return {
        theme: action.theme,
        basePreset: state.basePreset,
        past: pushPast(state.past, state.theme),
        future: [],
      };

    case 'UNDO': {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      return {
        ...state,
        theme: prev,
        past: state.past.slice(0, -1),
        future: [state.theme, ...state.future.slice(0, 19)],
      };
    }

    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        theme: next,
        past: pushPast(state.past, state.theme),
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface ThemeBuilderActions {
  setName: (value: string) => void;
  setColor: (key: keyof PdfxTheme['colors'], value: string) => void;
  setBodyFontFamily: (value: string) => void;
  setBodyFontSize: (value: number) => void;
  setBodyLineHeight: (value: number) => void;
  setHeadingFontFamily: (value: string) => void;
  setHeadingFontWeight: (value: number) => void;
  setHeadingLineHeight: (value: number) => void;
  setHeadingFontSize: (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', value: number) => void;
  setPageMargin: (
    edge: 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft',
    value: number
  ) => void;
  setSpacingGap: (key: 'sectionGap' | 'paragraphGap' | 'componentGap', value: number) => void;
  setPageSize: (value: 'A4' | 'LETTER' | 'LEGAL') => void;
  setPageOrientation: (value: 'portrait' | 'landscape') => void;
  loadPreset: (preset: PresetName) => void;
  loadTheme: (theme: PdfxTheme) => void;
  undo: () => void;
  redo: () => void;
}

export interface UseThemeBuilderReturn {
  theme: PdfxTheme;
  basePreset: PresetName;
  canUndo: boolean;
  canRedo: boolean;
  actions: ThemeBuilderActions;
}

export function useThemeBuilder(initialTheme?: PdfxTheme): UseThemeBuilderReturn {
  const [state, dispatch] = useReducer(reducer, {
    theme: initialTheme ?? professionalTheme,
    basePreset: 'professional',
    past: [],
    future: [],
  });

  /**
   * All action creators are memoised against `dispatch`.
   * `dispatch` is guaranteed stable by React's useReducer contract, so this
   * memo never re-creates — `actions` is the same object reference for the
   * entire component lifetime.
   */
  const actions = useMemo<ThemeBuilderActions>(
    () => ({
      setName: (value) => dispatch({ type: 'SET_NAME', value }),
      setColor: (key, value) => dispatch({ type: 'SET_COLOR', key, value }),
      setBodyFontFamily: (value) => dispatch({ type: 'SET_BODY_FONT_FAMILY', value }),
      setBodyFontSize: (value) => dispatch({ type: 'SET_BODY_FONT_SIZE', value }),
      setBodyLineHeight: (value) => dispatch({ type: 'SET_BODY_LINE_HEIGHT', value }),
      setHeadingFontFamily: (value) => dispatch({ type: 'SET_HEADING_FONT_FAMILY', value }),
      setHeadingFontWeight: (value) => dispatch({ type: 'SET_HEADING_FONT_WEIGHT', value }),
      setHeadingLineHeight: (value) => dispatch({ type: 'SET_HEADING_LINE_HEIGHT', value }),
      setHeadingFontSize: (level, value) =>
        dispatch({ type: 'SET_HEADING_FONT_SIZE', level, value }),
      setPageMargin: (edge, value) => dispatch({ type: 'SET_PAGE_MARGIN', edge, value }),
      setSpacingGap: (key, value) => dispatch({ type: 'SET_SPACING_GAP', key, value }),
      setPageSize: (value) => dispatch({ type: 'SET_PAGE_SIZE', value }),
      setPageOrientation: (value) => dispatch({ type: 'SET_PAGE_ORIENTATION', value }),
      loadPreset: (preset) => dispatch({ type: 'LOAD_PRESET', preset }),
      loadTheme: (theme) => dispatch({ type: 'LOAD_THEME', theme }),
      undo: () => dispatch({ type: 'UNDO' }),
      redo: () => dispatch({ type: 'REDO' }),
    }),
    // dispatch is stable for the component's lifetime — use empty deps to satisfy lint.
    []
  );

  return {
    theme: state.theme,
    basePreset: state.basePreset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    actions,
  };
}
