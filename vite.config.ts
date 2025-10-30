import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/training-bureau-helper/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})