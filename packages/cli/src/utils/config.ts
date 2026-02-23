import path from 'node:path';
import { type Config, ConfigError, configSchema } from '@pdfx/shared';
import chalk from 'chalk';
import { checkFileExists } from './file-system.js';
import { readJsonFile } from './read-json.js';

/**
 * Reads and validates pdfx.json, returning the parsed Config.
 * Throws a ConfigError with a hint if the file is missing or invalid.
 */
export function readConfig(configPath: string): Config {
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

/**
 * Resolves the pdfx.json path and reads config if it exists.
 * Returns null when pdfx.json is absent (callers may fall back to defaults).
 */
export function tryReadConfig(): Config | null {
  const configPath = path.join(process.cwd(), 'pdfx.json');
  if (!checkFileExists(configPath)) return null;
  return readConfig(configPath);
}

/**
 * Asserts that pdfx.json exists and is valid.
 * Prints an error + hint and calls process.exit(1) if not.
 */
export function requireConfig(): Config {
  const configPath = path.join(process.cwd(), 'pdfx.json');

  if (!checkFileExists(configPath)) {
    console.error(chalk.red('Error: pdfx.json not found'));
    console.log(chalk.yellow('Run: npx @pdfx/cli init'));
    process.exit(1);
  }

  try {
    return readConfig(configPath);
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
}
