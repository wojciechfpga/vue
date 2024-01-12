import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const API_URI = process.env.NODE_ENV === 'production'
  ? 'https://wojciechlasowskiapi.azurewebsites.net'    // in prod
  : 'http://localhost:5815' // in dev
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
        target: API_URI,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    middlewares: [
      (req, res, next) => {
        // Set the Referrer Policy header
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        next();
      },
    ],
  }
})
