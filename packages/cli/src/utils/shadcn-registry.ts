import fs from 'node:fs';
import path from 'node:path';
import { DEFAULTS } from '../constants.js';

export const SHADCN_NAMESPACE = '@pdfx';

/**
 * Item URL template for `components.json` → `registries["@pdfx"]`.
 *
 * `{name}` is a literal placeholder the shadcn CLI substitutes per item, so it
 * must survive into the written config verbatim.
 */
export function shadcnRegistryUrlFor(registryBase: string): string {
  return `${registryBase.replace(/\/+$/, '')}/shadcn/{name}.json`;
}

/** Public default, used for help text when no project registry is configured. */
export const SHADCN_REGISTRY_URL = shadcnRegistryUrlFor(DEFAULTS.REGISTRY_URL);

export function shadcnRegistryAddCommand(registryBase: string): string {
  return `npx shadcn@latest registry add ${SHADCN_NAMESPACE}=${shadcnRegistryUrlFor(registryBase)}`;
}

interface ComponentsJson {
  registries?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface RegisterShadcnResult {
  updated: boolean;
  reason: 'missing' | 'invalid' | 'already-set' | 'registered' | 'write-failed';
}

/** Reuse the file's own indentation so registering `@pdfx` is a one-line diff. */
function detectIndent(source: string): string | number {
  const match = source.match(/\n([ \t]+)"/);
  if (!match?.[1]) return 2;
  return match[1].includes('\t') ? '\t' : match[1].length;
}

export function componentsJsonPath(cwd: string): string {
  return path.join(cwd, 'components.json');
}

export function hasComponentsJson(cwd: string): boolean {
  return fs.existsSync(componentsJsonPath(cwd));
}

/**
 * If the project already has a shadcn `components.json`, register `@pdfx`
 * without overwriting an existing entry.
 *
 * `registryBase` is the project's configured pdfx registry, so a self-hosted
 * registry stays self-hosted on the shadcn side too.
 */
export function registerShadcnNamespace(
  cwd: string,
  registryBase: string = DEFAULTS.REGISTRY_URL
): RegisterShadcnResult {
  const configPath = componentsJsonPath(cwd);
  if (!fs.existsSync(configPath)) {
    return { updated: false, reason: 'missing' };
  }

  let raw: string;
  let parsed: unknown;
  try {
    raw = fs.readFileSync(configPath, 'utf-8');
    parsed = JSON.parse(raw);
  } catch {
    return { updated: false, reason: 'invalid' };
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { updated: false, reason: 'invalid' };
  }

  const json = parsed as ComponentsJson;
  const registriesValue: unknown = json.registries;
  if (registriesValue !== undefined) {
    if (
      registriesValue === null ||
      typeof registriesValue !== 'object' ||
      Array.isArray(registriesValue)
    ) {
      return { updated: false, reason: 'invalid' };
    }
  }

  const registries =
    registriesValue && typeof registriesValue === 'object' && !Array.isArray(registriesValue)
      ? { ...(registriesValue as Record<string, unknown>) }
      : {};

  if (registries[SHADCN_NAMESPACE] !== undefined) {
    return { updated: false, reason: 'already-set' };
  }

  const next: ComponentsJson = {
    ...json,
    registries: {
      ...registries,
      [SHADCN_NAMESPACE]: shadcnRegistryUrlFor(registryBase),
    },
  };

  const trailingNewline = raw.endsWith('\n') ? '\n' : '';

  try {
    fs.writeFileSync(
      configPath,
      `${JSON.stringify(next, null, detectIndent(raw))}${trailingNewline}`
    );
  } catch {
    return { updated: false, reason: 'write-failed' };
  }
  return { updated: true, reason: 'registered' };
}
