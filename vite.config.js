import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work on GitHub Pages under /portfolio/ and on any static host
export default defineConfig({
  base: './',
  plugins: [react()],
});
