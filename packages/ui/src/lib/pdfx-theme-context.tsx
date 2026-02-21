import type { PdfxTheme } from '@pdfx/shared';
import { type DependencyList, type ReactNode, createContext, useContext, useMemo } from 'react';
import { theme as defaultTheme } from './pdfx-theme';

export const PdfxThemeContext = createContext<PdfxTheme>(defaultTheme);

export interface PdfxThemeProviderProps {
  theme?: PdfxTheme;
  children: ReactNode;
}

export function PdfxThemeProvider({ theme, children }: PdfxThemeProviderProps) {
  const resolvedTheme = useMemo(() => theme ?? defaultTheme, [theme]);
  return <PdfxThemeContext.Provider value={resolvedTheme}>{children}</PdfxThemeContext.Provider>;
}

/**
 * Returns the current PdfxTheme from context.
 *
 * When called inside a React render tree, reads the nearest PdfxThemeProvider.
 * When called outside a React render (e.g. unit tests that invoke components as
 * plain functions), the React dispatcher is unavailable and useContext throws —
 * in that case we fall back to the defaultTheme (professionalTheme) so all
 * existing tests continue to pass without modification.
 */
export function usePdfxTheme(): PdfxTheme {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(PdfxThemeContext);
  } catch {
    return defaultTheme;
  }
}

/**
 * A memoisation helper that behaves like React's useMemo inside a render tree
 * and falls back to calling factory() directly when invoked outside of React
 * (e.g. unit tests that call components as plain functions).
 */
export function useSafeMemo<T>(factory: () => T, deps: DependencyList): T {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(factory, deps);
  } catch {
    return factory();
  }
}
