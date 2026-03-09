import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // App-level alias
      '@': path.resolve(__dirname, './src'),
      // Workspace package aliases (for development)
      '@pdfx/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@pdfx/shared': path.resolve(__dirname, '../../packages/shared/src'),
      '@pdfx/builder-core': path.resolve(__dirname, '../../packages/builder-core/src'),
    },
  },
  server: {
    port: 3001, // Different from www (3000) and playground (default 5173)
    open: true,
  },
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'pdf-vendor': ['@react-pdf/renderer'],
          'dnd-vendor': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          'editor-vendor': ['@monaco-editor/react'],
          'state-vendor': ['zustand', 'immer'],
        },
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'immer',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
    ],
  },
});