import fs from 'node:fs';
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
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';
import { FETCH_TIMEOUT_MS } from '../constants.js';
import { validateReactPdfRenderer } from '../utils/dependency-validator.js';
import { checkFileExists, ensureDir, safePath, writeFile } from '../utils/file-system.js';
import { generateThemeContextFile } from '../utils/generate-theme.js';
import {
  detectPackageManager,
  findPackageRoot,
  getInstallCommand,
} from '../utils/package-manager.js';
import { distinctId, posthog } from '../utils/posthog.js';
import { readJsonFile } from '../utils/read-json.js';

type DependencyInstallMode = 'prompt' | 'always' | 'never';

interface AddOptions {
  force?: boolean;
  registry?: string;
  installDeps?: boolean;
  strictDeps?: boolean;
}

interface DependencyRequirements {
  runtime: string[];
  dev: string[];
}

interface MissingDependencies {
  runtime: string[];
  dev: string[];
}

export function readConfig(configPath: string): Config {
  const raw = readJsonFile(configPath);
  const result = configSchema.safeParse(raw);

  if (!result.success) {
    const issues = result.error.issues
      .map((i) => {
        const fieldPath = i.path.length > 0 ? i.path.join('.') : 'root';
        return `"${fieldPath}": ${i.message}`;
      })
      .join('; ');
    throw new ConfigError(
      `Invalid pdfx.json: ${issues}`,
      `Fix the config or re-run ${chalk.cyan('npx pdfx-cli@latest init')}`
    );
  }

  return result.data;
}

export async function fetchComponent(name: string, registryUrl: string): Promise<RegistryItem> {
  const url = `${registryUrl}/${name}.json`;

  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout
        ? `Registry request timed out after 10 seconds.\n  ${chalk.dim('Check your internet connection or try again later.')}`
        : `Could not reach registry at ${registryUrl}\n  ${chalk.dim('Verify the URL is correct and you have internet access.')}`
    );
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

  const themeImportTarget = absThemePath.replace(/\.tsx?$/, '');

  let relativePath = path.relative(absComponentDir, themeImportTarget);

  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }

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

export function collectComponentDependencies(items: RegistryItem[]): DependencyRequirements {
  const runtime = new Set<string>();
  const dev = new Set<string>();

  for (const item of items) {
    for (const dep of item.dependencies ?? []) {
      runtime.add(dep);
    }
    for (const dep of item.devDependencies ?? []) {
      dev.add(dep);
    }
  }

  return {
    runtime: [...runtime],
    dev: [...dev],
  };
}

function getDeclaredDependencies(pkg: Record<string, unknown>): Set<string> {
  const deps = (pkg.dependencies as Record<string, string> | undefined) ?? {};
  const devDeps = (pkg.devDependencies as Record<string, string> | undefined) ?? {};
  return new Set([...Object.keys(deps), ...Object.keys(devDeps)]);
}

export function findMissingDependencies(
  requirements: DependencyRequirements,
  pkg: Record<string, unknown>
): MissingDependencies {
  const installed = getDeclaredDependencies(pkg);
  return {
    runtime: requirements.runtime.filter((dep) => !installed.has(dep)),
    dev: requirements.dev.filter((dep) => !installed.has(dep)),
  };
}

export function resolveDependencyInstallMode(options: AddOptions): DependencyInstallMode {
  if (options.installDeps === true) return 'always';
  if (options.installDeps === false) return 'never';
  return 'prompt';
}

async function installDependencySet(
  packageRoot: string,
  runtimeDeps: string[],
  devDeps: string[]
): Promise<void> {
  const pm = detectPackageManager(packageRoot);
  const installArgs = pm.installCommand.split(' ').slice(1);

  if (runtimeDeps.length > 0) {
    await execa(pm.name, [...installArgs, ...runtimeDeps], {
      cwd: packageRoot,
      stdio: 'pipe',
    });
  }

  if (devDeps.length > 0) {
    const devFlag = pm.name === 'npm' ? '--save-dev' : '-D';
    await execa(pm.name, [...installArgs, ...devDeps, devFlag], {
      cwd: packageRoot,
      stdio: 'pipe',
    });
  }
}

function formatDependencyInstallHint(
  packageRoot: string,
  runtimeDeps: string[],
  devDeps: string[]
): string {
  const pm = detectPackageManager(packageRoot);
  const commands: string[] = [];

  if (runtimeDeps.length > 0) {
    commands.push(getInstallCommand(pm.name, runtimeDeps));
  }
  if (devDeps.length > 0) {
    commands.push(getInstallCommand(pm.name, devDeps, true));
  }

  return commands.map((cmd) => `  ${cmd}`).join('\n');
}

