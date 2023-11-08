import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Define a proxy rule
      '/api': 'http://localhost:3000', // Replace with your API server URL
    },
  },
})