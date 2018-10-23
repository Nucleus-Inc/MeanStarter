const redis = require('redis')

module.exports = (config, logger) => {
  const rateLimitterRedisClient = redis.createClient({
    host: config.db.redis.host,
    port: config.db.redis.port,
    /* Needs to disable offline queue, according to docs */
    enable_offline_queue: false
  })

  rateLimitterRedisClient.on('error', err => {
    logger.error('Rate Limitter - Error on Redis connection: ' + err)
  })

  rateLimitterRedisClient.on('ready', () => {
    logger.info('Rate Limitter - Redis connected on: ' + config.db.redis.host)
  })

  process.on('exit', () => {
    rateLimitterRedisClient.quit()
    logger.info(
      'Rate Limitter - Redis disconnected from: ' + config.db.redis.host
    )
  })

  return rateLimitterRedisClient
}
