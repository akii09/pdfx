import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pdfx/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['brantley-nonchimerical-speedfully.ngrok-free.dev'], // Allow both localhost and pdfx.local for development
  },
});
