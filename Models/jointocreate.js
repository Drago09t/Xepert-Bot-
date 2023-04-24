const { model, Schema } = require('mongoose')

const schema = new Schema({
  Guild: String,
  Channel: String,
  UserLimit: Number
})

module.exports = model('jointocreate', schema)