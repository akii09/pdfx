import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  detectNextJs,
  validatePackageJson,
  validateReactProject,
} from './environment-validator.js';

describe('environment-validator', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-env-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  function writePackageJson(content: Record<string, unknown>) {
    fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify(content, null, 2));
  }

  describe('validatePackageJson', () => {
    it('returns valid when package.json exists', () => {
      writePackageJson({ name: 'test' });
      const result = validatePackageJson(testDir);
      expect(result.valid).toBe(true);
    });

    it('returns invalid when package.json is absent', () => {
      const result = validatePackageJson(testDir);
      expect(result.valid).toBe(false);
      expect(result.fixCommand).toBeDefined();
    });
  });

  describe('validateReactProject', () => {
    it('returns valid when react is in dependencies', () => {
      writePackageJson({ dependencies: { react: '^18.0.0' } });
      const result = validateReactProject(testDir);
      expect(result.valid).toBe(true);
    });

    it('returns valid when react is in devDependencies', () => {
      writePackageJson({ devDependencies: { react: '^18.0.0' } });
      const result = validateReactProject(testDir);
      expect(result.valid).toBe(true);
    });

    it('returns invalid when react is not present', () => {
      writePackageJson({ dependencies: {} });
      const result = validateReactProject(testDir);
      expect(result.valid).toBe(false);
    });

    it('returns invalid when package.json is absent', () => {
      const result = validateReactProject(testDir);
      expect(result.valid).toBe(false);
    });
  });

  describe('detectNextJs', () => {
    it('returns true when next is in dependencies', () => {
      writePackageJson({ dependencies: { next: '^14.0.0', react: '^18.0.0' } });
      expect(detectNextJs(testDir)).toBe(true);
    });

    it('returns true when next is in devDependencies', () => {
      writePackageJson({ devDependencies: { next: '^14.0.0' } });
      expect(detectNextJs(testDir)).toBe(true);
    });

    it('returns false for a plain React project without next', () => {
      writePackageJson({ dependencies: { react: '^18.0.0' } });
      expect(detectNextJs(testDir)).toBe(false);
    });

    it('returns false when package.json is absent', () => {
      expect(detectNextJs(testDir)).toBe(false);
    });

    it('returns false when dependencies are empty', () => {
      writePackageJson({ dependencies: {} });
      expect(detectNextJs(testDir)).toBe(false);
    });
  });
});
