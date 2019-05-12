import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean
})
schema.set('debug', true)
const User = mongoose.model('User', schema)

export default User