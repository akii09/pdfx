#!/usr/bin/env node
/**
 * @file sync-to-project.mjs
 *
 * @description
 * Copies every built pdfx registry component into a local project —
 * producing the exact same files a developer receives from `pdfx add <name>`.
 *
 * Run this script whenever you:
 *  - Add or update a component in packages/ui and rebuild the registry
 *  - Want to keep a local test/demo project in sync with the latest registry
 *
 * ─── Path resolution priority (highest → lowest) ────────────────────────────
 *
 *  TARGET PROJECT   CLI arg  >  PDFX_TARGET_PROJECT env / .env  >  (error)
 *  REGISTRY DIR     PDFX_REGISTRY_DIR env / .env  >  default (apps/www/public/r)
 *
 * ─── Usage ──────────────────────────────────────────────────────────────────
 *
 *  # Pass target as CLI argument (quickest):
 *  node scripts/sync-to-project.mjs ../my-pdf-app
 *
 *  # Or configure via .env at the repo root (recommended for repeated use):
 *  cp .env.example .env        # edit PDFX_TARGET_PROJECT in .env
 *  node scripts/sync-to-project.mjs
 *
 *  # Or export env vars manually / in CI:
 *  export PDFX_TARGET_PROJECT=../my-pdf-app
 *  node scripts/sync-to-project.mjs
 *
 * ─── Prerequisites ───────────────────────────────────────────────────────────
 *
 *  1. Registry must be built first:  pnpm build:registry
 *  2. Target project must have a pdfx.json (created by `pdfx init`).
 *     The script reads `componentDir` from that file to know where to write.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Paths ───────────────────────────────────────────────────────────────────

/** Absolute path to the scripts/ directory (where this file lives). */
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Absolute path to the pdfx repo root (one level above scripts/). */
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');

// ─── Env loader ──────────────────────────────────────────────────────────────

/**
 * Reads `<repoRoot>/.env` (if it exists) and populates `process.env` with any
 * key=value pairs found there. Already-set env vars are never overwritten, so
 * real shell exports and CI secrets always take precedence over the file.
 *
 * Supports:
 *  - `KEY=value` pairs (with or without quotes)
 *  - `#` comment lines and inline comments
 *  - Blank lines (ignored)
 *
 * No external dependencies — uses only Node built-ins.
 */
function loadEnv() {
  const envPath = path.join(REPO_ROOT, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');

  for (const raw of lines) {
    const line = raw.trim();
    // Skip blanks and comment-only lines
    if (!line || line.startsWith('#')) continue;

    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;

    const key = line.slice(0, eqIdx).trim();
    // Strip inline comments and surrounding quotes from the value
    const value = line
      .slice(eqIdx + 1)
      .replace(/#.*$/, '')   // remove inline comment
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2'); // strip surrounding quotes

    // Never overwrite vars already set in the shell / CI environment
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// Load .env before reading any config values
loadEnv();

// ─── Config ──────────────────────────────────────────────────────────────────

/**
 * Path to the LOCAL project that will receive the components.
 * Priority: CLI arg → PDFX_TARGET_PROJECT (env / .env file).
 * May be absolute or relative to the repo root.
 */
const targetProjectInput = process.argv[2] ?? process.env.PDFX_TARGET_PROJECT;

/**
 * Path to the built registry directory inside this repo.
 * Priority: PDFX_REGISTRY_DIR (env / .env file) → default (apps/www/public/r).
 * May be absolute or relative to the repo root.
 */
const registryDirInput =
  process.env.PDFX_REGISTRY_DIR ?? 'apps/www/public/r';

// ─── Validation ──────────────────────────────────────────────────────────────

if (!targetProjectInput) {
  console.error('Error: No target project specified.');
  console.error('');
  console.error('Provide it in one of three ways:');
  console.error('  1. CLI arg:  node scripts/sync-to-project.mjs ../my-pdf-app');
  console.error('  2. .env file at repo root:  cp .env.example .env  (then set PDFX_TARGET_PROJECT)');
  console.error('  3. Env var:  export PDFX_TARGET_PROJECT=../my-pdf-app');
  process.exit(1);
}

/** Resolved absolute path to the target project root. */
const targetRoot = path.isAbsolute(targetProjectInput)
  ? targetProjectInput
  : path.resolve(REPO_ROOT, targetProjectInput);

if (!fs.existsSync(targetRoot)) {
  console.error(`Error: Target project not found: ${targetRoot}`);
  process.exit(1);
}

/** Resolved absolute path to the registry directory. */
const registryDir = path.isAbsolute(registryDirInput)
  ? registryDirInput
  : path.resolve(REPO_ROOT, registryDirInput);

if (!fs.existsSync(registryDir)) {
  console.error(`Error: Registry directory not found: ${registryDir}`);
  console.error('Build the registry first:  pnpm build:registry');
  process.exit(1);
}

// ─── Read pdfx.json ──────────────────────────────────────────────────────────

/**
 * Reads and parses the target project's pdfx.json config file.
 * @returns {{ componentDir: string, [key: string]: unknown }}
 */
function readPdfxConfig() {
  const configPath = path.join(targetRoot, 'pdfx.json');
  if (!fs.existsSync(configPath)) {
    console.error(`Error: No pdfx.json found in ${targetRoot}`);
    console.error('Run `pdfx init` inside the target project to create one.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// ─── Registry helpers ────────────────────────────────────────────────────────

/**
 * Returns all component JSON files from the registry directory,
 * excluding the top-level index.json.
 * @returns {string[]} Sorted list of filenames (e.g. ["badge.json", ...])
 */
function getRegistryFiles() {
  return fs
    .readdirSync(registryDir)
    .filter((f) => f.endsWith('.json') && f !== 'index.json')
    .sort();
}

/**
 * Parses a single registry JSON entry.
 * @param {string} filename - e.g. "badge.json"
 * @returns {{ files: Array<{ path: string; content: string }> }}
 */
function readRegistryEntry(filename) {
  const fullPath = path.join(registryDir, filename);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

// ─── Sync ────────────────────────────────────────────────────────────────────

/**
 * Writes a single component file to the target project's component directory.
 * @param {{ path: string; content: string }} file - Registry file entry.
 * @param {string} componentDir - Absolute path to the output directory.
 */
function writeComponentFile(file, componentDir) {
  const fileName = path.basename(file.path);
  const outputPath = path.join(componentDir, fileName);
  fs.writeFileSync(outputPath, file.content, 'utf8');
  console.log(`  ✓  ${fileName}`);
}

/**
 * Main entry point. Reads the registry and writes all component files
 * into the target project's componentDir.
 */
function sync() {
  const pdfxConfig = readPdfxConfig();
  const componentDir = path.resolve(targetRoot, pdfxConfig.componentDir);

  fs.mkdirSync(componentDir, { recursive: true });

  const registryFiles = getRegistryFiles();
  let written = 0;
  let skipped = 0;

  console.log(`\nSyncing registry → ${path.relative(process.cwd(), componentDir)}\n`);

  for (const registryFile of registryFiles) {
    const componentName = registryFile.replace('.json', '');
    const entry = readRegistryEntry(registryFile);

    if (!Array.isArray(entry.files) || entry.files.length === 0) {
      console.warn(`  ⚠  ${componentName}: no files in registry entry, skipping`);
      skipped++;
      continue;
    }

    for (const file of entry.files) {
      writeComponentFile(file, componentDir);
      written++;
    }
  }

  console.log(`\nDone! ${written} file(s) written to ${componentDir}`);
  if (skipped > 0) console.log(`     ${skipped} skipped`);
  console.log();
}

sync();
