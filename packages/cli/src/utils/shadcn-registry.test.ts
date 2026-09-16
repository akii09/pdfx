import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  SHADCN_NAMESPACE,
  SHADCN_REGISTRY_URL,
  registerShadcnNamespace,
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
    fs.chmodSync(configPath, 0o444);
    try {
      expect(registerShadcnNamespace(dir)).toEqual({ updated: false, reason: 'write-failed' });
    } finally {
      fs.chmodSync(configPath, 0o644);
    }
  });
});
