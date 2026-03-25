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

export function runPreFlightChecks(cwd: string = process.cwd()): PreFlightResult {
  const environment = validateEnvironment(cwd);
  const dependencies = validateDependencies(cwd);

  const blockingErrors: string[] = [];
  const warnings: string[] = [];

  if (!environment.hasPackageJson.valid) {
    blockingErrors.push(
      `${environment.hasPackageJson.message}\n  ${chalk.dim('→')} ${environment.hasPackageJson.fixCommand}`
    );
  } else if (!environment.isReactProject.valid) {
    blockingErrors.push(
      `${environment.isReactProject.message}\n  ${chalk.dim('→')} ${environment.isReactProject.fixCommand}`
    );
  } else {
    if (!dependencies.react.valid && dependencies.react.installed) {
      warnings.push(
        `${dependencies.react.message}\n  ${chalk.dim('→')} Current: ${dependencies.react.currentVersion}, Required: ${dependencies.react.requiredVersion}`
      );
    } else if (!dependencies.react.installed) {
      blockingErrors.push(
        `${dependencies.react.message}\n  ${chalk.dim('→')} Install React: npm install react react-dom`
      );
    }
  }

  if (!dependencies.nodeJs.valid) {
    blockingErrors.push(
      `${dependencies.nodeJs.message}\n  ${chalk.dim('→')} Current: ${dependencies.nodeJs.currentVersion}, Required: ${dependencies.nodeJs.requiredVersion}\n  ${chalk.dim('→')} Visit https://nodejs.org to upgrade`
    );
  }

  if (dependencies.reactPdfRenderer.installed && !dependencies.reactPdfRenderer.valid) {
    warnings.push(
      `${dependencies.reactPdfRenderer.message}\n  ${chalk.dim('→')} Consider upgrading: npm install @react-pdf/renderer@latest`
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

export function displayPreFlightResults(result: PreFlightResult): void {
  console.log(chalk.bold('\n  Pre-flight Checks:\n'));

  if (result.blockingErrors.length > 0) {
    console.log(chalk.red('  ✗ Blocking Issues:\n'));
    for (const error of result.blockingErrors) {
      console.log(chalk.red(`    • ${error}\n`));
    }
  }

  if (result.warnings.length > 0) {
    console.log(chalk.yellow('  ⚠ Warnings:\n'));
    for (const warning of result.warnings) {
      console.log(chalk.yellow(`    • ${warning}\n`));
    }
  }

  if (result.blockingErrors.length === 0 && result.warnings.length === 0) {
    console.log(chalk.green('  ✓ All checks passed!\n'));
  }
}
