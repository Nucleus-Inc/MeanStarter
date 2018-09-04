const passportMult = require('app/middlewares/passport-mult.js')
const users = require('app/middlewares/users.js')

module.exports = app => {
  const controller = app.controllers.v1.users.index
  const router = app.locals.routers.v1

  router
    .route('/users')
    .get(passportMult.isAuth, users.verifyOwner, controller.getUsers)
}
