module.exports = function (app) {
  var controller = app.controllers.users.auth.mobile

  app.route('/users/auth/mobile')
    .post(controller.signIn)
}
