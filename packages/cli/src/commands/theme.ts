import fs from 'node:fs';
import path from 'node:path';
import { type ThemePresetName, configSchema, themePresets } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { DEFAULTS } from '../constants.js';
import { ensureDir } from '../utils/file-system.js';
import { generateThemeFile } from '../utils/generate-theme.js';
import { readJsonFile } from '../utils/read-json.js';

/**
 * Interactive theme initialization.
 * Prompts for preset selection and theme file path, then scaffolds the theme file.
 */
export async function themeInit() {
  console.log(chalk.bold.cyan('\n  PDFx Theme Setup\n'));

  const answers = await prompts(
    [
      {
        type: 'select',
        name: 'preset',
        message: 'Choose a theme preset:',
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
        console.log(chalk.yellow('\nTheme setup cancelled.'));
        process.exit(0);
      },
    }
  );

  if (!answers.preset || !answers.themePath) {
    console.error(chalk.red('Missing required fields.'));
    process.exit(1);
  }

  const presetName = answers.preset as ThemePresetName;
  const themePath = answers.themePath as string;
  const preset = themePresets[presetName];

  const spinner = ora(`Scaffolding ${presetName} theme...`).start();

  try {
    const absThemePath = path.resolve(process.cwd(), themePath);
    ensureDir(path.dirname(absThemePath));
    fs.writeFileSync(absThemePath, generateThemeFile(preset), 'utf-8');
    spinner.succeed(`Created ${themePath} with ${presetName} theme`);

    // Update pdfx.json if it exists
    const configPath = path.join(process.cwd(), 'pdfx.json');
    if (fs.existsSync(configPath)) {
      try {
        const rawConfig = readJsonFile(configPath);
        const result = configSchema.safeParse(rawConfig);
        if (result.success) {
          const updatedConfig = { ...result.data, theme: themePath };
          fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf-8');
          console.log(chalk.green('  Updated pdfx.json with theme path'));
        }
      } catch {
        console.log(chalk.yellow('  Could not update pdfx.json — add "theme" field manually'));
      }
    }

    console.log(chalk.dim(`\n  Edit ${themePath} to customize your theme.\n`));
  } catch (error: unknown) {
    spinner.fail('Failed to create theme file');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    process.exit(1);
  }
}

/**
 * Switch to a different preset theme.
 * Overwrites the existing theme file with the selected preset.
 */
export async function themeSwitch(presetName: string) {
  const validPresets = Object.keys(themePresets);
  if (!validPresets.includes(presetName)) {
    console.error(
      chalk.red(`Invalid preset: "${presetName}". Valid presets: ${validPresets.join(', ')}`)
    );
    process.exit(1);
  }

  // Safe: validated above via validPresets.includes()
  const validatedPreset = presetName as ThemePresetName;

  const configPath = path.join(process.cwd(), 'pdfx.json');
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('No pdfx.json found. Run "pdfx init" first.'));
    process.exit(1);
  }

  const rawConfig = readJsonFile(configPath);
  const result = configSchema.safeParse(rawConfig);
  if (!result.success) {
    console.error(chalk.red('Invalid pdfx.json configuration.'));
    process.exit(1);
  }

  const config = result.data;
  if (!config.theme) {
    console.error(
      chalk.red('No theme path in pdfx.json. Run "pdfx theme init" to set up theming.')
    );
    process.exit(1);
  }

  const answer = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `This will overwrite ${config.theme} with the ${validatedPreset} preset. Continue?`,
    initial: false,
  });

  if (!answer.confirm) {
    console.log(chalk.yellow('Cancelled.'));
    return;
  }

  const spinner = ora(`Switching to ${validatedPreset} theme...`).start();

  try {
    const preset = themePresets[validatedPreset];
    const absThemePath = path.resolve(process.cwd(), config.theme);
    fs.writeFileSync(absThemePath, generateThemeFile(preset), 'utf-8');
    spinner.succeed(`Switched to ${validatedPreset} theme`);
  } catch (error: unknown) {
    spinner.fail('Failed to switch theme');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    process.exit(1);
  }
}

/**
 * Validate the user's theme file against the theme schema.
 */
export async function themeValidate() {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('No pdfx.json found. Run "pdfx init" first.'));
    process.exit(1);
  }

  const rawConfig = readJsonFile(configPath);
  const configResult = configSchema.safeParse(rawConfig);
  if (!configResult.success) {
    console.error(chalk.red('Invalid pdfx.json configuration.'));
    process.exit(1);
  }

  if (!configResult.data.theme) {
    console.error(
      chalk.red('No theme path in pdfx.json. Run "pdfx theme init" to set up theming.')
    );
    process.exit(1);
  }

  const absThemePath = path.resolve(process.cwd(), configResult.data.theme);
  if (!fs.existsSync(absThemePath)) {
    console.error(chalk.red(`Theme file not found: ${configResult.data.theme}`));
    process.exit(1);
  }

  const spinner = ora('Validating theme file...').start();

  try {
    // Read the file and try to extract the theme object
    const content = fs.readFileSync(absThemePath, 'utf-8');

    // Basic structural validation — check that required keys exist
    const requiredKeys = ['name', 'primitives', 'colors', 'typography', 'spacing', 'page'];
    const missingKeys = requiredKeys.filter((key) => !content.includes(`${key}:`));

    if (missingKeys.length > 0) {
      spinner.fail(`Theme file is missing keys: ${missingKeys.join(', ')}`);
      console.log(chalk.dim('  Run "pdfx theme init" to regenerate the theme file.'));
      process.exit(1);
    }

    // Check for required color tokens
    const requiredColors = [
      'foreground',
      'background',
      'muted',
      'mutedForeground',
      'primary',
      'primaryForeground',
      'border',
      'accent',
      'destructive',
      'success',
      'warning',
      'info',
    ];
    const missingColors = requiredColors.filter((key) => !content.includes(`${key}:`));

    if (missingColors.length > 0) {
      spinner.warn(`Theme file may be missing color tokens: ${missingColors.join(', ')}`);
    } else {
      spinner.succeed('Theme file structure looks valid');
    }

    console.log(chalk.dim(`\n  Validated: ${configResult.data.theme}\n`));
  } catch (error: unknown) {
    spinner.fail('Failed to validate theme');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    process.exit(1);
  }
}
