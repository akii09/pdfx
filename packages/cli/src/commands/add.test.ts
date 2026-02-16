import path from 'node:path';
import { componentNameSchema } from '@pdfx/shared';
import { describe, expect, it } from 'vitest';
import { isPathWithinDirectory, safePath } from '../utils/file-system.js';
import { resolveThemeImport } from './add.js';

describe('isPathWithinDirectory', () => {
  it('should return true when paths are equal', () => {
    expect(isPathWithinDirectory('/tmp/components', '/tmp/components')).toBe(true);
  });

  it('should return true when resolved is a child of target', () => {
    expect(isPathWithinDirectory('/tmp/components/heading.tsx', '/tmp/components')).toBe(true);
    expect(isPathWithinDirectory('/tmp/components/sub/heading.tsx', '/tmp/components')).toBe(true);
  });

  it('should return false when resolved escapes target', () => {
    expect(isPathWithinDirectory('/etc/passwd', '/tmp/components')).toBe(false);
    expect(isPathWithinDirectory('/tmp/components/../etc/passwd', '/tmp/components')).toBe(false);
  });

  it('should return false when resolved is a sibling (prefix confusion)', () => {
    expect(isPathWithinDirectory('/tmp/components-bar/file.tsx', '/tmp/components')).toBe(false);
  });
});

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
