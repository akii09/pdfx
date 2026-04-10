import fs from 'node:fs';
import path from 'node:path';
import { type Config, componentNameSchema } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import { checkFileExists, safePath } from '../utils/file-system.js';
import { distinctId, posthog } from '../utils/posthog.js';
import { fetchComponent, readConfig, resolveThemeImport } from './add.js';

export async function diff(components: string[]) {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  let hasFailures = false;
  const outdatedComponents: string[] = [];

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: npx pdfx-cli@latest init'));
    process.exit(1);
  }

  let config: Config;
  try {
    config = readConfig(configPath);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(message));
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), config.componentDir);

  for (const componentName of components) {
    const nameResult = componentNameSchema.safeParse(componentName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid component name: "${componentName}"`));
      hasFailures = true;
      continue;
    }

    const spinner = ora(`Comparing ${componentName}...`).start();

    try {
      const component = await fetchComponent(componentName, config.registry);
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
        const registryContent =
          config.theme &&
          (file.content.includes('pdfx-theme') || file.content.includes('pdfx-theme-context'))
            ? resolveThemeImport(
                path.join(config.componentDir, component.name),
                config.theme,
                file.content
              )
            : file.content;

        if (localContent === registryContent) {
          console.log(chalk.green(`  ${fileName}: up to date`));
        } else {
          outdatedComponents.push(componentName);
          console.log(chalk.yellow(`  ${fileName}: differs from registry`));

          const localLines = localContent.split('\n');
          const registryLines = registryContent.split('\n');
          const lineDiff = localLines.length - registryLines.length;

          console.log(chalk.dim(`    Local: ${localLines.length} lines`));
          console.log(chalk.dim(`    Registry: ${registryLines.length} lines`));
          if (lineDiff !== 0) {
            const diffText =
              lineDiff > 0
                ? `${Math.abs(lineDiff)} line${Math.abs(lineDiff) > 1 ? 's' : ''} added locally`
                : `${Math.abs(lineDiff)} line${Math.abs(lineDiff) > 1 ? 's' : ''} removed locally`;
            console.log(chalk.dim(`    → ${diffText}`));
          }
        }
      }

      console.log();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      spinner.fail(message);
      hasFailures = true;
    }
  }

  posthog.capture({
    distinctId,
    event: 'component_diff_run',
    properties: {
      component_count: components.length,
      outdated_count: outdatedComponents.length,
      outdated_components: outdatedComponents,
      has_failures: hasFailures,
    },
  });
  await posthog.shutdown();

  if (hasFailures) {
    process.exit(1);
  }
}
