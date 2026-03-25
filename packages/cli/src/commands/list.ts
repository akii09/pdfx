import path from 'node:path';
import {
  type Config,
  ConfigError,
  NetworkError,
  RegistryError,
  registrySchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import { DEFAULTS, FETCH_TIMEOUT_MS } from '../constants.js';
import { checkFileExists, safePath } from '../utils/file-system.js';
import { readConfig } from './add.js';

export async function list() {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  let config: Config;
  let hasLocalProject = false;

  if (checkFileExists(configPath)) {
    try {
      config = readConfig(configPath);
      hasLocalProject = true;
    } catch (error: unknown) {
      if (error instanceof ConfigError) {
        console.error(chalk.red(error.message));
        if (error.suggestion) console.log(chalk.yellow(`  Hint: ${error.suggestion}`));
      } else {
        console.error(chalk.red('Invalid pdfx.json'));
      }
      process.exit(1);
    }
  } else {
    config = {
      registry: DEFAULTS.REGISTRY_URL,
      componentDir: DEFAULTS.COMPONENT_DIR,
      theme: DEFAULTS.THEME_FILE,
      blockDir: DEFAULTS.BLOCK_DIR,
    };
    console.log(chalk.dim('No pdfx.json found. Listing from default registry.\n'));
  }

  const spinner = ora('Fetching registry...').start();

  try {
    let response: Response;
    try {
      response = await fetch(`${config.registry}/index.json`, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'TimeoutError';
      throw new NetworkError(
        isTimeout
          ? `Registry request timed out after 10 seconds.\n  ${chalk.dim('Check your internet connection or try again later.')}`
          : `Could not reach registry at ${config.registry}\n  ${chalk.dim('Verify the URL is correct and you have internet access.')}`
      );
    }

    if (!response.ok) {
      throw new RegistryError(`Registry returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const result = registrySchema.safeParse(data);

    if (!result.success) {
      throw new RegistryError('Invalid registry format');
    }

    spinner.stop();

    const components = result.data.items.filter((item) => item.type === 'registry:ui');
    const blocks = result.data.items.filter((item) => item.type === 'registry:block');

    const componentBaseDir = path.resolve(process.cwd(), config.componentDir);
    const blockBaseDir = path.resolve(process.cwd(), config.blockDir ?? DEFAULTS.BLOCK_DIR);

    console.log(chalk.bold(`\n  Components (${components.length})`));
    console.log(chalk.dim('  Install with: pdfx add <component>\n'));

    for (const item of components) {
      const componentSubDir = path.join(componentBaseDir, item.name);
      const localPath = safePath(componentSubDir, `pdfx-${item.name}.tsx`);
      const installed = hasLocalProject && checkFileExists(localPath);
      const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

      console.log(`  ${chalk.cyan(item.name.padEnd(20))} ${item.description}`);
      if (hasLocalProject) {
        console.log(`  ${''.padEnd(20)} ${status}`);
      }
      console.log();
    }

    console.log(chalk.bold(`  Blocks (${blocks.length})`));
    console.log(chalk.dim('  Copy-paste designs. Install with: pdfx block add <block>\n'));

    for (const item of blocks) {
      const blockDir = path.join(blockBaseDir, item.name);
      const installed = hasLocalProject && checkFileExists(blockDir);
      const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

      console.log(`  ${chalk.cyan(item.name.padEnd(22))} ${item.description ?? ''}`);
      if (hasLocalProject) {
        console.log(`  ${''.padEnd(22)} ${status}`);
      }
      if (item.peerComponents && item.peerComponents.length > 0) {
        console.log(chalk.dim(`  ${''.padEnd(22)} requires: ${item.peerComponents.join(', ')}`));
      }
      console.log();
    }

    console.log(chalk.dim('  Quick Start:'));
    console.log(chalk.dim(`    pdfx add heading table         ${chalk.dim('# Add components')}`));
    console.log(
      chalk.dim(`    pdfx block add invoice-classic ${chalk.dim('# Add copy-paste block')}`)
    );
    console.log();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(message);
    process.exit(1);
  }
}
