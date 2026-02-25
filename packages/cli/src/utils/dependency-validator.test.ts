import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  validateDependencies,
  validateNodeVersion,
  validateReact,
  validateReactPdfRenderer,
  validateTypeScript,
} from './dependency-validator.js';

describe('dependency-validator', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  function createPackageJson(deps: Record<string, Record<string, string>>) {
    const pkgJson = {
      name: 'test-project',
      version: '1.0.0',
      ...deps,
    };
    fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
  }

  describe('validateReactPdfRenderer', () => {
    it('should return invalid if not installed', () => {
      createPackageJson({ dependencies: {} });
      const result = validateReactPdfRenderer(testDir);
      expect(result.valid).toBe(false);
      expect(result.installed).toBe(false);
      expect(result.message).toContain('not installed');
    });

    it('should return valid for compatible version', () => {
      createPackageJson({
        dependencies: { '@react-pdf/renderer': '^3.1.0' },
      });
      const result = validateReactPdfRenderer(testDir);
      expect(result.valid).toBe(true);
      expect(result.installed).toBe(true);
      expect(result.currentVersion).toBe('3.1.0');
    });

    it('should return invalid for incompatible version', () => {
      createPackageJson({
        dependencies: { '@react-pdf/renderer': '^2.5.0' },
      });
      const result = validateReactPdfRenderer(testDir);
      expect(result.valid).toBe(false);
      expect(result.installed).toBe(true);
      expect(result.currentVersion).toBe('2.5.0');
      expect(result.message).toContain('does not meet requirement');
    });

    it('should handle version with tilde', () => {
      createPackageJson({
        dependencies: { '@react-pdf/renderer': '~3.4.0' },
      });
      const result = validateReactPdfRenderer(testDir);
      expect(result.valid).toBe(true);
      expect(result.currentVersion).toBe('3.4.0');
    });
  });

  describe('validateReact', () => {
    it('should return invalid if React not installed', () => {
      createPackageJson({ dependencies: {} });
      const result = validateReact(testDir);
      expect(result.valid).toBe(false);
      expect(result.installed).toBe(false);
    });

    it('should return valid for compatible React version', () => {
      createPackageJson({
        dependencies: { react: '^18.2.0' },
      });
      const result = validateReact(testDir);
      expect(result.valid).toBe(true);
      expect(result.installed).toBe(true);
      expect(result.currentVersion).toBe('18.2.0');
    });

    it('should return invalid for old React version', () => {
      createPackageJson({
        dependencies: { react: '^16.7.0' },
      });
      const result = validateReact(testDir);
      expect(result.valid).toBe(false);
      expect(result.installed).toBe(true);
      expect(result.currentVersion).toBe('16.7.0');
    });

    it('should accept React 16.8.0 (minimum)', () => {
      createPackageJson({
        dependencies: { react: '16.8.0' },
      });
      const result = validateReact(testDir);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateNodeVersion', () => {
    it('should validate current Node.js version', () => {
      const result = validateNodeVersion();
      expect(result.installed).toBe(true);
      expect(result.currentVersion).toBeDefined();
      expect(result.requiredVersion).toBe('>=24.0.0');

      // This test may fail if running on Node < 24
      // That's expected and intentional
      const currentMajor = Number.parseInt(process.version.slice(1).split('.')[0]);
      expect(result.valid).toBe(currentMajor >= 24);
    });
  });

  describe('validateTypeScript', () => {
    it('should return null if TypeScript not installed', () => {
      createPackageJson({
        dependencies: { react: '^18.0.0' },
      });
      const result = validateTypeScript(testDir);
      expect(result).toBeNull();
    });

    it('should return invalid if TypeScript installed but no types', () => {
      createPackageJson({
        devDependencies: { typescript: '^5.0.0' },
      });
      const result = validateTypeScript(testDir);
      expect(result).not.toBeNull();
      expect(result?.valid).toBe(false);
      expect(result?.message).toContain('recommended');
    });

    it('should return valid if both TypeScript and types installed', () => {
      createPackageJson({
        devDependencies: {
          typescript: '^5.0.0',
          '@types/react-pdf': '^7.0.0',
        },
      });
      const result = validateTypeScript(testDir);
      expect(result).not.toBeNull();
      expect(result?.valid).toBe(true);
      expect(result?.installed).toBe(true);
    });
  });

  describe('validateDependencies', () => {
    it('should run all dependency checks', () => {
      createPackageJson({
        dependencies: {
          react: '^18.0.0',
          '@react-pdf/renderer': '^3.1.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
        },
      });

      const result = validateDependencies(testDir);
      expect(result.react).toBeDefined();
      expect(result.reactPdfRenderer).toBeDefined();
      expect(result.nodeJs).toBeDefined();
      expect(result.typescript).toBeDefined();
    });

    it('should handle missing package.json', () => {
      const result = validateDependencies(testDir);
      expect(result.react.valid).toBe(false);
      expect(result.reactPdfRenderer.valid).toBe(false);
    });
  });
});
