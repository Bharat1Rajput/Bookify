import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'https://appointment-app-u304.onrender.com/',
=======
        target: 'http://localhost:3000',
>>>>>>> e5532fcae28cb6895765d3fe8da0b958f72e1878
        changeOrigin: true,
        secure: false
      }
    }
  }
})
