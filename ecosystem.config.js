const APP_NAME = 'eld-farm'
const PATH = '/home/tina/ether-limited/farm-web'
const USER = 'tina'
const REPO = 'git@gitlab.com:etherlimited/farm-web.git'

const PROD_IP = '128.199.249.46'
const PROD_PORT = '2323'
const PROD_BRANCH = 'origin/master'

const DEV_IP = '128.199.230.107'
const DEV_PORT = '2323'
const DEV_BRANCH = 'origin/feature/UI'

const STG_IP = '178.128.91.106'
const STG_PORT = '2323'
const STG_BRANCH = 'origin/stg'

const POST_DEPLOY = {
  PROD:
    'ln -nfs ../shared/.env .env && \
            npm install --production && npm run build && \
            pm2 reload ecosystem.config.js --env production',
  DEV:
    'ln -nfs ../shared/.env .env && \
            npm install && npm run build && \
            pm2 reload ecosystem.config.js --env dev',
};

module.exports = {
  apps: [
    {
      name: APP_NAME,
      script: './.start.sh',
      env_production: {
        NODE_ENV: 'production'
      },
      env_dev: {
        NODE_ENV: 'development'
      }
    }
  ],

  deploy: {
    prod: {
      user: USER,
      host: [
        {
          host: PROD_IP,
          port: PROD_PORT
        }
      ],
      ref: PROD_BRANCH,
      repo: REPO,
      path: PATH,
      'pre-deploy': 'git checkout package.json',
      'post-deploy': POST_DEPLOY.PROD
    },
    stg: {
      user: USER,
      host: [{
        host: STG_IP,
        port: STG_PORT
      }],
      ref: STG_BRANCH,
      repo: REPO,
      path: PATH,
      'pre-deploy': 'git checkout package.json',
      'post-deploy': POST_DEPLOY.PROD
    },
    dev: {
      user: USER,
      host: [
        {
          host: DEV_IP,
          port: DEV_PORT
        }
      ],
      ref: DEV_BRANCH,
      repo: REPO,
      path: PATH,
      'pre-deploy': 'git checkout package.json',
      'post-deploy': POST_DEPLOY.DEV
    }
  }
};
