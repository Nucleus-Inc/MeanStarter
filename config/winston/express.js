const winston = require('winston')
const expressWinston = require('express-winston')
const path = require('path')
const helpers = require('./helpers')

module.exports = app => {
  const config = app.locals.config

  const logger = expressWinston.logger({
    transports: [
      new winston.transports.File({
        level: config.modules.expressWinston.transports.file.level,
        silent: config.modules.expressWinston.transports.file.silent,
        filename: path.join(
          'logs',
          config.modules.expressWinston.transports.file.filename
        ),
        maxsize: config.modules.expressWinston.transports.file.maxsize,
        maxFiles: config.modules.expressWinston.transports.file.maxFiles,
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.simple(),
          winston.format.printf(helpers.formatParams)
        )
      }),
      new winston.transports.Console({
        level: config.modules.expressWinston.transports.console.level,
        silent: config.modules.expressWinston.transports.console.silent,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.printf(helpers.formatParams)
        )
      })
    ],
    meta: config.modules.expressWinston.meta,
    expressFormat: config.modules.expressWinston.expressFormat,
    level: helpers.getStatusLevel
  })

  return logger
}
