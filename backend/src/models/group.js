// name or description, items
import mongoose from 'mongoose'


const schemaItem = new mongoose.Schema({
  order: Number,
  description: String
})

const schemaGroup = new mongoose.Schema({
  name: String,
  description: String,
  items: [schemaItem]
})

const Group = mongoose.model('Group', schemaGroup)

export default Group
