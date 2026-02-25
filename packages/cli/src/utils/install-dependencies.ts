import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';
import type { DependencyValidation } from './dependency-validator.js';
import { detectPackageManager, getInstallCommand } from './package-manager.js';

export interface InstallResult {
  success: boolean;
  message: string;
}

/**
 * Prompt user and install @react-pdf/renderer if they agree
 */
export async function promptAndInstallReactPdf(
  validation: DependencyValidation,
  cwd: string = process.cwd()
): Promise<InstallResult> {
  // If already installed and compatible, no need to install
  if (validation.installed && validation.valid) {
    return {
      success: true,
      message: '@react-pdf/renderer is already installed and compatible',
    };
  }

  const pm = detectPackageManager(cwd);
  const packageName = '@react-pdf/renderer';
  const installCmd = getInstallCommand(pm.name, [packageName]);

  console.log(chalk.yellow('\n  ⚠ @react-pdf/renderer is required but not installed\n'));
  console.log(chalk.dim(`    This command will run: ${installCmd}\n`));

  const { shouldInstall } = await prompts({
    type: 'confirm',
    name: 'shouldInstall',
    message: 'Install @react-pdf/renderer now?',
    initial: true,
  });

  if (!shouldInstall) {
    return {
      success: false,
      message: `Installation cancelled. Please install manually:\n  ${chalk.cyan(installCmd)}`,
    };
  }

  // Install the package
  const spinner = ora('Installing @react-pdf/renderer...').start();

  try {
    await execa(pm.name, ['add', packageName], {
      cwd,
      stdio: 'pipe',
    });

    spinner.succeed('Installed @react-pdf/renderer');
    return {
      success: true,
      message: '@react-pdf/renderer installed successfully',
    };
  } catch (error: unknown) {
    spinner.fail('Failed to install @react-pdf/renderer');
    const message = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Installation failed: ${message}\n  Try manually: ${chalk.cyan(installCmd)}`,
    };
  }
}

/**
 * Check and offer to install @react-pdf/renderer if needed
 */
export async function ensureReactPdfRenderer(
  validation: DependencyValidation,
  cwd: string = process.cwd()
): Promise<boolean> {
  // If not installed, prompt to install
  if (!validation.installed) {
    const result = await promptAndInstallReactPdf(validation, cwd);
    if (!result.success) {
      console.error(chalk.red(`\n  ${result.message}\n`));
      return false;
    }
    return true;
  }

  // If installed but incompatible version, warn but allow to continue
  if (!validation.valid) {
    console.log(
      chalk.yellow(
        `\n  ⚠ ${validation.message}\n  ${chalk.dim('→')} You may encounter compatibility issues\n`
      )
    );
  }

  return true;
}
