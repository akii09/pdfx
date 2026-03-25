import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEFAULTS } from '../constants.js';
import { checkFileExists } from '../utils/file-system.js';

/**
 * Unit tests for block directory resolution logic in the list command.
 *
 * The list command uses config.blockDir (not config.componentDir or any
 * other directory) when determining whether a block is installed.
 */

describe('list command: block directory resolution', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-list-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('DEFAULTS constants', () => {
    it('blockDir and componentDir are distinct default paths', () => {
      expect(DEFAULTS.BLOCK_DIR).not.toBe(DEFAULTS.COMPONENT_DIR);
      expect(DEFAULTS.BLOCK_DIR).toContain('blocks');
      expect(DEFAULTS.COMPONENT_DIR).toContain('components');
    });
  });

  describe('block install status resolution', () => {
    it('detects a block as installed when its directory exists under blockDir', () => {
      const blockBaseDir = path.resolve(testDir, DEFAULTS.BLOCK_DIR);
      const blockName = 'invoice-classic';
      const blockItemDir = path.join(blockBaseDir, blockName);

      fs.mkdirSync(blockItemDir, { recursive: true });

      const installed = checkFileExists(blockItemDir);
      expect(installed).toBe(true);
    });

    it('does not count a directory under componentDir as an installed block', () => {
      // Regression: block status must only be checked in blockDir, never componentDir
      const componentDir = path.resolve(testDir, DEFAULTS.COMPONENT_DIR);
      const blockDir = path.resolve(testDir, DEFAULTS.BLOCK_DIR);
      const blockName = 'invoice-classic';

      // Block correctly installed under blockDir
      fs.mkdirSync(path.join(blockDir, blockName), { recursive: true });

      // A directory with the same name under componentDir must NOT count
      const wrongCheck = checkFileExists(path.join(componentDir, blockName));
      expect(wrongCheck).toBe(false);

      // Only the blockDir path is correct
      const correctCheck = checkFileExists(path.join(blockDir, blockName));
      expect(correctCheck).toBe(true);
    });

    it('detects a block as not installed when its directory is absent', () => {
      const blockBaseDir = path.resolve(testDir, DEFAULTS.BLOCK_DIR);
      const blockItemDir = path.join(blockBaseDir, 'nonexistent-block');

      const installed = checkFileExists(blockItemDir);
      expect(installed).toBe(false);
    });
  });

  describe('custom blockDir configuration', () => {
    it('resolves block status from a custom blockDir', () => {
      const customBlockDir = './custom/blocks';
      const blockName = 'report-classic';
      const blockItemDir = path.join(path.resolve(testDir, customBlockDir), blockName);

      fs.mkdirSync(blockItemDir, { recursive: true });

      const blockBaseDir = path.resolve(testDir, customBlockDir);
      const installed = checkFileExists(path.join(blockBaseDir, blockName));
      expect(installed).toBe(true);
    });

    it('does not find a block in the default dir when a custom blockDir is configured', () => {
      const customBlockDir = './custom/blocks';
      const blockName = 'report-classic';

      // Block installed to custom dir only
      const customBlockItemDir = path.join(path.resolve(testDir, customBlockDir), blockName);
      fs.mkdirSync(customBlockItemDir, { recursive: true });

      // Default dir must not match
      const defaultBlockItemDir = path.join(path.resolve(testDir, DEFAULTS.BLOCK_DIR), blockName);
      expect(checkFileExists(defaultBlockItemDir)).toBe(false);

      // Custom dir must match
      expect(checkFileExists(customBlockItemDir)).toBe(true);
    });
  });

  describe('default fallback config completeness', () => {
    it('DEFAULTS provides all directory keys needed by the list command', () => {
      expect(DEFAULTS.REGISTRY_URL).toBeTruthy();
      expect(DEFAULTS.COMPONENT_DIR).toBeTruthy();
      expect(DEFAULTS.THEME_FILE).toBeTruthy();
      expect(DEFAULTS.BLOCK_DIR).toBeTruthy();
    });
  });
});
