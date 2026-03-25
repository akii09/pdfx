import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';
import { REQUIRED_VERSIONS } from '../constants.js';
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
}

function getPackageJson(cwd: string = process.cwd()): Record<string, unknown> | null {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return null;
  }
  return readJsonFile(pkgPath) as Record<string, unknown>;
}

function getInstalledVersion(
  packageName: string,
  cwd: string = process.cwd(),
  pkg?: Record<string, unknown> | null
): string | null {
  const resolved = pkg !== undefined ? pkg : getPackageJson(cwd);
  if (!resolved) return null;

  const deps = {
    ...(resolved.dependencies as Record<string, string> | undefined),
    ...(resolved.devDependencies as Record<string, string> | undefined),
  };

  const version = deps[packageName];
  if (!version) return null;

  return semver.clean(version) || semver.coerce(version)?.version || null;
}

/**
 * Validate @react-pdf/renderer installation and version
 */
export function validateReactPdfRenderer(
  cwd: string = process.cwd(),
  pkg?: Record<string, unknown> | null
): DependencyValidation {
  const version = getInstalledVersion('@react-pdf/renderer', cwd, pkg);
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
export function validateReact(
  cwd: string = process.cwd(),
  pkg?: Record<string, unknown> | null
): DependencyValidation {
  const version = getInstalledVersion('react', cwd, pkg);
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

export function validateDependencies(cwd: string = process.cwd()): DependencyCheckResult {
  const pkg = getPackageJson(cwd); // read package.json once for all sub-validators
  return {
    reactPdfRenderer: validateReactPdfRenderer(cwd, pkg),
    react: validateReact(cwd, pkg),
    nodeJs: validateNodeVersion(),
  };
}
