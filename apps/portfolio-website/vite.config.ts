import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Important for local modules
      '@web3-frontend-portfolio/eth-transaction-parser': path.resolve(__dirname, '../eth-transaction-parser/src'), // <- You may not need this, but can be helpful
    },
  },
});