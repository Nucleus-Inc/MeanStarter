const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = function () {
  require('./strategies/jwt.js')(User)
  require('./strategies/local.js')(User)
}
