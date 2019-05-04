import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes';
import database from './config/database'

const configureExpress = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use('/', routes)

  return app
}


export default () => database.connect().then(configureExpress)