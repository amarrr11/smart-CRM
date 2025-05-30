import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
      host: true,   
      port: 5173
    },
  server: {
    allowedHosts: ['smart-crm-frontend.onrender.com', 'localhost']
  },
  plugins: [react()],
})
