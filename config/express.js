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

/* Passport */
const passport = require('passport')

/* Consign */
const consign = require('consign')

/* Winston logger */
const winston = require('winston')
const expressWinston = require('express-winston')
const WinstonMongo = require('winston-mongodb').MongoDB

module.exports = () => {
  /* Init Express app and set port */
  const app = express()
  app.set('port', process.env.PORT || 5000)

  /* Set locals config */
  app.locals.config = config

  /* Set Express Session Middleware */
  app.use(
    session({
      name: 'default.sid',
      secret: 'default',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'localsessions'
      })
    })
  )

  /* Set public dir and use ejs views */
  app.use(require('method-override')())
  app.use(express.static('./public'))
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  /* Set Helmet */
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(
    helmet.hidePoweredBy({
      setTo: 'PHP 5.6.27'
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

  /* Use Passport */
  app.use(passport.initialize())
  app.use(passport.session())

  /* Set Winston Logger */
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.Console(config.libs.winston.transports.console),
        new WinstonMongo({
          db: config.db
        })
      ],
      skip: function (req, res) {
        return res.statusCode !== 500
      },
      level: function (req, res) {
        let level = ''

        if (res.statusCode >= 100) {
          level = 'info'
        }
        if (res.statusCode >= 400) {
          level = 'warn'
        }
        if (res.statusCode >= 500) {
          level = 'error'
        }
        return level
      }
    })
  )

  /* Autoload modules with Consign */
  consign({
    cwd: 'app'
  })
    .include('models')
    .then('errors')
    .then('libs')
    .then('controllers')
    .then('routes')
    .then('middlewares/errors.js')
    .into(app)

  return app
}
