import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean
})
schema.set('toJSON', {
  transform: (doc, ret, options) => ({
    _id: ret._id,
    username: ret.username,
    admin: ret.admin
  })
})
const User = mongoose.model('User', schema)

export default User