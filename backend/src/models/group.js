// name or description, items
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  description: String,
  items: [mongoose.model('Item')]
})

const Group = mongoose.model('Group', schema)

export default Group
