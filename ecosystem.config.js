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
        NODE_ENV: 'production',
        API_URL: 'https://bmm.xsync.info/api',
        PORT: 80,
      },
    },
  ],
};
