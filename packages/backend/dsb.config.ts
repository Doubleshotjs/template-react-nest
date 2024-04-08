import { defineConfig } from '@doubleshot/builder'

export default defineConfig({
  main: 'dist/main.js',
  entry: './src/main.ts',
  outDir: './dist',
  external: ['electron'],
  electron: {
    preload: {
      entry: './src/preload.ts'
    },
    rendererUrl: 'http://localhost:5173',
    waitTimeout: 5000,
  }
})
