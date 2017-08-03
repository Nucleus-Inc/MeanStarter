var config = require('./config.js')
var express = require('express')
var load = require('express-load')
var bodyParser = require('body-parser')
var bodyParserError = require('bodyparser-json-error')
var helmet = require('helmet')
var mongoose = require('mongoose')
var expressValidator = require('express-validator')
var zxcvbn = require('zxcvbn')
/* Winston logger */
var winston = require('winston')
var expressWinston = require('express-winston')
var WinstonMongo = require('winston-mongodb').MongoDB

module.exports = function () {
  /* Express app */
  var app = express()
  app.set('port', (process.env.PORT || 5000))

  /* Body parser */
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(bodyParserError.beautify())

  /* ejs views */
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

  /* Express Validator */
  app.use(expressValidator({
    customValidators: {
      isObjectId: function (_id) {
        return mongoose.Types.ObjectId.isValid(_id)
      },
      isValidPassword: function (password) {
        return !!(password && zxcvbn(password).score >= 2)
      },
      isPhoneNumber: function (number) {
        var numberExp = new RegExp(/(55)[0-9]{11}/)
        return numberExp.test(number)
      }
    }
  }))

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

  /* Express load */

  load('models', {
    cwd: 'app'
  })
    .then('controllers')
    .then('routes')
    .into(app)

  return app
}
