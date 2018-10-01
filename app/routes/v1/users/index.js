const users = require('app/middlewares/users.js')

module.exports = app => {
  const controller = app.controllers.v1.users.index
  const passportMult = app.middlewares.auth.users.passportMult
  const router = app.locals.routers.v1

  router
    .route('/users')
    .get(passportMult.isAuth, users.verifyOwner, controller.getUsers)
}
