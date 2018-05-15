const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = () => {
  require('./strategies/jwt.js')(User)
  require('./strategies/local.js')(User)
}
