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

export function checkFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/** Normalize path for safe comparison (absolute, resolved, consistent separators) */
export function normalizePath(...segments: string[]): string {
  return path.resolve(...segments);
}

/**
 * Returns true if `resolvedPath` is within or equal to `targetDir`.
 * Both paths are normalized before comparison for consistent behavior across platforms.
 */
export function isPathWithinDirectory(resolvedPath: string, targetDir: string): boolean {
  const normalizedTarget = normalizePath(targetDir);
  const normalizedResolved = normalizePath(resolvedPath);

  if (normalizedResolved === normalizedTarget) return true;

  const prefix = normalizedTarget.endsWith(path.sep)
    ? normalizedTarget
    : normalizedTarget + path.sep;

  return normalizedResolved.startsWith(prefix);
}

/**
 * Resolves a file name within a target directory, preventing path traversal.
 * Throws if the resolved path escapes the target directory.
 */
export function safePath(targetDir: string, fileName: string): string {
  const resolved = normalizePath(targetDir, fileName);
  const normalizedTarget = normalizePath(targetDir);

  if (!isPathWithinDirectory(resolved, normalizedTarget)) {
    throw new Error(`Path "${fileName}" escapes target directory "${normalizedTarget}"`);
  }

  return resolved;
}
