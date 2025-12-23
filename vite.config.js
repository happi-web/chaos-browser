import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This rule captures any request starting with /api/hf
      '/api/hf': {
        target: 'https://api-inference.huggingface.co', // It forwards it here
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hf/, ''), // It removes the "/api/hf" prefix
        secure: false,
      },
    },
  },
})