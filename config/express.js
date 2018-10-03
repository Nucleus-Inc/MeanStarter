/* Express */
const express = require('express')

/* Env Config */
const config = require('./config.js')

/* Express Session and related */
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

/* Helmet */
const helmet = require('helmet')

/* Body Parser */
const bodyParser = require('body-parser')
const bodyParserError = require('bodyparser-json-error')

/* Express Mongo Sanitizer */
const mongoSanitize = require('express-mongo-sanitize')

/* Passport */
const passportInstances = require('config/passport/instances')

/* Consign */
const consign = require('consign')

/* Winston logger */
const winston = require('winston')
const winstonConfig = require('./winston.js')
const expressWinston = require('express-winston')
const WinstonMongo = require('winston-mongodb').MongoDB

module.exports = () => {
  /* Init Express app and set port */
  const app = express()

  app.set('port', process.env.PORT || 5000)

  const apiVersions = {
    v1: {
      baseUrl: '/api/v1'
    }
  }

  const routers = {
    v1: express.Router()
  }

  /* Set Express Session Middleware */
  app.use(
    session({
      name: config.modules.expressSession.name,
      secret: config.modules.expressSession.secret,
      resave: config.modules.expressSession.resave,
      saveUninitialized: config.modules.expressSession.saveUninitialized,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: config.modules.expressSession.mongoStore.collection
      })
    })
  )

  /* Set public dir and use ejs views */
  app.use(require('method-override')())
  app.use(express.static('./public'))
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  /* Use Helmet */
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(
    helmet.hidePoweredBy({
      setTo: config.modules.helmet.poweredBy
    })
  )

  /* Use Cookie Parser */
  app.use(cookieParser())

  /* Use Body Parser */
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(bodyParser.json())
  app.use(bodyParserError.beautify())

  /* Use Express Mongo Sanitize */
  app.use(mongoSanitize())

  /* Use Passport */
  app.use(passportInstances.user.initialize())
  app.use(passportInstances.user.session())

  /* Use routers */
  app.use(apiVersions.v1.baseUrl, routers.v1)

  /* Set default to latest version */
  app.use('/', routers.v1)

  /* Use Winston Logger */
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console(
          config.modules.winston.transports.console
        ),
        new WinstonMongo({
          db: config.db
        })
      ],
      skip: winstonConfig.skip,
      level: winstonConfig.level
    })
  )

  /* Ensure index is now deprecated: https://github.com/Automattic/mongoose/issues/6890 */
  mongoose.set('useCreateIndex', true)

  /* Set App Locals */
  app.locals.mongoose = mongoose
  app.locals.config = config
  app.locals.routers = routers
  app.locals.passport = {
    user: passportInstances.user
  }
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

  return app
}
