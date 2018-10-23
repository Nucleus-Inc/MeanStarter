const redis = require('redis')

module.exports = (config, logger) => {
  const sessionRedisClient = redis.createClient({
    host: config.db.redis.host,
    port: config.db.redis.port
  })

  sessionRedisClient.on('error', err => {
    logger.error('Express Session - Error on Redis connection: ' + err)
  })

  sessionRedisClient.on('ready', () => {
    logger.info('Express Session - Redis connected on: ' + config.db.redis.host)
  })

  process.on('exit', () => {
    sessionRedisClient.quit()
    logger.info(
      'Express Session - Redis disconnected from: ' + config.db.redis.host
    )
  })

  return sessionRedisClient
}
