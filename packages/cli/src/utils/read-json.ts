import fs from 'node:fs';
import { ConfigError } from '@pdfx/shared';

/**
 * Reads and parses a JSON file, throwing a user-friendly error if it fails.
 */
export function readJsonFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, 'utf-8');

  try {
    return JSON.parse(raw);
  } catch (error: unknown) {
    const details = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Invalid JSON in ${filePath}: ${details}`);
  }
}
