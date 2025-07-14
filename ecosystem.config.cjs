// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/server.mjs',
      interpreter: 'node',
      interpreter_args: '--enable-source-maps',
      env: {
        NODE_ENV: 'production',
        PORT: 8495
      }
    }
  ]
};