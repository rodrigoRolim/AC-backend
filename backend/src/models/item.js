import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  order: Number,
  description: String
})

const Item = new mongoose.Schema('Item', schema)
