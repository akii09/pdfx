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
import { fileExists, safePath } from '../utils/file-system.js';
import { readJsonFile } from '../utils/read-json.js';

export async function list() {
  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!fileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: pdfx init'));
    process.exit(1);
  }

  const raw = readJsonFile(configPath);
  const configResult = configSchema.safeParse(raw);
  if (!configResult.success) {
    console.error(chalk.red('Invalid pdfx.json'));
    process.exit(1);
  }

  const config: Config = configResult.data;
  const spinner = ora('Fetching component list...').start();

  try {
    let response: Response;
    try {
      response = await fetch(`${config.registry}/index.json`);
    } catch {
      throw new NetworkError(`Could not reach ${config.registry}`);
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

    const targetDir = path.resolve(process.cwd(), config.componentDir);

    console.log(chalk.bold(`\n  Available Components (${result.data.items.length})\n`));

    for (const item of result.data.items) {
      const localPath = safePath(targetDir, `${item.name}.tsx`);
      const installed = fileExists(localPath);
      const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

      console.log(`  ${chalk.cyan(item.name.padEnd(20))} ${item.description}`);
      console.log(`  ${''.padEnd(20)} ${status}`);
      console.log();
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(message);
    process.exit(1);
  }
}
