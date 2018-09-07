module.exports = app => {
  require('./strategies/jwt.js')(app)
  require('./strategies/local.js')(app)
  require('./strategies/google/signin.js')(app)
  require('./strategies/google/oauth2.js')(app)
}
