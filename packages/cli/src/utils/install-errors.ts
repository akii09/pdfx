import chalk from 'chalk';
import type { PackageManager } from './package-manager.js';

export interface KnownInstallError {
  /** Stable id for telemetry / tests. */
  id: string;
  /** Short human-readable label. */
  title: string;
  /**
   * Multi-line, already-colored hint shown to the user when this error is
   * matched. Includes workaround steps and any relevant upstream links.
   */
  hint: string;
}

/**
 * Pattern-match known upstream install failures against the raw error message
 * surfaced by execa. Returns `null` when the failure does not match any known
 * pattern — callers should fall back to a generic error in that case.
 *
 * Detection is intentionally conservative: we only return a hint when we can
 * recognise the failure with high confidence, so we never override a more
 * specific error the user might need to see verbatim.
 *
 * See issue #127.
 */
export function detectKnownInstallError(
  rawErrorMessage: string,
  pm: PackageManager
): KnownInstallError | null {
  const text = rawErrorMessage.toLowerCase();

  // Issue #127 — upstream diegomura/react-pdf#3382:
  // @react-pdf/svg was briefly unpublished from npm; while the latest
  // @react-pdf/renderer no longer depends on it, stale lockfiles or Bun's
  // resolver cache can still surface the original 404. Surface a clear,
  // actionable message rather than the raw 404.
  const mentionsReactPdfSvg = text.includes('@react-pdf/svg') || text.includes('@react-pdf%2fsvg');
  const looksLikeResolutionFailure =
    text.includes('failed to resolve') ||
    text.includes('404') ||
    text.includes('not found') ||
    text.includes('no matching version');

  if (mentionsReactPdfSvg && looksLikeResolutionFailure) {
    return {
      id: 'react-pdf-svg-404',
      title: '@react-pdf/svg failed to resolve',
      hint: buildReactPdfSvgHint(pm),
    };
  }

  return null;
}

function buildReactPdfSvgHint(pm: PackageManager): string {
  const cacheClear = cacheClearCommandFor(pm);
  const pinLatest = pinLatestCommandFor(pm);
  const altManagers: PackageManager[] = (['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).filter(
    (m) => m !== pm
  );

  const lines = [
    chalk.yellow(
      '  This is a known upstream issue with @react-pdf/renderer (diegomura/react-pdf#3382).'
    ),
    chalk.dim('  The upstream fix has shipped — usually a stale cache or lockfile.'),
    '',
    chalk.bold('  Try these in order:'),
    `    ${chalk.cyan('1.')} Clear your package-manager cache:  ${chalk.cyan(cacheClear)}`,
    `    ${chalk.cyan('2.')} Pin the latest renderer explicitly: ${chalk.cyan(pinLatest)}`,
    `    ${chalk.cyan('3.')} Install once with another manager (${altManagers.join(
      ', '
    )}) and re-run pdfx-cli.`,
    '',
    chalk.dim(
      '  Details: https://github.com/akii09/pdfx/issues/127 · https://github.com/diegomura/react-pdf/issues/3382'
    ),
  ];

  return lines.join('\n');
}

function cacheClearCommandFor(pm: PackageManager): string {
  switch (pm) {
    case 'bun':
      return 'bun pm cache rm';
    case 'pnpm':
      return 'pnpm store prune';
    case 'yarn':
      return 'yarn cache clean';
    default:
      return 'npm cache clean --force';
  }
}

function pinLatestCommandFor(pm: PackageManager): string {
  switch (pm) {
    case 'npm':
      return 'npm install @react-pdf/renderer@latest';
    default:
      return `${pm} add @react-pdf/renderer@latest`;
  }
}

/**
 * One-line pre-install advisory shown when we know the chosen package manager
 * has a higher chance of hitting a transient registry/cache issue. Returns
 * `null` when no advisory applies, so callers can skip the line entirely.
 */
export function preInstallAdvisory(pm: PackageManager, packageName: string): string | null {
  if (pm === 'bun' && packageName === '@react-pdf/renderer') {
    return chalk.dim(
      '  Note: if Bun reports @react-pdf/svg 404, run `bun pm cache rm` and retry (see issue #127).'
    );
  }
  return null;
}
