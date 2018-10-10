module.exports = app => {
  const passportMult = app.middlewares.users.auth.passportMult
  const controller = app.controllers.v1.users.auth.google.disconnect.index

  app
    .route('/users/auth/google/disconnect')
    .post(passportMult.isAuth, controller.disconnect)
}
