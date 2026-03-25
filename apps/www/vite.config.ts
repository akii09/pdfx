import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cliPkg from '../../packages/cli/package.json';

export default defineConfig({
  plugins: [react()],
  define: {
    // Injected at build time — reads the CLI package.json as the single source of truth.
    // Access in components via the global `__PDFX_VERSION__` (declared in vite-env.d.ts).
    __PDFX_VERSION__: JSON.stringify(cliPkg.version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pdfx/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: process.env.VITE_ALLOWED_HOST ? [process.env.VITE_ALLOWED_HOST] : undefined,
  },
  build: {
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-react-pdf': ['@react-pdf/renderer'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
});
