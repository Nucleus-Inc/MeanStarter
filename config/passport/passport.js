module.exports = app => {
  require('./strategies/local/jwt.js')(app)
  require('./strategies/local/local.js')(app)
  require('./strategies/google/signin.js')(app)
  require('./strategies/google/oauth2.js')(app)
  require('./strategies/facebook/oauth2.js')(app)
}
