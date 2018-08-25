const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')

module.exports = app => {
  const controller = app.controllers.users.index

  app
    .route('/users')
    .get(passportMult.isAuth, users.verifyOwner, controller.getUsers)
}
