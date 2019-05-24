import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Department',
  }
})

const Course = mongoose.model('Graduation', schema)

export default Course
