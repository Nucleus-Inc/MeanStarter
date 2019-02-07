const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const hbs = require('nodemailer-express-handlebars')

module.exports = app => {
  const lib = {}
  const logger = app.locals.logger
  const config = app.locals.config

  /* NodeMailer Setup */
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

  /* SendGrid Setup */
  sgMail.setApiKey(config.modules.sendgrid.apiKey)

  lib.sendCode = (data, options) => {
    if (options.transport === 'nodemailer') {
      smtpTransporter.use(
        'compile',
        hbs({
          viewPath: 'app/views/hbs',
          extName: '.hbs'
        })
      )

      return smtpTransporter
        .sendMail({
          to: data.recipient,
          subject: 'Test',
          template: 'transactional',
          context: {
            username: data.username,
            message: 'Here is your confirmation code: ',
            code: data.code
          }
        })
        .catch(ex => {
          logger.error(ex.toString())
        })
    } else if (options.transport === 'sendgrid') {
      return sgMail.send({
        personalizations: [
          {
            to: [
              {
                email: data.recipient
              }
            ],
            dynamic_template_data: {
              username: data.username,
              message: 'Here is your confirmation code: ',
              code: data.code
            }
          }
        ],
        templateId: config.libs.sendgrid.templateId,
        from: {
          email: config.modules.sendgrid.senderMail,
          name: config.modules.sendgrid.senderName
        }
      })
    } else if (options.transport === 'sms') {
      logger.error(
        'No SMS has been sent. You need to use your custom function here in order to send sms messages - ' +
          new Error().stack
      )

      /* Your code to send sms goes here ... */
      return true
    } else {
      logger.error(
        'Transport option is invalid or has not been set - ' + new Error().stack
      )
    }
  }

  return lib
}
