process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('app-module-path').addPath(__dirname)
var http = require('http')
var config = require('./config/config')
var app = require('./config/express')()
require('./config/passport')()
require('./config/database.js')(config.db)
app.base = __dirname

http.createServer(app).listen(process.env.PORT || 5000, function () {
  console.log('Express Server listening on port ' + app.get('port'))
})

// For testing with Mocha
module.exports = app
