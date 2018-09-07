module.exports = app => {
  require('./strategies/jwt.js')(app)
  require('./strategies/local.js')(app)
  require('./strategies/google.js')(app)
}
