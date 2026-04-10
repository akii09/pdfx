import path from 'node:path';
import {
  type Config,
  ConfigError,
  NetworkError,
  RegistryError,
  type RegistryItem,
  ValidationError,
  componentNameSchema,
  registryItemSchema,
  registrySchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import prompts from 'prompts';
import { DEFAULTS, FETCH_TIMEOUT_MS, REGISTRY_SUBPATHS } from '../constants.js';
import { checkFileExists, ensureDir, safePath, writeFile } from '../utils/file-system.js';
import { generateThemeContextFile } from '../utils/generate-theme.js';
import { distinctId, posthog, shutdownPosthog } from '../utils/posthog.js';
import { fetchComponent, readConfig, resolveThemeImport } from './add.js';

type OverwriteDecision = 'skip' | 'overwrite' | 'overwrite-all';

async function fetchBlock(name: string, registryUrl: string): Promise<RegistryItem> {
  const url = `${registryUrl}/${REGISTRY_SUBPATHS.BLOCKS}/${name}.json`;
  let response: Response;

  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout ? 'Registry request timed out' : `Could not reach ${registryUrl}`
    );
  }

  if (!response.ok) {
    throw new RegistryError(
      response.status === 404
        ? `Block "${name}" not found in registry`
        : `Registry returned HTTP ${response.status}`,
      response.status === 404
        ? 'Run "npx pdfx-cli@latest block list" to see all available blocks'
        : undefined
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

export function resolveBlockImports(content: string, blockName: string, config: Config): string {
  const cwd = process.cwd();
  const blockSubdir = path.resolve(cwd, config.blockDir ?? DEFAULTS.BLOCK_DIR, blockName);
  let result = content.replace(
    /from '\.\.\/\.\.\/components\/pdfx\/([a-z][a-z0-9-]*)\/pdfx-([a-z][a-z0-9-]*)'/g,
    (_match, componentName) => {
      const absCompFile = path.resolve(
        cwd,
        config.componentDir,
        componentName,
        `pdfx-${componentName}`
      );
      let rel = path.relative(blockSubdir, absCompFile);
      if (!rel.startsWith('.')) rel = `./${rel}`;
      return `from '${rel}'`;
    }
  );

  if (config.theme) {
    const absThemePath = path.resolve(cwd, config.theme).replace(/\.tsx?$/, '');
    let relTheme = path.relative(blockSubdir, absThemePath);
    if (!relTheme.startsWith('.')) relTheme = `./${relTheme}`;

    const absContextPath = path.join(
      path.dirname(path.resolve(cwd, config.theme)),
      'pdfx-theme-context'
    );
    let relContext = path.relative(blockSubdir, absContextPath);
    if (!relContext.startsWith('.')) relContext = `./${relContext}`;

    result = result.replace(/from '\.\.\/\.\.\/lib\/pdfx-theme'/g, `from '${relTheme}'`);
    result = result.replace(/from '\.\.\/\.\.\/lib\/pdfx-theme-context'/g, `from '${relContext}'`);
  }

  return result;
}

async function resolveConflict(
  fileName: string,
  currentDecision: OverwriteDecision | null
): Promise<OverwriteDecision> {
  if (currentDecision === 'overwrite-all') return 'overwrite-all';

  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: `${chalk.yellow(fileName)} already exists. What would you like to do?`,
    choices: [
      { title: 'Skip', value: 'skip', description: 'Keep the existing file unchanged' },
      { title: 'Overwrite', value: 'overwrite', description: 'Replace this file only' },
      {
        title: 'Overwrite all',
        value: 'overwrite-all',
        description: 'Replace all conflicting files',
      },
    ],
    initial: 0,
  });

  if (!action) throw new ValidationError('Cancelled by user');

  return action as OverwriteDecision;
}

interface InstallBlockResult {
  installedPeers: string[];
  peerWarnings: string[];
  allSkipped: boolean;
}

interface PendingBlockFile {
  filePath: string;
  content: string;
}

interface ResolvedBlockFile extends PendingBlockFile {
  skip: boolean;
}

