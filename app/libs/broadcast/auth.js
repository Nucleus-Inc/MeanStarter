const config = require('config/config.js')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

module.exports = (app) => {
  const broadcast = {}

  const smtpTransporter = nodemailer.createTransport({
    service: config.libs.nodeMailer.service,
    auth: {
      user: config.libs.nodeMailer.user,
      pass: config.libs.nodeMailer.password
    }
  }, {
    from: config.libs.nodeMailer.from
  })

  broadcast.sendCode = (data, options) => {
    if (options.transport === 'email') {
      smtpTransporter.use('compile', hbs({
        viewPath: 'app/views/broadcast',
        extName: '.hbs'
      }))

      return smtpTransporter.sendMail({
        to: data.recipient,
        subject: 'Test',
        template: 'transactional',
        context: {
          username: data.username,
          message: 'Here is your confirmation code: ',
          code: data.code
        }
      })
    } else if (options.transport === 'sms') {
      console.log('No SMS has been sent. You need to use your custom function here in order to send sms messages ' + new Error().stack)

      // Your code to send sms here ...
      return true
    } else {
      throw new Error('Transport option is invalid or has not been set')
    }
  }

  return broadcast
}
