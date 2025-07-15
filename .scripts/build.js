import { build } from 'esbuild';

build({
  entryPoints: ['./backend/server.js'],
  outfile: './dist/server.mjs',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  sourcemap: true
}).catch(() => process.exit(1));