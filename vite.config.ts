import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vike from 'vike/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  base: '/',
  plugins: [
    svelte({
      compilerOptions: {
        hydratable: true,
      },
    }),
    vike()
  ],
  server: {
    host: true,
    port: 3000,
  }
})
