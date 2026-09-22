import { defineConfig } from 'tsup';

// tsup runs these three configs concurrently against one `dist`, so none of them may
// clean it — a `clean: true` here deletes whatever the siblings have already emitted.
// `pnpm build` clears `dist` once, before tsup starts.
export default defineConfig([
  // Main CLI binary — gets the shebang so it's directly executable
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: false,
    target: 'node20',
    noExternal: ['@pdfx/shared'],
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
  // MCP server module — exported as `pdfx-cli/mcp` for programmatic use
  {
    entry: { 'mcp/index': 'src/mcp/index.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: false,
    target: 'node20',
    noExternal: ['@pdfx/shared'],
  },
  // Theme file generator — exported as `pdfx-cli/theme` so the docs site can
  // emit the same theme source the CLI writes, without reaching into src/
  {
    entry: { 'theme/index': 'src/utils/generate-theme.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: false,
    target: 'node20',
    noExternal: ['@pdfx/shared'],
  },
]);
