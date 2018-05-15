const config = require('./config.js')
const express = require('express')
const passport = require('passport')
const flash = require('connect-flash')
const load = require('express-load')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const bodyParserError = require('bodyparser-json-error')
const session = require('express-session')
const helmet = require('helmet')
/* Winston logger */
const winston = require('winston')
const expressWinston = require('express-winston')
const WinstonMongo = require('winston-mongodb').MongoDB

module.exports = () => {
  /* Express app */
  const app = express()
  app.set('port', (process.env.PORT || 5000))

  /* Ejs views */
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

  /* Cookie parser */
  app.use(cookieParser())

  /* Body parser */
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(bodyParserError.beautify())

  /* Express session */
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))

  /* Passport */
  app.use(passport.initialize())
  app.use(passport.session())

  /* Flash messages */
  app.use(flash())

  /* Express load */
  load('models', {
    cwd: 'app'
  })
    .then('libs')
    .then('controllers')
    .then('routes')
    .then('middlewares/errors.js')
    .into(app)

  /* Winston logger */
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
