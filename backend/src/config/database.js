import mongoose from 'mongoose'

mongoose.Promise = Promise

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/complementariesDB'

const connect = () => mongoose.connect(mongodbUrl, { useNewUrlParser: true, useFindAndModify: false  })

export default {
  connect
}