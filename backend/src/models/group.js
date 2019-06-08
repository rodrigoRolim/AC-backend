// name or description, items
import mongoose from 'mongoose'


const schemaItem = new mongoose.Schema({
  description: String
})

const schemaGroup = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  seq: Number,
  scoreMin: Number,
  scoreMax: Number,
  description: String,
  items: [schemaItem]
})

const Group = mongoose.model('Group', schemaGroup)

export default Group
