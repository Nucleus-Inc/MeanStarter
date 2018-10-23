const { RateLimiterRedis } = require('rate-limiter-flexible')

module.exports = app => {
  const config = app.locals.config
  const logger = app.locals.logger
  const errors = app.locals.errors

  const redisClient = require('./redis')(config, logger)

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: config.modules.rateLimiter.points,
    duration: config.modules.rateLimiter.duration
  })

  const middleware = (req, res, next) => {
    rateLimiter
      .consume(req.connection.remoteAddress)
      .then(() => {
        next()
      })
      .catch(rejRes => {
        res.status(errors.REQ004).send(errors.REQ004.response)
      })
  }

  return middleware
}
