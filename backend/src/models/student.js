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
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group_one: {
    type: Number,
    default: 0
  },
  group_two: { 
    type: Number,
    default: 0
  },
  group_three: { 
    type: Number,
    default: 0 
  },
  total: { 
    type: Number,
    default: 0
  },
  admin: {
    tupe: Boolean,
    default: false
  }
})
schema.set('toJSON', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    ra: ret.ra,
    name: ret.name,
    email: ret.email,
    graduation: ret.graduation,
    group_one: ret.group_one,
    group_two: ret.group_two,
    group_three: ret.group_three,
    total: ret.total
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
