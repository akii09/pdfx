import chalk from 'chalk';
import { type DependencyCheckResult, validateDependencies } from './dependency-validator.js';
import { type EnvironmentCheckResult, validateEnvironment } from './environment-validator.js';

export interface PreFlightResult {
  environment: EnvironmentCheckResult;
  dependencies: DependencyCheckResult;
  blockingErrors: string[];
  warnings: string[];
  canProceed: boolean;
}

/**
 * Run all pre-flight checks and return structured results
 */
export function runPreFlightChecks(cwd: string = process.cwd()): PreFlightResult {
  const environment = validateEnvironment(cwd);
  const dependencies = validateDependencies(cwd);

  const blockingErrors: string[] = [];
  const warnings: string[] = [];

  // Check environment (blocking)
  if (!environment.hasPackageJson.valid) {
    blockingErrors.push(
      `${environment.hasPackageJson.message}\n  ${chalk.dim('→')} ${environment.hasPackageJson.fixCommand}`
    );
  }

  if (!environment.isReactProject.valid) {
    blockingErrors.push(
      `${environment.isReactProject.message}\n  ${chalk.dim('→')} ${environment.isReactProject.fixCommand}`
    );
  }

  // Check Node.js version (blocking)
  if (!dependencies.nodeJs.valid) {
    blockingErrors.push(
      `${dependencies.nodeJs.message}\n  ${chalk.dim('→')} Current: ${dependencies.nodeJs.currentVersion}, Required: ${dependencies.nodeJs.requiredVersion}\n  ${chalk.dim('→')} Visit https://nodejs.org to upgrade`
    );
  }

  // Check React version (warning only)
  if (!dependencies.react.valid && dependencies.react.installed) {
    warnings.push(
      `${dependencies.react.message}\n  ${chalk.dim('→')} Current: ${dependencies.react.currentVersion}, Required: ${dependencies.react.requiredVersion}`
    );
  } else if (!dependencies.react.installed) {
    blockingErrors.push(
      `${dependencies.react.message}\n  ${chalk.dim('→')} This should have been caught by React project check`
    );
  }

  // Check @react-pdf/renderer (handled separately in install flow)
  // We don't add it to blockingErrors here because we'll offer to install it

  // Check @react-pdf/renderer version compatibility (warning if installed but wrong version)
  if (dependencies.reactPdfRenderer.installed && !dependencies.reactPdfRenderer.valid) {
    warnings.push(
      `${dependencies.reactPdfRenderer.message}\n  ${chalk.dim('→')} Consider upgrading: npm install @react-pdf/renderer@latest`
    );
  }

  // Check TypeScript types (warning only)
  if (dependencies.typescript && !dependencies.typescript.valid) {
    warnings.push(
      `${dependencies.typescript.message}\n  ${chalk.dim('→')} Install types: npm install -D @types/react-pdf`
    );
  }

  return {
    environment,
    dependencies,
    blockingErrors,
    warnings,
    canProceed: blockingErrors.length === 0,
  };
}

/**
 * Display pre-flight check results with nice formatting
 */
export function displayPreFlightResults(result: PreFlightResult): void {
  console.log(chalk.bold('\n  Pre-flight Checks:\n'));

  // Show blocking errors
  if (result.blockingErrors.length > 0) {
    console.log(chalk.red('  ✗ Blocking Issues:\n'));
    for (const error of result.blockingErrors) {
      console.log(chalk.red(`    • ${error}\n`));
    }
  }

  // Show warnings
  if (result.warnings.length > 0) {
    console.log(chalk.yellow('  ⚠ Warnings:\n'));
    for (const warning of result.warnings) {
      console.log(chalk.yellow(`    • ${warning}\n`));
    }
  }

  // Show success if no issues
  if (result.blockingErrors.length === 0 && result.warnings.length === 0) {
    console.log(chalk.green('  ✓ All checks passed!\n'));
  }
}
