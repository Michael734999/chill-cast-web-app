import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Adds configuration for absolute path imports.
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
