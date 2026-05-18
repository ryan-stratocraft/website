import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ must match main "public" in firebase.json
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oneura: resolve(__dirname, 'oneura.html'),
      },
    },
  },
});
