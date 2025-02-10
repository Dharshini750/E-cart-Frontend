import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        'C:/Users/DHARSHINI/OneDrive/Documents/MERN/E-cart/node_modules/@fortawesome/fontawesome-free/webfonts',
        'C:/Users/DHARSHINI/OneDrive/Documents/MERN/E-cart',
        'C:/Users/DHARSHINI/OneDrive/Documents/MERN/E-cart/node_modules/vite/dist/client',
      ]
    }
  }
});
