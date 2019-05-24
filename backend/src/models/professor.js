import mongoose from 'mongoose'
import Util from 'util'
import bcrypt from 'bcrypt'

const hashAsync = Util.promisify(bcrypt.hash)
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  siape: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
  type_user: {
    type: String,
    enum: ['professor'],
    required: true,
    default: 'professor'
  },
  admin: {
    type: Boolean,
    required: false,
    default: false
  }
})
schema.set('toJSON', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    name: ret.name,
    email: ret.email,
    graduation: ret.graduation,
    admin: ret.admin
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
const Professor = mongoose.model('Professor', schema)
export default Professor
