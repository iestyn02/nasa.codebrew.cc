import react from '@vitejs/plugin-react';

import { reactRouter } from '@react-router/dev/vite';

import tailwindcss from '@tailwindcss/vite';

import { defineConfig, type ConfigEnv } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'path'

// const base = import.meta.env.VITE_BASE_PATH;
// const a: ConfigEnv = {};

export default defineConfig(({ mode }) => ({
  root: 'frontend',
  base: mode === 'production' ? '/a5de8ad3/' : '/a5de8ad3/', // 👈 Set your base path
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'frontend/app'),
  //   }
  // },
  // server: {
  //   middlewareMode: false,
  //   fs: {
  //     allow: ['frontend']
  //   }
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true
  },
  publicDir: path.resolve(__dirname, 'frontend/public')
}));
