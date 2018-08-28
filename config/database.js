const bluebird = require('bluebird')

module.exports = (uri, mongoose) => {
  bluebird.promisifyAll(mongoose)

  // mongoose.Promise = global.Promise; For use native promise
  mongoose.Promise = bluebird

  mongoose.connect(
    uri,
    { useNewUrlParser: true }
  )

  mongoose.connection.on('connected', () => {
    console.log('Mongoose! Connected in: ' + uri)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose! Disconnected: ' + uri)
  })

  mongoose.connection.on('error', err => {
    console.log('Mongoose! Error in connection: ' + err)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose! Disconnected for finished app')
    })
    process.exit(0)
  })

  return mongoose
}
