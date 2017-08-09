var config = require('config/config.js')
var nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars')

module.exports = function (app) {
  var broadcast = {}

  broadcast.sendEmail = function (mailOptions) {
    var smtpTransporter = nodemailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    }, {
      from: config.email.from
    })
    smtpTransporter.use('compile', hbs({
      viewPath: 'app/views/',
      extName: '.hbs'
    }))
    smtpTransporter.sendMail(mailOptions, function (err, data) {
      return err || data
    })
  }

  broadcast.sendSms = function (recipient, message) {
    // Your code to send SMS here ..
  }

  return broadcast
}
