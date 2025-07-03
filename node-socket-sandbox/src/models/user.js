const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('User', userSchema)
