const { check } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.hello.index

  app.route('/hello').post(controller.getHello)
}
