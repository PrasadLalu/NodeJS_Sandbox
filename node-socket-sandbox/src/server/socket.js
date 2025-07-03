module.exports = function (io) {
  io.on('connection', socket => {
    console.log('User connected:', socket.id)

    socket.on('chat-message', msg => {
      console.log('Message:', msg)
      io.emit('chat-message', msg)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })
}
