module.exports = function(app) {

    var controller = app.controllers.auth;

    app.route('/auth/signin/mobile')
        .post(controller.signIn);

    app.route('/auth/signup/mobile')
        .post(controller.registerUser);

    app.route('/auth/activation/mobile/:id')
        .get(controller.getActivationCode)
        .put(controller.activateUser);

    app.route('/auth/recovery/mobile/:phone_number')
        .get(controller.getRecoveryCode)
        .put(controller.recoverPassword);

    app.route('/auth/zxcvbn')
        .post(controller.validatePassword);
};
