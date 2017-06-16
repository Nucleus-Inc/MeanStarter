module.exports = function(app) {

    var controller = app.controllers.auth;

    app.route('/auth/signin/mobile')
        .post(controller.signIn);

};
