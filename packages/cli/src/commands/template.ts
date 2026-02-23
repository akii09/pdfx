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
import ora from 'ora';
import prompts from 'prompts';
import { DEFAULTS, REGISTRY_SUBPATHS } from '../constants.js';
import { checkFileExists, ensureDir, safePath, writeFile } from '../utils/file-system.js';
import { requireConfig, tryReadConfig } from '../utils/config.js';
import { generateThemeContextFile } from '../utils/generate-theme.js';

async function fetchTemplate(name: string, registryUrl: string): Promise<RegistryItem> {
  const url = `${registryUrl}/${REGISTRY_SUBPATHS.TEMPLATES}/${name}.json`;

  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'TimeoutError';
    throw new NetworkError(
      isTimeout ? 'Registry request timed out' : `Could not reach ${registryUrl}`
    );
  }

  if (!response.ok) {
    throw new RegistryError(
      response.status === 404
        ? `Template "${name}" not found in registry`
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

// ─── Per-file conflict resolution (shadcn-style) ────────────────────────────

type OverwriteDecision = 'skip' | 'overwrite' | 'overwrite-all';

// ─── Import path rewriting ───────────────────────────────────────────────────
//
// Template files ship with default-layout relative imports:
//   ../../lib/pdfx-theme              → PdfxTheme type
//   ../../lib/pdfx-theme-context      → PdfxThemeProvider, usePdfxTheme
//   ../../components/pdfx/{n}/pdfx-{n} → each installed component
//
// When the user's componentDir / templateDir / theme differ from defaults,
// this function rewrites those paths so the installed files compile correctly.

export function resolveTemplateImports(
  content: string,
  templateName: string,
  config: Config
): string {
  const cwd = process.cwd();

  // Absolute path of the directory where this template file will live
  const templateSubdir = path.resolve(
    cwd,
    config.templateDir ?? DEFAULTS.TEMPLATE_DIR,
    templateName
  );

  // ── 1. Rewrite component imports ─────────────────────────────────────────
  // Matches: from '../../components/pdfx/<name>/pdfx-<name>'
  let result = content.replace(
    /from '\.\.\/\.\.\/components\/pdfx\/([a-z][a-z0-9-]*)\/pdfx-([a-z][a-z0-9-]*)'/g,
    (_match, componentName) => {
      const absCompFile = path.resolve(
        cwd,
        config.componentDir,
        componentName,
        `pdfx-${componentName}`
      );
      let rel = path.relative(templateSubdir, absCompFile);
      if (!rel.startsWith('.')) rel = `./${rel}`;
      return `from '${rel}'`;
    }
  );

  // ── 2. Rewrite theme + theme-context imports ──────────────────────────────
  if (config.theme) {
    const absThemePath = path.resolve(cwd, config.theme).replace(/\.tsx?$/, '');
    let relTheme = path.relative(templateSubdir, absThemePath);
    if (!relTheme.startsWith('.')) relTheme = `./${relTheme}`;

    const absContextPath = path.join(
      path.dirname(path.resolve(cwd, config.theme)),
      'pdfx-theme-context'
    );
    let relContext = path.relative(templateSubdir, absContextPath);
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
  // If user already said overwrite-all, honour it
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

  // prompts returns undefined when user uses Ctrl+C
  if (!action) throw new ValidationError('Cancelled by user');

  return action as OverwriteDecision;
}

// ─── Install a single template ───────────────────────────────────────────────

async function installTemplate(name: string, config: Config, force: boolean): Promise<void> {
  const template = await fetchTemplate(name, config.registry);

  // Resolve install directory — use config.templateDir if set, else DEFAULTS.TEMPLATE_DIR
  const templateBaseDir = path.resolve(process.cwd(), config.templateDir ?? DEFAULTS.TEMPLATE_DIR);
  const templateDir = path.join(templateBaseDir, template.name);
  ensureDir(templateDir);

  // Build write plan — apply import path rewriting where needed
  const filesToWrite: Array<{ filePath: string; content: string }> = [];
  for (const file of template.files) {
    const fileName = path.basename(file.path);
    const filePath = safePath(templateDir, fileName);
    // Only rewrite .tsx/.ts files that contain the default relative paths
    let content = file.content;
    if (/\.(tsx?|jsx?)$/.test(fileName) && content.includes('../../')) {
      content = resolveTemplateImports(content, template.name, config);
    }
    filesToWrite.push({ filePath, content });
  }

  // Per-file conflict resolution
  if (!force) {
    let globalDecision: OverwriteDecision | null = null;

    const resolved: Array<{ filePath: string; content: string; skip: boolean }> = [];

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

    // Write non-skipped files
    for (const file of resolved) {
      if (!file.skip) {
        writeFile(file.filePath, file.content);
      } else {
        console.log(chalk.dim(`  skipped ${path.basename(file.filePath)}`));
      }
    }
  } else {
    // Force mode — overwrite everything
    for (const file of filesToWrite) {
      writeFile(file.filePath, file.content);
    }
  }

  // ── peerComponents warnings ──────────────────────────────────────────────
  if (template.peerComponents && template.peerComponents.length > 0) {
    const componentBaseDir = path.resolve(process.cwd(), config.componentDir);
    const missing: string[] = [];

    for (const comp of template.peerComponents) {
      const compDir = path.join(componentBaseDir, comp);
      // Component exists if its directory is present
      if (!checkFileExists(compDir)) {
        missing.push(comp);
      }
    }

    if (missing.length > 0) {
      console.log();
      console.log(chalk.yellow('  Missing peer components:'));
      for (const comp of missing) {
        console.log(chalk.dim(`    ${comp}  →  run: ${chalk.cyan(`pdfx add ${comp}`)}`));
      }
    }
  }

  // ── Ensure pdfx-theme-context.tsx exists alongside the theme file ─────────
  // Templates need PdfxThemeProvider / usePdfxTheme at runtime.
  if (config.theme) {
    const absThemePath = path.resolve(process.cwd(), config.theme);
    const contextPath = path.join(path.dirname(absThemePath), 'pdfx-theme-context.tsx');
    if (!checkFileExists(contextPath)) {
      ensureDir(path.dirname(contextPath));
      writeFile(contextPath, generateThemeContextFile());
    }
  }
}

// ─── Public commands ─────────────────────────────────────────────────────────

export async function templateAdd(names: string[], options: { force?: boolean } = {}) {
  const config = requireConfig();

  const force = options.force ?? false;
  const failed: string[] = [];

  for (const templateName of names) {
    // Validate name format (same rules as component names)
    const nameResult = componentNameSchema.safeParse(templateName);
    if (!nameResult.success) {
      console.error(chalk.red(`Invalid template name: "${templateName}"`));
      console.log(
        chalk.dim('  Names must be lowercase alphanumeric with hyphens (e.g., "invoice-classic")')
      );
      failed.push(templateName);
      continue;
    }

    const spinner = ora(`Adding template ${templateName}...`).start();

    try {
      await installTemplate(templateName, config, force);
      spinner.succeed(`Added template ${chalk.cyan(templateName)}`);
    } catch (error: unknown) {
      if (error instanceof ValidationError && error.message.includes('Cancelled')) {
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
        spinner.fail(`Failed to add template ${templateName}`);
        const message = error instanceof Error ? error.message : String(error);
        console.error(chalk.dim(`  ${message}`));
      }
      failed.push(templateName);
    }
  }

  console.log();

  if (failed.length > 0) {
    console.log(chalk.yellow(`Failed: ${failed.join(', ')}`));
  }

  if (failed.length < names.length) {
    const resolvedDir = path.resolve(process.cwd(), config.templateDir ?? DEFAULTS.TEMPLATE_DIR);
    console.log(chalk.green('Done!'));
    console.log(chalk.dim(`Templates installed to: ${resolvedDir}\n`));
  }

  if (failed.length > 0) {
    process.exit(1);
  }
}

export async function templateList() {
  // pdfx.json is optional — fall back to defaults when absent
  const config = tryReadConfig();
  const registryUrl = config?.registry ?? DEFAULTS.REGISTRY_URL;
  const templateBaseDir = path.resolve(
    process.cwd(),
    config?.templateDir ?? DEFAULTS.TEMPLATE_DIR
  );

  const spinner = ora('Fetching template list...').start();

  try {
    let response: Response;
    try {
      response = await fetch(`${registryUrl}/index.json`, {
        signal: AbortSignal.timeout(10_000),
      });
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'TimeoutError';
      throw new NetworkError(
        isTimeout ? 'Registry request timed out' : `Could not reach ${registryUrl}`
      );
    }

    if (!response.ok) {
      throw new RegistryError(`Registry returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const result = registrySchema.safeParse(data);

    if (!result.success) {
      throw new RegistryError('Invalid registry format');
    }

    spinner.stop();

    const templates = result.data.items.filter((item) => item.type === 'registry:template');

    if (templates.length === 0) {
      console.log(chalk.dim('\n  No templates available in the registry.\n'));
      return;
    }

    console.log(chalk.bold(`\n  Available Templates (${templates.length})\n`));

    for (const item of templates) {
      const templateDir = path.join(templateBaseDir, item.name);
      // Installed if the template directory exists
      const installed = checkFileExists(templateDir);
      const status = installed ? chalk.green('[installed]') : chalk.dim('[not installed]');

      console.log(`  ${chalk.cyan(item.name.padEnd(22))} ${item.description ?? ''}`);
      console.log(`  ${''.padEnd(22)} ${status}`);
      if (item.peerComponents && item.peerComponents.length > 0) {
        console.log(chalk.dim(`  ${''.padEnd(22)} requires: ${item.peerComponents.join(', ')}`));
      }
      console.log();
    }

    console.log(chalk.dim(`  Install with: ${chalk.cyan('pdfx template add <template-name>')}\n`));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    spinner.fail(message);
    process.exit(1);
  }
}
