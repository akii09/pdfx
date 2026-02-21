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
 * plain functions), the React dispatcher is unavailable and useContext throws an
 * "Invalid hook call" error — we catch only that specific case and fall back to
 * defaultTheme. Any other error is re-thrown so real bugs are never swallowed.
 *
 * The eslint-disable is intentional: hooks inside try/catch are flagged by
 * react-hooks/rules-of-hooks, but this is the accepted pattern for libraries
 * that need to support both React render and plain-function (test) contexts.
 */
export function usePdfxTheme(): PdfxTheme {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(PdfxThemeContext);
  } catch (error) {
    // Only suppress React dispatcher errors ("Invalid hook call").
    // Re-throw anything else so unexpected bugs surface clearly.
    if (error instanceof Error && /invalid hook call/i.test(error.message)) {
      return defaultTheme;
    }
    throw error;
  }
}

/**
 * A memoisation helper that behaves like React's useMemo inside a render tree
 * and falls back to calling factory() directly when invoked outside of React
 * (e.g. unit tests that call components as plain functions).
 *
 * Follows the same catch-narrowing strategy as usePdfxTheme.
 */
export function useSafeMemo<T>(factory: () => T, deps: DependencyList): T {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(factory, deps);
  } catch (error) {
    if (error instanceof Error && /invalid hook call/i.test(error.message)) {
      return factory();
    }
    throw error;
  }
}
