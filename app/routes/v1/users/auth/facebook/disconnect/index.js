module.exports = app => {
  const passportMult = app.middlewares.users.auth.passportMult
  const controller = app.controllers.v1.users.auth.facebook.disconnect.index

  app
    .route('/users/auth/facebook/disconnect')
    .post(passportMult.isAuth, controller.disconnect)
}
