import fs from 'node:fs';
import { ConfigError } from '@pdfx/shared';

/**
 * Reads and parses a JSON file, throwing a user-friendly error if it fails.
 */
export function readJsonFile(filePath: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error: unknown) {
    const details = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Failed to read ${filePath}: ${details}`);
  }
}
