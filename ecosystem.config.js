// eslint-disable-next-line @typescript-eslint/no-var-requires
const cpusAvailable = require('os').cpus().length;

module.exports = {
  apps: [
    {
      name: 'ParkingPrediction',
      script: './dist/index.js',
      // instances: 2,
      // exec_mode: 'cluster',
      max_memory_restart: '1G',
      env: {
        PORT: 8080,
        NODE_ENV: 'development',
        DEFAULT_THRESHOLD: 0.6,
        ENABLE_WORKER: 1,
      },
      env_production: {
        PORT: 8080,
        NODE_ENV: 'production',
        OCP_APIM_SUBSCRIPTION_KEY,
        DEFAULT_THRESHOLD: 0.6,
        ENABLE_WORKER: 1,
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy':
  //       'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
};
