// eslint-disable-next-line @typescript-eslint/no-var-requires
const cpus = require('os').cpus().length;

const OCP_APIM_SUBSCRIPTION_KEY = process.env.OCP_APIM_SUBSCRIPTION_KEY;

module.exports = {
  apps: [
    {
      name: 'ParkingPrediction',
      script: './dist/index.js',
      instances: cpus / 2,
      exec_mode: 'cluster',
      env: {
        PORT: 3008,
        NODE_ENV: 'development',
        OCP_APIM_SUBSCRIPTION_KEY,
      },
      env_production: {
        PORT: 8080,
        NODE_ENV: 'production',
        OCP_APIM_SUBSCRIPTION_KEY,
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
