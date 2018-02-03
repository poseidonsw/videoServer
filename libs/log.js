var winston = require('winston');

function getLogger(module) {
  var path = module.filename.split('/').slice(-2).join('-');

  return new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: process.cwd() + '/logs/all.log',
        handleException: true,
        json: true,
        maxSize: 5242880, //5mb
        maxFiles: 2,
        colorize: true
      }),
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path
      })
    ]
  });
}

module.exports = getLogger;
