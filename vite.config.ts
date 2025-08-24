import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/icons32.png',
          dest: '',
        },
        {
          src: 'public/manifest.json',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(process.cwd(), 'index.html'),
        main: path.resolve(process.cwd(), 'src/content/main.ts'),
        background: path.resolve(process.cwd(), 'src/background.ts'),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});