module.exports = {
  apps: [
    {
      name: 'BMM_APP',
      script: './server/index.js',
      autorestart: true,
      env: {
        instances: 1,
        watch: true,
      },
      env_production: {
        exec_mode: 'cluster',
        instances: 0,
        max_memory_restart: '7G',
        watch: false,
      },
    },
  ],
};
