/* Env Config */
const config = require('./config')
/* Custom API Errors */
const errors = require('./errors/custom')
/* Mongoose */
const mongoose = require('mongoose')
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
/* Body Parser */
const bodyParser = require('body-parser')
const bodyParserError = require('bodyparser-json-error')
/* Express Mongo Sanitizer */
const mongoSanitize = require('express-mongo-sanitize')
/* Passport */
const passportInstances = require('config/passport/instances')
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

  /* Winston Logger */
  const logger = require('./winston/logger')(config)

  /* Set app Locals */
  app.locals.config = config
  app.locals.mongoose = mongoose
  app.locals.routers = routers
  app.locals.passport = {
    user: passportInstances.user
  }
  app.locals.logger = logger
  app.locals.errors = errors

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

  /* Express Winston for request logs */
  const expressLogger = require('./winston/express')(app)
  routers.v1.use(expressLogger)

  /* Rate Limiter */
  const rateLimiterMiddleware = require('./ratelimiter/middleware')(app)
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
  const sessionMiddleware = require('./session/middleware')(app)
  routers.v1.use(sessionMiddleware)

  /* Passport */
  routers.v1.use(passportInstances.user.initialize())
  routers.v1.use(passportInstances.user.session())

  /* Csurf */
  if (config.csrfProtection.enable) {
    routers.v1.use(csrf({ cookie: true }))

    const csrfMiddleware = require('./csurf/middleware')(app)

    routers.v1.use(csrfMiddleware)
  }

  /* Apply base url to router  */
  app.use(apiVersions.v1.baseUrl, routers.v1)

  /* Set app default router */
  app.use('/', routers.v1)

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
  const errorsMiddleware = require('./errors/middleware')(app)
  routers.v1.use(errorsMiddleware)

  /* Load Passport */
  require('./passport/passport')(app)

  /* Load Database configs */
  require('./database')(app)

  return app
}
