import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repo at https://ramialkhateeb.github.io/Job-interview/, so assets
// need that subpath prefix in production builds. Local dev stays at '/'.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/Job-interview/' : '/',
  plugins: [react()],
})
