module.exports = app => {
  const passport = app.locals.passport.user
  const controller = app.controllers.v1.users.auth.google.signin.index

  app
    .route('/users/auth/google/signin')
    .post(
      passport.authenticate(
        'google-signin'
      ) /*,
    (err, req, res, next) => {
      res.status(500).send(err)
    } */,
      controller.signIn
    )
}
