module.exports = {
  apps: [
    {
      name: 'BMM_API',
      script: './server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '7G',
    },
  ],
};
