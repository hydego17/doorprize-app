import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

import { dependencies } from './package.json';

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ['react', 'react-dom', 'react-router-dom'];

// Split each dependency into separate chunk
function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },

  /**
   * defining aliases
   */
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
