import { build } from 'esbuild';

build({
  entryPoints: ['./server.js'],
  outfile: './dist/server.mjs',
  platform: 'node',
  target: 'node18',
  bundle: true,
  format: 'esm',  // ✅ ESM mode so import.meta works
  sourcemap: true
}).catch(() => process.exit(1));