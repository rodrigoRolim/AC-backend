import express from 'express'
import UsersController from '../controllers/users'
import User from '../models/users'
import jwt from 'jsonwebtoken'

const router = express.Router()
const usersController = new UsersController(User, jwt)

router.post('login', (req, res) => usersController.post(req, res))

export default router