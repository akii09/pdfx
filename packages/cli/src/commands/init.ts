import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';

export async function init() {
  console.log(chalk.bold.cyan('\n🚀 Welcome to the pdfx cli\n'));

  const answers = await prompts([
    {
      type: 'text',
      name: 'componentDir',
      message: 'Where should we install components?',
      initial: './src/components/pdfx',
    },
    {
      type: 'text',
      name: 'registry',
      message: 'Registry URL:',
      initial: 'https://pdfx.akashpise.dev/r',
    },
  ]);

  const config = {
    $schema: 'https://pdfx.akashpise.dev/schema.json',
    componentDir: answers.componentDir,
    registry: answers.registry,
  };

  const spinner = ora('Creating config file...').start();

  try {
    fs.writeFileSync(path.join(process.cwd(), 'pdfx.json'), JSON.stringify(config, null, 2));
    spinner.succeed('Created pdfx.json');
    console.log(chalk.green('\n✨ Success! You can now run:'));
    console.log(chalk.cyan('  pdfx add heading'));
    console.log(chalk.dim(`\n  Components will be installed to: ${path.join(process.cwd(), answers.componentDir)}\n`));
  } catch (error) {
    spinner.fail('Failed to create config');
    console.error(error);
    process.exit(1);
  }
}
