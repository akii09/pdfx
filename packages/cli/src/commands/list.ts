import path from 'node:path';
import {
  type Config,
  NetworkError,
  RegistryError,
  configSchema,
  registrySchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import { checkFileExists, safePath } from '../utils/file-system.js';
import { readJsonFile } from '../utils/read-json.js';

const FETCH_TIMEOUT_MS = 10_000;

export async function list() {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  let config: Config;
  let hasLocalProject = false;

  // Try to load config, but don't require it
  if (checkFileExists(configPath)) {
    const raw = readJsonFile(configPath);
    const configResult = configSchema.safeParse(raw);
    if (!configResult.success) {
      console.error(chalk.red('Invalid pdfx.json'));
      process.exit(1);
    }
    config = configResult.data;
    hasLocalProject = true;
  } else {
    // Use default registry when no config exists
    config = {
      registry: 'https://pdfx.akashpise.dev/r',
      componentDir: './src/components/pdfx',
      theme: './src/lib/pdfx-theme.ts',
    };
    console.log(chalk.dim('No pdfx.json found. Listing components from default registry.\n'));
  }
  const spinner = ora('Fetching component list...').start();

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
    console.log(chalk.bold(`\n  Available Components (${components.length})\n`));

    for (const item of components) {
      // Only show install status if we have a local project
      if (hasLocalProject) {
        const targetDir = path.resolve(process.cwd(), config.componentDir);
        const componentSubDir = path.join(targetDir, item.name);
        const localPath = safePath(componentSubDir, `pdfx-${item.name}.tsx`);
        const installed = checkFileExists(localPath);
        const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

        console.log(`  ${chalk.cyan(item.name.padEnd(20))} ${item.description}`);
        console.log(`  ${''.padEnd(20)} ${status}`);
      } else {
        // No local project - just show component info
        console.log(`  ${chalk.cyan(item.name.padEnd(20))} ${item.description}`);
      }
      console.log();
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(message);
    process.exit(1);
  }
}
