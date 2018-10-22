const bluebird = require('bluebird')

module.exports = app => {
  const uri = app.locals.config.db.mongo.uri
  const mongoose = app.locals.mongoose
  const logger = app.locals.logger

  bluebird.promisifyAll(mongoose)

  mongoose.Promise = bluebird

  mongoose.connect(
    uri,
    { useNewUrlParser: true }
  )

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose - Connected on: ' + uri)
  })

  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose - Disconnected from: ' + uri)
  })

  mongoose.connection.on('error', err => {
    logger.info('Mongoose - Error on connection: ' + err)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose - Disconnected from: ' + uri)
    })
    process.exit(0)
  })

  return mongoose
}
