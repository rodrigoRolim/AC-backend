import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const Department = mongoose.model('Department', Schema)

export default Department
