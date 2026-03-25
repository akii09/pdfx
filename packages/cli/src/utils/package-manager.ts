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
    lockfile: 'bun.lock',
    installCommand: 'bun add',
  },
  npm: {
    name: 'npm',
    lockfile: 'package-lock.json',
    installCommand: 'npm install',
  },
};

/**
 * Walks up from startDir to find the nearest directory that contains a
 * package.json which is NOT a workspace root (no "workspaces" field and no
 * sibling pnpm-workspace.yaml). This is the consumer app's package root —
 * the correct target for dependency installation.
 *
 * Falls back to startDir if no package.json is found in the tree.
 */
export function findPackageRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  const fsRoot = path.parse(dir).root;

  while (dir !== fsRoot) {
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
        const hasWorkspacesField =
          Array.isArray(pkg.workspaces) ||
          (typeof pkg.workspaces === 'object' && pkg.workspaces !== null);
        const hasPnpmWorkspaceFile = fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'));

        if (!hasWorkspacesField && !hasPnpmWorkspaceFile) {
          return dir;
        }
      } catch {
        return dir;
      }
    }
    dir = path.dirname(dir);
  }

  return startDir;
}

/**
 * Detects which package manager is being used by walking up from startDir
 * until a lockfile is found. This correctly handles monorepos where the
 * lockfile lives at the workspace root rather than the app subdirectory.
 *
 * Priority: pnpm > yarn > bun > npm (defaults to npm if none found)
 */
export function detectPackageManager(startDir: string = process.cwd()): PackageManagerInfo {
  const managers: PackageManager[] = ['pnpm', 'yarn', 'bun', 'npm'];
  let dir = path.resolve(startDir);
  const fsRoot = path.parse(dir).root;

  while (dir !== fsRoot) {
    for (const manager of managers) {
      const info = PACKAGE_MANAGERS[manager];
      if (fs.existsSync(path.join(dir, info.lockfile))) {
        return info;
      }
    }

    if (fs.existsSync(path.join(dir, 'bun.lockb'))) {
      return PACKAGE_MANAGERS.bun;
    }
    dir = path.dirname(dir);
  }

  return PACKAGE_MANAGERS.npm;
}

export function getInstallCommand(
  packageManager: PackageManager,
  packages: string[],
  devDependency = false
): string {
  const pm = PACKAGE_MANAGERS[packageManager];
  const devFlag = devDependency ? (packageManager === 'npm' ? '--save-dev' : '-D') : '';
  return `${pm.installCommand} ${packages.join(' ')} ${devFlag}`.trim();
}
