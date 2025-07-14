export default {
  apps: [
    {
      name: "nasa-api",
      script: "./backend/server.js",
      // cwd: "/absolute/path/to/your/project",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
