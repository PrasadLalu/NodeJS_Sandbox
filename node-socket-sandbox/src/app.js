const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')
const socketHandler = require('./server/socket')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Attach socket events
socketHandler(io)

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
