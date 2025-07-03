let users = []

module.exports = function (io) {
  io.on('connection', socket => {
    console.log('Socket connected:', socket.id)
    socket.emit('users-list', users)

    socket.on('disconnect', () => {
      users = users.filter(u => u.id !== socket.id)
      io.emit('users-list', users)
    })
  })

  return { users }
}
