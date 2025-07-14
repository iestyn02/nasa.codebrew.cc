import { build } from 'esbuild';

build({
  entryPoints: ['./server.js'],
  outfile: './dist/server.js',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  sourcemap: true,
  external: ['dotenv'], // avoids inlining dotenv
}).catch(() => process.exit(1));