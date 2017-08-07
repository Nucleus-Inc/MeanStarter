var passport = require('passport')
var mongoose = require('mongoose')

module.exports = function () {
  var User = mongoose.model('User')

  require('./strategies/jwt.js')(User)
}
