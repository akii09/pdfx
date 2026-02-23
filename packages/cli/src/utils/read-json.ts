import fs from 'node:fs';
import { ConfigError } from '@pdfx/shared';

/**
 * Reads and parses a JSON file, throwing a user-friendly ConfigError if it fails.
 * Handles both missing-file (ENOENT) and malformed-JSON cases.
 */
export function readJsonFile(filePath: string): unknown {
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (error: unknown) {
    const isNotFound =
      error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT';
    throw new ConfigError(
      isNotFound ? `File not found: ${filePath}` : `Could not read ${filePath}`,
      isNotFound ? 'Run: npx @pdfx/cli init' : undefined
    );
  }

  try {
    return JSON.parse(raw);
  } catch (error: unknown) {
    const details = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Invalid JSON in ${filePath}: ${details}`);
  }
}
