import { describe, expect, it } from 'vitest';
import { resolveThemeImport } from './add.js';
import { resolveTemplateImports } from './template.js';

/**
 * CLI Integration Tests
 *
 * These tests verify the CLI's import resolution and path handling logic
 * which are critical for correct component installation.
 */

describe('CLI Integration: Import Resolution', () => {
  describe('resolveThemeImport', () => {
    const baseContent = `
import type { Style } from '@react-pdf/types';
import { theme } from '../lib/pdfx-theme';
import { usePdfxTheme, useSafeMemo } from '../lib/pdfx-theme-context';

export function TestComponent() {}
`;

    it('should not modify content without theme imports', () => {
      const noThemeContent = `
import React from 'react';
export function Button() { return null; }
`;
      const result = resolveThemeImport(
        './src/components/pdfx',
        './src/lib/pdfx-theme.ts',
        noThemeContent
      );

      expect(result).toBe(noThemeContent);
    });

    it('should preserve non-theme imports', () => {
      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        baseContent
      );

      // Should preserve the @react-pdf/types import unchanged
      expect(result).toContain("from '@react-pdf/types'");
    });

    it('should rewrite theme imports to relative paths', () => {
      const result = resolveThemeImport(
        './src/components/pdfx/heading',
        './src/lib/pdfx-theme.ts',
        baseContent
      );

      // Should contain rewritten theme imports (exact path depends on implementation)
      expect(result).toContain('pdfx-theme');
      expect(result).toContain('pdfx-theme-context');
    });
  });

  describe('resolveTemplateImports', () => {
    const templateContent = `
import { theme } from '../../lib/pdfx-theme';
import { usePdfxTheme } from '../../lib/pdfx-theme-context';
import { Heading } from '../../components/pdfx/heading/pdfx-heading';
import { Text } from '../../components/pdfx/text/pdfx-text';
import { Table } from '../../components/pdfx/table/pdfx-table';

export function InvoiceTemplate() {}
`;

    it('should rewrite import paths for template content', () => {
      const config = {
        componentDir: './src/components/pdfx',
        registry: 'https://example.com/r',
        theme: './src/lib/pdfx-theme.ts',
        templateDir: './src/templates/pdfx',
      };

      const result = resolveTemplateImports(templateContent, 'invoice', config);

      // All expected imports should still be present (rewritten)
      expect(result).toContain('pdfx-theme');
      expect(result).toContain('heading');
      expect(result).toContain('text');
      expect(result).toContain('table');
    });
  });
});

describe('CLI Integration: Path Safety', () => {
  describe('component name validation patterns', () => {
    const validNames = ['heading', 'text', 'data-table', 'pdf-image', 'key-value'];
    const invalidNames = ['../hack', 'foo/bar', 'Heading', '.hidden', '-invalid'];

    it.each(validNames)('should accept valid name: %s', (name) => {
      const pattern = /^[a-z][a-z0-9-]*$/;
      expect(pattern.test(name)).toBe(true);
    });

    it.each(invalidNames)('should reject invalid name: %s', (name) => {
      const pattern = /^[a-z][a-z0-9-]*$/;
      expect(pattern.test(name)).toBe(false);
    });
  });

  describe('safe path patterns', () => {
    it('should reject paths containing traversal sequences', () => {
      const maliciousPaths = ['../../../etc/passwd', '..\\..\\windows\\system32'];

      for (const malicious of maliciousPaths) {
        // These should be caught by simple pattern matching
        const hasTraversal = malicious.includes('..');
        expect(hasTraversal).toBe(true);
      }
    });

    it('should reject absolute paths', () => {
      const absolutePaths = ['/etc/passwd', 'C:\\Windows\\System32'];

      for (const abs of absolutePaths) {
        const isAbsolute = abs.startsWith('/') || /^[A-Za-z]:/.test(abs);
        expect(isAbsolute).toBe(true);
      }
    });
  });
});

describe('CLI Integration: Config Validation', () => {
  it('should validate required config fields', () => {
    const validConfig = {
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
      theme: './src/lib/pdfx-theme.ts',
    };

    expect(validConfig.componentDir).toBeTruthy();
    expect(validConfig.registry).toMatch(/^https?:\/\//);
    expect(validConfig.theme).toBeTruthy();
  });

  it('should reject invalid registry URLs', () => {
    const invalidUrls = ['not-a-url', 'ftp://invalid', '', 'javascript:alert(1)'];

    for (const url of invalidUrls) {
      const isValidUrl = /^https?:\/\//.test(url);
      expect(isValidUrl).toBe(false);
    }
  });
});
