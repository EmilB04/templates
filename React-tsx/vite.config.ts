import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { siteAssets } from './scripts/site-assets.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteAssets()],
})
