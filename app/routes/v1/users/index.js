module.exports = app => {
  const controller = app.controllers.v1.users.index
  const passportMult = app.middlewares.users.auth.passportMult
  const router = app.locals.routers.v1

  router.route('/users').get(passportMult.isAuth, controller.getUsers)
}
