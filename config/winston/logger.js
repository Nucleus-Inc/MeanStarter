const path = require('path')
const winston = require('winston')
const helpers = require('./helpers')

module.exports = config => {
  /* Create log dir if doesn't exist */
  helpers.createLogDir()

  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: config.modules.winston.transports.file.level,
        silent: config.modules.winston.transports.file.silent,
        filename: path.join(
          'logs',
          config.modules.winston.transports.file.filename
        ),
        maxsize: config.modules.winston.transports.file.maxsize,
        maxFiles: config.modules.winston.transports.file.maxFiles,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.simple(),
          winston.format.printf(helpers.formatParams)
        )
      }),
      new winston.transports.Console({
        level: config.modules.winston.transports.console.level,
        silent: config.modules.winston.transports.console.silent,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.printf(helpers.formatParams)
        )
      })
    ]
  })

  return logger
}
