// see https://github.com/vitejs/awesome-vite

import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import removeConsole from 'vite-plugin-remove-console'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    removeConsole(),
    ViteImageOptimizer({
      png: { quality: 72 },
      jpeg: { quality: 78 },
      jpg: { quality: 78 },
      webp: { quality: 78 },
    }),
  ],
})
