import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String
})

const Course = mongoose.model('Course', schema)

export default Course