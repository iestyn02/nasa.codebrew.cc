module.exports = {
  apps: [
    {
      name: "server",
      script: "./server.mjs",
      cwd: "/var/api/nasa.codebrew.cc/dist",
      interpreter: "node",
      node_args: "--enable-source-maps",
      env: {
        PORT: 8495,
        NODE_ENV: "production"
      }
    }
  ]
};