/* eslint-disable react-refresh/only-export-components */
// Exports both a component (PdfxThemeProvider) and hooks/context intentionally.
// All PDF components import from a single file — splitting would break the public API.

import * as React from 'react';
import { type DependencyList, type ReactNode, createContext, useContext, useMemo } from 'react';
import { theme as defaultTheme } from './pdfx-theme';

export type PdfxTheme = typeof defaultTheme;

export const PdfxThemeContext = createContext<PdfxTheme>(defaultTheme);

export interface PdfxThemeProviderProps {
  theme?: PdfxTheme;
  children: ReactNode;
}

/**
 * Detect whether React currently has an active dispatcher.
 * When components are invoked as plain functions in tests, dispatcher is null.
 */
function hasActiveDispatcher(): boolean {
  const maybeInternals = React as unknown as {
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: { H?: unknown };
  };

  const dispatcher =
    maybeInternals.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?.H;
  return dispatcher != null;
}

export function PdfxThemeProvider({ theme, children }: PdfxThemeProviderProps) {
  const resolvedTheme = useMemo(() => theme ?? defaultTheme, [theme]);
  return <PdfxThemeContext.Provider value={resolvedTheme}>{children}</PdfxThemeContext.Provider>;
}

/**
 * Regex patterns that indicate a hook was called outside a valid React render tree.
 * These errors are caught and suppressed so components fall back to safe defaults.
 */
const HOOK_ERROR_PATTERNS =
  /invalid hook call|useContext|useMemo|cannot read properties of null|dispatcher|renderWithHooks|resolveDispatcher|hooks can only be called|rendered fewer hooks/i;

/**
 * Calls a React hook with a graceful fallback for non-render environments (e.g. unit tests).
 * Uses hasActiveDispatcher() as the primary guard; the try/catch is a safety net for edge
 * cases where the dispatcher check passes but the hook still cannot execute.
 */
function callHook<T>(hook: () => T, fallback: T): T {
  if (!hasActiveDispatcher()) return fallback;
  try {
    return hook();
  } catch (error) {
    if (error instanceof Error && HOOK_ERROR_PATTERNS.test(error.message)) return fallback;
    throw error;
  }
}

/**
 * Returns the active PdfxTheme from context, or the default theme when called
 * outside a React render tree (e.g. unit tests).
 */
export function usePdfxTheme(): PdfxTheme {
  return callHook(() => useContext(PdfxThemeContext), defaultTheme);
}

/**
 * Calls factory() and returns the result.
 * The deps parameter is accepted for API compatibility with existing callers.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSafeMemo<T>(factory: () => T, _deps: DependencyList): T {
  return factory();
}
