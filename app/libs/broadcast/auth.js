const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

module.exports = app => {
  const broadcast = {}
  const config = app.locals.config

  const smtpTransporter = nodemailer.createTransport(
    {
      service: config.modules.nodeMailer.service,
      auth: {
        user: config.modules.nodeMailer.user,
        pass: config.modules.nodeMailer.password
      }
    },
    {
      from: config.modules.nodeMailer.from
    }
  )

  broadcast.sendCode = (data, options) => {
    if (options.transport === 'email') {
      smtpTransporter.use(
        'compile',
        hbs({
          viewPath: 'app/views/hbs',
          extName: '.hbs'
        })
      )

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
      console.log(
        'No SMS has been sent. You need to use your custom function here in order to send sms messages - ' +
          new Error().stack
      )

      // Your code to send sms here ...
      return true
    } else {
      throw new Error('Transport option is invalid or has not been set')
    }
  }

  return broadcast
}
