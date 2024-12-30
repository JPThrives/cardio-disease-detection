import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()],
  base: '/cardio-disease-detection/',  // Replace <repo-name> with your actual GitHub repo name
  server: {
    proxy: {
      '/predict': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
