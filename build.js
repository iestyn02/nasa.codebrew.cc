import { build } from 'esbuild';

build({
  entryPoints: ['./backend/server.js'],
  outfile: './build/api/server.mjs',
  platform: 'node',
  target: 'node12.19.0',
  bundle: true,
  format: 'esm',  // ✅ ESM mode so import.meta works
  sourcemap: true
}).catch(() => process.exit(1));