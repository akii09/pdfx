import fs from 'node:fs';
import path from 'node:path';

export const SHADCN_NAMESPACE = '@pdfx';
export const SHADCN_REGISTRY_URL = 'https://getpdfx.dev/r/shadcn/{name}.json';

interface ComponentsJson {
  registries?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface RegisterShadcnResult {
  updated: boolean;
  reason: 'missing' | 'invalid' | 'already-set' | 'registered';
}

/**
 * If the project already has a shadcn `components.json`, register `@pdfx`
 * without overwriting an existing entry.
 */
export function registerShadcnNamespace(cwd: string): RegisterShadcnResult {
  const configPath = path.join(cwd, 'components.json');
  if (!fs.existsSync(configPath)) {
    return { updated: false, reason: 'missing' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return { updated: false, reason: 'invalid' };
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { updated: false, reason: 'invalid' };
  }

  const json = parsed as ComponentsJson;
  const registries =
    json.registries && typeof json.registries === 'object' && !Array.isArray(json.registries)
      ? { ...json.registries }
      : {};

  if (registries[SHADCN_NAMESPACE] !== undefined) {
    return { updated: false, reason: 'already-set' };
  }

  const next: ComponentsJson = {
    ...json,
    registries: {
      ...registries,
      [SHADCN_NAMESPACE]: SHADCN_REGISTRY_URL,
    },
  };

  fs.writeFileSync(configPath, `${JSON.stringify(next, null, 2)}\n`);
  return { updated: true, reason: 'registered' };
}
