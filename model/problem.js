const mongoose = require('mongoose')

const problemSchema = mongoose.Schema({
  codes: {
    type: Object,
    required: true
  },
  inputs: [String],
  outputs: [String],
  theme: {
    type: String,
    default: 'Space'
  },
  description: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('problem', problemSchema)
