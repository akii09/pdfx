import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  SHADCN_NAMESPACE,
  SHADCN_REGISTRY_URL,
  registerShadcnNamespace,
  shadcnRegistryAddCommand,
  shadcnRegistryUrlFor,
} from './shadcn-registry.js';

function tempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'pdfx-shadcn-'));
}

describe('registerShadcnNamespace', () => {
  const dirs: string[] = [];

  afterEach(() => {
    for (const dir of dirs) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    dirs.length = 0;
  });

  it('no-ops when components.json is missing', () => {
    const dir = tempDir();
    dirs.push(dir);
    expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'missing' });
  });

  it('registers @pdfx on a shadcn components.json', () => {
    const dir = tempDir();
    dirs.push(dir);
    fs.writeFileSync(
      path.join(dir, 'components.json'),
      JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', aliases: {} }, null, 2)
    );

    expect(registerShadcnNamespace(dir)).toEqual({ updated: true, reason: 'registered' });

    const written = JSON.parse(fs.readFileSync(path.join(dir, 'components.json'), 'utf-8')) as {
      registries: Record<string, string>;
    };
    expect(written.registries[SHADCN_NAMESPACE]).toBe(SHADCN_REGISTRY_URL);
  });

  it('does not overwrite an existing @pdfx entry', () => {
    const dir = tempDir();
    dirs.push(dir);
    fs.writeFileSync(
      path.join(dir, 'components.json'),
      JSON.stringify({
        registries: { [SHADCN_NAMESPACE]: 'https://example.com/r/{name}.json' },
      })
    );

    expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'already-set' });

    const written = JSON.parse(fs.readFileSync(path.join(dir, 'components.json'), 'utf-8')) as {
      registries: Record<string, string>;
    };
    expect(written.registries[SHADCN_NAMESPACE]).toBe('https://example.com/r/{name}.json');
  });

  it('no-ops on invalid JSON', () => {
    const dir = tempDir();
    dirs.push(dir);
    fs.writeFileSync(path.join(dir, 'components.json'), '{not json');
    expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'invalid' });
  });

  it('does not overwrite a non-object registries value', () => {
    const dir = tempDir();
    dirs.push(dir);
    const configPath = path.join(dir, 'components.json');
    fs.writeFileSync(configPath, JSON.stringify({ registries: [] }));
    expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'invalid' });
    expect(JSON.parse(fs.readFileSync(configPath, 'utf-8'))).toEqual({ registries: [] });
  });

  it('returns write-failed when components.json cannot be written', () => {
    const dir = tempDir();
    dirs.push(dir);
    const configPath = path.join(dir, 'components.json');
    fs.writeFileSync(configPath, JSON.stringify({ aliases: {} }));
    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('EACCES');
    });
    try {
      expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'write-failed' });
    } finally {
      writeSpy.mockRestore();
    }
  });

  it('uses the project registry so a self-hosted registry stays self-hosted', () => {
    const dir = tempDir();
    dirs.push(dir);
    const configPath = path.join(dir, 'components.json');
    fs.writeFileSync(configPath, JSON.stringify({ aliases: {} }, null, 2));

    expect(registerShadcnNamespace(dir, 'https://registry.internal/r')).toEqual({
      updated: true,
      reason: 'registered',
    });

    const written = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as {
      registries: Record<string, string>;
    };
    expect(written.registries[SHADCN_NAMESPACE]).toBe(
      'https://registry.internal/r/shadcn/{name}.json'
    );
  });

  it('preserves the existing indentation and trailing newline', () => {
    const dir = tempDir();
    dirs.push(dir);
    const configPath = path.join(dir, 'components.json');
    fs.writeFileSync(configPath, `${JSON.stringify({ aliases: { ui: '@/ui' } }, null, 4)}\n`);

    expect(registerShadcnNamespace(dir).updated).toBe(true);

    const raw = fs.readFileSync(configPath, 'utf-8');
    expect(raw).toContain('\n    "aliases"');
    expect(raw.endsWith('\n')).toBe(true);
  });

  it('preserves tab indentation', () => {
    const dir = tempDir();
    dirs.push(dir);
    const configPath = path.join(dir, 'components.json');
    fs.writeFileSync(configPath, JSON.stringify({ aliases: { ui: '@/ui' } }, null, '\t'));

    expect(registerShadcnNamespace(dir).updated).toBe(true);
    expect(fs.readFileSync(configPath, 'utf-8')).toContain('\n\t"aliases"');
  });
});

describe('shadcnRegistryUrlFor', () => {
  it('keeps {name} literal and tolerates a trailing slash', () => {
    expect(shadcnRegistryUrlFor('https://example.com/r')).toBe(
      'https://example.com/r/shadcn/{name}.json'
    );
    expect(shadcnRegistryUrlFor('https://example.com/r///')).toBe(
      'https://example.com/r/shadcn/{name}.json'
    );
  });

  it('backs the public default', () => {
    expect(SHADCN_REGISTRY_URL).toMatch(/\/shadcn\/\{name\}\.json$/);
  });
});

describe('shadcnRegistryAddCommand', () => {
  it('addresses the namespace at the project registry', () => {
    expect(shadcnRegistryAddCommand('https://registry.internal/r')).toBe(
      'npx shadcn@latest registry add @pdfx=https://registry.internal/r/shadcn/{name}.json'
    );
  });
});
