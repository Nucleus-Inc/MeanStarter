const consign = require('consign')

module.exports = (app) => {
  const io = require('socket.io').listen(app)

  /* Express load */
  consign({
    cwd: 'app'
  })
    .include('sockets')
    .into(io)

  return io
}
