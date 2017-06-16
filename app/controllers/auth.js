var config = require('../../config/config.js');
var async = require('async');
var jwt = require('jsonwebtoken');
var zxcvbn = require('zxcvbn');

module.exports = function(app) {

    var User = app.models.user;

    var controller = {};

    controller.signIn = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkBody({
                    'email': {
                        notEmpty: {
                            errorMessage: 'Email address is required'
                        },
                        isEmail: {
                            errorMessage: 'Invalid email address'
                        }
                    },
                    'password': {
                        notEmpty: {
                            errorMessage: 'Password is required'
                        }
                    }
                });
                if (req.validationErrors()) {
                    res.status(400);
                    res.json({
                        code: 4000,
                        errors: req.validationErrors()
                    });
                } else {
                    done(null);
                }
            },
            function(done) {
                User.findOne({
                    email: req.body.email
                }).then(function(data) {
                    if (data && new User().compareHash(req.body.password, data.password)) {
                        var token = jwt.sign({
                            _id: data._id,
                            is_active: data.is_active
                        }, config.jwt.jwtSecret, {
                            expiresIn: '1h'
                        });
                        res.set('JWT', token);
                        res.end();
                    } else {
                        res.status(401);
                        res.json({
                            error: 'Custom error for unauthorized'
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        error: 'Custom error for internal error'
                    });
                });
            }
        ], function(err, result) {
            return result;
        });
    };

    return controller;
}
