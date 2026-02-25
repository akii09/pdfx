import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';
import { readJsonFile } from './read-json.js';

export interface DependencyValidation {
  valid: boolean;
  installed: boolean;
  currentVersion?: string;
  requiredVersion: string;
  message: string;
}

export interface DependencyCheckResult {
  reactPdfRenderer: DependencyValidation;
  react: DependencyValidation;
  nodeJs: DependencyValidation;
  typescript?: DependencyValidation;
}

const REQUIRED_VERSIONS = {
  '@react-pdf/renderer': '>=3.0.0',
  react: '>=16.8.0',
  node: '>=24.0.0',
};

/**
 * Read package.json from current working directory
 */
function getPackageJson(cwd: string = process.cwd()): Record<string, unknown> | null {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  return readJsonFile(pkgPath) as Record<string, unknown>;
}

/**
 * Get installed version of a package from package.json
 */
function getInstalledVersion(packageName: string, cwd: string = process.cwd()): string | null {
  const pkg = getPackageJson(cwd);
  if (!pkg) return null;

  const deps = {
    ...(pkg.dependencies as Record<string, string> | undefined),
    ...(pkg.devDependencies as Record<string, string> | undefined),
  };

  const version = deps[packageName];
  if (!version) return null;

  // Clean version string (remove ^, ~, etc.)
  return semver.clean(version) || semver.coerce(version)?.version || null;
}

/**
 * Validate @react-pdf/renderer installation and version
 */
export function validateReactPdfRenderer(cwd: string = process.cwd()): DependencyValidation {
  const version = getInstalledVersion('@react-pdf/renderer', cwd);
  const required = REQUIRED_VERSIONS['@react-pdf/renderer'];

  if (!version) {
    return {
      valid: false,
      installed: false,
      requiredVersion: required,
      message: '@react-pdf/renderer is not installed',
    };
  }

  const isCompatible = semver.satisfies(version, required);
  return {
    valid: isCompatible,
    installed: true,
    currentVersion: version,
    requiredVersion: required,
    message: isCompatible
      ? '@react-pdf/renderer version is compatible'
      : `@react-pdf/renderer version ${version} does not meet requirement ${required}`,
  };
}

/**
 * Validate React installation and version
 */
export function validateReact(cwd: string = process.cwd()): DependencyValidation {
  const version = getInstalledVersion('react', cwd);
  const required = REQUIRED_VERSIONS.react;

  if (!version) {
    return {
      valid: false,
      installed: false,
      requiredVersion: required,
      message: 'React is not installed',
    };
  }

  const isCompatible = semver.satisfies(version, required);
  return {
    valid: isCompatible,
    installed: true,
    currentVersion: version,
    requiredVersion: required,
    message: isCompatible
      ? 'React version is compatible'
      : `React version ${version} does not meet requirement ${required}`,
  };
}

/**
 * Validate Node.js version
 */
export function validateNodeVersion(): DependencyValidation {
  const version = process.version;
  const required = REQUIRED_VERSIONS.node;
  const cleanVersion = semver.clean(version);

  if (!cleanVersion) {
    return {
      valid: false,
      installed: true,
      currentVersion: version,
      requiredVersion: required,
      message: `Unable to parse Node.js version: ${version}`,
    };
  }

  const isCompatible = semver.satisfies(cleanVersion, required);
  return {
    valid: isCompatible,
    installed: true,
    currentVersion: cleanVersion,
    requiredVersion: required,
    message: isCompatible
      ? 'Node.js version is compatible'
      : `Node.js version ${cleanVersion} does not meet requirement ${required}`,
  };
}

/**
 * Check if TypeScript is installed and if types are needed
 */
export function validateTypeScript(cwd: string = process.cwd()): DependencyValidation | null {
  const tsVersion = getInstalledVersion('typescript', cwd);
  if (!tsVersion) {
    return null; // Not a TypeScript project
  }

  const typesInstalled = getInstalledVersion('@types/react-pdf', cwd);
  return {
    valid: !!typesInstalled,
    installed: !!typesInstalled,
    currentVersion: typesInstalled || undefined,
    requiredVersion: 'latest',
    message: typesInstalled
      ? 'TypeScript types for @react-pdf/renderer are installed'
      : '@types/react-pdf is recommended for TypeScript projects',
  };
}

/**
 * Run all dependency checks
 */
export function validateDependencies(cwd: string = process.cwd()): DependencyCheckResult {
  return {
    reactPdfRenderer: validateReactPdfRenderer(cwd),
    react: validateReact(cwd),
    nodeJs: validateNodeVersion(),
    typescript: validateTypeScript(cwd) || undefined,
  };
}
