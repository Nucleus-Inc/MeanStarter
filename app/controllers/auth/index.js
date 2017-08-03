var config = require('../../../config/config.js');
var async = require('async');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var jwt = require('jsonwebtoken');
var zxcvbn = require('zxcvbn');

function getSmsCode() {
    var length = 4;
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};

function sendEmail(mailOptions) {
    var smtpTransporter = nodemailer.createTransport({
        service: config.email.service,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    }, {
        from: config.email.from
    });
    smtpTransporter.use('compile', hbs({
        viewPath: 'app/views/',
        extName: '.hbs'
    }));
    smtpTransporter.sendMail(mailOptions, function(err, data) {
        return err ? err : data;
    });
};

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
                            isActive: data.isActive
                        }, config.jwt.jwtSecret, {
                            expiresIn: '1h'
                        });
                        res.set('JWT', token);
                        res.end();
                    } else {
                        res.status(401);
                        res.json({
                            code: 4100
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        code: 5000
                    });
                });
            }
        ], function(err, result) {
            return result;
        });
    };

    controller.registerUser = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkBody({
                    'name': {
                        notEmpty: {
                            errorMessage: 'Name is required'
                        }
                    },
                    'email': {
                        notEmpty: {
                            errorMessage: 'Email address is required'
                        },
                        isEmail: {
                            errorMessage: 'Invalid email address'
                        }
                    },
                    'phoneNumber': {
                        notEmpty: {
                            errorMessage: 'Phone number is required'
                        },
                        isPhoneNumber: {
                            number: req.body.phoneNumber,
                            errorMessage: 'Invalid phone number'
                        }
                    },
                    'password': {
                        notEmpty: {
                            errorMessage: 'Password is required'
                        },
                        isValidPassword: {
                            password: req.body.password,
                            errorMessage: 'Password is weak or invalid'
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
                var code = getSmsCode();
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    password: new User().generateHash(req.body.password),
                    token: new User().generateHash(code.toString()),
                    tokenExp: Date.now() + 300000
                }).then(function(data) {
                    res.status(201);
                    var token = jwt.sign({
                        _id: data._id,
                        isActive: data.isActive
                    }, config.jwt.jwtSecret, {
                        expiresIn: '1h'
                    });
                    res.set('JWT', token);
                    if (process.env.NODE_ENV === 'production') {
                        done(null, code);
                    } else {
                        res.set('code', code);
                        res.end();
                    }
                }).catch(function(err) {
                    if (err.code == 11000) {
                        res.status(422);
                        res.json({
                            code: 4200,
                            errors: err.fields
                        });
                    } else {
                        res.status(500);
                        res.json({
                            code: 5000
                        });
                    }
                });
            },
            function(code, done) {
                // Your code for sending sms here
                res.end();
            }
        ], function(err, result) {
            return result;
        });
    };

    controller.getActivationCode = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkParams({
                    'id': {
                        notEmpty: true,
                        isObjectId: {
                            _id: req.params.id
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
                var code = getSmsCode();
                User.findById(req.params.id).then(function(data) {
                    if (!data) {
                        res.status(404);
                        res.end();
                    } else if (data.isActive) {
                        res.status(422);
                        res.json({
                            code: 4201
                        });
                    } else {
                        User.findByIdAndUpdate(data._id, {
                            token: new User().generateHash(code.toString()),
                            tokenExp: Date.now() + 300000
                        }).then(function(data) {
                            if (req.query.option && req.query.option === 'email') {
                                var mailOptions = {
                                    to: data.email,
                                    subject: 'Activate your account',
                                    template: 'email-inline',
                                    context: {
                                        username: data.name,
                                        message: 'Please confirm your account by clicking the link below',
                                        link: 'http://' + req.headers.host + '/your-activation-link/' + code
                                    }
                                };
                                sendEmail(mailOptions);
                                res.end();
                            } else if (process.env.NODE_ENV === 'production') {
                                done(null, code);
                            } else {
                                res.set('code', code);
                                res.end();
                            }
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                code: 5000
                            });
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        code: 5000
                    });
                });
            },
            function(code, done) {
                //Your code for sending sms here
                res.end();
            }
        ], function(err, result) {
            return result;
        });
    };

    controller.activateUser = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkParams({
                    'id': {
                        notEmpty: true,
                        isObjectId: {
                            _id: req.params.id
                        }
                    }
                });
                req.checkBody({
                    'token': {
                        notEmpty: true
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
                User.findById(req.params.id).then(function(data) {
                    if (!data) {
                        res.status(404);
                        res.end();
                    } else if (data.isActive) {
                        res.status(422);
                        res.json({
                            code: 4201
                        });
                    } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.tokenExp) {
                        User.findByIdAndUpdate(data._id, {
                            token: null,
                            tokenExp: null,
                            isActive: true
                        }, {
                            new: true
                        }).then(function(data) {
                            var token = jwt.sign({
                                _id: data._id,
                                isActive: data.isActive
                            }, config.jwt.jwtSecret, {
                                expiresIn: '1h'
                            });
                            res.set('JWT', token);
                            res.end();
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                code: 5000
                            });
                        });
                    } else {
                        res.status(403);
                        res.json({
                            status: 403,
                            code: 4301
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        code: 5000
                    });
                });
            }
        ], function(err, result) {
            return result;
        });
    };

    controller.getRecoveryCode = function(req, res) {
        async.waterfall([
                function(done) {
                    req.checkParams({
                        'phoneNumber': {
                            notEmpty: {
                                errorMessage: 'Phone number is required'
                            },
                            isPhoneNumber: {
                                number: req.body.phoneNumber,
                                errorMessage: 'Invalid phone number'
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
                    var code = getSmsCode();
                    User.findOne({
                        phoneNumber: req.params.phoneNumber
                    }).then(function(data) {
                        if (!data) {
                            res.set('code', code);
                            res.end();
                        } else {
                            User.findByIdAndUpdate(data._id, {
                                token: new User().generateHash(code.toString()),
                                tokenExp: Date.now() + 300000
                            }).then(function(data) {
                                if (req.query.option && req.query.option === 'email') {
                                    var mailOptions = {
                                        to: data.email,
                                        subject: 'Reset your account password',
                                        template: 'email-inline',
                                        context: {
                                            username: data.name,
                                            message: 'Reset your password account by clicking the link below',
                                            link: 'http://' + req.headers.host + '/password-reset-link/' + code
                                        }
                                    };
                                    sendEmail(mailOptions);
                                    res.end();
                                } else if (process.env.NODE_ENV === 'production') {
                                    done(null, code);
                                } else {
                                    res.set('code', code);
                                    res.end();
                                }
                            }).catch(function(err) {
                                res.status(500);
                                res.json({
                                    code: 5000
                                });
                            });
                        }
                        return null;
                    }).catch(function(err) {
                        res.status(500);
                        res.json({
                            code: 5000
                        });
                    });
                },
                function(code, done) {
                    //Your code for sending sms here
                    res.end();
                }
            ],
            function(err, result) {
                return result;
            });
    };

    controller.recoverPassword = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkParams({
                    'phoneNumber': {
                        notEmpty: {
                            errorMessage: 'Phone number is required'
                        },
                        isPhoneNumber: {
                            number: req.body.phoneNumber,
                            errorMessage: 'Invalid phone number'
                        }
                    }
                });
                req.checkBody({
                    'token': {
                        notEmpty: true
                    },
                    'new_password': {
                        notEmpty: {
                            errorMessage: 'Password is required'
                        },
                        isValidPassword: {
                            password: req.body.password,
                            errorMessage: 'Password is weak or invalid'
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
                    phoneNumber: req.params.phoneNumber
                }).then(function(data) {
                    if (!data) {
                        res.status(403);
                        res.json({
                            status: 403,
                            code: 4301
                        });
                    } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.tokenExp) {
                        User.findByIdAndUpdate(data._id, {
                            token: null,
                            tokenExp: null,
                            isActive: true,
                            password: new User().generateHash(req.body.new_password)
                        }).then(function(data) {
                            res.end();
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                code: 5000
                            });
                        });
                    } else {
                        res.status(403);
                        res.json({
                            status: 403,
                            code: 4301
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        status: 500,
                        code: 5000
                    });
                });
            }
        ], function(err, result) {
            return result;
        });
    };

    controller.validatePassword = function(req, res) {
        async.waterfall([
            function(done) {
                req.checkBody({
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
                res.json({
                    score: zxcvbn(req.body.password).score
                });
            }
        ], function(err, result) {
            return result;
        });
    };

    return controller;
}