async function ensurePeerComponents(
  block: RegistryItem,
  config: Config,
  force: boolean
): Promise<InstallBlockResult> {
  const installedPeers: string[] = [];
  const peerWarnings: string[] = [];

  if (!block.peerComponents || block.peerComponents.length === 0) {
    return { installedPeers, peerWarnings, allSkipped: false };
  }

  const componentBaseDir = path.resolve(process.cwd(), config.componentDir);

  for (const componentName of block.peerComponents) {
    const componentDir = path.join(componentBaseDir, componentName);
    const expectedMain = path.join(componentDir, `pdfx-${componentName}.tsx`);

    if (checkFileExists(componentDir)) {
      if (!checkFileExists(expectedMain)) {
        peerWarnings.push(
          `${componentName}: directory exists but expected file missing (${path.basename(expectedMain)})`
        );
        continue;
      }

      if (!force) {
        peerWarnings.push(
          `${componentName}: already exists, skipped install (use "npx pdfx-cli@latest diff ${componentName}" to verify freshness)`
        );
        continue;
      }
    }

    const component = await fetchComponent(componentName, config.registry);
    ensureDir(componentDir);

    const componentRelDir = path.join(config.componentDir, component.name);
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

      writeFile(filePath, content);
    }

    installedPeers.push(componentName);
  }

  return { installedPeers, peerWarnings, allSkipped: false };
}

async function installBlock(
  name: string,
  config: Config,
  force: boolean,
  spinner: Ora
): Promise<InstallBlockResult> {
  const block = await fetchBlock(name, config.registry);
  const peerResult = await ensurePeerComponents(block, config, force);
  const blockBaseDir = path.resolve(process.cwd(), config.blockDir ?? DEFAULTS.BLOCK_DIR);
  const blockDir = path.join(blockBaseDir, block.name);
  ensureDir(blockDir);
  const filesToWrite: PendingBlockFile[] = [];
  let allSkipped = false;
  let globalDecision: OverwriteDecision | null = null;
  const resolved: ResolvedBlockFile[] = [];

  for (const file of block.files) {
    const fileName = path.basename(file.path);
    const filePath = safePath(blockDir, fileName);
    let content = file.content;
    if (/\.(tsx?|jsx?)$/.test(fileName) && content.includes('../../')) {
      content = resolveBlockImports(content, block.name, config);
    }
    filesToWrite.push({ filePath, content });
  }

  if (!force) {
    const hasConflicts = filesToWrite.some((f) => checkFileExists(f.filePath));
    if (hasConflicts) {
      spinner.stop();
    }

    for (const file of filesToWrite) {
      if (checkFileExists(file.filePath)) {
        const decision = await resolveConflict(path.basename(file.filePath), globalDecision);
        if (decision === 'overwrite-all') {
          globalDecision = 'overwrite-all';
        }
        resolved.push({ ...file, skip: decision === 'skip' });
      } else {
        resolved.push({ ...file, skip: false });
      }
    }

    allSkipped = resolved.every((f) => f.skip);

    for (const file of resolved) {
      if (!file.skip) {
        writeFile(file.filePath, file.content);
      } else {
        console.log(chalk.dim(`  skipped ${path.basename(file.filePath)}`));
      }
    }
  } else {
    for (const file of filesToWrite) {
      writeFile(file.filePath, file.content);
    }
  }

  if (config.theme) {
    const absThemePath = path.resolve(process.cwd(), config.theme);
    const contextPath = path.join(path.dirname(absThemePath), 'pdfx-theme-context.tsx');
    if (!checkFileExists(contextPath)) {
      ensureDir(path.dirname(contextPath));
      writeFile(contextPath, generateThemeContextFile());
    }
  }

  return { ...peerResult, allSkipped };
}

