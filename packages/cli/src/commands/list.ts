import path from 'node:path';
import { NetworkError, RegistryError, registrySchema } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import { DEFAULTS } from '../constants.js';
import { checkFileExists, safePath } from '../utils/file-system.js';
import { tryReadConfig } from '../utils/config.js';

const FETCH_TIMEOUT_MS = 10_000;

export async function list() {
  // pdfx.json is optional — fall back to the default registry URL if absent
  const config = tryReadConfig();
  const registryUrl = config?.registry ?? DEFAULTS.REGISTRY_URL;
  const componentDir = config?.componentDir ?? DEFAULTS.COMPONENT_DIR;

  const spinner = ora('Fetching component list...').start();

  try {
    let response: Response;
    try {
      response = await fetch(`${registryUrl}/index.json`, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'TimeoutError';
      throw new NetworkError(
        isTimeout ? 'Registry request timed out' : `Could not reach ${registryUrl}`
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

    const targetDir = path.resolve(process.cwd(), componentDir);

    console.log(chalk.bold(`\n  Available Components (${result.data.items.length})\n`));

    for (const item of result.data.items) {
      // Components are installed under {componentDir}/{name}/pdfx-{name}.tsx
      const componentSubDir = path.join(targetDir, item.name);
      const localPath = safePath(componentSubDir, `pdfx-${item.name}.tsx`);
      const installed = checkFileExists(localPath);
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
