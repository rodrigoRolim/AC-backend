import mongoose from 'mongoose'

mongoose.Promise = Promise

//const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/complementariesDB'
const mongodbUrl = process.env.MONGODB_URL || 'mongodb+srv://rodrigorolim:szpvnp77@ca-utf-lhifs.mongodb.net/test?retryWrites=true&w=majority'
const connect = () => mongoose.connect(mongodbUrl, { useNewUrlParser: true, useFindAndModify: false  })

export default {
  connect
}