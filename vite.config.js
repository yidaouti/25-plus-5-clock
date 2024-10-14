import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Make sure this matches the directory used in your deploy script
  },
  base: '/25-plus-5-clock/' // Set this to your GitHub repository name
})
