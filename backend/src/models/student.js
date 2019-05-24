// name, email, graduation, password, grupo1_score, grupo2_score, total_score =  g1 + g2 + g3
import mongoose from 'mongoose'
import Util from 'util'
import bcrypt from 'bcrypt'

const hashAsync = Util.promisify(bcrypt.hash)
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
    type: mongoose.Schema.Types.ObjectId, ref: 'Graduation',
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    enum: ['aluno'], 
    default: 'aluno'
  },
  documents:[{
    type: mongoose.Schema.Types.ObjectId, ref: 'Document'
  }]
})
schema.set('toJSON', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    ra: ret.ra,
    name: ret.name,
    email: ret.email,
    graduation: ret.graduation,
    documents: ret.documents
  })
})
schema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) {
    return next()
  };
  hashAsync(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword
      next()
    })
    .catch(err => next(err))
})
const Student = mongoose.model('Students', schema)

export default Student