export async function blockAdd(names: string[], options: { force?: boolean } = {}) {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  let config: Config;
  const force = options.force ?? false;
  const failed: string[] = [];
  let installedCount = 0;

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: npx pdfx-cli@latest init'));
    process.exit(1);
  }

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

  for (const blockName of names) {
    const nameResult = componentNameSchema.safeParse(blockName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid block name: "${blockName}"`));
      console.log(
        chalk.dim('  Names must be lowercase alphanumeric with hyphens (e.g., "invoice-classic")')
      );
      failed.push(blockName);
      continue;
    }

    const spinner = ora(`Adding block ${blockName}...`).start();

    try {
      const result = await installBlock(blockName, config, force, spinner);

      if (result.allSkipped) {
        spinner.info(
          `Skipped ${chalk.cyan(blockName)} — all files already exist (use ${chalk.cyan('--force')} to overwrite)`
        );
      } else {
        installedCount++;
        spinner.succeed(`Added block ${chalk.cyan(blockName)}`);
        posthog.capture({
          distinctId,
          event: 'block_added',
          properties: {
            block_name: blockName,
            forced: force,
            peer_components_installed: result.installedPeers,
          },
        });
        if (result.installedPeers.length > 0) {
          console.log(
            chalk.green(`  Installed required components: ${result.installedPeers.join(', ')}`)
          );
        }
        for (const warning of result.peerWarnings) {
          console.log(chalk.yellow(`  Warning: ${warning}`));
        }
      }
    } catch (error: unknown) {
      if (error instanceof ValidationError && error.message.includes('Cancelled')) {
        await shutdownPosthog();
        spinner.info('Cancelled');
        process.exit(0);
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
        spinner.fail(`Failed to add block ${blockName}`);
        const message = error instanceof Error ? error.message : String(error);
        console.error(chalk.dim(`  ${message}`));
      }
      posthog.capture({
        distinctId,
        event: 'block_add_failed',
        properties: {
          block_name: blockName,
          error_message: error instanceof Error ? error.message : String(error),
        },
      });
      posthog.captureException(error, distinctId);
      failed.push(blockName);
    }
  }

  await shutdownPosthog();

  console.log();

  if (failed.length > 0) {
    console.log(chalk.yellow(`Failed: ${failed.join(', ')}`));
  }

  if (installedCount > 0) {
    const resolvedDir = path.resolve(process.cwd(), config.blockDir ?? DEFAULTS.BLOCK_DIR);
    console.log(chalk.green('Done!'));
    console.log(chalk.dim(`Blocks installed to: ${resolvedDir}\n`));
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}

export async function blockList() {
  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: npx pdfx-cli@latest init'));
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

  const spinner = ora('Fetching block list...').start();

  try {
    let response: Response;
    try {
      response = await fetch(`${config.registry}/index.json`, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'TimeoutError';
      throw new NetworkError(
        isTimeout ? 'Registry request timed out' : `Could not reach ${config.registry}`
      );
    }

    if (!response.ok) {
      throw new RegistryError(`Registry returned HTTP ${response.status}`);
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new RegistryError('Invalid response from registry: not valid JSON');
    }
    const result = registrySchema.safeParse(data);

    if (!result.success) {
      throw new RegistryError('Invalid registry format');
    }

    spinner.stop();

    const blocks = result.data.items.filter((item) => item.type === 'registry:block');

    if (blocks.length === 0) {
      console.log(chalk.dim('\n  No blocks available in the registry.\n'));
      return;
    }

    const blockBaseDir = path.resolve(process.cwd(), config.blockDir ?? DEFAULTS.BLOCK_DIR);

    console.log(chalk.bold(`\n  Available Blocks (${blocks.length})\n`));

    for (const item of blocks) {
      const blockDir = path.join(blockBaseDir, item.name);
      const installed = checkFileExists(blockDir);
      const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

      console.log(`  ${chalk.cyan(item.name.padEnd(22))} ${item.description ?? ''}`);
      console.log(`  ${''.padEnd(22)} ${status}`);
      if (item.peerComponents && item.peerComponents.length > 0) {
        console.log(chalk.dim(`  ${''.padEnd(22)} requires: ${item.peerComponents.join(', ')}`));
      }
      console.log();
    }

    console.log(
      chalk.dim(`  Install with: ${chalk.cyan('npx pdfx-cli@latest block add <block-name>')}\n`)
    );
    posthog.capture({
      distinctId,
      event: 'block_list_viewed',
      properties: { block_count: blocks.length },
    });
    await shutdownPosthog();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(message);
    process.exit(1);
  }
}
