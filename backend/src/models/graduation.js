import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  professor: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }
})

const Course = mongoose.model('Graduation', schema)

export default Course
