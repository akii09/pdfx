/**
 * pdfx template — scaffold complete PDF templates into your project.
 *
 * Usage:
 *   pdfx template list                          List available templates
 *   pdfx template add <name...>                 Install one or more templates
 *   pdfx template add invoice-classic --force   Overwrite existing files
 */
import path from 'node:path';
import {
  type Config,
  ConfigError,
  NetworkError,
  RegistryError,
  configSchema,
} from '@pdfx/shared';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { checkFileExists, ensureDir, writeFile } from '../utils/file-system.js';
import { readJsonFile } from '../utils/read-json.js';

const FETCH_TIMEOUT_MS = 10_000;

// ─── Template registry ────────────────────────────────────────────────────────

interface TemplateFile {
  path: string;
  content: string;
}

interface TemplateEntry {
  name: string;
  title: string;
  description: string;
  category: string;
  requiredComponents: string[];
  files: TemplateFile[];
}

interface TemplateRegistry {
  templates: TemplateEntry[];
}

/**
 * Derives the template registry URL from the component registry URL.
 * If the registry URL is the default or ends in /r, point to /templates.
 */
function getTemplateRegistryUrl(registryUrl: string): string {
  // e.g. https://pdfx.akashpise.dev/r  →  https://pdfx.akashpise.dev/templates
  return registryUrl.replace(/\/r\/?$/, '/templates');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readConfig(): Config {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  if (!checkFileExists(configPath)) {
    throw new ConfigError(
      'pdfx.json not found',
      `Run ${chalk.cyan('npx @pdfx/cli init')} first to initialize your project.`
    );
  }
  const raw = readJsonFile(configPath);
  const result = configSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map((i) => i.message).join(', ');
    throw new ConfigError(
      `Invalid pdfx.json: ${issues}`,
      `Fix the config or re-run ${chalk.cyan('npx @pdfx/cli init')}`
    );
  }
  return result.data;
}

async function fetchTemplateRegistry(registryUrl: string): Promise<TemplateRegistry> {
  const url = `${registryUrl}/index.json`;
  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout ? 'Template registry request timed out' : `Could not reach ${registryUrl}`
    );
  }
  if (!response.ok) {
    if (response.status === 404) {
      throw new RegistryError(
        `Template registry not found at ${url}`,
        'Make sure you are using an up-to-date version of the CLI.'
      );
    }
    throw new RegistryError(`Registry returned HTTP ${response.status}`);
  }
  try {
    return (await response.json()) as TemplateRegistry;
  } catch {
    throw new RegistryError('Invalid template registry response: not valid JSON');
  }
}

async function fetchTemplate(registryUrl: string, name: string): Promise<TemplateEntry> {
  const url = `${registryUrl}/${name}.json`;
  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout ? 'Request timed out' : `Could not reach ${registryUrl}`
    );
  }
  if (!response.ok) {
    if (response.status === 404) {
      throw new RegistryError(
        `Template "${name}" not found in registry`,
        `Run ${chalk.cyan('npx @pdfx/cli template list')} to see available templates.`
      );
    }
    throw new RegistryError(`Registry returned HTTP ${response.status}`);
  }
  try {
    return (await response.json()) as TemplateEntry;
  } catch {
    throw new RegistryError(`Invalid response for template "${name}": not valid JSON`);
  }
}

// ─── Commands ─────────────────────────────────────────────────────────────────

/** pdfx template list */
export async function templateList() {
  let config: Config;
  try {
    config = readConfig();
  } catch (err) {
    const e = err as Error & { hint?: string };
    console.error(chalk.red(`Error: ${e.message}`));
    if (e.hint) console.log(chalk.yellow(e.hint));
    process.exit(1);
  }

  const templateRegistryUrl = getTemplateRegistryUrl(config.registry);
  const spinner = ora('Fetching available templates...').start();

  try {
    const registry = await fetchTemplateRegistry(templateRegistryUrl);
    spinner.stop();

    if (!registry.templates || registry.templates.length === 0) {
      console.log(chalk.yellow('\n  No templates available yet.\n'));
      return;
    }

    // Group by category
    const byCategory = new Map<string, TemplateEntry[]>();
    for (const t of registry.templates) {
      const cat = t.category || 'Other';
      if (!byCategory.has(cat)) byCategory.set(cat, []);
      byCategory.get(cat)!.push(t);
    }

    console.log(chalk.bold(`\n  PDFx Templates (${registry.templates.length} available)\n`));

    for (const [category, templates] of byCategory) {
      console.log(chalk.bold.underline(`  ${category}`));
      for (const t of templates) {
        console.log(`\n  ${chalk.cyan(t.name.padEnd(28))} ${t.title}`);
        console.log(`  ${''.padEnd(28)} ${chalk.dim(t.description)}`);
        console.log(
          `  ${''.padEnd(28)} ${chalk.dim('Requires:')} ${t.requiredComponents.join(', ')}`
        );
      }
      console.log();
    }

    console.log(
      chalk.dim('  Install:'),
      chalk.cyan('npx @pdfx/cli template add <name>')
    );
    console.log();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    spinner.fail(message);

    // Fallback: show built-in template list when registry is unreachable
    spinner.stop();
    console.log(chalk.yellow('\n  Could not reach template registry. Built-in templates:\n'));
    showBuiltinTemplates();
    process.exit(0);
  }
}

