// name or description, items
import mongoose from 'mongoose'


const schemaItem = new mongoose.Schema({
  description: String
})

const schemaGroup = new mongoose.Schema({
  name: String,
  seq: Number,
  scoreMin: Number,
  scoreMax: Number,
  description: String,
  items: [schemaItem]
})

const Group = mongoose.model('Group', schemaGroup)

export default Group
