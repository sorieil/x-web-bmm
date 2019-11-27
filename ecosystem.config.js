module.exports = {
  apps: [
    {
      name: 'WEB',
      instances: 1,
      autorestart: true,
      script: './server/index.js',
      watch: false,
      max_memory_restart: '1.8G',
      env: {
        PORT: 80,
      },
    },
  ],
};
