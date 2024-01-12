import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const API_URI = process.env.NODE_ENV === 'production'
  ? 'https://wojciechlasowskiapi.azurewebsites.net'    // in prod
  : 'https://wojciechlasowskiapi.azurewebsites.net' // in dev
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://wojciechlasowskiapi.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        host: 'https://storagekontowojtek.z6.web.core.windows.net/', // Add 
      }
    }
  }
})
