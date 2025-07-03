require('dotenv').config()
const http = require('http')
const path = require('path')
const express = require('express')
const { Server } = require('socket.io')
const apiRoutes = require('./routes')
const socketHandler = require('./server/socket')

const app = express()

// database connect
const connectDB = require('./config/database')
connectDB()

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// serve static file
app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = new Server(server)
socketHandler(io)

// Make io and users available in routes
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/', apiRoutes)

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
