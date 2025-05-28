import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 2999,
    // strictPort: true,
    // https: false,
    // open: true,
  },
  ssr: {
    target: 'node',
    // format: 'esm',
    external: ['react'],
    // noExternal: ['my-shared-lib'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
    // alias: [{ find: '@', replacement: path.resolve(__dirname, '/app') }],
  }
})
