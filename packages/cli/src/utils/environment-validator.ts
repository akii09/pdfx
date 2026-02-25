import fs from 'node:fs';
import path from 'node:path';
import { readJsonFile } from './read-json.js';

export interface EnvironmentValidation {
  valid: boolean;
  message: string;
  fixCommand?: string;
}

export interface EnvironmentCheckResult {
  hasPackageJson: EnvironmentValidation;
  isReactProject: EnvironmentValidation;
  hasPdfxConfig: EnvironmentValidation;
}

/**
 * Check if package.json exists in current directory
 */
export function validatePackageJson(cwd: string = process.cwd()): EnvironmentValidation {
  const pkgPath = path.join(cwd, 'package.json');
  const exists = fs.existsSync(pkgPath);

  return {
    valid: exists,
    message: exists ? 'package.json found' : 'No package.json found in current directory',
    fixCommand: exists ? undefined : 'Run "npm init" or "pnpm init" to create a package.json',
  };
}

/**
 * Check if this is a valid React project (has react in dependencies)
 */
export function validateReactProject(cwd: string = process.cwd()): EnvironmentValidation {
  const pkgPath = path.join(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    return {
      valid: false,
      message: 'Cannot validate React project without package.json',
    };
  }

  try {
    const pkg = readJsonFile(pkgPath) as Record<string, unknown>;
    const deps = {
      ...(pkg.dependencies as Record<string, string> | undefined),
      ...(pkg.devDependencies as Record<string, string> | undefined),
    };

    const hasReact = 'react' in deps;
    return {
      valid: hasReact,
      message: hasReact ? 'React is installed' : 'This does not appear to be a React project',
      fixCommand: hasReact
        ? undefined
        : 'Install React: npx create-vite@latest or npx create-react-app',
    };
  } catch {
    return {
      valid: false,
      message: 'Failed to read package.json',
    };
  }
}

/**
 * Check if pdfx.json already exists (warn, but not blocking)
 */
export function validatePdfxConfig(cwd: string = process.cwd()): EnvironmentValidation {
  const configPath = path.join(cwd, 'pdfx.json');
  const exists = fs.existsSync(configPath);

  return {
    valid: true, // Not blocking
    message: exists
      ? 'pdfx.json already exists (will prompt to overwrite)'
      : 'No existing pdfx.json',
  };
}

/**
 * Run all environment checks
 */
export function validateEnvironment(cwd: string = process.cwd()): EnvironmentCheckResult {
  return {
    hasPackageJson: validatePackageJson(cwd),
    isReactProject: validateReactProject(cwd),
    hasPdfxConfig: validatePdfxConfig(cwd),
  };
}
