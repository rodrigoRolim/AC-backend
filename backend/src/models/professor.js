import mongoose from 'mongoose'
import Util from 'util'
import bcrypt from 'bcrypt'

const hashAsync = Util.promisify(bcrypt.hash)
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  graduation: { type: mongoose.Schema.Types.ObjectId, ref: 'Graduation' }
})
schema.set('toJSON', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    username: ret.username,
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
