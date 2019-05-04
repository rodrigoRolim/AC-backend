import { Mongoose } from "mongoose";

const schema = new Mongoose.Schema({
  username: String,
  password: String
})

const User = Mongoose.model('User', schema)

export default User