const session = require('express-session')
const RedisStore = require('connect-redis')(session)

module.exports = app => {
  const config = app.locals.config
  const logger = app.locals.logger

  const redisClient = require('./redis')(config, logger)

  const userSession = session({
    name: config.modules.expressSession.name,
    secret: config.modules.expressSession.secret,
    resave: config.modules.expressSession.resave,
    saveUninitialized: config.modules.expressSession.saveUninitialized,
    cookie: config.modules.expressSession.cookie,
    store: new RedisStore({
      client: redisClient
    })
  })

  return userSession
}
