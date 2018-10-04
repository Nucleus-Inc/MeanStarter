module.exports = app => {
  const controller = app.controllers.v1.users.auth.google.signin.index

  app.route('/users/auth/google/signin').post(controller.signIn)
}
