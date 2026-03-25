import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  target: 'node20',
  noExternal: ['@pdfx/shared'],
  banner: {
    js: '#!/usr/bin/env node',
  },
});