import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectPackageManager, getInstallCommand } from './package-manager.js';

describe('package-manager', () => {
  let testDir: string;

  beforeEach(() => {
    // Create a temporary test directory
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-test-'));
  });

  afterEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('detectPackageManager', () => {
    it('should detect pnpm from pnpm-lock.yaml', () => {
      fs.writeFileSync(path.join(testDir, 'pnpm-lock.yaml'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('pnpm');
      expect(result.lockfile).toBe('pnpm-lock.yaml');
      expect(result.installCommand).toBe('pnpm add');
    });

    it('should detect yarn from yarn.lock', () => {
      fs.writeFileSync(path.join(testDir, 'yarn.lock'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('yarn');
      expect(result.lockfile).toBe('yarn.lock');
      expect(result.installCommand).toBe('yarn add');
    });

    it('should detect bun from bun.lockb', () => {
      fs.writeFileSync(path.join(testDir, 'bun.lockb'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('bun');
      expect(result.lockfile).toBe('bun.lockb');
      expect(result.installCommand).toBe('bun add');
    });

    it('should detect npm from package-lock.json', () => {
      fs.writeFileSync(path.join(testDir, 'package-lock.json'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('npm');
      expect(result.lockfile).toBe('package-lock.json');
      expect(result.installCommand).toBe('npm install');
    });

    it('should default to npm if no lockfile found', () => {
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('npm');
    });

    it('should prioritize pnpm over other package managers', () => {
      // Create multiple lockfiles
      fs.writeFileSync(path.join(testDir, 'pnpm-lock.yaml'), '');
      fs.writeFileSync(path.join(testDir, 'yarn.lock'), '');
      fs.writeFileSync(path.join(testDir, 'package-lock.json'), '');

      const result = detectPackageManager(testDir);
      expect(result.name).toBe('pnpm');
    });
  });

  describe('getInstallCommand', () => {
    it('should generate correct npm install command', () => {
      const cmd = getInstallCommand('npm', ['react', 'react-dom']);
      expect(cmd).toBe('npm install react react-dom');
    });

    it('should generate correct npm dev install command', () => {
      const cmd = getInstallCommand('npm', ['typescript'], true);
      expect(cmd).toBe('npm install typescript --save-dev');
    });

    it('should generate correct pnpm install command', () => {
      const cmd = getInstallCommand('pnpm', ['@react-pdf/renderer']);
      expect(cmd).toBe('pnpm add @react-pdf/renderer');
    });

    it('should generate correct pnpm dev install command', () => {
      const cmd = getInstallCommand('pnpm', ['vitest'], true);
      expect(cmd).toBe('pnpm add vitest -D');
    });

    it('should generate correct yarn install command', () => {
      const cmd = getInstallCommand('yarn', ['lodash']);
      expect(cmd).toBe('yarn add lodash');
    });

    it('should generate correct yarn dev install command', () => {
      const cmd = getInstallCommand('yarn', ['@types/node'], true);
      expect(cmd).toBe('yarn add @types/node -D');
    });

    it('should generate correct bun install command', () => {
      const cmd = getInstallCommand('bun', ['express']);
      expect(cmd).toBe('bun add express');
    });

    it('should handle multiple packages', () => {
      const cmd = getInstallCommand('pnpm', ['react', 'react-dom', '@react-pdf/renderer']);
      expect(cmd).toBe('pnpm add react react-dom @react-pdf/renderer');
    });
  });
});
