import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()


export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_URL_BACKEND,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});