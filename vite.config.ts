import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx', 'src/test-setup.ts'],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
        'title-frame': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/components/title-frame/index.ts'),
        tape: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/components/tape/index.ts'),
        'photo-frame': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/components/photo-frame/index.ts'),
        stamp: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/components/stamp/index.ts'),
        divider: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/components/divider/index.ts'),
        calendar: resolve(
          fileURLToPath(new URL('.', import.meta.url)),
          'src/components/calendar/index.ts',
        ),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
})
