import { build } from 'esbuild';

build({
  entryPoints: ['./backend/server.js'],
  outfile: './dist/server.cjs',
  platform: 'node',
  target: 'node18',
  bundle: true,
  format: 'cjs',
  sourcemap: true
}).catch(() => process.exit(1));