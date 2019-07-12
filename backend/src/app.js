import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes';
import database from './config/database'
import dotenv from 'dotenv-safe'
import cors from 'cors'


const configureExpress = () => {
  dotenv.config({
    allowEmptyValues: true,
    example: process.env.CI ? '.env.ci.example' : '.env.example'
  })
  dotenv.load()
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  app.use('/', routes)

  return app
}


export default () => database.connect().then(configureExpress)