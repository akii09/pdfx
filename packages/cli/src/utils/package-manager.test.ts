import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { detectPackageManager, findPackageRoot, getInstallCommand } from './package-manager.js';

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

    it('should detect bun from bun.lockb (legacy)', () => {
      fs.writeFileSync(path.join(testDir, 'bun.lockb'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('bun');
      expect(result.lockfile).toBe('bun.lock');
      expect(result.installCommand).toBe('bun add');
    });

    it('should detect bun from bun.lock (bun >=1.1)', () => {
      fs.writeFileSync(path.join(testDir, 'bun.lock'), '');
      const result = detectPackageManager(testDir);
      expect(result.name).toBe('bun');
      expect(result.lockfile).toBe('bun.lock');
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

    it('should walk up to find a lockfile in a parent directory', () => {
      // Simulate running from a subdirectory (e.g. src/components)
      const subDir = path.join(testDir, 'src', 'components');
      fs.mkdirSync(subDir, { recursive: true });
      // Lockfile lives at the project root, not the subdirectory
      fs.writeFileSync(path.join(testDir, 'pnpm-lock.yaml'), '');

      const result = detectPackageManager(subDir);
      expect(result.name).toBe('pnpm');
    });

    it('should find monorepo lockfile when run from a nested app directory', () => {
      // Structure: testDir/ (workspace root with pnpm-lock.yaml)
      //              apps/my-app/ (consumer app, no lockfile)
      const appDir = path.join(testDir, 'apps', 'my-app');
      fs.mkdirSync(appDir, { recursive: true });
      fs.writeFileSync(
        path.join(testDir, 'package.json'),
        JSON.stringify({ name: 'root', workspaces: ['apps/*'] })
      );
      fs.writeFileSync(path.join(testDir, 'pnpm-lock.yaml'), '');
      fs.writeFileSync(
        path.join(appDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = detectPackageManager(appDir);
      expect(result.name).toBe('pnpm');
    });
  });

  describe('findPackageRoot', () => {
    it('should return the directory containing a non-workspace package.json', () => {
      fs.writeFileSync(
        path.join(testDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = findPackageRoot(testDir);
      expect(result).toBe(testDir);
    });

    it('should walk up from a subdirectory to find the package root', () => {
      const srcDir = path.join(testDir, 'src', 'components');
      fs.mkdirSync(srcDir, { recursive: true });
      fs.writeFileSync(
        path.join(testDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = findPackageRoot(srcDir);
      expect(result).toBe(testDir);
    });

    it('should skip a workspace root and return the nested app as package root', () => {
      // Structure: testDir/ (workspace root)
      //              apps/my-app/ (consumer app, should be returned)
      const appDir = path.join(testDir, 'apps', 'my-app');
      fs.mkdirSync(appDir, { recursive: true });

      // Workspace root: has "workspaces" field
      fs.writeFileSync(
        path.join(testDir, 'package.json'),
        JSON.stringify({ name: 'root', workspaces: ['apps/*'] })
      );
      // App: no workspaces field
      fs.writeFileSync(
        path.join(appDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = findPackageRoot(appDir);
      expect(result).toBe(appDir);
    });

    it('should skip a pnpm workspace root and return the nested app', () => {
      const appDir = path.join(testDir, 'apps', 'my-app');
      fs.mkdirSync(appDir, { recursive: true });

      // pnpm workspace root: has pnpm-workspace.yaml
      fs.writeFileSync(path.join(testDir, 'package.json'), JSON.stringify({ name: 'root' }));
      fs.writeFileSync(path.join(testDir, 'pnpm-workspace.yaml'), 'packages:\n  - apps/*\n');
      fs.writeFileSync(
        path.join(appDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = findPackageRoot(appDir);
      expect(result).toBe(appDir);
    });

    it('should return startDir as fallback when no package.json exists in tree', () => {
      // No package.json anywhere in the temp hierarchy
      const deepDir = path.join(testDir, 'a', 'b', 'c');
      fs.mkdirSync(deepDir, { recursive: true });

      // Result must be startDir (not crash)
      const result = findPackageRoot(deepDir);
      expect(result).toBe(deepDir);
    });

    it('should return startDir itself when it is the package root', () => {
      fs.writeFileSync(
        path.join(testDir, 'package.json'),
        JSON.stringify({ name: 'my-app', version: '1.0.0' })
      );

      const result = findPackageRoot(testDir);
      expect(result).toBe(testDir);
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
