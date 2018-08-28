const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = app => {
  require('./strategies/jwt.js')(app, User)
  require('./strategies/local.js')(app, User)
}
