import fs from 'node:fs';
import path from 'node:path';
import { type ThemePresetName, configSchema, themePresets } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { DEFAULTS } from '../constants.js';
import { ensureDir } from '../utils/file-system.js';
import { generateThemeContextFile, generateThemeFile } from '../utils/generate-theme.js';

export async function init() {
  console.log(chalk.bold.cyan('\n  Welcome to the pdfx cli\n'));

  // L8: Warn if pdfx.json already exists
  const existingConfig = path.join(process.cwd(), 'pdfx.json');
  if (fs.existsSync(existingConfig)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'pdfx.json already exists. Overwrite?',
      initial: false,
    });
    if (!overwrite) {
      console.log(chalk.yellow('Init cancelled — existing config preserved.'));
      return;
    }
  }

  const answers = await prompts(
    [
      {
        type: 'text',
        name: 'componentDir',
        message: 'Where should we install components?',
        initial: DEFAULTS.COMPONENT_DIR,
      },
      {
        type: 'text',
        name: 'registry',
        message: 'Registry URL:',
        initial: DEFAULTS.REGISTRY_URL,
      },
      {
        type: 'select',
        name: 'themePreset',
        message: 'Choose a theme:',
        choices: [
          {
            title: 'Professional',
            description: 'Serif headings, navy colors, generous margins',
            value: 'professional',
          },
          {
            title: 'Modern',
            description: 'Sans-serif, vibrant purple, tight spacing',
            value: 'modern',
          },
          {
            title: 'Minimal',
            description: 'Monospace headings, stark black, maximum whitespace',
            value: 'minimal',
          },
        ],
        initial: 0,
      },
      {
        type: 'text',
        name: 'themePath',
        message: 'Where should we create the theme file?',
        initial: DEFAULTS.THEME_FILE,
      },
    ],
    {
      onCancel: () => {
        console.log(chalk.yellow('\nSetup cancelled.'));
        process.exit(0);
      },
    }
  );

  if (!answers.componentDir || !answers.registry) {
    console.error(chalk.red('Missing required fields. Run pdfx init again.'));
    process.exit(1);
  }

  const config = {
    $schema: DEFAULTS.SCHEMA_URL,
    componentDir: answers.componentDir,
    registry: answers.registry,
    theme: answers.themePath || DEFAULTS.THEME_FILE,
  };

  // Validate the config we're about to write
  const validation = configSchema.safeParse(config);
  if (!validation.success) {
    const issues = validation.error.issues.map((i) => i.message).join(', ');
    console.error(chalk.red(`Invalid configuration: ${issues}`));
    process.exit(1);
  }

  const spinner = ora('Creating config and theme files...').start();

  try {
    // Write pdfx.json
    fs.writeFileSync(path.join(process.cwd(), 'pdfx.json'), JSON.stringify(config, null, 2));

    // Generate and write theme file + context file
    const presetName = (answers.themePreset || 'professional') as ThemePresetName;
    const preset = themePresets[presetName];
    const themePath = path.resolve(process.cwd(), config.theme);
    ensureDir(path.dirname(themePath));
    fs.writeFileSync(themePath, generateThemeFile(preset), 'utf-8');

    // Scaffold the context file alongside the theme file
    const contextPath = path.join(path.dirname(themePath), 'pdfx-theme-context.tsx');
    fs.writeFileSync(contextPath, generateThemeContextFile(), 'utf-8');

    spinner.succeed(`Created pdfx.json + ${config.theme} (${presetName} theme)`);
    console.log(chalk.green('\nSuccess! You can now run:'));
    console.log(chalk.cyan('  pdfx add heading'));
    console.log(chalk.dim(`\n  Components: ${path.resolve(process.cwd(), answers.componentDir)}`));
    console.log(chalk.dim(`  Theme: ${path.resolve(process.cwd(), config.theme)}\n`));
  } catch (error: unknown) {
    spinner.fail('Failed to create config');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    process.exit(1);
  }
}
