const consign = require('consign')

module.exports = app => {
  const io = require('socket.io').listen(app)

  /* Consign */
  consign({
    cwd: 'app'
  })
    .include('sockets')
    .into(io)

  return io
}
