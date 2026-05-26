import { describe, expect, it } from 'vitest';
import { detectKnownInstallError, preInstallAdvisory } from './install-errors.js';

describe('detectKnownInstallError', () => {
  describe('@react-pdf/svg upstream regression (issue #127)', () => {
    it('matches the literal Bun error message from the issue report', () => {
      const raw =
        "Command failed with exit code 1: bun add '@react-pdf/renderer'\n" +
        'error: GET https://registry.npmjs.org/@react-pdf%2fsvg - 404\n' +
        'error: @react-pdf/svg@^1.1.0 failed to resolve';

      const result = detectKnownInstallError(raw, 'bun');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('react-pdf-svg-404');
      // Workaround hint must include the bun-specific cache clear command.
      expect(result?.hint).toContain('bun pm cache rm');
      // And link to both the pdfx-cli issue and the upstream report.
      expect(result?.hint).toContain('akii09/pdfx/issues/127');
      expect(result?.hint).toContain('diegomura/react-pdf/issues/3382');
    });

    it('matches the equivalent npm phrasing (404 + not found)', () => {
      const raw =
        'npm ERR! 404 Not Found - GET https://registry.npmjs.org/@react-pdf%2fsvg\n' +
        'npm ERR! 404 @react-pdf/svg@^1.1.0';

      const result = detectKnownInstallError(raw, 'npm');

      expect(result?.id).toBe('react-pdf-svg-404');
      // Cache-clear hint should be pm-specific.
      expect(result?.hint).toContain('npm cache clean');
      expect(result?.hint).not.toContain('bun pm cache rm');
      // npm uses `install`, not `add`, in the pin-latest hint.
      expect(result?.hint).toContain('npm install @react-pdf/renderer@latest');
    });

    it('matches pnpm phrasing (No matching version) and emits the pnpm cache hint', () => {
      const raw =
        'ERR_PNPM_NO_MATCHING_VERSION No matching version found for @react-pdf/svg@^1.1.0';

      const result = detectKnownInstallError(raw, 'pnpm');

      expect(result?.id).toBe('react-pdf-svg-404');
      expect(result?.hint).toContain('pnpm store prune');
    });
  });

  describe('non-matching errors', () => {
    it('returns null for an unrelated peer-dep warning', () => {
      const raw =
        'npm WARN ERESOLVE overriding peer dependency\nnpm WARN While resolving: foo@1.0.0';

      expect(detectKnownInstallError(raw, 'npm')).toBeNull();
    });

    it('returns null for a network timeout that does not mention @react-pdf/svg', () => {
      const raw = 'Error: ETIMEDOUT connecting to registry.npmjs.org';

      expect(detectKnownInstallError(raw, 'bun')).toBeNull();
    });

    it('returns null when @react-pdf/svg is mentioned but without a resolution failure', () => {
      const raw = 'Installed @react-pdf/svg@1.1.0 successfully';

      expect(detectKnownInstallError(raw, 'npm')).toBeNull();
    });

    it('returns null for an empty error string', () => {
      expect(detectKnownInstallError('', 'npm')).toBeNull();
    });
  });
});

describe('preInstallAdvisory', () => {
  it('returns a bun-specific note when installing @react-pdf/renderer with bun', () => {
    const advisory = preInstallAdvisory('bun', '@react-pdf/renderer');
    expect(advisory).not.toBeNull();
    expect(advisory).toContain('bun pm cache rm');
    expect(advisory).toContain('#127');
  });

  it('returns null for non-bun package managers', () => {
    for (const pm of ['npm', 'pnpm', 'yarn'] as const) {
      expect(preInstallAdvisory(pm, '@react-pdf/renderer')).toBeNull();
    }
  });

  it('returns null when installing a package other than @react-pdf/renderer', () => {
    expect(preInstallAdvisory('bun', 'react')).toBeNull();
    expect(preInstallAdvisory('bun', '@react-pdf/primitives')).toBeNull();
  });
});
