/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Adds configuration for absolute path imports.
import tsconfigPaths from 'vite-tsconfig-paths';
// Adds configuration for svg imports.
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/generated/**/*.ts',
        './src/theme/**',
        '**/lint-staged.config.js',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
