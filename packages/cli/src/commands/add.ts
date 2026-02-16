import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import type { Config, RegistryItem } from '../types.js';

export async function add(components: string[]) {
  // Read config
  const configPath = path.join(process.cwd(), 'pdfx.json');
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: pdfx init'));
    process.exit(1);
  }

  const config: Config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  for (const componentName of components) {
    const spinner = ora(`Adding ${componentName}...`).start();

    try {
      // Fetch from registry
      const url = `${config.registry}/${componentName}.json`;
      const response = await fetch(url);

      if (!response.ok) {
        spinner.fail(`Component ${componentName} not found`);
        continue;
      }

      const component = (await response.json()) as RegistryItem;

      // Create target directory
      const targetDir = path.join(process.cwd(), config.componentDir);
      fs.mkdirSync(targetDir, { recursive: true });

      // Write files
      for (const file of component.files) {
        const fileName = path.basename(file.path);
        const filePath = path.join(targetDir, fileName);
        fs.writeFileSync(filePath, file.content);
      }

      spinner.succeed(`Added ${componentName}`);

      // Show dependencies
      if (component.dependencies && component.dependencies.length > 0) {
        console.log(chalk.dim(`  Dependencies: ${component.dependencies.join(', ')}`));
      }
    } catch (error) {
      spinner.fail(`Failed to add ${componentName}`);
      console.error(error);
    }
  }

  const resolvedDir = path.resolve(process.cwd(), config.componentDir);
  console.log(chalk.green('\n✨ Done!'));
  console.log(chalk.dim(`  Components installed to: ${resolvedDir}\n`));
}
