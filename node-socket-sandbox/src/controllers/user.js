const User = require('../models/user')

exports.addUser = async (req, res) => {
  try {
    const { name, city } = req.body
    if (!name || !city) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const newUser = await User.create({
      name,
      city
    })

    const users = await User.find({})
    req.io.emit('users-list', users)

    return res.status(201).json({ message: 'User added', newUser })
  } catch (error) {
    return res.status(500).send({ error })
  }
}
