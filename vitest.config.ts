import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts: the tests only cover plain TS (content + progress logic), no React plugin needed.
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] } })
