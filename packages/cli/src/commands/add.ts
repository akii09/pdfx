import path from 'node:path';
import {
  type Config,
  ConfigError,
  NetworkError,
  RegistryError,
  type RegistryItem,
  ValidationError,
  componentNameSchema,
  configSchema,
  registryItemSchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { checkFileExists, ensureDir, safePath, writeFile } from '../utils/file-system.js';
import { generateThemeContextFile } from '../utils/generate-theme.js';
import { readJsonFile } from '../utils/read-json.js';

function readConfig(configPath: string): Config {
  const raw = readJsonFile(configPath);
  const result = configSchema.safeParse(raw);

  if (!result.success) {
    const issues = result.error.issues.map((i) => i.message).join(', ');
    throw new ConfigError(
      `Invalid pdfx.json: ${issues}`,
      `Fix the config or re-run ${chalk.cyan('pdfx init')}`
    );
  }

  return result.data;
}

async function fetchComponent(name: string, registryUrl: string): Promise<RegistryItem> {
  const url = `${registryUrl}/${name}.json`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new NetworkError(`Could not reach ${registryUrl}`);
  }

  if (!response.ok) {
    throw new RegistryError(
      response.status === 404
        ? `Component "${name}" not found in registry`
        : `Registry returned HTTP ${response.status}`
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new RegistryError(`Invalid response for "${name}": not valid JSON`);
  }

  const result = registryItemSchema.safeParse(data);
  if (!result.success) {
    throw new RegistryError(
      `Invalid registry entry for "${name}": ${result.error.issues[0]?.message}`
    );
  }

  return result.data;
}

/**
 * Resolves the theme import path for a component.
 * Computes the relative path from componentDir to the theme file and rewrites
 * the default `../lib/pdfx-theme` import with the correct relative path.
 */
export function resolveThemeImport(
  componentDir: string,
  themePath: string,
  fileContent: string
): string {
  const absComponentDir = path.resolve(process.cwd(), componentDir);
  const absThemePath = path.resolve(process.cwd(), themePath);

  // Strip .ts/.tsx extension for the import specifier
  const themeImportTarget = absThemePath.replace(/\.tsx?$/, '');

  let relativePath = path.relative(absComponentDir, themeImportTarget);

  // Ensure the path starts with ./ or ../
  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }

  // Compute the context file path — pdfx-theme-context sits next to pdfx-theme
  const absContextPath = path.join(path.dirname(absThemePath), 'pdfx-theme-context');
  let relativeContextPath = path.relative(absComponentDir, absContextPath);

  if (!relativeContextPath.startsWith('.')) {
    relativeContextPath = `./${relativeContextPath}`;
  }

  let content = fileContent.replace(
    /from\s+['"]\.\.\/lib\/pdfx-theme['"]/g,
    `from '${relativePath}'`
  );
  content = content.replace(
    /from\s+['"]\.\.\/lib\/pdfx-theme-context['"]/g,
    `from '${relativeContextPath}'`
  );
  return content;
}

async function installComponent(name: string, config: Config, force: boolean): Promise<void> {
  const component = await fetchComponent(name, config.registry);
  const targetDir = path.resolve(process.cwd(), config.componentDir);

  // Each component lives in its own subdirectory: {componentDir}/{name}/
  // e.g. src/components/pdfx/badge/pdfx-badge.tsx
  const componentDir = path.join(targetDir, component.name);
  ensureDir(componentDir);

  // Relative form of componentDir for resolveThemeImport (which resolves from cwd internally)
  const componentRelDir = path.join(config.componentDir, component.name);

  // Collect and validate file paths, rewriting theme imports if needed
  const filesToWrite: Array<{ filePath: string; content: string }> = [];
  for (const file of component.files) {
    const fileName = path.basename(file.path);
    const filePath = safePath(componentDir, fileName);

    let content = file.content;
    if (
      config.theme &&
      (content.includes('pdfx-theme') || content.includes('pdfx-theme-context'))
    ) {
      content = resolveThemeImport(componentRelDir, config.theme, content);
    }

    filesToWrite.push({ filePath, content });
  }

  // Check for existing files (overwrite protection)
  if (!force) {
    const existing = filesToWrite.filter((f) => checkFileExists(f.filePath));
    if (existing.length > 0) {
      const fileNames = existing.map((f) => path.basename(f.filePath)).join(', ');
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${fileNames} already exist(s). Overwrite?`,
        initial: false,
      });
      if (!overwrite) {
        throw new ValidationError(`Skipped ${name}: user declined overwrite`);
      }
    }
  }

  // Write all files
  for (const file of filesToWrite) {
    writeFile(file.filePath, file.content);
  }

  // Ensure pdfx-theme-context.tsx exists alongside the theme file.
  // Components import it for usePdfxTheme / useSafeMemo / PdfxThemeProvider.
  if (config.theme) {
    const absThemePath = path.resolve(process.cwd(), config.theme);
    const contextPath = path.join(path.dirname(absThemePath), 'pdfx-theme-context.tsx');
    if (!checkFileExists(contextPath)) {
      ensureDir(path.dirname(contextPath));
      writeFile(contextPath, generateThemeContextFile());
    }
  }

  return;
}

export async function add(components: string[], options: { force?: boolean } = {}) {
  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: pdfx init'));
    process.exit(1);
  }

  let config: Config;
  try {
    config = readConfig(configPath);
  } catch (error: unknown) {
    if (error instanceof ConfigError) {
      console.error(chalk.red(error.message));
      if (error.suggestion) console.log(chalk.yellow(`  Hint: ${error.suggestion}`));
    } else {
      const message = error instanceof Error ? error.message : String(error);
      console.error(chalk.red(message));
    }
    process.exit(1);
  }

  const force = options.force ?? false;
  const failed: string[] = [];

  for (const componentName of components) {
    // Validate component name
    const nameResult = componentNameSchema.safeParse(componentName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid component name: "${componentName}"`));
      console.log(
        chalk.dim('  Names must be lowercase alphanumeric with hyphens (e.g., "data-table")')
      );
      failed.push(componentName);
      continue;
    }

    const spinner = ora(`Adding ${componentName}...`).start();

    try {
      await installComponent(componentName, config, force);
      spinner.succeed(`Added ${componentName}`);
    } catch (error: unknown) {
      if (error instanceof ValidationError && error.message.includes('Skipped')) {
        spinner.info(error.message);
      } else if (
        error instanceof NetworkError ||
        error instanceof RegistryError ||
        error instanceof ValidationError
      ) {
        spinner.fail(error.message);
        if (error.suggestion) {
          console.log(chalk.dim(`  Hint: ${error.suggestion}`));
        }
      } else {
        spinner.fail(`Failed to add ${componentName}`);
        const message = error instanceof Error ? error.message : String(error);
        console.error(chalk.dim(`  ${message}`));
      }
      failed.push(componentName);
    }
  }

  console.log();
  if (failed.length > 0) {
    console.log(chalk.yellow(`Failed to add: ${failed.join(', ')}`));
  }
  if (failed.length < components.length) {
    const resolvedDir = path.resolve(process.cwd(), config.componentDir);
    console.log(chalk.green('Done!'));
    console.log(chalk.dim(`Components installed to: ${resolvedDir}\n`));
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}
