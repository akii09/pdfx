import fs from 'node:fs';
import path from 'node:path';
import { type ThemePresetName, ValidationError, configSchema, themePresets } from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { DEFAULTS, DOCS } from '../constants.js';
import { ensureDir } from '../utils/file-system.js';
import { generateThemeContextFile, generateThemeFile } from '../utils/generate-theme.js';
import { ensureReactPdfRenderer } from '../utils/install-dependencies.js';
import { distinctId, posthog, shutdownPosthog } from '../utils/posthog.js';
import { displayPreFlightResults, runPreFlightChecks } from '../utils/pre-flight.js';
import { type ProjectLayout, detectProjectLayout } from '../utils/project-layout.js';
import {
  hasComponentsJson,
  registerShadcnNamespace,
  shadcnRegistryAddCommand,
} from '../utils/shadcn-registry.js';
import {
  normalizeThemePath,
  resolveThemeFilePaths,
  validateThemePath,
} from '../utils/theme-path.js';

interface InitOptions {
  /** Skip all prompts and accept defaults. Suitable for CI / non-interactive environments. */
  yes?: boolean;
  /**
   * Register `@pdfx` in an existing shadcn `components.json`. Left undefined we
   * ask; `components.json` is shadcn's file, so we never rewrite it unprompted.
   */
  registerShadcn?: boolean;
}

/**
 * `components.json` belongs to shadcn, not to us, so registering `@pdfx` in it
 * is opt-in: explicit flag wins, `--yes` declines rather than touching a file
 * the user did not ask us to edit, and otherwise we ask.
 */
async function resolveShadcnConsent(cwd: string, options: InitOptions): Promise<boolean> {
  if (!hasComponentsJson(cwd)) return false;
  if (options.registerShadcn !== undefined) return options.registerShadcn;

  if (options.yes) {
    console.log(
      chalk.dim(
        '  Found components.json — re-run with --register-shadcn to add the @pdfx registry.'
      )
    );
    return false;
  }

  const { register } = await prompts({
    type: 'confirm',
    name: 'register',
    message: 'Found components.json. Register the @pdfx registry for the shadcn CLI?',
    initial: true,
  });
  return register === true;
}

export async function init(options: InitOptions = {}) {
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
    if (options.yes) {
      console.log(chalk.dim('  pdfx.json already exists — overwriting (--yes).'));
    } else {
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
  }

  // Propose destinations that match the project's layout rather than assuming `src/`.
  // Prompts stay editable, so this only changes what is pre-filled.
  let layout: ProjectLayout;
  try {
    layout = detectProjectLayout(process.cwd());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`\n  ${message}`));
    if (error instanceof ValidationError && error.suggestion) {
      console.log(chalk.dim(`  Hint: ${error.suggestion}\n`));
    }
    process.exit(1);
  }

  if (!layout.usesSrcDirectory) {
    console.log(
      chalk.dim('  No src/ directory found — suggesting root-level paths (components/, lib/).\n')
    );
  }

  // In --yes mode, skip all prompts and use sensible defaults.
  const answers = options.yes
    ? {
        componentDir: layout.componentDir,
        blockDir: layout.blockDir,
        registry: DEFAULTS.REGISTRY_URL,
        themePreset: 'professional' as const,
        themePath: normalizeThemePath(layout.themeFile),
      }
    : await prompts(
        [
          {
            type: 'text',
            name: 'componentDir',
            message: 'Where should we install components?',
            initial: layout.componentDir,
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
            initial: layout.blockDir,
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
            initial: layout.themeFile,
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
    console.error(chalk.red('Missing required fields. Run npx pdfx-cli@latest init again.'));
    process.exit(1);
  }

  const config = {
    $schema: DEFAULTS.SCHEMA_URL,
    componentDir: answers.componentDir,
    registry: answers.registry,
    theme: answers.themePath || DEFAULTS.THEME_FILE,
    blockDir: answers.blockDir || DEFAULTS.BLOCK_DIR,
  };

  const validation = configSchema.safeParse(config);
  if (!validation.success) {
    const issues = validation.error.issues
      .map((i) => {
        const fieldPath = i.path.length > 0 ? i.path.join('.') : 'root';
        return `"${fieldPath}": ${i.message}`;
      })
      .join('; ');
    console.error(chalk.red(`Invalid configuration: ${issues}`));
    process.exit(1);
  }

  // Asked before the spinner starts — a prompt under a live spinner is unreadable.
  const shouldRegisterShadcn = await resolveShadcnConsent(process.cwd(), options);

  const spinner = ora('Creating config and theme files...').start();

  try {
    const { themePath, contextPath } = resolveThemeFilePaths(config.theme);
    const componentDirPath = path.resolve(process.cwd(), answers.componentDir);
    ensureDir(componentDirPath);
    fs.writeFileSync(path.join(process.cwd(), 'pdfx.json'), JSON.stringify(config, null, 2));

    const presetName = (answers.themePreset || 'professional') as ThemePresetName;
    const preset = themePresets[presetName];
    ensureDir(path.dirname(themePath));
    fs.writeFileSync(themePath, generateThemeFile(preset), 'utf-8');

    fs.writeFileSync(contextPath, generateThemeContextFile(), 'utf-8');

    spinner.succeed(`Created pdfx.json + ${config.theme} (${presetName} theme)`);

    const shadcn = shouldRegisterShadcn
      ? registerShadcnNamespace(process.cwd(), config.registry)
      : { updated: false, reason: 'declined' as const };
    if (shadcn.reason === 'registered') {
      console.log(chalk.green('  Registered @pdfx in components.json (shadcn CLI)'));
    } else if (shadcn.reason === 'write-failed') {
      console.log(
        chalk.yellow(
          `  Could not update components.json. Register @pdfx with: ${shadcnRegistryAddCommand(config.registry)}`
        )
      );
    }

    posthog.capture({
      distinctId,
      event: 'cli_initialized',
      properties: {
        theme_preset: presetName,
        component_dir: answers.componentDir,
        block_dir: config.blockDir,
        non_interactive: options.yes ?? false,
      },
    });
    await shutdownPosthog();
    console.log(chalk.green('\nSuccess! You can now run:'));
    console.log(chalk.cyan('  npx pdfx-cli@latest add heading'));
    console.log(chalk.cyan('  npx pdfx-cli@latest block add invoice-classic'));
    if (shadcn.reason === 'registered' || shadcn.reason === 'already-set') {
      console.log(chalk.cyan('  npx shadcn@latest add @pdfx/heading'));
    } else {
      console.log(chalk.dim(`  shadcn: ${shadcnRegistryAddCommand(config.registry)}`));
    }
    console.log(chalk.dim(`\n  Components: ${path.resolve(process.cwd(), answers.componentDir)}`));
    console.log(chalk.dim(`  Blocks: ${path.resolve(process.cwd(), config.blockDir)}`));
    console.log(chalk.dim(`  Theme: ${path.resolve(process.cwd(), config.theme)}`));
    console.log(chalk.dim('\n  Generate & save PDFs on the server (Node.js, API routes):'));
    console.log(`  ${chalk.cyan(DOCS.SERVER_SIDE)}\n`);
  } catch (error: unknown) {
    posthog.captureException(error, distinctId);
    await shutdownPosthog();
    spinner.fail('Failed to create config');
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.dim(`  ${message}`));
    if (error instanceof ValidationError && error.suggestion) {
      console.log(chalk.dim(`  Hint: ${error.suggestion}`));
    }
    process.exit(1);
  }
}
