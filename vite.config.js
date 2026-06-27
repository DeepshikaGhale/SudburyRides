import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward booking API calls to the Express SMTP server during `npm run dev`.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
