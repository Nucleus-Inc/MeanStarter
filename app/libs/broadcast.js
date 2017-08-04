var config = require('../../config/config.js')

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
      return err ? err : data
    })
  }

  return broadcast
}