async function ensureComponentDependencies(
  requirements: DependencyRequirements,
  options: AddOptions
): Promise<void> {
  const packageRoot = findPackageRoot(process.cwd());
  const pkgPath = path.join(packageRoot, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    throw new ValidationError(
      `Missing package.json at ${packageRoot}`,
      'Run this command inside a Node.js project'
    );
  }

  const pkg = readJsonFile(pkgPath) as Record<string, unknown>;
  const missing = findMissingDependencies(requirements, pkg);

  if (missing.runtime.length === 0 && missing.dev.length === 0) {
    return;
  }

  const installMode = resolveDependencyInstallMode(options);
  const strictDeps = options.strictDeps ?? false;
  const installHint = formatDependencyInstallHint(packageRoot, missing.runtime, missing.dev);

  if (installMode === 'never') {
    const hasBlocking = missing.runtime.length > 0 || (strictDeps && missing.dev.length > 0);
    const missingMessage = [
      missing.runtime.length > 0 ? `runtime: ${missing.runtime.join(', ')}` : undefined,
      missing.dev.length > 0 ? `dev: ${missing.dev.join(', ')}` : undefined,
    ]
      .filter(Boolean)
      .join('; ');

    if (hasBlocking) {
      throw new ValidationError(
        `Missing component dependencies (${missingMessage})`,
        `Install manually:\n${installHint}`
      );
    }

    console.log(
      chalk.yellow(
        `\n  ⚠ Missing devDependencies (${missing.dev.join(', ')})\n  ${chalk.dim('→')} Install manually:\n${chalk.cyan(installHint)}\n`
      )
    );
    return;
  }

  let shouldInstall = installMode === 'always';
  if (installMode === 'prompt') {
    const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    if (!interactive) {
      throw new ValidationError(
        'Missing component dependencies in non-interactive mode',
        `Use --install-deps or install manually:\n${installHint}`
      );
    }

    const depSummary = [
      missing.runtime.length > 0 ? `runtime: ${missing.runtime.join(', ')}` : undefined,
      missing.dev.length > 0 ? `dev: ${missing.dev.join(', ')}` : undefined,
    ]
      .filter(Boolean)
      .join('\n  ');

    console.log(chalk.yellow('\n  Missing component dependencies detected:\n'));
    console.log(chalk.dim(`  ${depSummary}\n`));

    const response = await prompts({
      type: 'confirm',
      name: 'install',
      message: 'Install missing dependencies now?',
      initial: true,
    });
    shouldInstall = response.install === true;
  }

  if (!shouldInstall) {
    throw new ValidationError(
      'Dependency installation cancelled',
      `Install manually:\n${installHint}`
    );
  }

  const spinner = ora('Installing missing component dependencies...').start();
  try {
    await installDependencySet(packageRoot, missing.runtime, missing.dev);
    spinner.succeed('Installed component dependencies');
  } catch (error: unknown) {
    spinner.fail('Failed to install component dependencies');
    const message = error instanceof Error ? error.message : String(error);
    if (strictDeps || missing.runtime.length > 0) {
      throw new ValidationError(
        `Dependency installation failed: ${message}`,
        `Install manually:\n${installHint}`
      );
    }
    console.log(
      chalk.yellow(
        `\n  ⚠ Could not install devDependencies automatically\n  ${chalk.dim('→')} Install manually:\n${chalk.cyan(installHint)}\n`
      )
    );
  }
}

async function installComponent(
  component: RegistryItem,
  config: Config,
  force: boolean
): Promise<void> {
  const targetDir = path.resolve(process.cwd(), config.componentDir);

  // Each component lives in its own subdirectory: {componentDir}/{name}/
  // e.g. src/components/pdfx/badge/pdfx-badge.tsx
  const componentDir = path.join(targetDir, component.name);
  ensureDir(componentDir);

  const componentRelDir = path.join(config.componentDir, component.name);

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

  if (!force) {
    const existing = filesToWrite.filter((f) => checkFileExists(f.filePath));
    if (existing.length > 0) {
      const fileNames = existing.map((f) => path.basename(f.filePath)).join(', ');
      throw new ValidationError(
        `${component.name}: already exists (${fileNames}), skipped install (use --force to overwrite)`
      );
    }
  }

  for (const file of filesToWrite) {
    writeFile(file.filePath, file.content);
  }

  if (config.theme) {
    const absThemePath = path.resolve(process.cwd(), config.theme);
    const contextPath = path.join(path.dirname(absThemePath), 'pdfx-theme-context.tsx');
    if (!checkFileExists(contextPath)) {
      ensureDir(path.dirname(contextPath));
      writeFile(contextPath, generateThemeContextFile());
    }
  }
}

