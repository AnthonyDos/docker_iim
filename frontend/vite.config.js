import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    port: 4000, 
    proxy: {
      '/api': 'http://backend:5001',
    },
  },
});
