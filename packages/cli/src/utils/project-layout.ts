import fs from 'node:fs';
import path from 'node:path';
import { ValidationError } from '@pdfx/shared';
import { DEFAULTS } from '../constants.js';

/** Install destinations `init` proposes for a project. */
export interface ProjectLayout {
  /** True when the project keeps its source under `src/`. */
  usesSrcDirectory: boolean;
  componentDir: string;
  blockDir: string;
  themeFile: string;
}

/** Destinations for a project that keeps its source under `src/`. */
const SRC_LAYOUT = {
  componentDir: DEFAULTS.COMPONENT_DIR,
  blockDir: DEFAULTS.BLOCK_DIR,
  themeFile: DEFAULTS.THEME_FILE,
} as const;

/** Destinations for a project that keeps its source at the repository root. */
const ROOT_LAYOUT = {
  componentDir: './components/pdfx',
  blockDir: './blocks/pdfx',
  themeFile: './lib/pdfx-theme.ts',
} as const;

/**
 * Reports whether `cwd` keeps its source under a `src/` directory.
 *
 * A symlinked `src` counts: `statSync` follows it, and what matters is that the path
 * resolves to a directory the project writes into. A dangling one does not — it reports
 * ENOENT, the same as no `src` at all.
 *
 * Only ENOENT and ENOTDIR mean "there is no `src/` directory". Any other failure means
 * the layout could not be determined, and answering `false` there would quietly pick the
 * root layout and write a tree the project may not use — so it is reported instead.
 */
export function usesSrcDirectory(cwd: string = process.cwd()): boolean {
  const srcPath = path.join(cwd, 'src');

  try {
    return fs.statSync(srcPath).isDirectory();
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT' || code === 'ENOTDIR') return false;

    throw new ValidationError(
      `Could not determine the project layout: reading "${srcPath}" failed with ${code ?? 'an unknown error'}.`,
      'Fix access to that path, or set "componentDir", "blockDir", and "theme" in pdfx.json yourself instead of relying on detection.'
    );
  }
}

/**
 * Picks install destinations that match how the project is laid out.
 *
 * The signal is the presence of `src/`, not the framework. Next.js is the reported case
 * — its App Router default puts `components/` and `lib/` at the root, so the `./src/…`
 * defaults made users correct all three prompts — but a project without `src/` should
 * not have one created for it whatever built it, and a Next.js project that *does* use
 * `src/` already wants the `./src/…` defaults. Checking for the `next` dependency would
 * therefore change nothing the `src/` check does not already get right.
 */
export function detectProjectLayout(cwd: string = process.cwd()): ProjectLayout {
  const hasSrc = usesSrcDirectory(cwd);
  return { usesSrcDirectory: hasSrc, ...(hasSrc ? SRC_LAYOUT : ROOT_LAYOUT) };
}
