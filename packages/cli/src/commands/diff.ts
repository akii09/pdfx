import fs from 'node:fs';
import path from 'node:path';
import {
  type Config,
  NetworkError,
  RegistryError,
  componentNameSchema,
  configSchema,
  registryItemSchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import { checkFileExists, safePath } from '../utils/file-system.js';
import { readJsonFile } from '../utils/read-json.js';

const FETCH_TIMEOUT_MS = 10_000;

export async function diff(components: string[]) {
  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!checkFileExists(configPath)) {
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
  const targetDir = path.resolve(process.cwd(), config.componentDir);

  for (const componentName of components) {
    const nameResult = componentNameSchema.safeParse(componentName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid component name: "${componentName}"`));
      continue;
    }

    const spinner = ora(`Comparing ${componentName}...`).start();

    try {
      let response: Response;
      try {
        response = await fetch(`${config.registry}/${componentName}.json`, {
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
      } catch (err) {
        const isTimeout = err instanceof Error && err.name === 'TimeoutError';
        throw new NetworkError(
          isTimeout ? 'Registry request timed out' : `Could not reach ${config.registry}`
        );
      }

      if (!response.ok) {
        throw new RegistryError(
          response.status === 404
            ? `Component "${componentName}" not found in registry`
            : `Registry returned HTTP ${response.status}`
        );
      }

      const data = await response.json();
      const result = registryItemSchema.safeParse(data);
      if (!result.success) {
        throw new RegistryError(`Invalid registry entry for "${componentName}"`);
      }

      const component = result.data;
      spinner.stop();

      // Components are installed under {componentDir}/{name}/pdfx-{name}.tsx
      const componentSubDir = path.join(targetDir, component.name);

      for (const file of component.files) {
        const fileName = path.basename(file.path);
        const localPath = safePath(componentSubDir, fileName);

        if (!checkFileExists(localPath)) {
          console.log(chalk.yellow(`  ${fileName}: not installed locally`));
          continue;
        }

        const localContent = fs.readFileSync(localPath, 'utf-8');
        const registryContent = file.content;

        if (localContent === registryContent) {
          console.log(chalk.green(`  ${fileName}: up to date`));
        } else {
          console.log(chalk.yellow(`  ${fileName}: differs from registry`));

          const localLines = localContent.split('\n');
          const registryLines = registryContent.split('\n');

          console.log(chalk.dim(`    Local: ${localLines.length} lines`));
          console.log(chalk.dim(`    Registry: ${registryLines.length} lines`));
        }
      }

      console.log();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      spinner.fail(message);
    }
  }
}
