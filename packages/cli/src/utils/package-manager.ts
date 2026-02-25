import fs from 'node:fs';
import path from 'node:path';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface PackageManagerInfo {
  name: PackageManager;
  lockfile: string;
  installCommand: string;
}

const PACKAGE_MANAGERS: Record<PackageManager, PackageManagerInfo> = {
  pnpm: {
    name: 'pnpm',
    lockfile: 'pnpm-lock.yaml',
    installCommand: 'pnpm add',
  },
  yarn: {
    name: 'yarn',
    lockfile: 'yarn.lock',
    installCommand: 'yarn add',
  },
  bun: {
    name: 'bun',
    lockfile: 'bun.lockb',
    installCommand: 'bun add',
  },
  npm: {
    name: 'npm',
    lockfile: 'package-lock.json',
    installCommand: 'npm install',
  },
};

/**
 * Detects which package manager is being used by checking for lockfiles.
 * Priority: pnpm > yarn > bun > npm (defaults to npm if none found)
 */
export function detectPackageManager(cwd: string = process.cwd()): PackageManagerInfo {
  // Check in priority order
  const managers: PackageManager[] = ['pnpm', 'yarn', 'bun', 'npm'];

  for (const manager of managers) {
    const info = PACKAGE_MANAGERS[manager];
    const lockfilePath = path.join(cwd, info.lockfile);
    if (fs.existsSync(lockfilePath)) {
      return info;
    }
  }

  // Default to npm if no lockfile found
  return PACKAGE_MANAGERS.npm;
}

/**
 * Get install command for a specific package manager
 */
export function getInstallCommand(
  packageManager: PackageManager,
  packages: string[],
  devDependency = false
): string {
  const pm = PACKAGE_MANAGERS[packageManager];
  const devFlag = devDependency ? (packageManager === 'npm' ? '--save-dev' : '-D') : '';
  return `${pm.installCommand} ${packages.join(' ')} ${devFlag}`.trim();
}
