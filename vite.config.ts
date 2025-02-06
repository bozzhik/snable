import {defineConfig} from 'vite'
import {resolve} from 'path'

import {crx} from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'

import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
    legacy: {
      skipWebSocketTokenCheck: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        _scripts: resolve(__dirname, './src/contentScript/'),
        '~': resolve(__dirname, './src/components'),
        '~~popup': resolve(__dirname, './src/components/modules/popup'),
        $: resolve(__dirname, './src/assets/'),
      },
    },
    plugins: [crx({manifest}), react()],
  }
})
