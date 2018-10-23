/* Env Config */
const config = require('./config')

/* Custom API Errors */
const errors = require('./errors/custom')

/* Mongoose */
const mongoose = require('mongoose')

/* Redis */
const redis = require('redis')

/* Express */
const express = require('express')

/* Express sslify */
const enforce = require('express-sslify')

/* Compression */
const compression = require('compression')

/* Helmet */
const helmet = require('helmet')

/* Cookie parser */
const cookieParser = require('cookie-parser')

/* Csurf */
const csrf = require('csurf')

/* Express Session */
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

/* Body Parser */
const bodyParser = require('body-parser')
const bodyParserError = require('bodyparser-json-error')

/* Express Mongo Sanitizer */
const mongoSanitize = require('express-mongo-sanitize')

/* Passport */
const passportInstances = require('config/passport/instances')

/* Rate Limiter */
const { RateLimiterRedis } = require('rate-limiter-flexible')

/* Consign */
const consign = require('consign')

module.exports = () => {
  /* Init Express app and set port */
  const app = express()
  app.set('port', process.env.PORT || 5000)

  /* Routers and API versions */
  const apiVersions = {
    v1: {
      baseUrl: '/api/v1'
    }
  }
  const routers = {
    v1: express.Router()
  }

  /* Set trust proxy if configured */
  if (config.proxy.setTrustProxy) {
    app.set('trust proxy', 1)
  }

  /* Express sslify */
  if (config.ssl.enforce) {
    app.use(enforce.HTTPS(config.modules.sslify))
  }

  /* Compression */
  app.use(compression())

  /* Use Helmet */
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(
    helmet.hidePoweredBy({
      setTo: config.modules.helmet.poweredBy
    })
  )

  /* Winston Logger */
  const logger = require('./winston/logger')(config)

  /* Express Winston for request logs */
  const expressLogger = require('./winston/express')(config)

  routers.v1.use(expressLogger)

  /* Rate Limiter */
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

  const rateLimiter = new RateLimiterRedis({
    storeClient: rateLimitterRedisClient,
    points: config.modules.rateLimiter.points,
    duration: config.modules.rateLimiter.duration
  })

  const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
      .consume(req.connection.remoteAddress)
      .then(() => {
        next()
      })
      .catch(rejRes => {
        res.status(errors.REQ004).send(errors.REQ004.response)
      })
  }

  routers.v1.use(rateLimiterMiddleware)

  /* Set public dir and use ejs views */
  app.use(require('method-override')())
  app.use(express.static('./public'))
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  /* Body Parser */
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())

  /* Body Parser error handler */
  app.use(
    bodyParserError.beautify({
      status: errors.REQ002.httpCode,
      res: errors.REQ002.response
    })
  )

  /* Express Mongo Sanitize */
  app.use(mongoSanitize())

  /* Ensure index is now deprecated: https://github.com/Automattic/mongoose/issues/6890 */
  mongoose.set('useCreateIndex', true)

  /* Cookie Parser */
  app.use(cookieParser())

  /* Express Session Middleware */
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

  routers.v1.use(
    session({
      name: config.modules.expressSession.name,
      secret: config.modules.expressSession.secret,
      resave: config.modules.expressSession.resave,
      saveUninitialized: config.modules.expressSession.saveUninitialized,
      cookie: config.modules.expressSession.cookie,
      store: new RedisStore({
        client: sessionRedisClient
      })
    })
  )

  /* Passport */
  routers.v1.use(passportInstances.user.initialize())
  routers.v1.use(passportInstances.user.session())

  /* Csurf */
  if (config.csrfProtection.enable) {
    routers.v1.use(csrf({ cookie: true }))

    const csrfMiddleware = require('./csurf/middleware')(config, errors)

    routers.v1.use(csrfMiddleware)
  }

  /* Apply base url to router  */
  app.use(apiVersions.v1.baseUrl, routers.v1)

  /* Set app default router */
  app.use('/', routers.v1)

  /* Set app Locals */
  app.locals.config = config
  app.locals.mongoose = mongoose
  app.locals.routers = routers
  app.locals.passport = {
    user: passportInstances.user
  }
  app.locals.logger = logger
  app.locals.errors = errors

  /* Autoload modules with Consign */
  consign({
    cwd: 'app'
  })
    .include('models')
    .then('errors')
    .then('libs')
    .then('controllers')
    .then('middlewares')
    .then('routes')
    .into(app)

  /* Use errors handler middleware */
  require('./errors/middleware')(app)

  /* Load Passport */
  require('./passport/passport')(app)

  /* Load Database configs */
  require('./database')(app)

  return app
}
