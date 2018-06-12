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

/* Flash */
const flash = require('connect-flash')

/* Consign */
const consign = require('consign')

/* Winston logger */
const winston = require('winston')
const expressWinston = require('express-winston')
const WinstonMongo = require('winston-mongodb').MongoDB

module.exports = () => {
  /* Express App */
  const app = express()
  app.set('port', (process.env.PORT || 5000))

  /* App Config */
  app.locals.config = config

  /* Express Session */
  app.use(session({
    name: 'default.sid',
    secret: 'default',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection, collection: 'localsessions' })
  }))

  /* EJS views */
  app.use(require('method-override')())
  app.use(express.static('./public'))
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  /* Helmet */
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.6.27'
  }))

  /* Cookie Parser */
  app.use(cookieParser())

  /* Body Parser */
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(bodyParserError.beautify())

  /* Passport */
  app.use(passport.initialize())
  app.use(passport.session())

  /* Flash Messages */
  app.use(flash())

  /* Consign - Autoload */
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

  /* Winston Logger */
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new WinstonMongo({
        db: config.db
      })
    ],
    skip: function (req, res) {
      return res.statusCode !== 500
    }
  }))

  return app
}
