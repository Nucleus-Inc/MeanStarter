var config = require('../../config/config.js');
var async = require('async');
var jwt = require('jsonwebtoken');
var zxcvbn = require('zxcvbn');


function getSmsCode() {
    var length = 4;

    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}

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
                    'phone_number': {
                        notEmpty: {
                            errorMessage: 'Phone number is required'
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
                    phone_number: req.body.phone_number,
                    password: new User().generateHash(req.body.password),
                    token: new User().generateHash(code.toString()),
                    token_exp: Date.now() + 300000
                }).then(function(data) {
                    res.status(201);
                    var token = jwt.sign({
                        _id: data._id,
                        is_active: data.is_active
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
                            errors: err.fields
                        });
                    } else {
                        res.status(500);
                        res.json({
                            error: 'Custom error for internal error'
                        });
                    }
                });
            },
            function(code, done) {
                //Your code to send SMS with your preferred api
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
                    } else if (data.is_active) {
                        res.status(422);
                        res.json({
                            error: 'Custom error for account already active'
                        });
                    } else {
                        Professional.findByIdAndUpdate(data._id, {
                            token: new User().generateHash(code.toString()),
                            token_exp: Date.now() + 300000
                        }).then(function(data) {
                            if (process.env.NODE_ENV === 'production') {
                                done(null, code);
                            } else {
                                res.set('code', code);
                                res.end();
                            }
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                error: 'Custom error for internal error'
                            });
                        });
                    }
                    return null;
                }).catch(function(err) {
                    res.status(500);
                    res.json({
                        error: 'Custom error for internal error'
                    });
                });
            },
            function(code, done) {
                //Your code to send SMS with your preferred api
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
                    res.json({
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
                    } else if (data.is_active) {
                        res.status(422);
                        res.json({
                            error: 'Custom error for account already active'
                        });
                    } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.token_exp) {
                        Professional.findByIdAndUpdate(data._id, {
                            token: null,
                            token_exp: null,
                            is_active: true
                        }, {
                            new: true
                        }).then(function(data) {
                            var token = jwt.sign({
                                _id: data._id,
                                is_active: data.is_active
                            }, config.jwt.jwtSecret, {
                                expiresIn: '1h'
                            });
                            res.set('JWT', token);
                            res.end();
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                error: 'Custom error for internal error'
                            });
                        });
                    } else {
                        res.status(403);
                        res.json({
                            error: 'Custom error for invalid credentials'
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

    controller.getRecoveryCode = function(req, res) {
        async.waterfall([
                function(done) {
                    req.checkParams({
                        'phone_number': {
                            notEmpty: {
                                errorMessage: 'Phone number is required'
                            }
                        }
                    });
                    if (req.validationErrors()) {
                        res.status(400);
                        res.json({
                            errors: req.validationErrors()
                        });
                    } else {
                        done(null);
                    }
                },
                function(done) {
                    var code = getSmsCode();
                    User.findOne({
                        phone_number: req.params.phone_number
                    }).then(function(data) {
                        if (!data) {
                            res.set('code', code);
                            res.end();
                        } else {
                            User.findByIdAndUpdate(data._id, {
                                token: new User().generateHash(code.toString()),
                                token_exp: Date.now() + 300000
                            }).then(function(data) {
                                if (process.env.NODE_ENV === 'production') {
                                    done(null, code);
                                } else {
                                    res.set('code', code);
                                    res.end();
                                }
                            }).catch(function(err) {
                                res.status(500);
                                res.json({
                                    error: 'Custom error for internal error'
                                });
                            });
                        }
                        return null;
                    }).catch(function(err) {
                        res.status(500);
                        res.json({
                            error: 'Custom error for internal error'
                        });
                    });
                },
                function(code, done) {
                    //Your code to send SMS with your preferred api
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
                    'phone_number': {
                        notEmpty: {
                            errorMessage: 'Phone number is required'
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
                        errors: req.validationErrors()
                    });
                } else {
                    done(null);
                }
            },
            function(done) {
                User.findOne({
                    phone_number: req.params.phone_number
                }).then(function(data) {
                    if (!data) {
                        res.status(403);
                        res.json({
                            error: 'Custom error for invalid credentials'
                        });
                    } else if (new User().compareHash(req.body.token.toString(), data.token) && Date.now() < data.token_exp) {
                        Professional.findByIdAndUpdate(data._id, {
                            token: null,
                            token_exp: null,
                            is_active: true,
                            password: new User().generateHash(req.body.new_password)
                        }).then(function(data) {
                            res.end();
                        }).catch(function(err) {
                            res.status(500);
                            res.json({
                                error: 'Custom error for internal error'
                            });
                        });
                    } else {
                        res.status(403);
                        res.json({
                            error: 'Custom error for invalid credentials'
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
