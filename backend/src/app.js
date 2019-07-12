import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes';
import database from './config/database'
import dotenv from 'dotenv-safe'
import cors from 'cors'

dotenv.config({
  allowEmptyValues: true
})
const configureExpress = () => {
 
  dotenv.load()
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  app.use('/', routes)

  return app
}


export default () => database.connect().then(configureExpress)