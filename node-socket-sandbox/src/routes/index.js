const express = require('express')
const router = express.Router()
const { addUser } = require('../controllers/user')

router.post('/user/add', addUser)

module.exports = router