function showBuiltinTemplates() {
  const builtins = [
    {
      name: 'invoice-classic',
      title: 'Classic Invoice',
      description: 'Traditional two-column business invoice layout',
      requires: 'heading, text, page-header, page-footer, table, key-value, badge, divider, stack',
    },
    {
      name: 'invoice-modern',
      title: 'Modern Invoice',
      description: 'Bold branded header with card-based layout',
      requires: 'heading, text, page-header, page-footer, data-table, badge, section, stack',
    },
    {
      name: 'invoice-minimal',
      title: 'Minimal Invoice',
      description: 'Ultra-clean whitespace-forward design',
      requires: 'heading, text, page-header, page-footer, table, key-value, divider, stack',
    },
    {
      name: 'invoice-bold',
      title: 'Bold Invoice',
      description: 'High-contrast design with accent-colored highlights',
      requires: 'heading, text, page-footer, table, badge, section, key-value, divider, stack',
    },
  ];

  console.log(chalk.bold.underline('  Invoices'));
  for (const t of builtins) {
    console.log(`\n  ${chalk.cyan(t.name.padEnd(28))} ${t.title}`);
    console.log(`  ${''.padEnd(28)} ${chalk.dim(t.description)}`);
    console.log(`  ${''.padEnd(28)} ${chalk.dim('Requires:')} ${t.requires}`);
  }
  console.log();
  console.log(
    chalk.dim('  Install:'),
    chalk.cyan('npx @pdfx/cli template add <name>')
  );
  console.log();
}

/** pdfx template add <names...> */
export async function templateAdd(
  names: string[],
  options: { force?: boolean; dir?: string }
) {
  let config: Config;
  try {
    config = readConfig();
  } catch (err) {
    const e = err as Error & { hint?: string };
    console.error(chalk.red(`Error: ${e.message}`));
    if (e.hint) console.log(chalk.yellow(e.hint));
    process.exit(1);
  }

  const templateRegistryUrl = getTemplateRegistryUrl(config.registry);

  // Default output dir: src/templates (next to components)
  const templateDir = options.dir
    ? path.resolve(process.cwd(), options.dir)
    : path.resolve(process.cwd(), 'src/templates');

  for (const name of names) {
    const spinner = ora(`Fetching template ${chalk.cyan(name)}...`).start();

    try {
      const template = await fetchTemplate(templateRegistryUrl, name);
      spinner.stop();

      console.log(chalk.bold(`\n  ${template.title}`));
      console.log(chalk.dim(`  ${template.description}\n`));

      // Warn about required components
      if (template.requiredComponents.length > 0) {
        console.log(
          chalk.yellow('  Required components:'),
          template.requiredComponents.join(', ')
        );
        console.log(
          chalk.dim('  Install them with:'),
          chalk.cyan(`npx @pdfx/cli add ${template.requiredComponents.join(' ')}`)
        );
        console.log();
      }

      // Check for existing files
      const existingFiles: string[] = [];
      for (const file of template.files) {
        const dest = path.join(templateDir, file.path);
        if (checkFileExists(dest)) {
          existingFiles.push(file.path);
        }
      }

      if (existingFiles.length > 0 && !options.force) {
        console.log(chalk.yellow('  Existing files:'));
        for (const f of existingFiles) {
          console.log(chalk.yellow(`    ${f}`));
        }
        const { overwrite } = await prompts({
          type: 'confirm',
          name: 'overwrite',
          message: `Overwrite ${existingFiles.length} existing file(s)?`,
          initial: false,
        });
        if (!overwrite) {
          console.log(chalk.dim('  Skipped.\n'));
          continue;
        }
      }

      // Write files
      for (const file of template.files) {
        const dest = path.join(templateDir, file.path);
        ensureDir(path.dirname(dest));
        writeFile(dest, file.content);
        console.log(`  ${chalk.green('✓')} ${dest.replace(process.cwd(), '.')}`);
      }

      console.log(
        `\n  ${chalk.green('Template installed!')} Find it at ${chalk.cyan(
          path.relative(process.cwd(), templateDir)
        )}\n`
      );
    } catch (err: unknown) {
      spinner.stop();
      const e = err as Error & { hint?: string };
      console.error(`  ${chalk.red('✗')} ${name}: ${e.message}`);
      if (e.hint) console.log(chalk.yellow(`    ${e.hint}`));
    }
  }
}
