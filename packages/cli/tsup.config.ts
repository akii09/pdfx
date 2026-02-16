import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node24',
  noExternal: ['@pdfx/shared'],
  banner: {
    js: '#!/usr/bin/env node',
  },
});
