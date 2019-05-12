import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  graduation: { type: mongoose.Schema.Types.ObjectId, ref: 'Graduation' }
})

const Professor = mongoose.model('Professor', schema)
export default Professor
