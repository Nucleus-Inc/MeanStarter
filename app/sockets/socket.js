module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected: ' + socket.id)

    socket.on('login success', (msg) => {
      io.to(socket.id).emit('login success', msg)
    })

    socket.on('logout success', (msg) => {
      io.to(socket.id).emit('logout success', msg)
    })

    socket.on('change profile', (msg) => {
      io.to(socket.id).emit('change profile', msg)
    })

    socket.on('admin add', (msg) => {
      socket.broadcast.emit('admin add', msg)
    })

    socket.on('admin active', (msg) => {
      socket.broadcast.emit('admin active', msg)
      io.to(socket.id).emit('admin active', msg)
    })

    socket.on('admin inactivate', (msg) => {
      socket.broadcast.emit('admin inactivate', msg)
      io.to(socket.id).emit('admin inactivate', msg)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected: ' + socket.id)
    })
  })
}
