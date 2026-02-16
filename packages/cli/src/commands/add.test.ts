import path from 'node:path';
import { ValidationError, componentNameSchema } from '@pdfx/shared';
import { describe, expect, it } from 'vitest';
import { resolveThemeImport } from './add.js';

// Inline safePath for testing since it's a private function in add.ts
function safePath(targetDir: string, fileName: string): string {
  const resolved = path.resolve(targetDir, fileName);
  const normalizedTarget = path.resolve(targetDir);

  if (!resolved.startsWith(normalizedTarget + path.sep) && resolved !== normalizedTarget) {
    throw new ValidationError(`Path traversal detected: "${fileName}" escapes target directory`);
  }

  return resolved;
}

describe('safePath', () => {
  it('should allow normal filenames', () => {
    const result = safePath('/tmp/components', 'heading.tsx');
    expect(result).toBe(path.resolve('/tmp/components', 'heading.tsx'));
  });

  it('should reject path traversal attempts', () => {
    expect(() => safePath('/tmp/components', '../../../etc/passwd')).toThrow(
      'escapes target directory'
    );
  });

  it('should reject absolute paths that escape', () => {
    expect(() => safePath('/tmp/components', '/etc/passwd')).toThrow('escapes target directory');
  });

  it('should allow nested paths within target', () => {
    const result = safePath('/tmp/components', 'sub/heading.tsx');
    expect(result).toBe(path.resolve('/tmp/components', 'sub/heading.tsx'));
  });
});

describe('resolveThemeImport', () => {
  const sampleContent = `import { theme } from '../lib/pdfx-theme';\nexport function Heading() {}`;

  it('should rewrite theme import for standard layout', () => {
    // componentDir=./src/components/pdfx, theme=./src/lib/pdfx-theme.ts
    const result = resolveThemeImport(
      './src/components/pdfx',
      './src/lib/pdfx-theme.ts',
      sampleContent
    );
    expect(result).toContain("from '../../lib/pdfx-theme'");
    expect(result).not.toContain("from '../lib/pdfx-theme'");
  });

  it('should handle theme file in same directory as components', () => {
    const result = resolveThemeImport(
      './src/components',
      './src/components/theme.ts',
      sampleContent
    );
    expect(result).toContain("from './theme'");
  });

  it('should handle deeply nested component directory', () => {
    const result = resolveThemeImport(
      './src/features/pdf/components',
      './src/lib/pdfx-theme.ts',
      sampleContent
    );
    expect(result).toContain("from '../../../lib/pdfx-theme'");
  });

  it('should not modify content without theme import', () => {
    const noThemeContent = `import React from 'react';\nexport function Button() {}`;
    const result = resolveThemeImport(
      './src/components/pdfx',
      './src/lib/pdfx-theme.ts',
      noThemeContent
    );
    expect(result).toBe(noThemeContent);
  });

  it('should handle double-quoted imports', () => {
    const doubleQuoted = `import { theme } from "../lib/pdfx-theme";\nexport function Text() {}`;
    const result = resolveThemeImport(
      './src/components/pdfx',
      './src/lib/pdfx-theme.ts',
      doubleQuoted
    );
    expect(result).toContain("from '../../lib/pdfx-theme'");
  });

  it('should strip .tsx extension from theme path', () => {
    const result = resolveThemeImport(
      './src/components/pdfx',
      './src/lib/pdfx-theme.tsx',
      sampleContent
    );
    expect(result).toContain("from '../../lib/pdfx-theme'");
    expect(result).not.toContain('.tsx');
  });
});

describe('componentNameSchema', () => {
  it('should accept valid lowercase names', () => {
    expect(componentNameSchema.safeParse('heading').success).toBe(true);
    expect(componentNameSchema.safeParse('data-table').success).toBe(true);
  });

  it('should reject names with path separators', () => {
    expect(componentNameSchema.safeParse('../hack').success).toBe(false);
    expect(componentNameSchema.safeParse('foo/bar').success).toBe(false);
  });

  it('should reject uppercase names', () => {
    expect(componentNameSchema.safeParse('Heading').success).toBe(false);
  });
});
