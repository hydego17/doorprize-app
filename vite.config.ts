import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * defining aliases
   */
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
