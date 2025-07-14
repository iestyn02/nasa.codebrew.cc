module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/server.js',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: 8495
      }
    }
  ]
};