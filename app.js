process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('app-module-path').addPath(__dirname)
const http = require('http')
const app = require('./config/express')()
app.base = __dirname
const server = http.createServer(app)
require('./config/socket')(server)

server.listen(process.env.PORT || 5000, () => {
  console.log('Express Server listening on port ' + app.get('port'))
})

// For testing with Mocha
module.exports = app
