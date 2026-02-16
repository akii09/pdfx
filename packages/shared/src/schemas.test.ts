import { describe, expect, it } from 'vitest';
import { componentNameSchema, configSchema, registryItemSchema } from './schemas';

describe('configSchema', () => {
  it('should accept valid config', () => {
    const result = configSchema.safeParse({
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
    });
    expect(result.success).toBe(true);
  });

  it('should accept config with $schema', () => {
    const result = configSchema.safeParse({
      $schema: 'https://pdfx.akashpise.dev/schema.json',
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty componentDir', () => {
    const result = configSchema.safeParse({
      componentDir: '',
      registry: 'https://pdfx.akashpise.dev/r',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid registry URL', () => {
    const result = configSchema.safeParse({
      componentDir: './src/components',
      registry: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('should reject missing fields', () => {
    const result = configSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('should accept config with theme path', () => {
    const result = configSchema.safeParse({
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
      theme: './src/lib/pdfx-theme.ts',
    });
    expect(result.success).toBe(true);
  });

  it('should accept config without theme (backward compatible)', () => {
    const result = configSchema.safeParse({
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
    });
    expect(result.success).toBe(true);
  });

  it('should reject config with empty theme string', () => {
    const result = configSchema.safeParse({
      componentDir: './src/components/pdfx',
      registry: 'https://pdfx.akashpise.dev/r',
      theme: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('registryItemSchema', () => {
  it('should accept valid registry item', () => {
    const result = registryItemSchema.safeParse({
      name: 'heading',
      files: [
        {
          path: 'heading.tsx',
          content: 'export function Heading() {}',
          type: 'registry:component',
        },
      ],
      dependencies: ['@react-pdf/renderer'],
    });
    expect(result.success).toBe(true);
  });

  it('should accept item without optional fields', () => {
    const result = registryItemSchema.safeParse({
      name: 'text',
      files: [
        { path: 'text.tsx', content: 'export function Text() {}', type: 'registry:component' },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('should reject item with empty files array', () => {
    const result = registryItemSchema.safeParse({
      name: 'empty',
      files: [],
    });
    expect(result.success).toBe(false);
  });

  it('should reject item with missing name', () => {
    const result = registryItemSchema.safeParse({
      files: [{ path: 'x.tsx', content: '', type: 'registry:component' }],
    });
    expect(result.success).toBe(false);
  });

  it('should reject file with missing content', () => {
    const result = registryItemSchema.safeParse({
      name: 'test',
      files: [{ path: 'test.tsx', type: 'registry:component' }],
    });
    expect(result.success).toBe(false);
  });
});

describe('componentNameSchema', () => {
  it('should accept valid names', () => {
    expect(componentNameSchema.safeParse('heading').success).toBe(true);
    expect(componentNameSchema.safeParse('data-table').success).toBe(true);
    expect(componentNameSchema.safeParse('h1').success).toBe(true);
  });

  it('should reject names starting with numbers', () => {
    expect(componentNameSchema.safeParse('1heading').success).toBe(false);
  });

  it('should reject names with uppercase', () => {
    expect(componentNameSchema.safeParse('Heading').success).toBe(false);
  });

  it('should reject names with special characters', () => {
    expect(componentNameSchema.safeParse('head_ing').success).toBe(false);
    expect(componentNameSchema.safeParse('../hack').success).toBe(false);
    expect(componentNameSchema.safeParse('foo/bar').success).toBe(false);
  });

  it('should reject empty string', () => {
    expect(componentNameSchema.safeParse('').success).toBe(false);
  });
});
