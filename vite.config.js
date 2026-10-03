import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //remover
  server: {
    allowedHosts: [
      'desktop-uol3767.taila22cc8.ts.net'
    ]
  }
})
