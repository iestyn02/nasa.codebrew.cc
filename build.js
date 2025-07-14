import { build } from 'esbuild';

build({
  entryPoints: ['./backend/server.js'],
  outfile: './dist/server.mjs',         // <- use .mjs
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',                        // <- required for import/export + import.meta
  sourcemap: true
}).catch(() => process.exit(1));