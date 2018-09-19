module.exports = {
  apps : [{
    name      : 'SmartHome',
    script    : 'bin/dev',
    interpreter : '/bin/sh',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'pi',
      host : '192.168.10.30',
      ref  : 'origin/dev',
      repo : 'https://github.com/smart-minds/smart-home.git',
      path : '/home/pi/SmartMinds',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
};
