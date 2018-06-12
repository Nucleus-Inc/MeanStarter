const { check } = require('express-validator/check')

module.exports = (app) => {
  const controller = app.controllers.users.account.name

  app.route('/users/:id/account/name')
    .put([
      check('name')
        .exists()
    ], controller.updateName)
}
