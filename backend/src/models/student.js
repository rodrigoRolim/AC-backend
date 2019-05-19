// name, email, graduation, password, grupo1_score, grupo2_score, total_score =  g1 + g2 + g3
import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  ra: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  graduation: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group_one: Number,
  group_two: Number,
  group_three: Number,
  total: Number
})

const Student = mongoose.model('Students', schema)

export default Student
