module.exports = function (app) {
  var controller = app.controllers.users.account.signup

  app.route('/users/account/signup')
    .post(controller.registerUser)
}
