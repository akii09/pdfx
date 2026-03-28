import { defineConfig } from 'tsup';

export default defineConfig([
  // Main CLI binary — gets the shebang so it's directly executable
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    sourcemap: false,
    clean: true,
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
]);