export async function add(components: string[], options: AddOptions = {}) {
  if (!components || components.length === 0) {
    console.error(chalk.red('Error: Component name required'));
    console.log(chalk.dim('Usage: npx pdfx-cli@latest add <component...>'));
    console.log(chalk.dim('Example: npx pdfx-cli@latest add heading text table\n'));
    process.exit(1);
  }

  const reactPdfCheck = validateReactPdfRenderer();
  if (!reactPdfCheck.installed) {
    console.error(chalk.red('\nError: @react-pdf/renderer is not installed\n'));
    console.log(chalk.yellow('  PDFx components require @react-pdf/renderer to work.\n'));
    console.log(chalk.cyan('  Run: npx pdfx-cli@latest init'));
    console.log(chalk.dim('  or install manually: npm install @react-pdf/renderer\n'));
    process.exit(1);
  }

  if (!reactPdfCheck.valid) {
    console.log(
      chalk.yellow(
        `\n  ⚠ Warning: ${reactPdfCheck.message}\n  ${chalk.dim('→')} You may encounter compatibility issues\n`
      )
    );
  }

  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: npx pdfx-cli@latest init'));
    process.exit(1);
  }

  let config: Config;
  try {
    config = readConfig(configPath);

    if (options.registry) {
      config = { ...config, registry: options.registry };
    }
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
  let installedCount = 0;

  const resolvedComponents: RegistryItem[] = [];
  const validNames: string[] = [];

  for (const componentName of components) {
    const nameResult = componentNameSchema.safeParse(componentName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid component name: "${componentName}"`));
      console.log(
        chalk.dim('  Names must be lowercase alphanumeric with hyphens (e.g., "data-table")')
      );
      failed.push(componentName);
      continue;
    }
    validNames.push(componentName);
  }

  for (const componentName of validNames) {
    const spinner = ora(`Resolving ${componentName}...`).start();
    try {
      const component = await fetchComponent(componentName, config.registry);
      resolvedComponents.push(component);
      spinner.succeed(`Resolved ${componentName}`);
    } catch (error: unknown) {
      spinner.fail(`Failed to resolve ${componentName}`);
      const message = error instanceof Error ? error.message : String(error);
      console.error(chalk.dim(`  ${message}`));
      failed.push(componentName);
    }
  }

  if (resolvedComponents.length > 0) {
    try {
      const requirements = collectComponentDependencies(resolvedComponents);
      await ensureComponentDependencies(requirements, options);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(chalk.red(message));
      if (error instanceof ValidationError && error.suggestion) {
        console.log(chalk.yellow(`  Hint: ${error.suggestion}`));
      }
      process.exit(1);
    }
  }

  for (const component of resolvedComponents) {
    const spinner = ora(`Adding ${component.name}...`).start();

    try {
      await installComponent(component, config, force);
      installedCount++;
      spinner.succeed(`Added ${component.name}`);
      posthog.capture({
        distinctId,
        event: 'component_added',
        properties: {
          component_name: component.name,
          forced: force,
        },
      });
    } catch (error: unknown) {
      let shouldMarkAsFailed = true;

      if (error instanceof ValidationError && error.message.includes('already exists')) {
        spinner.info(error.message);
        shouldMarkAsFailed = false;
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
        spinner.fail(`Failed to add ${component.name}`);
        const message = error instanceof Error ? error.message : String(error);
        console.error(chalk.dim(`  ${message}`));
      }

      if (shouldMarkAsFailed) {
        posthog.capture({
          distinctId,
          event: 'component_add_failed',
          properties: {
            component_name: component.name,
            error_message: error instanceof Error ? error.message : String(error),
          },
        });
        posthog.captureException(error, distinctId);
        failed.push(component.name);
      }
    }
  }

  await posthog.shutdown();

  console.log();
  if (failed.length > 0) {
    console.log(chalk.yellow(`Failed to add: ${failed.join(', ')}`));
  }
  if (installedCount > 0) {
    const resolvedDir = path.resolve(process.cwd(), config.componentDir);
    console.log(chalk.green('Done!'));
    console.log(chalk.dim(`Components installed to: ${resolvedDir}\n`));
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}
