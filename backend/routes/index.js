import { Router } from 'express';

import { readFileSync } from 'fs';

import { fileURLToPath } from 'url';

import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8'));

const router = Router();

export default router.get('/', (req, res) => {
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: '✅'
  });
});