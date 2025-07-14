module.exports = {
  apps: [
    {
      name: "server",
      script: "./server.js",
      cwd: "/var/api/nasa.codebrew.cc/backend",
      interpreter: "node",
      node_args: "--enable-source-maps",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};