var mongoose = require('mongoose')

module.exports = function () {
  var User = mongoose.model('User')

  require('./strategies/jwt.js')(User)
  require('./strategies/local.js')(User)
}
