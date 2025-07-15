import fs from 'fs';

import readline from 'readline';

import path from 'path';

import { fileURLToPath } from 'url';

const DEFAULT_VALUES_KEYS = {
    PORT: 3000,
    NASA_API_KEY: 'DEMO_KEY',
    VITE_GEO_APIFY_KEY: '16b327cb8cd64ca19a688553da6a6630',
    VITE_API_URL: 'http://localhost:3000'
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');

/** ✅ Early exit if .env exists */
if (fs.existsSync(envPath)) {
  console.log('.env file already exists. ✅');
  process.exit(0);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompts = [
  { key: 'PORT', question: `Enter server PORT (default: ${DEFAULT_VALUES_KEYS['PORT']}): ` },
  { key: 'NASA_API_KEY', question: 'Enter NASA API Key (default: DEMO_KEY): ' },
  { key: 'VITE_GEO_APIFY_KEY', question: 'Enter Vite GEO Apify Key: ' },
  { key: 'VITE_API_URL', question: `Enter API URL for Frontend (default: ${DEFAULT_VALUES_KEYS['VITE_API_URL']} ): ` }
];

const answers = {};

const promptUser = async (i = 0) => {
  if (i >= prompts.length) {
    const content = Object.entries(answers)
      .map(([key, value]) => `${key}=${value || DEFAULT_VALUES_KEYS[key]}`)
      .join('\n');

    fs.writeFileSync(envPath, content);
    console.log('.env file created successfully.');
    rl.close();
    return;
  }

  const { key, question } = prompts[i];
  rl.question(question, answer => {
    answers[key] = answer;
    promptUser(i + 1);
  });
};

promptUser();
