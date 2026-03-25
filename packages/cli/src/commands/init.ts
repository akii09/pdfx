import fs from 'node:fs';
import path from 'node:path';
import { type ThemePresetName, configSchema, themePresets } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { DEFAULTS } from '../constants.js';
import { ensureDir } from '../utils/file-system.js';
import { generateThemeContextFile, generateThemeFile } from '../utils/generate-theme.js';
import { ensureReactPdfRenderer } from '../utils/install-dependencies.js';
import { displayPreFlightResults, runPreFlightChecks } from '../utils/pre-flight.js';
import { normalizeThemePath, validateThemePath } from '../utils/theme-path.js';

export async function init() {
  console.log(chalk.bold.cyan('\n  Welcome to the pdfx cli\n'));

  const preFlightResult = runPreFlightChecks();
  displayPreFlightResults(preFlightResult);

  if (!preFlightResult.canProceed) {
    console.error(
      chalk.red('\n  Cannot proceed due to blocking issues. Please fix them and try again.\n')
    );
    process.exit(1);
  }

  const hasReactPdf = await ensureReactPdfRenderer(preFlightResult.dependencies.reactPdfRenderer);
  if (!hasReactPdf) {
    console.error(
      chalk.red('\n  @react-pdf/renderer is required. Please install it and try again.\n')
    );
    process.exit(1);
  }

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
        validate: (value: string) => {
          if (!value || value.trim().length === 0) {
            return 'Component directory is required';
          }

          if (path.isAbsolute(value)) {
            return 'Please use a relative path (e.g., ./src/components/pdfx)';
          }

          if (!value.startsWith('.')) {
            return 'Path should start with ./ or ../ (e.g., ./src/components/pdfx)';
          }
          return true;
        },
      },
      {
        type: 'text',
        name: 'blockDir',
        message: 'Where should we install blocks?',
        initial: DEFAULTS.BLOCK_DIR,
        validate: (value: string) => {
          if (!value || value.trim().length === 0) {
            return 'Block directory is required';
          }
          if (path.isAbsolute(value)) {
            return 'Please use a relative path (e.g., ./src/blocks/pdfx)';
          }
          if (!value.startsWith('.')) {
            return 'Path should start with ./ or ../ (e.g., ./src/blocks/pdfx)';
          }
          return true;
        },
      },
      {
        type: 'text',
        name: 'registry',
        message: 'Registry URL:',
        initial: DEFAULTS.REGISTRY_URL,
        validate: (value: string) => {
          if (!value || !value.startsWith('http')) {
            return 'Please enter a valid HTTP(S) URL';
          }
          return true;
        },
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
        format: normalizeThemePath,
        validate: validateThemePath,
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
    blockDir: answers.blockDir || DEFAULTS.BLOCK_DIR,
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
    const componentDirPath = path.resolve(process.cwd(), answers.componentDir);
    ensureDir(componentDirPath);
    fs.writeFileSync(path.join(process.cwd(), 'pdfx.json'), JSON.stringify(config, null, 2));

    const presetName = (answers.themePreset || 'professional') as ThemePresetName;
    const preset = themePresets[presetName];
    const themePath = path.resolve(process.cwd(), config.theme);
    ensureDir(path.dirname(themePath));
    fs.writeFileSync(themePath, generateThemeFile(preset), 'utf-8');

    const contextPath = path.join(path.dirname(themePath), 'pdfx-theme-context.tsx');
    fs.writeFileSync(contextPath, generateThemeContextFile(), 'utf-8');

    spinner.succeed(`Created pdfx.json + ${config.theme} (${presetName} theme)`);
    console.log(chalk.green('\nSuccess! You can now run:'));
    console.log(chalk.cyan('  pdfx add heading'));
    console.log(chalk.cyan('  pdfx block add invoice-classic'));
    console.log(chalk.dim(`\n  Components: ${path.resolve(process.cwd(), answers.componentDir)}`));
    console.log(chalk.dim(`  Blocks: ${path.resolve(process.cwd(), config.blockDir)}`));
    console.log(chalk.dim(`  Theme: ${path.resolve(process.cwd(), config.theme)}\n`));
  } catch (error: unknown) {
    spinner.fail('Failed to create config');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    process.exit(1);
  }
}
