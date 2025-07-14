module.exports = {
  apps: [
    {
      name: "server",
      script: "./server.js",
      cwd: "/var/api/nasa.codebrew.cc/backend",
      interpreter: "node",
      node_args: "--enable-source-maps",
      env: {
        PORT: 8495,
        NODE_ENV: "production"
      }
    }
  ]
};