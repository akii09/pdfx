import fs from 'node:fs';
import path from 'node:path';

export function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Resolves a file name within a target directory, preventing path traversal.
 * Throws if the resolved path escapes the target directory.
 */
export function safePath(targetDir: string, fileName: string): string {
  const resolved = path.resolve(targetDir, fileName);
  const normalizedTarget = path.resolve(targetDir);

  if (!resolved.startsWith(normalizedTarget + path.sep) && resolved !== normalizedTarget) {
    throw new Error(`Path "${fileName}" escapes target directory "${normalizedTarget}"`);
  }

  return resolved;
}
