import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }) as PluginOption,
  ],
  server: {
    port: 3000,
  },
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      treeshake: 'smallest',
      output: {
        manualChunks: {
          vendor: ['axios', '@tanstack/react-query'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    }
  }
});
