import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.178.86", // Listen on all network interfaces
    cors: true,
    port: 5173, // You can specify any available port
    open: true, // This is optional. It'll automatically open the app in the browser.
    allowedHosts: true,
  },
})
